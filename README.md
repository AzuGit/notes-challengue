# — Notes App -

Brief

- Fullstack SPA separated into `backend/` and `frontend/`.
- Single-start script: `start.sh` (Linux/macOS, Bash).

Requirements (recommended)

- Node.js 18.17.x
- npm 9.x
- Bash (Linux/macOS)
- Optional: Docker (if you want containerized DB)
- Internet access to install packages

Environment

- Backend env file: `backend/.env`
  - DB_NAME (e.g. ensolver_test_db)
  - CONNECTION_STRING (MongoDB URI, e.g. mongodb+srv://usertest:usertest@cluster0.../${DB_NAME})
  - JWT_SECRET
  - JWT_EXPIRES_IN (e.g. 7d)
  - NODE_ENV (development)
  - PORT (default 8000)
  - USERTEST_DB, PASSWORD_DB (example user credentials)

Install & run (one command)

1. Make script executable:
   chmod +x start.sh
2. Run:
   ./start.sh

- Script loads `backend/.env` (if present), installs dependencies, creates `frontend/.env.local` pointing to backend, runs backend and frontend in background and writes logs to `./.logs/`.

Manual commands

- Backend:
  cd backend
  npm ci
  npm run dev # or npm start
- Frontend:
  cd frontend
  npm ci
  npm run dev

Ports

- Backend default: 8000 (from backend/.env)
- Frontend (Vite) default: 5173

Dependencies included in this repo

Backend (from backend/package.json)

- bcrypt ^6.0.0
- cookie-parser ^1.4.7
- cors ^2.8.5
- dotenv ^17.2.3
- express ^5.2.1
- jsonwebtoken ^9.0.3
- mongoose ^9.0.1
- nodemon ^3.1.11

Frontend (from frontend/package.json)

- @tailwindcss/vite ^4.1.17
- axios ^1.13.2
- js-cookie ^3.0.5
- react ^19.2.0
- react-dom ^19.2.0
- react-icons ^5.5.0
- react-modal ^3.16.3
- react-router-dom ^7.10.1
- tailwindcss ^4.1.17

Frontend devDependencies

- @eslint/js ^9.39.1
- @types/react ^19.2.5
- @types/react-dom ^19.2.3
- @vitejs/plugin-react ^5.1.1
- eslint ^9.39.1
- eslint-plugin-react-hooks ^7.0.1
- eslint-plugin-react-refresh ^0.4.24
- globals ^16.5.0
- vite ^7.2.4

Logs

- ./.logs/backend.log
- ./.logs/frontend.log

Notes

- The project uses MongoDB (see `backend/.env`). Ensure `CONNECTION_STRING` is reachable or run MongoDB locally/Docker.
- If you need the repository README expanded (examples, deployment, default user/password), I can add it.

```// filepath: c:\Users\Usuario\Desktop\ensolver-test\Azuaje-86875f\README.md
# — Notes App
```
