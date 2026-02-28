# Backend & Frontend Integration Guide

## 🎯 Overview

The frontend is now fully integrated with the backend:
- ✅ Authentication (login/register)
- ✅ Real-time chat via Socket.IO
- ✅ Room browsing and message fetching
- ✅ Protected routes
- ✅ User session management

---

## 🚀 Quick Start (Both Backend & Frontend)

### Terminal 1: Start Backend

```bash
cd backend

# Copy env template
cp .env.example .env

# Install dependencies
pip install -r requirements.txt

# Seed database with test data
python seed.py

# Start server (port 8000)
uvicorn main:socket_app --reload
```

Expected output:
```
✅ Database seeded successfully!
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Terminal 2: Start Frontend

```bash
# Root of project
npm install

# Start dev server (port 5173)
npm run dev
```

Expected output:
```
  VITE v7.3.1  ready in 123 ms

  ➜  Local:   http://localhost:5173/
```

---

## 📋 Test Flow

### Step 1: Open Frontend
Open `http://localhost:5173` in your browser.

### Step 2: Login or Register
Click **"Get Started"** button on landing page.

**Test Credentials:**
- Email: `test@example.com`
- Password: `password123`

Or register with new credentials.

### Step 3: View Dashboard
After login, you'll see all available rooms.

### Step 4: Join a Room
Click any room card to enter the chat.

### Step 5: Send a Message
Type a message and press Enter or click Send button.

### Step 6: Trigger AI Response
Type a message containing `@ai` to trigger AI response:
```
@ai explain what REST API is
```

You should see AI response appear after a few seconds.

---

## 🔌 How It Works

### Authentication Flow

```
Landing Page
    ↓
Click "Get Started"
    ↓
Sign In / Register Modal
    ↓
POST /api/auth/login or /api/auth/register
    ↓
Receive JWT token
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
    ↓
Connect Socket.IO with token
```

### Real-time Chat Flow

```
User types message in ChatRoom
    ↓
Press Enter
    ↓
Frontend: socket.emit('message', {room_id, content})
    ↓
Backend: Receives message event
    ↓
Backend: Verifies authentication
    ↓
Backend: Saves message to database
    ↓
Backend: Broadcasts to room
    ↓
All connected users receive 'new_message' event
    ↓
Frontend: Updates UI with new message
    ↓
If @ai mentioned:
    ├─ Backend fetches context (last 10 messages)
    ├─ Calls Google Gemini API
    ├─ Saves AI response to DB
    └─ Broadcasts AI message to room
```

---

## 📚 Frontend File Structure

```
src/
├── services/
│   ├── api.js           ← API calls to backend
│   └── socket.js        ← Socket.IO client
├── contexts/
│   ├── AuthContext.jsx  ← User auth state
│   └── RoomContext.jsx  ← Rooms & messages state
├── pages/
│   ├── Landing.jsx      ← Auth modal & landing
│   ├── Dashboard.jsx    ← Room list (from backend)
│   ├── ChatRoom.jsx     ← Real-time chat
│   └── ...
└── components/
    ├── RoomCard.jsx     ← Room card with navigation
    ├── MessageBubble.jsx
    ├── Navbar.jsx
    └── ...
```

---

## 🔑 Key Components

### AuthContext

Manages authentication state globally:
```javascript
const { user, isAuthenticated, login, logout, loading } = useAuth();
```

Features:
- Auto-login on refresh if token exists
- Socket.IO connection on auth
- Token storage in localStorage
- Loading states

### RoomContext

Manages rooms and messages:
```javascript
const { rooms, currentRoom, messages, joinRoom, sendMessage } = useRoom();
```

Features:
- Fetch all rooms from backend
- Join room and load messages
- Real-time message updates via Socket.IO
- Socket.IO message listener

### API Service

Centralized API calls:
```javascript
import { authAPI, roomAPI } from '@/services/api';

await authAPI.login(email, password);
await roomAPI.listRooms();
```

Features:
- Automatic token injection
- Error handling
- Bearer token support

### Socket Service

Manages Socket.IO connection:
```javascript
import { socketService } from '@/services/socket';

socketService.connect();
socketService.joinRoom(roomId);
socketService.sendMessage(roomId, content);
socketService.on('new_message', callback);
```

Features:
- Auto-authenticate on connect
- Event subscription system
- Automatic reconnection
- Token-based auth

---

## 🌐 API Endpoints Used

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get token
- `GET /api/auth/me` - Get current user

### Rooms
- `GET /api/rooms` - List all rooms
- `GET /api/rooms/{id}/messages` - Get room messages

### Socket.IO Events
- `auth` - Authenticate connection
- `join` - Join a room
- `message` - Send message
- `new_message` (receive) - New message in room

---

## 🧪 Testing Checklist

### Authentication ✓
- [ ] Can view landing page
- [ ] Can click "Get Started"
- [ ] Can login with test@example.com
- [ ] Can register new account
- [ ] Token stored in localStorage
- [ ] Navbar shows user name
- [ ] Can logout
- [ ] Protected routes redirect to login

### Rooms ✓
- [ ] Dashboard shows all rooms
- [ ] Can search/filter rooms
- [ ] Can click room to enter chat
- [ ] Room name and topic displayed
- [ ] Member count shown

### Chat ✓
- [ ] Messages display in order
- [ ] Can type message
- [ ] Can send message (Enter key)
- [ ] Message appears immediately
- [ ] Messages show user name and timestamp
- [ ] Scroll to bottom on new message
- [ ] Input clears after send

### AI ✓
- [ ] Type message with @ai
- [ ] AI response appears after few seconds
- [ ] AI message marked as "AI Assistant"
- [ ] AI message has different styling

### Socket.IO ✓
- [ ] WebSocket connects on dashboard load
- [ ] Can join room
- [ ] Can send message in real-time
- [ ] Receives messages from backend

---

## 🐛 Debugging

### Check Backend is Running
```bash
curl http://localhost:8000/docs
```
Should show Swagger UI.

### Check Socket.IO Connection
Open browser DevTools → Network tab
Look for WebSocket connection to `localhost:8000/socket.io/`

### Check Token in localStorage
DevTools → Application → Local Storage
Should have `token` key with JWT value

### Check API Calls
DevTools → Network tab
Should see `POST /api/auth/login` and `GET /api/rooms`

### Enable Debug Logging
In `services/api.js` and `services/socket.js` - uncomment `console.log()` statements

---

## 📝 Common Issues

### Issue: "Cannot connect to backend"
```
Error: Failed to fetch
```
**Solution:** Make sure backend is running on port 8000
```bash
cd backend
uvicorn main:socket_app --reload
```

### Issue: "404 Not Found"
```
API Error: /api/auth/login
```
**Solution:** Ensure backend port is correct in `.env.local`
```
VITE_API_URL=http://localhost:8000
```

### Issue: "422 Unprocessable Entity"
```
API Error: /api/auth/login Error: ...
```
Occurs when the login request body doesn't match the expected schema. The frontend should send only `{ email, password }` (no `name` or other fields). If you see a JSON array of validation errors in the console, check your request payload or backend schema.

**Solution:** Use correct credentials structure and/or restart backend after schema changes.

### Issue: "500 Internal Server Error" on login
```
POST /api/auth/login HTTP/1.1" 500 Internal Server Error
```
This can happen if the backend code accidentally shadowed the imported `auth` module (e.g. by defining a socket event handler named `auth`). The resulting exception (see server traceback) means login logic failed before returning a response, causing CORS headers to be dropped.

**Solution:** Restart the backend after fixing the server (rename conflicting function or alias the import); the login endpoint should then return a 200/401 with proper headers.

### Issue: "message is undefined" or React crash in chat room
```
Uncaught TypeError: can't access property "user", message is undefined
```
Occurs when the UI components expect a `message` object but receive props like `user`/`text` separately (or vice versa), often after a refactor. It can also surface if an undefined value sneaks into the messages array.

**Solution:** Ensure messages are normalized before rendering and components accept the correct props. In the current code the `RoomContext` maps backend/socket payloads into `{ user, text, timestamp, isAI, ... }` and `MessageBubble` uses those fields. Clearing localStorage or reloading the page won't help if shape mismatch persists; restart the dev server after updating components.

### Issue: "Socket not connected"
```
Socket error: Socket not connected
```
**Solution:** Login first (Socket connects after auth)

### Issue: "Invalid token"
```
auth_error: Invalid token
```
**Solution:** Clear localStorage and login again
```javascript
localStorage.clear();
```

### Issue: "CORS error"
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** This shouldn't happen - backend has CORS enabled. Check backend is running.

---

## 📊 Testing Multi-User Chat

### Setup 2 Browser Windows
1. **Window 1:** Login as `test@example.com`
2. **Window 2:** Login as `alice@example.com` (or register new user)
3. Both join same room
4. Send message in Window 1
5. Should appear instantly in Window 2

---

## 🔄 Data Flow Diagram

```
Frontend                          Backend
├─ Landing Page                   
│  └─ Click "Get Started"         
│     └─ AuthModal                
│        └─ POST /auth/login ────→ JWT Token
│                                  ↓
├─ Dashboard (Protected)           Store token
│  └─ GET /api/rooms ────────────→ Return rooms
│     ↓                            
│  RoomCard list ←─────────────────
│     │
│     └─ Click room
│        └─ ChatRoom Page
│           ├─ JOIN via Socket ──→ auth event
│           │                      ↓
│           │                     Verify token
│           │                     Join Socket room
│           │                     
│           ├─ GET /rooms/{}/msgs→ Load history
│           │                      ↓
│           │  Messages ←─────────
│           │
│           └─ Send message
│              └─ socket.emit() ──→ Save to DB
│                 ↓                 ↓
│              new_message ←─ Broadcast to room
│              event             
```

---

## 📚 Architecture

### Frontend Stack
- **Framework:** React 19
- **HTTP Client:** Fetch API
- **Real-time:** Socket.IO
- **State:** React Context
- **Routing:** React Router 7
- **UI:** CSS-in-JS styles
- **Animation:** Framer Motion

### Backend Stack
- **Framework:** FastAPI
- **Real-time:** Python-SocketIO
- **Database:** SQLite
- **Auth:** JWT
- **AI:** Google Gemini API

### Integration Points
1. **HTTP REST API** for crud operations
2. **Socket.IO WebSocket** for real-time chat
3. **JWT Tokens** for authentication
4. **LocalStorage** for client-side token persistence

---

## 🎓 Next Steps

### To Extend Frontend
1. Add message reactions
2. Add typing indicators
3. Add user presence
4. Add message search
5. Implement room creation form

### To Extend Backend
1. Add more AI commands
2. Implement message threading
3. Add user profiles
4. Add room permissions
5. Add activity logging

---

## ✅ Integration Checklist

Before considering this complete:

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Can login with test@example.com / password123
- [ ] Dashboard shows rooms from database
- [ ] Can join a room
- [ ] Can send messages
- [ ] Messages appear in real-time
- [ ] Can trigger @ai message
- [ ] AI response appears
- [ ] Can logout
- [ ] Protected routes work
- [ ] Socket.IO WebSocket connected
- [ ] Token in localStorage

---

## 📞 Support

**Backend Issues:** See `backend/README.md`
**Frontend Issues:** Check browser DevTools
**Integration Issues:** This file

For detailed testing: See `BACKEND_TESTING.md`

