# Quick Setup Reference

## 🚀 Start the Application (2 Commands)

### Terminal 1: Backend
```bash
cd backend
source venv/bin/activate  # Activate Python venv first
uvicorn main:socket_app --reload
```
✅ Backend runs on `http://localhost:8000`

### Terminal 2: Frontend
```bash
# From root directory
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

---

## 🔑 Test Credentials

Use any of these to log in:

```
email: test@example.com
password: password123
```

Or these other test accounts:
```
bob@example.com / password123
carol@example.com / password123
dave@example.com / password123
eve@example.com / password123
frank@example.com / password123
```

---

## 📁 Key Files Quick Reference

### Backend 
| File | Purpose |
|------|---------|
| `backend/main.py` | FastAPI server, Socket.IO, routes |
| `backend/auth.py` | JWT generation, password hashing |
| `backend/database.py` | SQLAlchemy models (User, Room, Message) |
| `backend/ai_service.py` | Google Gemini AI integration |
| `backend/seed.py` | Creates test data |
| `backend/.env` | Secret key, API keys (CREATE FROM .env.example) |

### Frontend
| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routes and context providers |
| `src/pages/Landing.jsx` | Login/register with AuthModal |
| `src/pages/Dashboard.jsx` | Room list from backend API |
| `src/pages/ChatRoom.jsx` | Real-time chat with Socket.IO |
| `src/services/api.js` | HTTP client with token injection |
| `src/services/socket.js` | Socket.IO client wrapper |
| `src/contexts/AuthContext.jsx` | Global auth state (useAuth hook) |
| `src/contexts/RoomContext.jsx` | Global room/message state (useRoom hook) |
| `.env.local` | API URL configuration |

---

## 🔗 API Endpoints

### Auth
```
POST   /api/auth/register  {name, email, password, workspace_id}
POST   /api/auth/login     {email, password}
GET    /api/auth/me        [protected] - current user
```

### Rooms
```
GET    /api/rooms          [protected] - list all rooms
GET    /api/rooms/{id}/messages [protected] - get room messages
```

### WebSocket (Socket.IO)
```
Client → Server:
  auth {token}           - Authenticate connection
  join {room_id}         - Join a room [protected]
  message {content}      - Send message [protected]

Server → Client:
  auth_success           - Auth successful
  auth_error             - Auth failed
  new_message {data}     - New message received
  error {message}        - Error occurred
```

---

## 🧪 Quick Test Flow

1. **Open http://localhost:5173** in browser
2. **Click "Get Started"** button
3. **Enter login credentials** (test@example.com / password123)
4. **View dashboard** with room list from backend
5. **Click a room** to join and see message history
6. **Type a message** and press Send
   - Message appears instantly (Socket.IO)
   - Appears for other users in real-time
7. **Type "@ai" in message** to trigger AI response
   - AI Assistant replies with generated content
8. **Click user avatar** in navbar for profile/logout menu

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Ensure virtual environment is active
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Check port 8000 is free
lsof -i :8000  # If in use, kill it: kill -9 <PID>
```

### Frontend won't start
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port 5173 is free
lsof -i :5173  # If in use, use: npm run dev -- --port 5174
```

### Can't connect to backend
- ✅ Verify backend is running: http://localhost:8000/docs
- ✅ Check `.env.local` has `VITE_API_URL=http://localhost:8000`
- ✅ Check browser console (F12) for CORS errors

### Messages not appearing
- ✅ Verify Socket.IO is connected (DevTools → Network → filter "socket.io")
- ✅ Check both servers are running
- ✅ Refresh page to reconnect
- ✅ Check browser console for WebSocket errors

### AI not responding
- ✅ Add `GEMINI_API_KEY=your-key` to `backend/.env`
- ✅ Message must contain "@ai" text
- ✅ Check backend logs for API errors

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────┐
│  React Frontend (Port 5173)         │
│  - AuthContext, RoomContext         │
│  - Pages: Landing, Dashboard, Chat  │
│  - Components: Navbar, Messages     │
└────────────┬────────────────────────┘
             │ HTTP REST + WebSocket
             │
┌────────────▼────────────────────────┐
│  FastAPI + Socket.IO (Port 8000)    │
│  - JWT Authentication               │
│  - Room Management                  │
│  - Message Broadcasting             │
│  - AI Integration (Gemini)          │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│  SQLite Database (dev_chat.db)      │
│  - Users, Workspaces, Rooms         │
│  - Messages, Timestamps             │
└─────────────────────────────────────┘
```

---

## 🎯 Key Implementation Details

### Authentication Flow
1. User enters email/password on Landing page
2. Frontend calls `POST /api/auth/login`
3. Backend validates credentials, returns JWT token
4. Frontend stores token in `localStorage` 
5. Socket.IO connects and sends `auth {token}` event
6. Backend verifies token, marks connection as authenticated
7. Frontend can now access protected routes and Socket.IO events

### Real-time Messaging Flow
1. User joins room: Socket.IO `join {room_id}` event
2. Frontend fetches room message history: `GET /api/rooms/{id}/messages`
3. User types and sends message: Socket.IO `message {content}` event
4. Backend broadcasts to all connected clients in that room
5. All clients receive `new_message` event with full message data
6. Frontend updates local state, message appears instantly

### AI Response Flow
1. Message contains "@ai" trigger text
2. Backend detects AI trigger during message broadcast
3. Extracts last 5 messages as context
4. Calls Google Gemini API with context
5. Receives AI response
6. Creates new message object with "AI Assistant" as sender
7. Broadcasts AI message via Socket.IO `new_message` event
8. All clients see AI response in real-time

---

## ⚙️ Environment Variables

### Backend (.env from .env.example)
```
SECRET_KEY=your-super-secret-key-for-mvp-change-this
GEMINI_API_KEY=your-google-api-key-here  [OPTIONAL]
```

### Frontend (.env.local from .env.example)
```
VITE_API_URL=http://localhost:8000
```

---

## 📚 Full Documentation

| Document | Purpose |
|----------|---------|
| [GETTING_STARTED.md](GETTING_STARTED.md) | Complete setup guide with all options |
| [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) | Detailed integration walkthrough |
| [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md) | Full-stack architecture & features |
| [BACKEND_TESTING.md](BACKEND_TESTING.md) | Backend testing with curl/WebSocket |
| [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) | Backend design & authentication flows |
| [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) | Feature completion checklist |

---

## 💡 Pro Tips

- **Debug DB**: Open `dev_chat.db` in SQLite viewer to inspect data
- **API Docs**: Visit `http://localhost:8000/docs` for interactive API documentation
- **Socket.IO Monitor**: Use browser DevTools Network tab to watch WebSocket messages
- **React DevTools**: Install React DevTools extension to inspect context state
- **Test Multiple Users**: Open app in incognito windows to test real-time messaging between different users
- **Code Formatting**: Project doesn't have linter, but use VS Code Prettier extension for consistency

---

## 🚨 Known Limitations

- 🟡 Uses SQLite (not suitable for production with multiple servers)
- 🟡 No rate limiting yet (add before production)
- 🟡 Messages stored in DB (implement message TTL/archival for large scale)
- 🟡 Single server instance (horizontal scaling requires different setup)
- 🟡 No message encryption (add TLS for sensitive data)

---

## 🎬 What's Next?

1. ✅ Run both servers
2. ✅ Test full authentication flow
3. ✅ Verify real-time chat works
4. ✅ Test AI responses
5. 🔄 Consider adding:
   - Create room UI
   - User search
   - Typing indicators
   - Message reactions
   - Persistent typing state

---

**Last Updated:** Implementation Complete - Ready for Testing
**Status:** 🟢 MVP Ready
