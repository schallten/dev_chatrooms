from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from pydantic import BaseModel
from uuid import UUID

from app.db import get_db
from app.routes.auth import get_current_user
from app.models import User

router = APIRouter()

class RoomSettings(BaseModel):
    room_id: UUID
    ai_api_key: str
    ai_model: str

@router.get("/rooms/{room_id}/settings")
async def get_room_settings(room_id: UUID, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Check if user is admin (simplified for now: any admin can see settings)
    admin_check = text("""
        SELECT 1 FROM roles r 
        JOIN user_roles ur ON r.id = ur.role_id 
        WHERE ur.user_id = :user_id AND r.name = 'admin'
    """)
    is_admin = await db.execute(admin_check, {"user_id": current_user.id})
    if not is_admin.fetchone():
        raise HTTPException(status_code=403, detail="Only admins can access room settings")
        
    query = text("SELECT * FROM room_settings WHERE room_id = :room_id")
    result = await db.execute(query, {"room_id": room_id})
    settings = result.fetchone()
    if not settings:
        return {"room_id": room_id, "ai_api_key": "", "ai_model": "gpt-4"}
    return settings

@router.put("/rooms/{room_id}/settings")
async def update_room_settings(room_id: UUID, settings: RoomSettings, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Check if user is admin
    admin_check = text("""
        SELECT 1 FROM roles r 
        JOIN user_roles ur ON r.id = ur.role_id 
        WHERE ur.user_id = :user_id AND r.name = 'admin'
    """)
    is_admin = await db.execute(admin_check, {"user_id": current_user.id})
    if not is_admin.fetchone():
        raise HTTPException(status_code=403, detail="Only admins can update room settings")
        
    query = text("""
        INSERT INTO room_settings (room_id, ai_api_key, ai_model) 
        VALUES (:room_id, :ai_api_key, :ai_model)
        ON CONFLICT (room_id) DO UPDATE SET 
            ai_api_key = EXCLUDED.ai_api_key,
            ai_model = EXCLUDED.ai_model
    """)
    await db.execute(query, {
        "room_id": room_id,
        "ai_api_key": settings.ai_api_key,
        "ai_model": settings.ai_model
    })
    await db.commit()
    return {"message": "Settings updated"}
