from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from pydantic import BaseModel
from typing import Optional
from uuid import UUID

from ..db import get_db
from .auth import get_current_user
from ..models import User

router = APIRouter()

class ProfileUpdate(BaseModel):
    avatar_url: Optional[str] = None
    status: Optional[str] = None

@router.get("/users/{user_id}", response_model=User)
async def get_user_profile(user_id: UUID, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("SELECT id, username, email, avatar_url, status, created_at FROM users WHERE id = :user_id")
    result = await db.execute(query, {"user_id": user_id})
    user = result.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/me")
async def update_profile(profile: ProfileUpdate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    updates = []
    params = {"user_id": current_user.id}
    
    if profile.avatar_url is not None:
        updates.append("avatar_url = :avatar_url")
        params["avatar_url"] = profile.avatar_url
    
    if profile.status is not None:
        updates.append("status = :status")
        params["status"] = profile.status
        
    if not updates:
        return current_user
        
    query = text(f"UPDATE users SET {', '.join(updates)} WHERE id = :user_id RETURNING id, username, email, avatar_url, status, created_at")
    result = await db.execute(query, params)
    await db.commit()
    return result.fetchone()

@router.post("/status")
async def update_status(status_update: ProfileUpdate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    if not status_update.status:
        raise HTTPException(status_code=400, detail="Status required")
        
    query = text("UPDATE users SET status = :status WHERE id = :user_id")
    await db.execute(query, {"status": status_update.status, "user_id": current_user.id})
    await db.commit()
    return {"message": f"Status updated to {status_update.status}"}
