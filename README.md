# AI-Powered Dev Chat Rooms — Frontend

This repository holds the frontend for **AI‑Powered Dev Chat Rooms**. It's designed as an **internal company developer tool** — your private engineering brain where every team has its own workspace, the AI understands your stack, and nothing leaks outside the organization.

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
1. **Landing Page** – Hero section with animated mock chat, CTAs (`Create Workspace`, `Join Workspace`), feature highlights oriented to teams
2. **Workspace Onboarding Screen** – Create a new workspace or join an existing one by invite. This frames the product as a B2B internal tool.
3. **Invite / Join Page** – New members enter their name and work email after clicking an invite link.
4. **Rooms Dashboard** – Displays rooms within the workspace; includes workspace header and member count, rooms grouped by category, and room owners shown.
5. **Admin Panel** – Lightweight interface for workspace administrators to manage members, rooms, and AI stack context.
6. **Chat Room View** *(core screen)* –
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
