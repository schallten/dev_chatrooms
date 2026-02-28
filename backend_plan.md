# � Backend MVP Plan: Python & SQLite

This document outlines the simplified, Python-based backend architecture for the **AI-Powered Dev Chat Rooms**. The goal is a fast delivery (MVP) using local database storage and Google Gemini for AI assistance.

---

## 🏗 High-Level Architecture
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (High performance, easy to use, built-in documentation).
- **Real-time Engine:** [python-socketio](https://python-socketio.readthedocs.io/) (Compatible with frontend Socket.IO).
- **Database:** [SQLite](https://www.sqlite.org/) (Zero-config local file database).
- **AI Integration:** [Google Generative AI](https://ai.google.dev/) (Gemini).

## 💻 Tech Stack
- **Runtime:** Python 3.10+
- **Web App:** FastAPI + Uvicorn
- **Sockets:** `python-socketio[asyncio]`
- **DB/ORM:** SQLAlchemy (with SQLite)
- **AI SDK:** `google-generativeai`

---

## 📊 Database Schema (SQLAlchemy)

```python
# Minimalist schema for SQLite MVP

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))

class Workspace(Base):
    __tablename__ = "workspaces"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    slug = Column(String, unique=True)

class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    topic = Column(String)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True)
    content = Column(Text)
    is_ai = Column(Boolean, default=False)
    is_code = Column(Boolean, default=False)
    language = Column(String) # e.g., 'javascript'
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
```

---

## 🌐 API Design (MVP Routes)

### Auth (`/api/auth`)
- `POST /login`: Simple JWT or Session-based authentication.
- `GET /me`: Returns Current User info.

### Rooms (`/api/rooms`)
- `GET /`: List rooms for the user's workspace.
- `GET /{room_id}/messages`: Fetch last 50 messages.

---

## ⚡ Real-time Layer (Socket.IO)

### Events:
- `connect`: Verify user identity.
- `join`: Join a room (`room_id`).
- `message`: 
    1. Save user message to SQLite.
    2. Broadcast `new_message` to room.
    3. **If `@AI` is mentioned:** Start AI processing as a background task.

---

## 🤖 Gemini AI Integration

### Logic:
1. **Trigger:** Backend detects `@AI` in the incoming Socket.IO message.
2. **Context:** Retrieve the last 10 messages from `messages` table for the room.
3. **Gemini Prompt:**
   ```python
   model = genai.GenerativeModel('gemini-2.5-flash')
   response = model.generate_content(f"Context: {chat_history}\n\nUser Question: {user_input}")
   ```
4. **Delivery:** Emit a `new_message` event via Socket.IO with `is_ai=True`.

---

## � Setup Steps
1. **Env Setup:**
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install fastapi uvicorn sqlalchemy python-socketio google-generativeai
   ```
2. **Init DB:** Create `dev_chat.db` using SQLAlchemy.
3. **Core API:** Implement Login and Room browsing.
4. **Socket.IO:** Implement chat broadcasting.
5. **Gemini:** Add the AI trigger logic.

---

## 🔐 Security (MVP Level)
- **Gemini API Key:** Keep in `.env` file (never commit).
- **Auth:** Use a simple `secrets` based token for the MVP phase.
- **SQLite:** No external server needed, local file management.
