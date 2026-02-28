# Backend Testing Guide

## ✅ What's Been Implemented

### Authentication System
- ✅ **Register** - Create new user account
- ✅ **Login** - Get JWT token with email
- ✅ **Get Me** - Fetch current user info with token
- ✅ **Socket.IO Auth** - Authenticate WebSocket connections before messaging
- ✅ **Token Validation** - Verify JWT tokens with expiration

### Real-time Chat (Socket.IO)
- ✅ **Connect** - Establish WebSocket connection
- ✅ **Auth Event** - Authenticate socket with JWT token
- ✅ **Join Room** - Subscribe to a specific room
- ✅ **Send Message** - Broadcast messages to room (requires auth)
- ✅ **Receive Messages** - Listen for new messages in room
- ✅ **User Sessions** - Track authenticated users per socket

### AI Integration
- ✅ **@AI Trigger** - Automatically process messages with @ai mention
- ✅ **Context Awareness** - Uses last 10 messages as context
- ✅ **Async Processing** - Non-blocking AI response generation
- ✅ **Message Broadcast** - AI responses sent to all users in room

### Mock Data
- ✅ **3 Workspaces** - General, DevOps, Frontend
- ✅ **6 Test Users** - Ready to login
- ✅ **11 Rooms** - With topics and conversations
- ✅ **Sample Messages** - Historical conversation data

---

## 🧪 Testing Steps

### Step 1: Setup & Run Server

```bash
# Navigate to backend
cd backend

# Create .env file (copy from .env.example)
cp .env.example .env

# Install dependencies
pip install -r requirements.txt

# Seed database with mock data
python seed.py

# Start server
uvicorn main:socket_app --reload
```

Expected output:
```
✅ Database seeded successfully!
   Created 3 workspaces
   Created 6 users
   Created 11 rooms
INFO:     Uvicorn running on http://127.0.0.1:8000 [CTRL+C to quit]
```

---

### Step 2: Test REST API Endpoints (HTTP)

#### 2a. Register a New User
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123",
    "workspace_id": 1
  }'
```

#### 2b. Login (Get Token)
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned `access_token`.

#### 2c. Get Current User
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 2d. Get All Rooms
```bash
curl http://localhost:8000/api/rooms
```

#### 2e. Get Messages from a Room
```bash
curl http://localhost:8000/api/rooms/1/messages
```

---

### Step 3: Test Real-time Chat (Socket.IO)

#### Using WebSocket Client (Browser Console or Node.js)

**Browser Console Example:**
```javascript
// 1. Connect to server
const socket = io('http://localhost:8000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

// 2. Handle connection
socket.on('connect', () => {
  console.log('Connected:', socket.id);
  
  // 3. Authenticate with token
  socket.emit('auth', {
    token: 'YOUR_JWT_TOKEN_HERE'
  });
});

// 4. Handle auth success
socket.on('auth_success', (data) => {
  console.log('Authenticated as:', data.email);
  
  // Join a room
  socket.emit('join', { room_id: 1 });
});

// 5. Listen for new messages
socket.on('new_message', (msg) => {
  console.log(`${msg.user_name}: ${msg.content}`);
});

// 6. Send a message
socket.emit('message', {
  room_id: 1,
  content: 'Hello from Socket.IO!'
});

// 7. Trigger AI response
socket.emit('message', {
  room_id: 1,
  content: '@ai What is JavaScript?'
});
```

#### Using Python Test Client

```python
import socketio
import json

# Create client
sio = socketio.Client()

@sio.event
def connect():
    print('Connected to server')
    # Authenticate
    sio.emit('auth', {'token': 'YOUR_JWT_TOKEN'})

@sio.event
def auth_success(data):
    print(f'Authenticated as {data["email"]}')
    sio.emit('join', {'room_id': 1})

@sio.on('new_message')
def on_message(data):
    print(f'[{data["user_name"]}] {data["content"]}')

@sio.event
def auth_error(data):
    print(f'Auth failed: {data["detail"]}')

# Connect to server
sio.connect('http://localhost:8000')

# Send a message
sio.emit('message', {'room_id': 1, 'content': 'Hello!'})

# Send AI request
sio.emit('message', {'room_id': 1, 'content': '@ai How does React work?'})

# Keep connection alive
sio.wait()
```

---

## 📊 Expected Behavior

### Successful Authentication Flow
```
1. User logs in → receives JWT token
2. Client connects to Socket.IO
3. Client sends JWT via 'auth' event
4. Backend validates token
5. Backend responds with 'auth_success'
6. User can now join rooms and send messages
```

### Message Broadcasting
```
1. User sends message with @ai mention
2. Backend saves user message to DB
3. Backend broadcasts user message to room
4. Backend detects @ai trigger
5. Backend fetches chat history
6. Backend calls Gemini API
7. Backend saves AI response to DB
8. Backend broadcasts AI response to all users in room
```

### Error Handling
```
- No token: "Authorization header missing"
- Invalid token: "Invalid or expired token"
- No auth before messaging: "Authenticate first"
- Missing fields: "Missing content or room_id"
```

---

## 🔍 API Documentation (Auto-generated)

Visit these URLs while server is running:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## 🐛 Troubleshooting

### Issue: "GEMINI_API_KEY not found"
**Solution:** Add your Google API key to `.env` file
```bash
GEMINI_API_KEY=your-actual-key-here
```

### Issue: "Email already registered"
**Solution:** Either use a different email or delete the database
```bash
rm dev_chat.db
python seed.py
```

### Issue: "Invalid token"
**Possible causes:**
- Token expired (24h validity)
- Token format incorrect (should include "Bearer " prefix)
- Token was tampered with

**Solution:** Get a fresh token by logging in again

### Issue: Socket.IO connection refused
**Possible causes:**
- Server not running
- Wrong URL or port

**Solution:** Verify server is running on http://localhost:8000

---

## 📝 Test User Credentials

Use these in your tests:

| Email | Password | Workspace |
|-------|----------|-----------|
| test@example.com | password123 | General |
| alice@example.com | password123 | General |
| bob@example.com | password123 | General |
| carol@example.com | password123 | DevOps |
| david@example.com | password123 | Frontend |
| eve@example.com | password123 | General |

---

## ✨ Next Integration Points

The backend is ready for frontend integration. Make sure frontend:

1. **Auth Flow:**
   - Call `POST /api/auth/register` to create account
   - Call `POST /api/auth/login` to get token
   - Store token in localStorage
   - Use token in all API calls

2. **Rooms List:**
   - Call `GET /api/rooms` to fetch available rooms
   - Display rooms in sidebar

3. **Chat:**
   - Connect to Socket.IO with token
   - Join room via `emit('join', { room_id })`
   - Listen for `new_message` events
   - Send messages via `emit('message', { room_id, content })`

4. **User Profile:**
   - Call `GET /api/auth/me` with token to get user info
   - Display in profile section

---

## 📞 Support

For detailed API documentation, see: `backend/README.md`

