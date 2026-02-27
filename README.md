# AI-Powered Dev Chat Rooms — Frontend

A **simple web chat application structured into 'Rooms' for multiple developers**, with a seamlessly integrated AI assistant for real-time, instant coding bug resolution. This repository holds the frontend for **AI‑Powered Dev Chat Rooms**. It's designed as an **internal company developer tool** — your private engineering brain where every team has its own workspace, the AI understands your stack, and nothing leaks outside the organization.

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
1. **Landing Page** – Marketing front‑door that explains the single promise: a chat app built around **Rooms** and an AI assistant that helps resolve bugs in real time.
2. **Workspace Onboarding** – Create or join a workspace; keeps the experience scoped to your team.
3. **Invite / Join Page** – Enter your name and work email after clicking an invite link to get access to rooms.
4. **Rooms Dashboard** – The hub where you browse and enter individual rooms. Each room is a focused conversation tied to a bug, task, or file.
5. **Chat Room View** *(core screen)* –
   - Left sidebar: your list of rooms and categories.
   - Main area: threaded chat with messages and AI responses.
   - Bottom input: type normally, mention `@AI` to get automatic bug fixes or code suggestions.
6. **Create Room** – Simple form to spawn a new room with a name, topic, and optional invite-only toggle.
7. **Profile/Settings** – Manage your display name, role, team, and language preferences (which tune AI replies).
8. **Admin Panel** – For workspace owners: manage users, rooms, and the AI stack context that informs the assistant.

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
1. Landing → 2. Onboarding/Invite → 3. Rooms Dashboard → **4. Chat Room** (the heart of the product) → 5. Create Room → 6. Profile/Admin

> Make the chat room the priority; everything else is just scaffolding around it.

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
