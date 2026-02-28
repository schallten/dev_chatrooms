# Getting Started with Dev Chatrooms

A full-stack real-time chat application with AI integration.

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ (frontend)
- Python 3.9+ (backend)
- Google Gemini API key (optional, for AI responses)

### 1. Backend Setup
```bash
cd backend

# Copy environment variables
cp .env.example .env

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed database (creates test data)
python seed.py

# Start server (runs on port 8000)
uvicorn main:socket_app --reload
```

### 2. Frontend Setup
```bash
# From root directory
# Copy environment variables
cp .env.example .env.local

# Install dependencies
npm install

# Start development server (runs on port 5173)
npm run dev
```

### 3. Test the App
1. Open http://localhost:5173 in your browser
2. Click "Get Started"
3. Log in with test credentials:
   - **Email:** test@example.com
   - **Password:** password123
4. View the room list and join a chat room
5. Type a message and send it (appears instantly via Socket.IO)
6. Type a message with "@ai" to trigger AI response

## Project Structure
```
dev_chatrooms/
├── backend/              # FastAPI + Socket.IO server
│   ├── main.py          # Server setup, API routes, Socket.IO events
│   ├── auth.py          # JWT authentication
│   ├── database.py      # SQLAlchemy ORM models
│   ├── schemas.py       # Request/response schemas
│   ├── ai_service.py    # Google Gemini integration
│   └── seed.py          # Test data generator
├── src/                 # React frontend
│   ├── pages/           # Page components (Landing, Dashboard, ChatRoom, etc.)
│   ├── components/      # Reusable components (Navbar, MessageBubble, etc.)
│   ├── contexts/        # Global state (AuthContext, RoomContext)
│   └── services/        # API & Socket.IO clients
├── package.json         # Frontend dependencies
└── vite.config.js       # Frontend build config
```

## Key Features

### ✅ Authentication
- Email/password registration and login
- JWT token-based authentication
- Protected routes and API endpoints
- Socket.IO connection authentication

### ✅ Real-time Chat
- Instant message delivery via WebSocket
- Message history per room
- Multiple rooms support
- Online message updates across all clients

### ✅ AI Integration
- Google Gemini API for AI responses
- Trigger AI with "@ai" mention in messages
- AI responses displayed with special styling

### ✅ User Management
- User profiles with email
- Workspace organization
- Room-based chat organization

## Available Test Users
All test accounts use password: `password123`

| Email | Name |
|-------|------|
| test@example.com | Alice Johnson |
| bob@example.com | Bob Smith |
| carol@example.com | Carol Davis |
| dave@example.com | Dave Wilson |
| eve@example.com | Eve Martinez |
| frank@example.com | Frank Brown |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Get JWT token
- `GET /api/auth/me` - Get current user (protected)

### Rooms
- `GET /api/rooms` - List all rooms (protected)
- `GET /api/rooms/{room_id}/messages` - Get room messages (protected)

## Socket.IO Events

### Client → Server
- `auth` - Authenticate with JWT token
- `join` - Join a room
- `message` - Send a message
- `disconnect` - Clean up session

### Server → Client
- `auth_success` - Authentication successful
- `auth_error` - Authentication failed
- `new_message` - New message received
- `error` - Error event

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
GEMINI_API_KEY=your-gemini-api-key  # Optional
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000
```

## Common Commands

### Backend
```bash
# Development with hot reload
uvicorn main:socket_app --reload

# Production
uvicorn main:socket_app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Backend won't start
- Ensure Python virtual environment is activated
- Check that port 8000 is not in use
- Run `pip install -r requirements.txt` again

### Frontend won't connect to backend
- Verify backend is running on port 8000
- Check `VITE_API_URL` in `.env.local`
- Check browser console for CORS errors

### Messages not appearing
- Ensure both browser tabs use the same token
- Check WebSocket connection in DevTools Network tab
- Verify backend Socket.IO logs show successful auth

### AI responses not working
- Add `GEMINI_API_KEY` to backend `.env`
- Check that "@ai" is in the message
- Verify API key is valid

## Architecture

```
┌─────────────────────────┐
│   React Frontend        │
│  (Port 5173, Vite)      │
└────────┬────────────────┘
         │ HTTP REST + WebSocket
         │
┌────────▼────────────────┐
│ FastAPI + Socket.IO     │
│  (Port 8000, Python)    │
└────────┬────────────────┘
         │
┌────────▼────────────────┐
│   SQLite Database       │
│    (dev_chat.db)        │
└─────────────────────────┘
```

## Security Notes

⚠️ This is an MVP. For production:
- Change `SECRET_KEY` to a secure random value
- Use HTTPS for frontend-backend communication
- Implement rate limiting
- Add CORS configuration
- Use environment variables properly
- Add input validation and sanitization
- Implement rate limiting on AI API calls
- Set secure cookie options for Socket.IO

## Next Steps

1. **Customize the UI** - Update styles in `src/styles/`
2. **Add more features** - Rooms creation, user profiles, etc.
3. **Deploy** - Use Docker, Cloud Run, or traditional hosting
4. **Scale** - Replace SQLite with PostgreSQL, add Redis caching
5. **Integrate external APIs** - Slack, Discord, Teams, etc.

## Support

For detailed documentation:
- Architecture: See [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md)
- Integration: See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- Testing: See [BACKEND_TESTING.md](BACKEND_TESTING.md)

## License

See [LICENSE](LICENSE) file for details.
