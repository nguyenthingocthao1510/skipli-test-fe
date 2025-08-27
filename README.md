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

## Screenshot from my web:
1.	Login:
<img width="975" height="426" alt="image" src="https://github.com/user-attachments/assets/246d3e39-51e2-4b28-95ba-0413bbee03d4" />

2.	Signup:
<img width="975" height="427" alt="image" src="https://github.com/user-attachments/assets/12e6345e-187b-4d4f-a7ff-c220a186daf0" />

3.	Homepage:
<img width="975" height="425" alt="image" src="https://github.com/user-attachments/assets/0a04ac08-9fce-471d-a6da-2c6581c6c300" />

4.	Update board:
<img width="975" height="424" alt="image" src="https://github.com/user-attachments/assets/a3e22866-09e9-4a19-bc8e-5d30e11415ec" />
<img width="975" height="425" alt="image" src="https://github.com/user-attachments/assets/c2ea9583-d3f1-455d-9fcc-ad65670f4f53" />

5.	Delete board:
<img width="975" height="425" alt="image" src="https://github.com/user-attachments/assets/2388863a-0e37-46e3-ac50-6001b58840d7" />

6.	Card:
<img width="975" height="424" alt="image" src="https://github.com/user-attachments/assets/6f985751-bf5e-4a03-9397-b17957441d86" />

7.	Edit card:
<img width="975" height="426" alt="image" src="https://github.com/user-attachments/assets/359451e8-325b-4f58-88f5-a1ed80f0fafc" />
<img width="975" height="423" alt="image" src="https://github.com/user-attachments/assets/b49a2708-1da3-45b3-8ed8-e61a7c6bada2" />

8.	Add card:
<img width="975" height="420" alt="image" src="https://github.com/user-attachments/assets/4f63933a-94fe-40ef-aabd-5db6d58ace67" />

9.	Task:
<img width="975" height="426" alt="image" src="https://github.com/user-attachments/assets/a8d0dcce-b7b6-4be2-8b1d-f876173ef3df" />

10.	Invite another person to card:
<img width="975" height="423" alt="image" src="https://github.com/user-attachments/assets/8c768f56-59b6-4e10-a164-8077b27be6c2" />


