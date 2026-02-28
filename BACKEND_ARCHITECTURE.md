# Backend Architecture & Authentication Flow

## 🏗️ System Architecture

```
Frontend (React)
    ↓
   HTTP Requests              WebSocket Connection
    ↓                              ↓
┌─────────────────────────────────────────────┐
│         FastAPI + Socket.IO Server          │
│                                             │
│  REST Routes:                               │
│  ├─ /api/auth/register                      │
│  ├─ /api/auth/login                         │
│  ├─ /api/auth/me                           │
│  ├─ /api/rooms                              │
│  └─ /api/rooms/{id}/messages                │
│                                             │
│  Socket.IO Events:                          │
│  ├─ connect  →  connect                     │
│  ├─ auth     →  auth_success|error          │
│  ├─ join     →  (room subscription)         │
│  └─ message  →  new_message (broadcast)     │
└─────────────────────────────────────────────┘
    ↓                                  ↓
    └────────────────────────────────┬────────────────────────┐
                                     ↓                        ↓
                              SQLite Database          Google Gemini API
                                (dev_chat.db)          (AI Responses)
                              - Users
                              - Workspaces
                              - Rooms
                              - Messages
```

---

## 🔐 Authentication Flow (HTTP)

### Step 1: Register
```
Client: POST /api/auth/register
{
  "name": "John",
  "email": "john@example.com",
  "password": "secret123",
  "workspace_id": 1
}
    ↓
Server: Hash password with bcrypt
Server: Create user in database
    ↓
Response: 200 OK
{
  "id": 7,
  "name": "John",
  "email": "john@example.com",
  "workspace_id": 1
}
```

### Step 2: Login
```
Client: POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secret123"
}
    ↓
Server: Query user by email
Server: Verify password hash
    ↓
Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Step 3: Use Token
```
Client: Stores token in localStorage
Client: GET /api/auth/me
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    ↓
Server: Extract token from header
Server: Verify JWT signature
Server: Check token expiration
Server: Query user by email from token
    ↓
Response: 200 OK
{
  "id": 7,
  "name": "John",
  "email": "john@example.com",
  "workspace_id": 1
}
```

---

## 🚀 Socket.IO Authentication Flow (WebSocket)

### Complete Real-time Chat Flow

```
1. CONNECT
   Client                          Server
   └─ io('http://localhost:8000')
                                   ├─ Accept connection
                                   ├─ Generate session ID (sid)
                                   └─ Emit: "ready for auth"

2. AUTHENTICATE
   Client                          Server
   └─ emit('auth', {
      token: 'eyJhbGci...'
     })
                                   ├─ Receive 'auth' event
                                   ├─ Extract & verify JWT
                                   ├─ Query user by email
                                   ├─ Store in user_sessions[sid]
                                   └─ emit('auth_success', {
                                      user_id: 7,
                                      email: 'john@example.com'
                                     })

3. JOIN ROOM
   Client                          Server
   └─ emit('join', {
      room_id: 1
     })
                                   ├─ Check: sid in user_sessions?
                                   ├─ YES → enter_room(sid, '1')
                                   └─ NO → emit('error', {
                                      detail: 'Authenticate first'
                                     })

4. SEND MESSAGE
   Client                          Server
   └─ emit('message', {
      room_id: 1,
      content: 'Hello World'
     })
                                   ├─ Check: sid in user_sessions?
                                   ├─ Extract user_id from session
                                   ├─ Save to database
                                   ├─ Broadcast to room:
                                   │  emit('new_message', {
                                   │    id: 42,
                                   │    content: 'Hello World',
                                   │    user_name: 'John',
                                   │    is_ai: false,
                                   │    timestamp: '2026-02-28T...'
                                   │  })
                                   └─ Check for @ai trigger

5. AI TRIGGER (@ai mention)
   Message Content                 Server
   "@ai how does react work?"
                                   ├─ Detect @ai in content
                                   ├─ Fetch last 10 messages
                                   ├─ Send to Gemini API
                                   ├─ Receive AI response
                                   ├─ Save to database
                                   └─ Broadcast to room:
                                      emit('new_message', {
                                        id: 43,
                                        content: 'React is...',
                                        user_name: 'AI Assistant',
                                        is_ai: true,
                                        timestamp: '2026-02-28T...'
                                      })

6. DISCONNECT
   Client: Close connection         Server
                                   ├─ Trigger disconnect event
                                   ├─ Delete from user_sessions[sid]
                                   └─ Clean up resources
```

---

## 🔄 Token Lifecycle

```
Login @ 10:00 AM (Day 1)
├─ Generate JWT token
├─ Set expiration: 24 hours later
└─ Token valid until 10:00 AM (Day 2)

During Valid Period (10:00 AM Day 1 → 10:00 AM Day 2)
├─ Can use token in HTTP Authorization header
├─ Can authenticate Socket.IO connection
└─ All requests succeed

After Expiration (10:00 AM Day 2 onwards)
├─ Token verification fails
├─ JWT decode raises exception
├─ verify_token() returns None
├─ HTTP requests get 401 Unauthorized
├─ Socket.IO auth gets auth_error event
└─ User must login again to get new token
```

---

## 🎯 Error Handling Flow

```
SCENARIO: User tries to send message without authentication

Client: emit('message', {room_id: 1, content: 'hi'})
        ↓
Server: Check if sid in user_sessions
        ├─ sid NOT found
        └─ Emit back to client:
           emit('error', {detail: 'Authenticate first'})
        ↓
Client: socket.on('error', (data) => {
          console.error(data.detail)  // "Authenticate first"
        })
```

```
SCENARIO: Invalid authentication token

Client: emit('auth', {token: 'invalid-token'})
        ↓
Server: Call verify_token('invalid-token')
        ├─ Try to decode JWT
        ├─ JWT decode fails (invalid signature)
        ├─ decode_access_token() catches exception
        ├─ Returns None
        └─ Emit back:
           emit('auth_error', {detail: 'Invalid token'})
        ↓
Client: socket.on('auth_error', (data) => {
          console.error('Auth failed:', data.detail)
        })
```

---

## 🔑 Key Components

### 1. JWT Token Structure
```
Header:     {
              "alg": "HS256",
              "typ": "JWT"
            }

Payload:    {
              "sub": "john@example.com",  ← email
              "exp": 1740735600,          ← expiration timestamp
              "iat": 1740649200           ← issued at timestamp
            }

Signature:  HMACSHA256(
              base64(header) + "." + base64(payload),
              "your-super-secret-key-for-mvp"
            )

Full Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwi...
            eDdwbEJhd0F3UUhoaElsdlZaYXc
```

### 2. User Sessions Dictionary
```python
user_sessions = {
  '123abc': {
    'user_id': 7,
    'email': 'john@example.com'
  },
  '456def': {
    'user_id': 3,
    'email': 'alice@example.com'
  }
}

# Key = Socket.IO session ID (sid)
# Value = User info for authenticated session
# Cleaned up on disconnect
```

### 3. Database User Record
```python
User {
  id: 7,
  name: "John Doe",
  email: "john@example.com",
  password_hash: "$2b$12$...",  ← bcrypt hash, never store plain password
  workspace_id: 1
}
```

---

## 📊 Message Broadcasting Architecture

```
User A sends message in Room 1
│
Server saves to DB
│
Server emits 'new_message' to all sockets in room '1'
│
├─ User A (same room) receives it
├─ User B (same room) receives it
├─ User C (same room) receives it
└─ User D (different room) does NOT receive it
   (Socket.IO handles room filtering)
```

---

## ✅ Security Checklist

#### Present ✅
- [x] Password hashing (bcrypt)
- [x] JWT with expiration
- [x] Token signature verification
- [x] Authentication required for Socket.IO
- [x] Authorization checks on operations

#### MVP Gaps ⚠️
- [ ] HTTPS/WSS (use in production)
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] CORS whitelist (currently "*")
- [ ] Refresh token mechanism

---

## 🎓 Learning Resources

**File References:**
- Auth logic: `backend/auth.py`
- REST routes: `backend/main.py` (lines 50-90)
- Socket.IO events: `backend/main.py` (lines 105-210)
- Dependency injection: `backend/main.py` (lines 31-47)

**Concepts:**
- JWT: https://jwt.io/introduction
- Bcrypt: https://en.wikipedia.org/wiki/Bcrypt
- FastAPI Security: https://fastapi.tiangolo.com/advanced/security/
- Socket.IO Auth: https://python-socketio.readthedocs.io/en/latest/

