# Simple REST API with NestJS & TypeScript

This project is a **simple REST API** built with NestJS and TypeScript, featuring authentication via JWT, CRUD operations for users and posts, and using a SQL database (PostgreSQL/MySQL).

---

## Features

1. **CRUD Operations**
   - Users
     - Create, Read, Update, Delete
   - Posts
     - Create, Read, Update, Delete
   - Posts are **related to users** (User hasMany Posts, Post belongsTo User)

2. **Authentication**
   - User registration and login
   - JWT-based authentication
   - Protected routes for creating posts

3. **Database**
   - SQL-based (PostgreSQL/MySQL)
   - Sequelize ORM used for models, migrations, and relations

4. **Testing**
   - E2E tests implemented using Jest and Supertest
   - Tests cover:
     - Register
     - Login
     - Accessing protected routes with JWT
     - CRUD operations on posts

---

## Project Structure & Pattern
### Using modular + layered (Controller → Service → Model) 
```json
because it separates each part of the application so that the code is more structured, easier to develop, and easier to test.
```
## Installation

```bash
# Clone repository
git clone https://github.com/asepsaefuddin/backend-typescript.git
cd backend-typescript

# Copy the .env file from .env.example
cp .env.example .env

# Install dependencies
npm install

# lint
npm run lint

# Create the database and configure it according to the settings in config and app.module

# Run database migrations if needed
npm run migration:run

# Start the app
npm run start:dev

# Testing for testing the API token
npm run test:e2e
```
