# Frontend - Task Management App

A React + TypeScript frontend for a task management app (like Trello) with boards, cards, and member management.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Usage](#usage)

---

## Tech Stack

- **React** with TypeScript
- **Ant Design** for UI components
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios / React Query** for API requests

---

## Folder Structure

```
frontend/
│
├─ public/                # Public assets
├─ src/
│   ├─ components/        # Reusable UI components
│   ├─ pages/             # Pages (TaskPage, BoardPage, etc.)
│   ├─ services/          # API service files
│   ├─ hooks/             # Custom React hooks
│   ├─ App.tsx
│   └─ index.tsx
├─ package.json
└─ tailwind.config.js
```

---

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Setup environment variables** in `.env`:

```
REACT_APP_API_URL=http://localhost:5000
```

> Replace the URL with your backend API base URL.

3. **Start development server:**

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Key               | Description                 |
| ----------------- | --------------------------- |
| REACT_APP_API_URL | Base URL of the backend API |

---

## Available Scripts

- `npm start` → Start frontend development server
- `npm run build` → Build production bundle
- `npm test` → Run tests (if any)

---

## Usage

- Navigate boards and cards
- Invite users by email
- Add descriptions and comments
- Attach branches, commits, issues, pull requests
