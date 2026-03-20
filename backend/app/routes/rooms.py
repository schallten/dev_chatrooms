from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

from app.db import get_db
from app.routes.auth import get_current_user
from app.models import User

router = APIRouter()

class RoomBase(BaseModel):
    name: str
    description: str = ""

class Room(RoomBase):
    id: UUID
    created_at: datetime

@router.get("/rooms", response_model=List[Room])
async def get_rooms(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM rooms")
    result = await db.execute(query)
    return result.mappings().all()

@router.post("/rooms", response_model=Room)
async def create_room(room: RoomBase, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("INSERT INTO rooms (name, description) VALUES (:name, :description) RETURNING id, name, description, created_at")
    result = await db.execute(query, {"name": room.name, "description": room.description})
    await db.commit()
    new_room = result.mappings().first()
    
    # Auto-join the creator
    join_query = text("INSERT INTO room_members (user_id, room_id) VALUES (:user_id, :room_id)")
    await db.execute(join_query, {"user_id": current_user.id, "room_id": new_room["id"]})
    await db.commit()
    
    return new_room

@router.post("/rooms/{room_id}/join")
async def join_room(room_id: UUID, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Check if already a member
    check_query = text("SELECT 1 FROM room_members WHERE user_id = :user_id AND room_id = :room_id")
    result = await db.execute(check_query, {"user_id": current_user.id, "room_id": room_id})
    if result.fetchone():
        return {"message": "Already a member"}
    
    query = text("INSERT INTO room_members (user_id, room_id) VALUES (:user_id, :room_id)")
    await db.execute(query, {"user_id": current_user.id, "room_id": room_id})
    await db.commit()
    return {"message": "Joined successfully"}

@router.get("/rooms/{room_id}/messages")
async def get_room_messages(room_id: UUID, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("""
        SELECT m.id, m.room_id, m.user_id, u.username, m.content, m.created_at,
               COALESCE(json_agg(json_build_object('emoji', r.emoji, 'count', r.count)) FILTER (WHERE r.emoji IS NOT NULL), '[]') as reactions
        FROM messages m 
        JOIN users u ON m.user_id = u.id 
        LEFT JOIN (
            SELECT message_id, emoji, count(*) as count 
            FROM reactions 
            GROUP BY message_id, emoji
        ) r ON m.id = r.message_id
        WHERE m.room_id = :room_id 
        GROUP BY m.id, u.username
        ORDER BY m.created_at ASC
    """)
    result = await db.execute(query, {"room_id": room_id})
    return result.mappings().all()
