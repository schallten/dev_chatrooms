# Backend Quick Reference Card

## 🚀 Quick Start (30 seconds)

```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
python seed.py
uvicorn main:socket_app --reload
```

**Server running at:** `http://localhost:8000`

---

## 📚 Key URLs

| Purpose | URL |
|---------|-----|
| **API Docs** | http://localhost:8000/docs |
| **ReDoc** | http://localhost:8000/redoc |
| **Login Endpoint** | http://localhost:8000/api/auth/login |

---

## 👥 Test Users

```
Email: test@example.com
Password: password123

(5 more test users available - see BACKEND_TESTING.md)
```

---

## 🔗 HTTP API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me           [Requires Authorization header]
```

### Data
```
GET    /api/rooms
GET    /api/rooms/{room_id}/messages
```

---

## 🔌 Socket.IO Events

### Required Events
```javascript
// 1. Connect (automatic)
socket.connect()

// 2. Authenticate (REQUIRED before other events)
socket.emit('auth', { token: 'YOUR_JWT_TOKEN' })

// Listen for auth response
socket.on('auth_success', (data) => {})
socket.on('auth_error', (err) => {})
```

### Room Events
```javascript
// Join a room
socket.emit('join', { room_id: 1 })

// Send message (triggers @ai if mentioned)
socket.emit('message', { 
  room_id: 1, 
  content: 'Your message here' 
})

// Listen for messages
socket.on('new_message', (data) => {
  console.log(data.user_name, ':', data.content)
})
```

---

## 📍 Message Formats

### Send Message
```json
{
  "room_id": 1,
  "content": "Hello world"
}
```

### Receive Message
```json
{
  "id": 42,
  "content": "Hello world",
  "room_id": 1,
  "user_id": 7,
  "user_name": "John Doe",
  "is_ai": false,
  "timestamp": "2026-02-28T10:30:45.123456"
}
```

### AI Message (Auto-generated on @ai)
```json
{
  "id": 43,
  "content": "Response from Gemini...",
  "room_id": 1,
  "user_id": null,
  "user_name": "AI Assistant",
  "is_ai": true,
  "timestamp": "2026-02-28T10:31:02.654321"
}
```

---

## 🔑 Working with Tokens

### Get Token (Login)
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

Returns:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Use Token (Copy full token, no "Bearer" prefix needed for Socket.IO)
```javascript
// HTTP (includes "Bearer " prefix)
fetch('/api/auth/me', {
  headers: { 'Authorization': 'Bearer ' + token }
})

// Socket.IO (just the token)
socket.emit('auth', { token: token })
```

---

## ⚡ Important Notes

### Authentication Required
✅ `auth` event MUST be emitted before:
- `join` event
- `message` event

### AI Trigger
✅ Include `@ai` in message to trigger AI response
```javascript
socket.emit('message', { 
  room_id: 1, 
  content: '@ai explain React hooks' 
})
```

### Token Validity
✅ Tokens valid for 24 hours
✅ Get new token by logging in again
✅ Include "Bearer " prefix for HTTP but NOT Socket.IO

### Database
✅ SQLite (dev_chat.db)
✅ Auto-created on first run
✅ Delete and re-seed to reset: `rm dev_chat.db && python seed.py`

---

## 🐛 Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Authenticate first" | Not authenticated on Socket.IO | Emit `auth` event with token |
| "Invalid token" | Token expired or malformed | Login again to get fresh token |
| "Auth required" | Missing Authorization header | Add header: `Authorization: Bearer TOKEN` |
| "Email already registered" | User exists | Use different email or delete DB |
| "GEMINI_API_KEY not found" | Missing .env | Add `GEMINI_API_KEY=...` to .env |

---

## 🧪 Testing Commands

### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "newuser@example.com", 
    "password": "password123",
    "workspace_id": 1
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Get Me (requires token)
```bash
curl http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### List Rooms
```bash
curl http://localhost:8000/api/rooms
```

### Get Messages
```bash
curl http://localhost:8000/api/rooms/1/messages
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app & Socket.IO routes |
| `auth.py` | JWT & password functions |
| `database.py` | SQLAlchemy models |
| `seed.py` | Create test data |
| `.env` | Environment variables (create from .env.example) |

---

## 🚦 Architecture Overview

```
Frontend ←→ HTTP API (FastAPI)
         ←→ WebSocket (Socket.IO)
            ↓
         SQLite DB
            ↓
         Google Gemini API
```

---

## 📞 Additional Resources

- **Full Setup Guide:** `backend/README.md`
- **Testing Guide:** `BACKEND_TESTING.md`
- **Architecture Diagram:** `BACKEND_ARCHITECTURE.md`
- **Implementation Summary:** `BACKEND_SUMMARY.md`
- **API Auto-docs:** http://localhost:8000/docs

---

## ✨ What's Ready

✅ User authentication (register, login, get user)
✅ Real-time chat with Socket.IO
✅ AI responses with @ai trigger
✅ Mock data for testing
✅ Complete API documentation
✅ Security with JWT & bcrypt

---

## 🎯 Next: Frontend Integration

The backend is **ready for frontend connection**. Frontend needs to:

1. **Login Flow** → Get token from `/api/auth/login`
2. **Connect Socket** → Connect to WebSocket and emit `auth` with token
3. **List Rooms** → Fetch from `/api/rooms`
4. **Chat Operations** → Use Socket.IO events for real-time messaging

**All endpoints and events documented in backend/README.md**

