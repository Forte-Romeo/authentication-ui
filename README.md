# 🔐 Authentication UI

A full-stack authentication application built with **React, Vite, Express.js, and PostgreSQL**. This project demonstrates user registration, login, protected routes, access tokens, secure refresh-cookie handling, session restoration, and logout.

🌐 **Live Demo:** [Forte Authentication UI](https://forte-authentication-ui.vercel.app/)

🚀 **Backend API:** [Authentication UI API](https://authentication-ui-s2kp.vercel.app/)

📦 **Repository:** [GitHub - Authentication UI](https://github.com/Forte-Romeo/authentication-ui)

---

## 📌 Table of Contents

- [✨ Project Overview](#-project-overview)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Architecture](#️-project-architecture)
- [📂 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [🔌 API Endpoints](#-api-endpoints)
- [🔒 Authentication Flow](#-authentication-flow)
- [🧪 Testing](#-testing)
- [🌍 Deployment](#-deployment)
- [🎯 Project Goals](#-project-goals)
- [👨‍💻 Author](#-author)
- [📄 License](#-license)

---

## ✨ Project Overview

Authentication UI started as a React authentication interface and evolved into a full-stack application with a working backend and database.

The application allows users to create accounts, log in, access protected resources, maintain their authenticated session through refresh cookies, and log out.

The project was built as a hands-on learning experience to understand how frontend interfaces, backend APIs, databases, and authentication mechanisms work together in a real application.

### 🎯 Main Objective

To build and understand a complete authentication system, from designing the user interface to implementing server-side authentication, database integration, token management, and production deployment.

---

## 🚀 Features

### 🎨 Frontend

- Responsive authentication interface.
- User registration and login forms.
- Forgot-password interface.
- Form validation and user feedback.
- React component-based architecture.
- Authentication state management.
- Protected application views.
- Session restoration when the application reloads.
- Logout functionality.
- API integration with the Express backend.

### ⚙️ Backend

- REST API built with Express.js.
- User registration and login endpoints.
- Password hashing and verification.
- Access-token generation and verification.
- Refresh-token validation and rotation.
- HTTP-only refresh-cookie handling.
- Protected API endpoints.
- Logout and refresh-token revocation.
- CORS configuration.
- Environment-based configuration.
- Centralized error handling.

### 🗄️ Database

- PostgreSQL integration.
- Persistent user records.
- Case-insensitive email uniqueness.
- Stored refresh-token hashes.
- Refresh-token expiration and revocation tracking.
- Token rotation tracking.

### 🌍 Production

- Frontend deployed on Vercel.
- Backend deployed on Vercel.
- Production database hosted on Neon PostgreSQL.
- Production environment variables configured separately from local development.
- Browser-based verification of the deployed authentication flow.

---

## 🛠️ Tech Stack

| Technology                                     | Purpose                                         |
| ---------------------------------------------- | ----------------------------------------------- |
| React                                          | Frontend UI                                     |
| Vite                                           | Frontend development and build tooling          |
| JavaScript (ES Modules)                        | Application logic                               |
| CSS                                            | Styling and responsive layouts                  |
| Node.js                                        | JavaScript runtime                              |
| Express.js                                     | Backend REST API                                |
| PostgreSQL                                     | Relational database                             |
| `pg`                                           | PostgreSQL client for Node.js                   |
| JWT                                            | Access-token authentication                     |
| HTTP-only cookies                              | Refresh-token transport                         |
| `bcrypt` / configured password-hashing library | Password hashing, if used by the implementation |
| Supertest                                      | HTTP endpoint testing                           |
| Node.js Test Runner                            | Automated tests                                 |
| Vercel                                         | Application deployment                          |
| Neon                                           | Hosted PostgreSQL database                      |
| Git and GitHub                                 | Version control and source-code hosting         |

---

## 🏗️ Project Architecture

The application follows a frontend–backend–database architecture.

```text
┌──────────────────────────────┐
│         React + Vite         │
│                              │
│ Login · Signup · Auth State  │
└──────────────┬───────────────┘
               │
               │ HTTP requests
               │ Access token
               │ Refresh cookie
               ▼
┌──────────────────────────────┐
│       Express.js API         │
│                              │
│ Routes · Controllers         │
│ Authentication · Validation  │
│ Token Management             │
└──────────────┬───────────────┘
               │
               │ SQL queries
               ▼
┌──────────────────────────────┐
│         PostgreSQL           │
│                              │
│ Users · Refresh Tokens       │
└──────────────────────────────┘
```

### 🧩 How the Components Work Together

1. The React frontend collects user input.
2. The frontend sends HTTP requests to the Express API.
3. The backend validates requests and executes authentication logic.
4. PostgreSQL stores user records and refresh-token metadata.
5. The backend returns appropriate responses and issues authentication tokens when required.
6. The frontend uses the access token for protected API requests.
7. An HTTP-only cookie allows the application to refresh its session without exposing the refresh token to ordinary JavaScript access.
8. Logging out revokes the current refresh token and clears the cookie.

---

## 📂 Project Structure

The repository contains separate frontend and backend code.

```text
authentication-ui/
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   ├── package.json
│   └── .env
│
├── .env.example
├── .gitignore
├── index.html
├── LICENSE
├── package.json
└── README.md
```

> 📌 This is a high-level overview. Individual filenames and folders may differ slightly depending on the current implementation.

---

## ⚙️ Getting Started

Follow these instructions to run the application locally.

### 📋 Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

You should have a basic understanding of JavaScript, React, HTTP requests, and SQL.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Forte-Romeo/authentication-ui.git
```

Navigate into the project:

```bash
cd authentication-ui
```

### 2️⃣ Install Frontend Dependencies

From the repository root:

```bash
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

### 4️⃣ Configure the Database

Create a local PostgreSQL database and ensure its connection details match the backend environment configuration.

For example, if your local database is named `authentication_db`:

```sql
CREATE DATABASE authentication_db;
```

The database user must have the necessary permissions to create and access the tables required by the application.

Apply the project's database schema using the migration or schema setup process included in the repository.

### 5️⃣ Configure Environment Variables

Create the required `.env` files using the examples below. Use your own local development values.

**Backend — `server/.env`**

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME

JWT_ACCESS_SECRET=YOUR_LOCAL_ACCESS_TOKEN_SECRET
JWT_ACCESS_EXPIRES_IN=15m

CLIENT_URL=http://localhost:5173
```

**Frontend — `.env` at the repository root**

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

⚠️ **Important:** These are example configurations. Check the actual environment-variable names used in the source code and provide every required variable. Never commit real secrets, passwords, production database URLs, or private keys to GitHub.

### 6️⃣ Start the Backend

Open a terminal:

```bash
cd server
npm run dev
```

If the backend package does not define a development script, use its configured start command.

### 7️⃣ Start the Frontend

Open a second terminal at the repository root:

```bash
npm run dev
```

Vite will display the local development URL, normally:

```text
http://localhost:5173
```

The backend normally runs at:

```text
http://localhost:5000
```

Make sure the frontend API URL matches the address where the backend is running.

---

## 🔑 Environment Variables

The application uses environment variables to separate configuration from source code.

| Variable                | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `NODE_ENV`              | Determines the runtime environment            |
| `PORT`                  | Backend server port                           |
| `DATABASE_URL`          | PostgreSQL connection string                  |
| `JWT_ACCESS_SECRET`     | Secret used to sign access tokens             |
| `JWT_ACCESS_EXPIRES_IN` | Access-token lifetime                         |
| `CLIENT_URL`            | Allowed frontend origin for local development |
| `FRONTEND_URL`          | Production frontend origin, when required     |
| `VITE_API_BASE_URL`     | Frontend API base URL                         |

Only variables actually read by the application need to be configured. Check `server/src/config/env.js` and the frontend API configuration for the exact requirements.

🔐 Keep backend secrets on the server. Frontend variables prefixed with `VITE_` are exposed to the client bundle and must never contain secrets.

---

## 🔌 API Endpoints

The backend exposes authentication and protected-resource endpoints under `/api`.

| Method | Endpoint            | Purpose                                             |
| ------ | ------------------- | --------------------------------------------------- |
| `POST` | `/api/auth/signup`  | Register a user                                     |
| `POST` | `/api/auth/login`   | Authenticate a user                                 |
| `POST` | `/api/auth/refresh` | Refresh authentication and rotate the refresh token |
| `POST` | `/api/auth/logout`  | Log out and revoke the current refresh token        |
| `GET`  | `/api/users/me`     | Retrieve the authenticated user's information       |
| `GET`  | `/api/users`        | Access a protected users endpoint                   |

Protected endpoints require a valid access token unless the implementation specifies otherwise.

⚠️ The table describes the intended endpoints. Request fields, response shapes, and any additional routes should be checked against the current route and controller files before using the API independently.

---

## 🔒 Authentication Flow

### 📝 1. Registration

1. The user submits the registration form.
2. The frontend sends the details to the backend.
3. The backend validates the request and hashes the password.
4. The user record is stored in PostgreSQL.
5. The application returns an appropriate response.

### 🔑 2. Login

1. The user submits their credentials.
2. The backend verifies the user's credentials.
3. An access token is issued.
4. A refresh token is stored server-side as a hash and delivered through an HTTP-only cookie.
5. The frontend uses the access token to request protected resources.

### ♻️ 3. Session Restoration and Token Refresh

When the application starts or the access token needs refreshing:

1. The frontend sends a refresh request with the refresh cookie.
2. The backend validates the refresh token.
3. The previous refresh token is revoked as part of rotation.
4. A replacement refresh token is issued.
5. The backend returns a new access token and updates the cookie.

This allows the application to restore a valid session without requiring the user to log in again every time the page reloads.

### 🛡️ 4. Protected Routes

Protected API endpoints verify the access token before returning private resources.

Missing, invalid, or expired access tokens are rejected instead of being treated as authenticated requests.

### 🚪 5. Logout

1. The frontend sends a logout request.
2. The backend revokes the current refresh token when it is valid.
3. The refresh cookie is cleared.
4. The frontend clears its authentication state.

Revoking a refresh token prevents it from being used to obtain another access token through the normal refresh flow. An access token already issued may remain valid until it expires unless the application implements additional access-token revocation.

---

## 🧪 Testing

The backend uses the Node.js built-in test runner and Supertest for automated API tests.

From the backend directory, run:

```bash
npm test
```

The current test suite covers cases such as:

- Unknown routes returning `404`.
- Malformed JSON returning `400`.
- Protected endpoints rejecting missing access tokens.
- Protected endpoints rejecting invalid access tokens.
- Authentication endpoints rejecting requests without an Origin where required.
- Refresh requests enforcing the expected origin and cookie behavior.

The frontend can also be checked using the production build.

From the repository root:

```bash
npm run build
```

A successful build confirms that Vite can compile the frontend. It does not replace browser-based functional testing.

### ✅ Manual Verification Checklist

- [ ] A user can register.
- [ ] A registered user can log in.
- [ ] Invalid credentials are rejected.
- [ ] Protected resources reject missing or invalid access tokens.
- [ ] A valid session can be restored after a page reload.
- [ ] Refresh-token rotation works.
- [ ] Logout clears the session and revokes the refresh token.
- [ ] Logged-out users remain logged out after reloading.
- [ ] The frontend and backend work in production.

---

## 🌍 Deployment

The application is deployed using Vercel and Neon PostgreSQL.

| Component           | Platform |
| ------------------- | -------- |
| Frontend            | Vercel   |
| Backend API         | Vercel   |
| PostgreSQL database | Neon     |

### 🚀 Production URLs

**Frontend:** [https://forte-authentication-ui.vercel.app/](https://forte-authentication-ui.vercel.app/)

**Backend:** [https://authentication-ui-s2kp.vercel.app/](https://authentication-ui-s2kp.vercel.app/)

### Deployment Notes

- Configure frontend and backend environment variables in their respective deployment settings.
- Use the production database connection string only in the backend environment.
- Configure CORS for the intended frontend origin.
- Ensure refresh-cookie settings are compatible with the deployed frontend and backend origins.
- Never expose database credentials or token-signing secrets in the frontend bundle or public repository.
- Verify registration, login, session restoration, protected requests, token refresh, and logout after deployment.

---

## 🎯 Project Goals

This project was built to develop practical experience with:

- ⚛️ Building React applications.
- 🔌 Connecting a frontend to a REST API.
- 🖥️ Developing backend services with Node.js and Express.
- 🗄️ Designing and querying a PostgreSQL database.
- 🔐 Implementing authentication and authorization.
- 🎟️ Understanding access tokens and refresh-token rotation.
- 🍪 Working with HTTP-only cookies.
- 🧪 Writing automated backend tests.
- 🌍 Deploying a full-stack application.
- 🧰 Debugging real integration issues across frontend, backend, and database layers.

The goal is not only to make authentication work, but to understand the responsibilities of each part of the system and how they fit together.

---

## 👨‍💻 Author

**Ferguson Kwabena Romeo Nyarmah (Forte Romeo)**

Information Technology student | Aspiring Software + AI Engineer

I build projects to strengthen my understanding of software engineering, backend systems, databases, and full-stack application development.

- 💻 GitHub: [Forte-Romeo](https://github.com/Forte-Romeo)
- 🌐 Portfolio: [forteromeo.dev](https://forte-romeo-portfolio.vercel.app/)
- 🔗 LinkedIn: [Find me on LinkedIn](https://www.linkedin.com/in/ferguson-romeo-nyarmah)

---

## 📄 License

This project is intended primarily for learning and portfolio purposes.

You are free to study, modify, and build upon the code for educational purposes.

---

⭐ If you find this project useful as a learning reference, feel free to explore the code and follow the development journey.