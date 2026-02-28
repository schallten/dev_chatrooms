import socketio
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import database, schemas, ai_service
import auth as auth_module
from database import engine, SessionLocal, init_db
from datetime import datetime
import asyncio

# Initialize Database
init_db()

# Create FastAPI app
app = FastAPI(title="AI-Powered Dev Chat Rooms API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Socket.IO server
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socket_app = socketio.ASGIApp(sio, app)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency to get current user from token
def get_current_user(authorization: str = Header(None), db: Session = Depends(get_db)):
    """Extract and validate user from Authorization header"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    email = auth_module.verify_token(authorization)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user = db.query(database.User).filter(database.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

# --- Auth Routes ---

@app.post("/api/auth/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(database.User).filter(database.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = auth_module.get_password_hash(user.password)
    new_user = database.User(
        name=user.name,
        email=user.email,
        password_hash=hashed_pwd,
        workspace_id=user.workspace_id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/auth/login", response_model=schemas.Token)
def login(user_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    # user_data now only requires email and password, matching docs
    user = db.query(database.User).filter(database.User.email == user_data.email).first()
    if not user or not auth_module.verify_password(user_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = auth_module.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=schemas.User)
def get_me(current_user: database.User = Depends(get_current_user)):
    """Get current authenticated user info"""
    return current_user

# --- Room Routes ---

@app.get("/api/rooms", response_model=list[schemas.Room])
def get_rooms(db: Session = Depends(get_db)):
    return db.query(database.Room).all()

@app.get("/api/rooms/{room_id}/messages", response_model=list[schemas.Message])
def get_room_messages(room_id: int, db: Session = Depends(get_db)):
    return db.query(database.Message).filter(database.Message.room_id == room_id).order_by(database.Message.timestamp.desc()).limit(50).all()[::-1]

# Store authenticated users
user_sessions = {}

# --- Socket.IO Events ---

@sio.event
async def connect(sid, environ):
    """Handle socket connection with optional token authentication"""
    print(f"Client connected: {sid}")
    # Token validation happens in auth event

async def socket_auth(sid, data):
    """Authenticate socket connection with JWT token"""
    token = data.get('token')
    if not token:
        await sio.emit('auth_error', {'detail': 'Token required'}, to=sid)
        return
    
    email = auth_module.verify_token(token)
    if not email:
        await sio.emit('auth_error', {'detail': 'Invalid token'}, to=sid)
        return
    
    db = SessionLocal()
    user = db.query(database.User).filter(database.User.email == email).first()
    db.close()
    
    if not user:
        await sio.emit('auth_error', {'detail': 'User not found'}, to=sid)
        return
    
    user_sessions[sid] = {'user_id': user.id, 'email': user.email}
    await sio.emit('auth_success', {'user_id': user.id, 'email': user.email}, to=sid)
    print(f"User {email} authenticated (sid: {sid})")

# register the handler for the 'auth' event so clients can still emit 'auth'
sio.on('auth')(socket_auth)

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
    if sid in user_sessions:
        del user_sessions[sid]

@sio.event
async def join(sid, data):
    room_id = data.get('room_id')
    if sid not in user_sessions:
        await sio.emit('error', {'detail': 'Authenticate first'}, to=sid)
        return
    
    await sio.enter_room(sid, str(room_id))
    print(f"User {user_sessions[sid]['email']} joined room {room_id}")

@sio.event
async def message(sid, data):
    if sid not in user_sessions:
        await sio.emit('error', {'detail': 'Authenticate first'}, to=sid)
        return
    
    room_id = data.get('room_id')
    content = data.get('content')
    user_id = user_sessions[sid]['user_id']  # Use authenticated user
    
    if not content or not room_id:
        await sio.emit('error', {'detail': 'Missing content or room_id'}, to=sid)
        return
    
    # Save to DB
    db = SessionLocal()
    try:
        new_msg = database.Message(
            content=content,
            room_id=room_id,
            user_id=user_id,
            is_ai=False
        )
        db.add(new_msg)
        db.commit()
        db.refresh(new_msg)
        
        # Get user info for broadcast
        user = db.query(database.User).filter(database.User.id == user_id).first()
        
        msg_data = {
            "id": new_msg.id,
            "content": new_msg.content,
            "room_id": new_msg.room_id,
            "user_id": new_msg.user_id,
            "user_name": user.name if user else "Unknown",
            "is_ai": False,
            "timestamp": new_msg.timestamp.isoformat()
        }
        
        # Broadcast to room
        await sio.emit('new_message', msg_data, room=str(room_id))
        
        # AI Trigger
        if "@ai" in content.lower():
            asyncio.create_task(process_ai_response(room_id, content, user_id))
    finally:
        db.close()

async def process_ai_response(room_id, user_content, user_id):
    db = SessionLocal()
    try:
        # Fetch history
        history_msgs = db.query(database.Message).filter(database.Message.room_id == room_id).order_by(database.Message.timestamp.desc()).limit(10).all()
        history_str = "\n".join([f"{'AI' if m.is_ai else 'User'}: {m.content}" for m in history_msgs[::-1]])
        
        ai_response = await ai_service.generate_ai_response(history_str, user_content)
        
        # Save AI message
        ai_msg = database.Message(
            content=ai_response,
            room_id=room_id,
            is_ai=True,
            user_id=None  # AI messages don't have a user
        )
        db.add(ai_msg)
        db.commit()
        db.refresh(ai_msg)
        
        ai_msg_data = {
            "id": ai_msg.id,
            "content": ai_msg.content,
            "room_id": ai_msg.room_id,
            "is_ai": True,
            "user_name": "AI Assistant",
            "timestamp": ai_msg.timestamp.isoformat()
        }
        
        await sio.emit('new_message', ai_msg_data, room=str(room_id))
    finally:
        db.close()

# The entry point should be socket_app for ASGI
# To run: uvicorn backend.main:socket_app --reload
