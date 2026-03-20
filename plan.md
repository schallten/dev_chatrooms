

# 🧭 0. What You’re Building (Final Scope)

### Core Features

* Auth (login/signup)
* Homepage (product landing)
* Chat rooms (departments)
* Real-time messaging
* Message history (no loss)
* Reactions
* Mentions
* User profiles
* User status (online/offline/busy)
* Roles (admin/member)
* Room admin panel:

  * set AI API key
  * select model from dropdown

---

# 🧱 1. Project Setup

## Backend

* FastAPI
* PostgreSQL
* asyncpg

## Frontend

* Svelte

---

# 📄 2. Database (Only What You Need)

Create these tables and STOP there:

### users

```sql
id UUID PK
username TEXT
email TEXT
password_hash TEXT
avatar_url TEXT
status TEXT
created_at TIMESTAMP
```

---

### roles

```sql
id UUID
name TEXT -- admin, member
```

---

### user_roles

```sql
user_id UUID
role_id UUID
```

---

### rooms

```sql
id UUID
name TEXT
description TEXT
created_at TIMESTAMP
```

---

### room_members

```sql
user_id UUID
room_id UUID
```

---

### room_settings (AI config 👇)

```sql
room_id UUID PK
ai_api_key TEXT
ai_model TEXT
```

👉 Models will just be strings like:

```id="models1"
gpt-4
gpt-4o
claude-3
gemini-pro
```

(No backend logic needed beyond storing)

---

### messages

```sql
id BIGSERIAL
room_id UUID
user_id UUID
content TEXT
created_at TIMESTAMP
```

---

### reactions

```sql
id BIGSERIAL
message_id BIGINT
user_id UUID
emoji TEXT
```

---

### mentions

```sql
id BIGSERIAL
message_id BIGINT
mentioned_user_id UUID
```

---

### read_tracking

```sql
user_id UUID
room_id UUID
last_seen_message_id BIGINT
```

---

# 🔐 3. Auth (Build First)

### Endpoints

```id="auth1"
POST /signup
POST /login
GET /me
```

* Use JWT
* Store token in frontend

---

# 🏠 4. Homepage (Product UI)

Build a simple landing page:

### Sections:

* App name
* “Internal team chat for organizations”
* Login / Signup buttons

👉 Routes:

```id="routes1"
/
/login
/signup
/app
```

---

# 💬 5. Chat System (Core Feature)

## REST APIs

### Rooms

```id="api1"
GET /rooms
POST /rooms
POST /rooms/{id}/join
```

---

### Messages (history)

```id="api2"
GET /rooms/{id}/messages?after=ID
```

---

## WebSocket

### Endpoint

```id="ws3"
/ws?token=JWT
```

---

## Events

### Send message

```json
{
  "type": "message_send",
  "room_id": "...",
  "content": "Hello @john"
}
```

---

### Receive message

```json
{
  "type": "message_new",
  "message": { ... }
}
```

---

## Backend Flow

When message received:

1. Save to DB
2. Parse mentions (`@username`)
3. Broadcast to room

---

# 😀 6. Reactions

## API / WS

### Add reaction

```json
{
  "type": "reaction_add",
  "message_id": 1,
  "emoji": "🔥"
}
```

---

## Backend:

* insert into DB
* send updated count

---

# 🔔 7. Mentions

## Backend:

* detect `@username`
* map to user_id
* store in mentions table

---

## Send event:

```json
{
  "type": "mention",
  "message_id": 1
}
```

---

# 👤 8. User Features

## Profile

```id="profile1"
GET /users/{id}
PUT /users/me
```

Fields:

* username
* avatar_url
* status

---

## Status system

Values:

```id="status3"
online
offline
busy
```

Update via:

```id="statusapi"
POST /status
```

---

# 🛡️ 9. Roles (Simple)

* assign roles manually in DB or API
* only use for:

  * identifying admin

---

# 🤖 10. Room Admin Panel (AI Config)

## Endpoint

```id="ai1"
GET /rooms/{id}/settings
PUT /rooms/{id}/settings
```

---

## UI

Inside room:

* Input: API key
* Dropdown:

```id="models2"
gpt-4
gpt-4o
claude-3
gemini-pro
```

👉 Save only. No AI logic needed.

---

# 🎨 11. Frontend (Svelte)

## Pages

```id="pages1"
/           → homepage
/login
/signup
/app       → main chat
```

---

## Layout

```id="layout1"
Sidebar (rooms)
Chat area
Message input
Right panel (optional: settings)
```

---

## Components

* RoomList
* ChatWindow
* MessageItem
* ReactionBar
* UserProfile
* RoomSettingsModal

---

## State

```js
messages
rooms
currentRoom
user
```

---

## WebSocket client

* connect on login
* handle:

  * message_new
  * reaction_update
  * mention

---

# 🔄 12. Message Loading (IMPORTANT)

When opening room:

1. Call:

```id="load1"
GET /rooms/{id}/messages?after=last_seen
```

2. Then WebSocket continues

---

# ✅ 13. Build Order (Strict)

Follow THIS order:

### Step 1

* DB schema
* Auth (login/signup)

---

### Step 2

* Homepage + auth pages (Svelte)

---

### Step 3

* Rooms API + UI

---

### Step 4

* WebSocket messaging (send/receive)

---

### Step 5

* Message history (REST)

---

### Step 6

* Reactions

---

### Step 7

* Mentions

---

### Step 8

* Profiles + status

---

### Step 9

* Roles (just admin flag)

---

### Step 10

* Room settings (AI key + model dropdown)

---

# ⚠️ Keep It Simple (Rules)

* Don’t overabstract
* Don’t add extra features
* Don’t optimize early
* Don’t add AI logic (just store config)

---

# 🧭 That’s It

This is a **complete, buildable product roadmap**—no future fluff, no unnecessary complexity.


