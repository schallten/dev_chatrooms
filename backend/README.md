# AI-Powered Dev Chat Rooms - Backend

A Python/FastAPI backend for real-time chat rooms with AI assistance using Gemini.

## 🚀 Quick Start

### 1. Setup Python Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
# Or use the pyproject.toml
pip install -e .
```

### 3. Create `.env` File

```bash
# .env
SECRET_KEY=your-super-secret-key-for-mvp-change-this
GEMINI_API_KEY=your-google-api-key-here
```

**Get GEMINI_API_KEY:**
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add it to `.env`

### 4. Seed Database

```bash
python backend/seed.py
```

This creates:
- 3 workspaces (General, DevOps, Frontend)
- 6 test users
- 11 rooms with topic discussions
- Sample messages with timestamps

**Test Users:**
- `test@example.com` / `password123`
- `alice@example.com` / `password123`
- `bob@example.com` / `password123`
- `carol@example.com` / `password123`
- `david@example.com` / `password123`
- `eve@example.com` / `password123`

### 5. Run Server

```bash
cd backend
uvicorn main:socket_app --reload --port 8000
```

Server runs at `http://localhost:8000`

---

## 📚 API Documentation

### Auto Documentation
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

### Auth Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "secure_password",
  "workspace_id": 1
}
```

**Response:**
```json
{
  "id": 7,
  "name": "New User",
  "email": "newuser@example.com",
  "workspace_id": 1
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "workspace_id": 1
}
```

### Room Routes

#### Get All Rooms
```http
GET /api/rooms
```

#### Get Room Messages
```http
GET /api/rooms/1/messages
```

Returns last 50 messages in order (oldest to newest).

---

## 🔌 Socket.IO Events

### Client → Server

#### 1. Connect
Default WebSocket connection

#### 2. Authenticate (REQUIRED)
```javascript
socket.emit('auth', {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // JWT from login
})
```

Listen for responses:
```javascript
socket.on('auth_success', (data) => {
  console.log('Authenticated as:', data.email);
})

socket.on('auth_error', (data) => {
  console.error('Auth failed:', data.detail);
})
```

#### 3. Join Room
```javascript
socket.emit('join', {
  room_id: 1
})
```

#### 4. Send Message
```javascript
socket.emit('message', {
  room_id: 1,
  content: 'Hello everyone!'
  // user_id is extracted from authenticated session
})
```

To trigger AI response, mention `@ai`:
```javascript
socket.emit('message', {
  room_id: 1,
  content: '@ai What is React?'
})
```

### Server → Client

#### New Message
```javascript
socket.on('new_message', (data) => {
  console.log(data);
  // Output:
  // {
  //   "id": 42,
  //   "content": "Hello everyone!",
  //   "room_id": 1,
  //   "user_id": 1,
  //   "user_name": "Test User",
  //   "is_ai": false,
  //   "timestamp": "2026-02-28T10:30:45.123456"
  // }
})
```

#### Error
```javascript
socket.on('error', (data) => {
  console.error('Error:', data.detail);
})
```

---

## 🤖 AI Integration

### How It Works
1. User sends message with `@ai` mention
2. Backend fetches last 10 messages from the room as context
3. Sends to Google Gemini API with the user question
4. Broadcasts AI response to the room

### Example
```
User: @ai How do I create a React component?
AI: To create a React component, you can use either class or functional components...
```

---

## 🗄️ Database Schema

### Users
- `id` (primary key)
- `name` (string)
- `email` (unique)
- `password_hash` (hashed with bcrypt)
- `workspace_id` (foreign key)

### Workspaces
- `id` (primary key)
- `name` (string)
- `slug` (unique, URL-friendly)

### Rooms
- `id` (primary key)
- `name` (string)
- `topic` (string)
- `workspace_id` (foreign key)

### Messages
- `id` (primary key)
- `content` (text)
- `is_ai` (boolean)
- `is_code` (boolean)
- `language` (string, for code blocks)
- `user_id` (foreign key, null for AI messages)
- `room_id` (foreign key)
- `timestamp` (datetime)

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "workspace_id": 1
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Rooms
```bash
curl http://localhost:8000/api/rooms
```

---

## 🔐 Security Notes

### MVP Level
- ✅ Password hashing with bcrypt (pbkdf2_sha256)
- ✅ JWT token-based auth
- ✅ Token expiration (24 hours)
- ✅ Socket.IO authentication required before messaging

### Production Checklist
- [ ] Change `SECRET_KEY` from default
- [ ] Use HTTPS/WSS for Socket.IO
- [ ] Implement rate limiting
- [ ] Add CORS whitelist instead of "*"
- [ ] Use environment variables for all secrets
- [ ] Implement refresh token mechanism
- [ ] Add request validation and sanitization
- [ ] Enable database encryption
- [ ] Setup logging and monitoring

---

## 📦 Project Structure

```
backend/
├── main.py           # FastAPI app & Socket.IO routes
├── database.py       # SQLAlchemy models
├── schemas.py        # Pydantic schemas for requests/responses
├── auth.py           # JWT & password utilities
├── ai_service.py     # Gemini AI integration
├── seed.py           # Database seeding script
├── pyproject.toml    # Python dependencies
└── README.md         # This file
```

---

## 🐛 Troubleshooting

### Database Already Exists
```bash
rm dev_chat.db  # Remove old database
python backend/seed.py  # Create fresh
```

### Port Already in Use
```bash
uvicorn main:socket_app --port 8001  # Use different port
```

### Gemini API Key Error
```
Warning: GEMINI_API_KEY not found in environment variables.
```
Solution: Add `GEMINI_API_KEY` to `.env` file

### Socket.IO Connection Fails
- Ensure server is running
- Check that client sends `auth` event first
- Verify token is valid (check expiration)

---

## 📝 Next Steps

- [ ] Add user profiles (avatar, bio, etc.)
- [ ] Implement room member management (invite, leave)
- [ ] Add message reactions and threads
- [ ] Create admin panel for workspace management
- [ ] Add message search functionality
- [ ] Implement presence indicators
- [ ] Add file upload support
- [ ] Create activity notifications

