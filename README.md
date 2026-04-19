# Task Management API

A RESTful API for managing tasks, built with Node.js, Express, PostgreSQL, and Prisma ORM.

## Features

- User authentication (register/login) with JWT
- Password hashing with bcrypt
- CRUD operations for tasks
- Each user can only access their own tasks
- Input validation with Joi
- Centralized error handling
- Filter tasks by status

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Joi

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/uplup2015/Task-API.git
cd Task-API
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
PORT=3000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/task_api_db?schema=public"
JWT_SECRET="your_jwt_secret_key"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```

The server will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

| Method | Endpoint         | Description      | Auth Required |
|--------|------------------|------------------|---------------|
| POST   | /auth/register   | Register a user  | No            |
| POST   | /auth/login      | Login            | No            |

### Tasks

| Method | Endpoint     | Description         | Auth Required |
|--------|--------------|---------------------|---------------|
| POST   | /tasks       | Create a task       | Yes           |
| GET    | /tasks       | Get all tasks       | Yes           |
| GET    | /tasks/:id   | Get a task by ID    | Yes           |
| PATCH  | /tasks/:id   | Update a task       | Yes           |
| DELETE | /tasks/:id   | Delete a task       | Yes           |

### Register

**POST** `/auth/register`

Request body:

```json
{
  "email": "user@example.com",
  "password": "123456",
  "name": "John Doe"
}
```

Response (201):

```json
{
  "message": "Đăng ký thành công",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-04-17T...",
    "updatedAt": "2026-04-17T..."
  }
}
```

### Login

**POST** `/auth/login`

Request body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response (200):

```json
{
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Create Task

**POST** `/tasks`

Headers: `Authorization: Bearer <token>`

Request body:

```json
{
  "title": "Learn Node.js",
  "description": "Study Express and Prisma"
}
```

Response (201):

```json
{
  "message": "Tạo task thành công",
  "task": {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Study Express and Prisma",
    "status": "pending",
    "userId": 1,
    "createdAt": "2026-04-17T...",
    "updatedAt": "2026-04-17T..."
  }
}
```

### Get All Tasks

**GET** `/tasks`

Headers: `Authorization: Bearer <token>`

Query parameters (optional): `?status=pending` or `?status=done` or `?status=in_progress`

Response (200):

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Learn Node.js",
      "description": "Study Express and Prisma",
      "status": "pending",
      "userId": 1,
      "createdAt": "2026-04-17T...",
      "updatedAt": "2026-04-17T..."
    }
  ]
}
```

### Update Task

**PATCH** `/tasks/:id`

Headers: `Authorization: Bearer <token>`

Request body (all fields optional):

```json
{
  "title": "Learn Node.js (updated)",
  "status": "done"
}
```

Response (200):

```json
{
  "message": "Cập nhật task thành công",
  "task": {
    "id": 1,
    "title": "Learn Node.js (updated)",
    "description": "Study Express and Prisma",
    "status": "done",
    "userId": 1,
    "createdAt": "2026-04-17T...",
    "updatedAt": "2026-04-17T..."
  }
}
```

### Delete Task

**DELETE** `/tasks/:id`

Headers: `Authorization: Bearer <token>`

Response (200):

```json
{
  "message": "Xóa task thành công"
}
```

## Error Responses

| Status Code | Description                          |
|-------------|--------------------------------------|
| 400         | Bad Request - Invalid input data     |
| 401         | Unauthorized - Invalid/missing token |
| 403         | Forbidden - No permission            |
| 404         | Not Found - Resource not found       |
| 409         | Conflict - Email already exists      |
| 500         | Internal Server Error                |

Example error response:

```json
{
  "error": "Email hoặc password không đúng"
}

```

Validation error response:

```json
{
  "errors": [
    "Email không hợp lệ",
    "Password phải có ít nhất 6 ký tự"
  ]
}
```

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
│   │   ├── authValidator.js
│   │   └── taskValidator.js
│   ├── app.js
│   └── prisma.js
├── .env
├── .gitignore
├── package.json
└── prisma.config.ts
```
