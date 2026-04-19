# Task Management API

A RESTful API for managing personal tasks with JWT-based authentication. Built with Node.js, Express, and PostgreSQL via Prisma ORM.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** PostgreSQL
- **ORM:** Prisma v6
- **Auth:** JSON Web Tokens (JWT)
- **Validation:** Joi
- **Password Hashing:** bcrypt

## Project Structure

```
task-api/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── authRoute.js
│   │   └── taskRoute.js
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── utils/
│   │   └── AppError.js
│   ├── validators/
│   │   ├── authValidators.js
│   │   └── taskValidators.js
│   ├── app.js
│   └── prisma.js
├── .env
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_api_db?schema=public"
JWT_SECRET="your_secret_key_at_least_32_characters"
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon src/app.js` | Development server with auto-reload |
| `start` | `node src/app.js` | Production server |

## API Reference

All protected routes require the `Authorization: Bearer <token>` header.

### Authentication

#### Register

```
POST /auth/register
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "Your Name"
}
```

Response `201`:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Your Name"
  }
}
```

#### Login

```
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

Response `200`:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Tasks

All task endpoints require authentication.

#### Create Task

```
POST /tasks
```

Request body:
```json
{
  "title": "My task",
  "description": "Optional description"
}
```

#### Get All Tasks

```
GET /tasks
GET /tasks?status=pending
```

Query params: `status` — one of `pending`, `in_progress`, `done`

#### Get Task by ID

```
GET /tasks/:id
```

#### Update Task

```
PATCH /tasks/:id
```

Request body (all fields optional):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in_progress"
}
```

Valid status values: `pending`, `in_progress`, `done`

#### Delete Task

```
DELETE /tasks/:id
```

---

### Utility

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | No | Health check |
| `GET` | `/me` | Yes | Current user info |
| `GET` | `/test-db` | No | Database connection test |

## Database Schema

### User

| Field | Type | Notes |
|-------|------|-------|
| `id` | Int | Primary key, auto-increment |
| `email` | String | Unique |
| `password` | String | bcrypt hashed |
| `name` | String | Optional |
| `createdAt` | DateTime | Auto-set |
| `updatedAt` | DateTime | Auto-updated |

### Task

| Field | Type | Notes |
|-------|------|-------|
| `id` | Int | Primary key, auto-increment |
| `title` | String | Required |
| `description` | String | Optional |
| `status` | String | Default: `pending` |
| `userId` | Int | Foreign key to User |
| `createdAt` | DateTime | Auto-set |
| `updatedAt` | DateTime | Auto-updated |

## Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire after 7 days
- All inputs validated with Joi schemas
- Users can only access their own tasks
