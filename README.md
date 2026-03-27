# PERN Auth

A full-stack authentication system built with the PERN stack. Handles user registration, login, and protected routes using JWT and bcrypt.

---

## Tech Stack

**Backend** — Node.js, Express, PostgreSQL, pg, bcrypt, jsonwebtoken, dotenv, nodemon  
**Frontend** — React (Vite), Tailwind CSS

---

## Project Structure

```
LOGIN/
├── login-backend/
│   ├── middleware/
│   │   └── protectRoute.js
│   ├── routes/
│   │   └── auth.js
│   ├── src/
│   │   └── db.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── login-frontend/
│   └── auth-project/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   └── Navbar.jsx
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   └── Register.jsx
│       │   ├── store/
│       │   │   └── authStore.js
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       ├── index.html
│       └── vite.config.js
└── .gitignore
```

---

## How It Works

- Passwords are hashed with **bcrypt** before being stored in the database
- On login, a **JWT** is generated and sent to the client
- Protected routes verify the token via **protectRoute.js** middleware before allowing access
- Global auth state is managed via **authStore.js**

---

## Getting Started

### 1. Clone The Repo

```bash
git clone git@github.com:k4zmx/pern-auth.git
cd pern-auth
```

### 2. Setup The Database

Make sure PostgreSQL is installed, then run:

```sql
CREATE DATABASE pernauth;

\c pernauth

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### 3. Setup The Backend

```bash
cd login-backend
npm install
```

Create a `.env` file in `login-backend/`:

```env
PORT=5000
PG_USER=your_postgres_user
PG_PASSWORD=your_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=pernauth
JWT_SECRET=your_secret_key
```

Start The Backend:

```bash
npm run dev
```

### 4. Setup The Frontend

```bash
cd login-frontend/auth-project
npm install
npm run dev
```

---

## Features

- User Registration With Hashed Passwords
- User Login With JWT Token Generation
- Protected Routes Via Auth Middleware
- Global Auth State Management
- Navbar With Auth-Aware Navigation
