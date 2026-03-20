from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from typing import Dict, List, Set
from uuid import UUID
import json
from jose import jwt, JWTError
import os

from app.db import AsyncSessionLocal
from app.routes.auth import SECRET_KEY, ALGORITHM
from sqlalchemy import text

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        # room_id -> set of websockets
        self.active_connections: Dict[UUID, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: UUID):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = set()
        self.active_connections[room_id].add(websocket)

    def disconnect(self, websocket: WebSocket, room_id: UUID):
        if room_id in self.active_connections:
            self.active_connections[room_id].remove(websocket)
            if not self.active_connections[room_id]:
                del self.active_connections[room_id]

    async def broadcast(self, message: dict, room_id: UUID):
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id]:
                await connection.send_json(message)

manager = ConnectionManager()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: UUID, token: str = Query(...)):
    # Verify token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            await websocket.close(code=4001)
            return
    except JWTError:
        await websocket.close(code=4001)
        return

    # Get user_id from username
    async with AsyncSessionLocal() as db:
        query = text("SELECT id FROM users WHERE username = :username")
        result = await db.execute(query, {"username": username})
        user = result.fetchone()
        if not user:
            await websocket.close(code=4001)
            return
        user_id = user.id

    await manager.connect(websocket, room_id)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            if message_data.get("type") == "message_send":
                content = message_data.get("content")
                if not content:
                    continue
                
                # Save to DB
                async with AsyncSessionLocal() as db:
                    query = text("INSERT INTO messages (room_id, user_id, content) VALUES (:room_id, :user_id, :content) RETURNING id, created_at")
                    result = await db.execute(query, {"room_id": room_id, "user_id": user_id, "content": content})
                    await db.commit()
                    new_msg = result.fetchone()

                    # Detect mentions
                    import re
                    mentions = re.findall(r"@(\w+)", content)
                    if mentions:
                        for username_mention in set(mentions):
                            user_query = text("SELECT id FROM users WHERE username = :username")
                            user_result = await db.execute(user_query, {"username": username_mention})
                            mentioned_user = user_result.fetchone()
                            if mentioned_user:
                                mention_insert = text("INSERT INTO mentions (message_id, mentioned_user_id) VALUES (:message_id, :mentioned_user_id)")
                                await db.execute(mention_insert, {
                                    "message_id": new_msg.id,
                                    "mentioned_user_id": mentioned_user.id
                                })
                        await db.commit()
                
                # Broadcast
                broadcast_msg = {
                    "type": "message_new",
                    "message": {
                        "id": new_msg.id,
                        "room_id": str(room_id),
                        "user_id": str(user_id),
                        "username": username,
                        "content": content,
                        "created_at": str(new_msg.created_at)
                    }
                }
                await manager.broadcast(broadcast_msg, room_id)
            
            elif message_data.get("type") == "reaction_add":
                message_id = message_data.get("message_id")
                emoji = message_data.get("emoji")
                if not message_id or not emoji:
                    continue
                
                async with AsyncSessionLocal() as db:
                    query = text("INSERT INTO reactions (message_id, user_id, emoji) VALUES (:message_id, :user_id, :emoji)")
                    await db.execute(query, {"message_id": message_id, "user_id": user_id, "emoji": emoji})
                    await db.commit()
                
                broadcast_msg = {
                    "type": "reaction_new",
                    "message_id": message_id,
                    "user_id": str(user_id),
                    "emoji": emoji
                }
                await manager.broadcast(broadcast_msg, room_id)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
    except Exception as e:
        print(f"WS Error: {e}")
        manager.disconnect(websocket, room_id)
