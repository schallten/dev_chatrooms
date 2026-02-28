# Dev Chatrooms — Real-Time AI-Powered Chat Application

A full-stack web application for team-based real-time chatting with integrated AI assistance. Built with **React** (frontend) and **FastAPI** (backend), featuring instant WebSocket messaging, JWT authentication, and Google Gemini AI integration.

> 🚀 **MVP Status:** Core features complete and ready for testing. See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for quick start.

---

## ✨ Core Features

### 🔐 **Authentication**
- User registration and login with email/password
- JWT token-based session management
- Secure password hashing with bcrypt
- Protected API endpoints and WebSocket events

### 💬 **Real-Time Messaging**
- Instant message delivery via Socket.IO WebSocket
- Message history persistent in SQLite database
- Multi-room support with room-based message organization
- Typing status and online presence indicators (architecture ready)

### 🤖 **AI Integration**
- Google Gemini API integration for intelligent responses
- Trigger AI with "@ai" mention in messages
- Context-aware responses (includes last 5 messages)
- Differentiates AI messages from user messages in UI

### 🏢 **Workspace Management**
- Multiple workspaces per deployment
- Room creation and management
- User roles and permissions (architecture ready)
- Invitation system for joining workspaces (ready for implementation)

### 👥 **User Experience**
- Responsive design for desktop and tablet
- User profiles with customizable names
- Room browsing and quick access
- Message history viewing
- User dropdown menu for profile and logout

---

## 🏗️ Architecture

```
┌──────────────────────────────────────┐
│      React Frontend (Port 5173)      │
│  ├─ Pages: Landing, Dashboard, Chat │
│  ├─ Components: Navbar, Messages     │
│  ├─ Contexts: Auth, Rooms            │
│  └─ Services: API, Socket.IO         │
└────────────┬─────────────────────────┘
             │ HTTP REST + WebSocket
             │
┌────────────▼─────────────────────────┐
│   FastAPI Backend (Port 8000)        │
│  ├─ Routes: Auth, Rooms, Messages    │
│  ├─ Socket.IO: Real-time events     │
│  ├─ AI: Google Gemini integration    │
│  └─ Database: SQLAlchemy ORM         │
└────────────┬─────────────────────────┘
             │
┌────────────▼─────────────────────────┐
│    SQLite Database (dev_chat.db)     │
│  ├─ Users, Workspaces, Rooms         │
│  └─ Messages, Timestamps             │
└──────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (frontend)
- **Python** 3.9+ (backend)
- **Google Gemini API key** (optional, for AI features)

### 1️⃣ Backend Setup (Python)
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env from .env.example
cp .env.example .env
# Add your GEMINI_API_KEY if desired

# Seed database with test data
python seed.py

# Start server (runs on port 8000)
uvicorn main:socket_app --reload
```

### 2️⃣ Frontend Setup (Node.js)
```bash
# From root directory
# Install dependencies
npm install

# Create .env.local from .env.example
cp .env.example .env.local

# Start dev server (runs on port 5173)
npm run dev
```

### 3️⃣ Open the App
Visit **http://localhost:5173** and log in with:
- **Email:** test@example.com
- **Password:** password123

See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for more test users and detailed instructions.

---

## 📁 Project Structure

```
dev_chatrooms/
├── backend/                    # FastAPI server
│   ├── main.py                # Server setup, routes, Socket.IO
│   ├── auth.py                # JWT, password validation
│   ├── database.py            # SQLAlchemy models
│   ├── schemas.py             # Request/response schemas
│   ├── ai_service.py          # Gemini API integration
│   ├── seed.py                # Database seeding
│   ├── requirements.txt        # Python dependencies
│   ├── pyproject.toml          # Python project config
│   ├── .env.example            # Environment template
│   └── README.md               # Backend documentation
│
├── src/                        # React frontend
│   ├── App.jsx                # Main app shell
│   ├── main.jsx               # Entry point
│   ├── pages/
│   │   ├── Landing.jsx        # Login/register
│   │   ├── Dashboard.jsx      # Room list
│   │   ├── ChatRoom.jsx       # Chat interface
│   │   ├── Profile.jsx        # User profile
│   │   ├── AdminPanel.jsx     # Admin controls
│   │   ├── CreateRoom.jsx     # Room creation
│   │   ├── WorkspaceOnboarding.jsx
│   │   ├── Invite.jsx
│   │   └── DesignGuide.jsx
│   ├── components/
│   │   ├── Navbar.jsx         # Top navigation
│   │   ├── MessageBubble.jsx  # Message display
│   │   ├── ChatInput.jsx      # Message input
│   │   ├── RoomCard.jsx       # Room selector
│   │   ├── CodeBlock.jsx      # Code display
│   │   ├── AIResponseCard.jsx # AI message styling
│   │   ├── Sidebar.jsx        # Side navigation
│   │   ├── MockChat.jsx       # Demo chat
│   │   └── CreateRoomModal.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx    # Auth state
│   │   └── RoomContext.jsx    # Room/message state
│   ├── services/
│   │   ├── api.js             # HTTP client
│   │   └── socket.js          # Socket.IO client
│   └── styles/
│       ├── index.css          # Global styles
│       └── design-guide.css   # Component styles
│
├── .env.example                # Frontend env template
├── .gitignore                  # Git ignore rules
├── package.json               # Frontend dependencies
├── vite.config.js             # Frontend build config
├── jsconfig.json              # JS import config
├── LICENSE                    # MIT License
│
├── GETTING_STARTED.md         # Setup instructions
├── QUICK_REFERENCE.md         # Quick lookup guide
├── IMPLEMENTATION_STATUS.md   # Feature checklist
├── INTEGRATION_GUIDE.md       # Integration walkthrough
└── INTEGRATION_SUMMARY.md     # Full-stack overview
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      Register new user
POST   /api/auth/login         Get JWT token
GET    /api/auth/me            Get current user (protected)
```

### Rooms
```
GET    /api/rooms              List all rooms (protected)
GET    /api/rooms/{id}/messages   Get room messages (protected)
POST   /api/rooms/{id}/messages   Post new message (protected)
```

### WebSocket (Socket.IO)
| Event | Direction | Purpose |
|-------|-----------|---------|
| `auth` | Client→Server | Authenticate WebSocket connection |
| `auth_success` | Server→Client | Authentication confirmed |
| `auth_error` | Server→Client | Authentication failed |
| `join` | Client→Server | Join a room |
| `new_message` | Server→Client | Receive new message |
| `message` | Client→Server | Send message |
| `disconnect` | Client→Server | Close connection |

---

## 🧪 Testing

### Quick Test Flow
1. Open http://localhost:5173
2. Log in (test@example.com / password123)
3. View room list on dashboard
4. Click a room to join
5. Send a message and see it appear instantly
6. Include "@ai" in a message to trigger AI response

### Multi-User Testing
Open the app in multiple browser windows/tabs (or different browsers) logged in as different test users:
- test@example.com
- bob@example.com
- carol@example.com
- etc.

Send messages between users to verify real-time delivery.

See [BACKEND_TESTING.md](BACKEND_TESTING.md) for comprehensive testing instructions with curl examples.

---

## 🔑 Key Technologies

### Frontend
- **React** 19 — UI framework
- **React Router** 7 — Client routing
- **Socket.IO Client** — WebSocket communication
- **Vite** — Build tool and dev server
- **Framer Motion** — Animations
- **Fetch API** — HTTP requests

### Backend
- **FastAPI** — Web framework with OpenAPI
- **python-socketio** — WebSocket support
- **SQLAlchemy** — ORM for database
- **Pydantic** — Request validation
- **bcrypt** — Password hashing
- **PyJWT** — JWT token management
- **Google Generative AI** — Gemini API

### Database
- **SQLite** — Development database (swap PostgreSQL for production)

---

## 🔐 Authentication Flow

```
1. User submits email + password
   ↓
2. Frontend: POST /api/auth/login
   ↓
3. Backend: Validate credentials, generate JWT token
   ↓
4. Frontend: Store token in localStorage
   ↓
5. Frontend: Socket.IO connects, sends auth event with token
   ↓
6. Backend: Verify token, mark connection authenticated
   ↓
7. User can access protected routes and WebSocket events
```

---

## 💬 Real-Time Messaging Flow

```
1. User joins room: Socket.IO join event
   ↓
2. Backend: Load message history from database
   ↓
3. Frontend: Display message history
   ↓
4. User types message and sends: Socket.IO message event
   ↓
5. Backend: Store message, detect AI trigger, broadcast to room
   ↓
6. All connected clients: Receive new_message event
   ↓
7. Frontend: Update state, message appears instantly on all screens
   ↓
[If @ai mentioned: Backend generates AI response and broadcasts it]
```

---

## 🤖 AI Integration

When a message contains "@ai":

1. Backend detects the trigger
2. Fetches last 5 messages for context
3. Calls Google Gemini API with context
4. Generates response
5. Broadcasts AI message to room via Socket.IO
6. Frontend displays with "AI Assistant" label

**Note:** Requires `GEMINI_API_KEY` in `.env`. Without it, messages process normally but AI responses won't trigger.

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Quick start and key commands |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Detailed setup guide |
| [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) | Integration walkthrough |
| [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md) | Full-stack overview |
| [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) | Feature completion checklist |
| [backend/README.md](backend/README.md) | Backend documentation |
| [BACKEND_TESTING.md](BACKEND_TESTING.md) | Testing with curl/WebSocket |
| [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) | Backend design patterns |

---

## 📋 Development Checklist

### ✅ Completed
- [x] Backend API (FastAPI + Socket.IO)
- [x] Authentication system (JWT + bcrypt)
- [x] Real-time messaging (WebSocket)
- [x] Google Gemini AI integration
- [x] Database models (SQLAlchemy)
- [x] Frontend pages (React)
- [x] Context state management (AuthContext, RoomContext)
- [x] API/Socket.IO services (api.js, socket.js)
- [x] UI components (Navbar, Messages, etc.)

### 🔄 Ready for Testing
- [ ] End-to-end authentication flow
- [ ] Real-time chat with multiple users
- [ ] AI response generation
- [ ] Message history loading
- [ ] Socket.IO reconnection

### 📅 Post-MVP Features
- Room creation in UI
- User presence (online status)
- Message edits/deletes
- Typing indicators
- Message reactions
- User mentions
- File uploads
- Voice/video calling

---

## 🚀 Deployment

### Development
```bash
# Backend
cd backend && uvicorn main:socket_app --reload

# Frontend
npm run dev
```

### Production Build
```bash
# Backend: Use a production ASGI server
# Example: gunicorn
pip install gunicorn
gunicorn -k uvicorn.workers.UvicornWorker -w 2 main:socket_app

# Frontend: Build static files
npm run build
# Serve dist/ folder via web server (nginx, Apache, etc.)
```

---

## 🐛 Troubleshooting

**Backend won't start?**
- Ensure Python venv is activated
- Run `pip install -r requirements.txt` again
- Check port 8000 is free: `lsof -i :8000`

**Frontend won't connect?**
- Verify `VITE_API_URL` in `.env.local`
- Check backend is running on port 8000
- Clear browser cache and reload

**Messages not real-time?**
- Check WebSocket connection (DevTools → Network)
- Verify both servers are running
- Check browser console for errors

**AI not responding?**
- Add `GEMINI_API_KEY` to `backend/.env`
- Verify message contains "@ai"
- Check backend logs for API errors

See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for more troubleshooting.

---

## 📝 License

MIT License — See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

This is an MVP project. Contributions welcome! Areas for improvement:
- UI/UX polish
- Performance optimization
- Additional AI features
- Deployment automation
- Test coverage

---

## 📧 Support

- **Documentation:** See docs/ folder
- **Issues:** Check [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)
- **Questions:** Refer to [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

**Status:** 🟢 MVP Ready for Testing  
**Last Updated:** Implementation Complete  
**Start Here:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---
---

## 📦 Component Checklist
- `MessageBubble`
- `CodeBlock` (syntax highlight, copy button)
- `AIResponseCard`
- `RoomCard`
- `SidebarNav`
- `MemberList`
- `InputBar` (mode toggle + `@mention` highlight)
- `OnlineIndicator`

---

## 🛠 Build Order
1. Landing → 2. Auth → 3. Rooms Dashboard → **4. Chat Room** (anchor of the app) → 5. Create Room modal → 6. Profile

> Focus on the chat room early; it’s the showpiece and will dictate reusable component design.

---

## ⚙️ Setup (Initial)
```bash
# initialize bun project
bun init
# or manually create package.json and add scripts
```

### Dependency Strategy
- Start with **no dependencies** or minimal utilities (e.g. [prismjs](https://prismjs.com/) for syntax highlighting)
- If interactive state becomes difficult, consider pulling in a lightweight framework such as Preact or Svelte via bun

---

Feel free to migrate pieces into a framework or add build tooling as needed — this roadmap is flexible. Let the chat view be your north star.
