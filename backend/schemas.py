from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str
    workspace_id: Optional[int] = None


class LoginRequest(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: int
    workspace_id: Optional[int]

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class WorkspaceBase(BaseModel):
    name: str
    slug: str

class Workspace(WorkspaceBase):
    id: int

    class Config:
        from_attributes = True

class RoomBase(BaseModel):
    name: str
    topic: Optional[str] = None
    workspace_id: int

class Room(RoomBase):
    id: int

    class Config:
        from_attributes = True

class MessageBase(BaseModel):
    content: str
    room_id: int

class MessageCreate(MessageBase):
    is_ai: bool = False
    is_code: bool = False
    language: Optional[str] = None

class Message(MessageCreate):
    id: int
    user_id: Optional[int]
    timestamp: datetime

    class Config:
        from_attributes = True
