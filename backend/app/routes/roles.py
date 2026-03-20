from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List
from uuid import UUID

from app.db import get_db
from app.routes.auth import get_current_user
from app.models import User

router = APIRouter()

@router.get("/roles/me")
async def get_my_roles(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("""
        SELECT r.name 
        FROM roles r 
        JOIN user_roles ur ON r.id = ur.role_id 
        WHERE ur.user_id = :user_id
    """)
    result = await db.execute(query, {"user_id": current_user.id})
    return [row.name for row in result.all()]

@router.post("/roles/assign-admin/{user_id}")
async def assign_admin(user_id: UUID, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Check if current user is admin
    admin_check = text("""
        SELECT 1 FROM roles r 
        JOIN user_roles ur ON r.id = ur.role_id 
        WHERE ur.user_id = :user_id AND r.name = 'admin'
    """)
    is_admin = await db.execute(admin_check, {"user_id": current_user.id})
    if not is_admin.fetchone():
        raise HTTPException(status_code=403, detail="Only admins can assign other admins")
        
    # Get admin role id
    role_query = text("SELECT id FROM roles WHERE name = 'admin'")
    role = await db.execute(role_query)
    role_id = role.fetchone().id
    
    # Assign
    assign_query = text("INSERT INTO user_roles (user_id, role_id) VALUES (:user_id, :role_id) ON CONFLICT DO NOTHING")
    await db.execute(assign_query, {"user_id": user_id, "role_id": role_id})
    await db.commit()
    return {"message": "Admin role assigned"}
