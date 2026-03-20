from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List
from pydantic import BaseModel
from uuid import UUID

from ..db import get_db
from .auth import get_current_user
from ..models import User

router = APIRouter()

class ReactionBase(BaseModel):
    message_id: int
    emoji: str

@router.post("/reactions")
async def add_reaction(reaction: ReactionBase, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("INSERT INTO reactions (message_id, user_id, emoji) VALUES (:message_id, :user_id, :emoji) RETURNING id")
    try:
        await db.execute(query, {
            "message_id": reaction.message_id,
            "user_id": current_user.id,
            "emoji": reaction.emoji
        })
        await db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to add reaction")
    
    return {"message": "Reaction added"}

@router.get("/messages/{message_id}/reactions")
async def get_reactions(message_id: int, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("SELECT emoji, count(*) as count FROM reactions WHERE message_id = :message_id GROUP BY emoji")
    result = await db.execute(query, {"message_id": message_id})
    return result.mappings().all()
