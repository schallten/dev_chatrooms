# AI-Powered Dev Chat Rooms — Frontend

This repository holds the frontend for **AI‑Powered Dev Chat Rooms**. The goal is a sleek, developer‑centric chat application with AI assistance baked into the conversation flow.

> 🚀 **Approach:** Start with vanilla HTML/CSS/JS. Only migrate to a framework (React, Svelte, etc.) when complexity justifies it. Use **bun** for installers/package management (not `npm`).

---

## 🎨 Design System (Global)
- **Base palette:** Dark navy/slate `#0d1117` or similar
- **Accent color:** Gold/amber for highlights and interactive states
- **Typography:**
  - Code: JetBrains Mono / Fira Code (monospace)
  - UI text: Inter / Geist (system font stack fallback)
- **Aesthetic:** VS Code meets Slack — no harsh whites, subtle glows on active elements
- **Components:** Build as reusable pieces; keep styles scoped to components via CSS modules or BEM naming

---

## 🧭 Page Breakdown
1. **Landing Page** – Hero section with animated mock chat, CTAs (`Create Room`, `Join Room`), feature highlights
2. **Auth Page** – Centered card for username/email entry; light flow to create/join
3. **Rooms Dashboard** – Sidebar with joined rooms, main area with room cards, top navbar with avatar/settings
4. **Chat Room View** *(core screen, build first after scaffold)* –
   - Sidebars: room list + members
   - Chat area with timestamped messages, code blocks with syntax highlight & copy buttons
   - Input bar with normal/text vs code mode toggle; `@AI` triggers gold highlight
   - AI responses styled as distinct cards (badge/avatar + code snippet support)
5. **Create/Join Room Modal/Page** – Simple form with room name, topic tag, privacy toggle
6. **Profile/Settings** – Avatar, display name, tags, notification toggles

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
