# PayDay Bank 🏦

A modern, full-stack banking system built with **NestJS**, **React**, **TypeScript**, and **PostgreSQL**. This is an educational project demonstrating secure authentication, encrypted card management, and dashboard analytics.

**Status:** 🚀 Development  
**Type:** Educational/Learning Project  
**Deployment:** Local Development

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security Features](#security-features)
- [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### ✅ Implemented

- **User Authentication**
  - User registration with email validation
  - Secure login with JWT tokens
  - Password hashing with bcrypt (10 salt rounds)
  - Protected routes with JWT guards

- **Card Management**
  - Auto-generated card numbers for new users
  - Encrypted card storage (AES-256-CTR encryption)
  - Blind indexing for searchable encryption
  - Unique card constraints

- **Dashboard**
  - User profile display
  - Revenue analytics with Chart.js
  - Transaction visualization
  - User account overview
  - Real-time balance display
  - Automatic data refresh on load

- **Money Transfers**
  - Send money to other users by card number
  - Real-time balance updates
  - Automatic transfer validation
  - Error handling (insufficient funds)
  - Modal-based transfer interface

- **Security**
  - Password encryption with bcrypt
  - Card encryption with AES-256-CTR
  - Blind index hashing for secure searches
  - ACID transactions for money transfers
  - CORS enabled
  - Input validation with class-validator

### 🔄 In Progress / Planned

- Multi-factor authentication (MFA)
- Transaction history & detailed logs
- Card block/unblock features
- Admin dashboard
- Email notifications

---

## Tech Stack

### Backend
- **Framework:** NestJS 11.0
- **Runtime:** Node.js (v20.20.2)
- **Language:** TypeScript
- **Database:** PostgreSQL 15
- **ORM:** Prisma 7.6
- **Authentication:** JWT + Passport
- **Security:** bcrypt, crypto (AES-256-CTR)
- **Validation:** class-validator, class-transformer

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Charts:** Chart.js
- **Icons:** FontAwesome
- **Styling:** CSS

### DevOps
- **Containerization:** Docker & Docker Compose
- **Code Quality:** ESLint, Prettier
- **Testing:** Jest

---

## Architecture

### System Design

```
┌─────────────────────────────────────────────────┐
│                  Frontend (React)               │
│  - Auth Components (SignUp, SignIn)            │
│  - Dashboard                                    │
│  - Protected Routes                            │
└────────────────┬────────────────────────────────┘
                 │ (HTTP/REST)
┌────────────────▼────────────────────────────────┐
│             Backend (NestJS)                     │
│  ┌──────────────────────────────────────────┐   │
│  │  Auth Module                             │   │
│  │  - SignUp/SignIn Endpoints               │   │
│  │  - JWT Validation                        │   │
│  │  - Password Hashing                      │   │
│  └──────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────┐   │
│  │  Encrypt Module                          │   │
│  │  - Card Generation                       │   │
│  │  - AES Encryption                        │   │
│  │  - Blind Index Hashing                   │   │
│  └──────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────┐   │
│  │  Prisma Module (ORM)                     │   │
│  │  - Database Abstraction                  │   │
│  │  - Query Building                        │   │
│  └──────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────┘
                 │ (TCP)
┌────────────────▼────────────────────────────────┐
│        PostgreSQL Database (Docker)             │
│  - Users Table                                  │
│  - Encrypted Card Data                         │
│  - Transaction Logs (Future)                    │
└─────────────────────────────────────────────────┘
```

### Data Flow

1. **Registration:** User → Frontend → Backend (Encrypt Module) → Database
2. **Login:** User Credentials → JWT Service → Token → Frontend (localStorage)
3. **Protected Route:** Token → JWT Guard → User Data → Dashboard
4. **Money Transfer:** Sender Card → Backend (Validation) → ACID Transaction → Balance Update → Frontend (Real-time)

---

## Project Structure

```
PayDayBankSystem/
│
├── backend/
│   ├── src/
│   │   ├── auth/                    # Authentication module
│   │   │   ├── auth.controller.ts   # Auth endpoints
│   │   │   ├── auth.service.ts      # Auth business logic
│   │   │   ├── auth.module.ts       # Module definition
│   │   │   ├── dto/                 # Data transfer objects
│   │   │   │   ├── SignUp.dto.ts
│   │   │   │   └── SignIn.dto.ts
│   │   │   ├── guard/               # JWT authentication guard
│   │   │   ├── strategy/            # JWT strategy
│   │   │   └── decorator/           # Custom decorators
│   │   │
│   │   ├── encrypt/                 # Encryption module
│   │   │   ├── encrypt.service.ts   # Card encryption logic
│   │   │   ├── encrypt.controller.ts
│   │   │   └── encrypt.module.ts
│   │   │
│   │   ├── prisma/                  # Database service
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.module.ts
│   │   │
│   │   ├── app.module.ts            # Root module
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts                  # Application entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── migrations/              # Migration history
│   │
│   ├── test/                        # E2E tests
│   ├── generated/                   # Prisma generated files
│   ├── dist/                        # Compiled output
│   ├── compose.yaml                 # Docker Compose config
│   ├── .env                         # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SignUp/
│   │   │   │   ├── SignUp.tsx       # Registration form
│   │   │   │   └── SignUp.css
│   │   │   ├── SignIn/
│   │   │   │   ├── SignIn.tsx       # Login form
│   │   │   │   └── SignIn.css
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.tsx    # Main dashboard
│   │   │   │   └── Dashboard.css
│   │   │   ├── Layout/              # Main layout
│   │   │   ├── Sidebar/             # Navigation sidebar
│   │   │   └── Modals/              # Reusable modals
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoutes.tsx  # Route protection
│   │   │
│   │   ├── data/                    # Static data (JSON)
│   │   ├── assets/                  # Images, fonts
│   │   ├── App.tsx                  # Root component
│   │   ├── App.css
│   │   ├── main.tsx                 # Entry point
│   │   └── vite-env.d.ts
│   │
│   ├── .env                         # Environment variables
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
│
└── package.json                     # Root package.json
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20.20.2 or higher
- **npm** v10 or higher
- **Docker** and **Docker Compose** (for database)
- **Git** (for version control)

### Verify Installation

```bash
node --version      # Should be v20.20.2+
npm --version       # Should be v10+
docker --version    # Should show Docker version
docker-compose --version
```

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/PayDayBankSystem.git
cd PayDayBankSystem
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with environment variables
# Copy the example below and fill in your values
cat > .env << EOF
JWT_SECRET=your_jwt_secret_key
PORT=3000

DATABASE_URL="postgresql://postgres:1111@localhost:5434/paydaybank?schema=public"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=1111
POSTGRES_DB=paydaybank

ENCRYPTION_PASSWORD=your_encryption_password
ENCRYPTION_SALT=your_encryption_salt
HASHING_PEPPER=your_hashing_pepper
EOF

# Start PostgreSQL database in Docker
docker-compose up -d

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_SIGNUP=http://localhost:3000/auth/signup
VITE_SIGNIN=http://localhost:3000/auth/signin
VITE_GET_USER=http://localhost:3000/auth/me
EOF
```

### 4. Verify Setup

```bash
# Back to project root
cd /path/to/PayDayBankSystem

# Check database connection
cd backend && npx prisma db push

# Run validation
npx prisma validate
```

---

## Running the Application

### Start Backend

```bash
cd backend

# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Watch mode
npm run start:debug
```

Backend runs on: **http://localhost:3000**

### Start Frontend

```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Frontend runs on: **http://localhost:5173**

### Start Everything Together

```bash
# From project root
npm run start

# Or manually in separate terminals:
# Terminal 1:
cd backend && npm run start:dev

# Terminal 2:
cd frontend && npm run dev

# Terminal 3 (optional - for database management):
cd backend && npx prisma studio
```

---

## API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### 1. **Sign Up** (Register New User)

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "firstName": "John",
  "surName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword@123"
}
```

**Response (Success - 201):**
```json
{
  "firstName": "John",
  "surName": "Doe",
  "email": "john@example.com",
  "createdAt": "2026-04-17T10:30:00Z"
}
```

**Response (Error - 400):**
```json
{
  "statusCode": 400,
  "message": "User has already exist",
  "error": "Bad Request"
}
```

**Validation Rules:**
- Email must be unique
- Email must be valid format
- Password must be at least 6 characters
- First name and surname are required

---

#### 2. **Sign In** (Login)

**Endpoint:** `POST /auth/signin`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword@123"
}
```

**Response (Success - 200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 400):**
```json
{
  "statusCode": 400,
  "message": "Passwords dont match",
  "error": "Bad Request"
}
```

**Token Usage:**
Store the token in `localStorage` and include in header:
```
Authorization: Bearer <access_token>
```

---

#### 3. **Get Current User**

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (Success - 200):**
```json
{
  "id": 1,
  "firstName": "John",
  "surName": "Doe",
  "email": "john@example.com",
  "cardNumber": "21abc123def456ghi789jkl0",
  "createdAt": "2026-04-17T10:30:00Z"
}
```

**Response (Error - 401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

#### 4. **Money Transfer**

**Endpoint:** `POST /transfer`

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "cardNumber": "1234 5678 9123 4567",
  "sum": 500
}
```

**Response (Success - 200):**
```json
{
  "message": "Money was sent successfully",
  "sender": {
    "id": 1,
    "firstName": "John",
    "balance": 1500
  }
}
```

**Response (Error - 400):**
```json
{
  "statusCode": 400,
  "message": "Insufficient funds",
  "error": "Bad Request"
}
```

**Validation Rules:**
- Recipient card must exist in system
- Sender must have sufficient balance
- Amount must be greater than 0
- Uses blind index to find recipient securely

**Features:**
- ACID transaction ensures atomic balance updates
- Both sender and recipient balances update atomically
- Prevents partial transfers
- Real-time balance synchronization

---

## Database Schema

### User Model

```prisma
model User {
  id          Int       @id @default(autoincrement())
  firstName   String
  surName     String
  email       String    @unique
  cardNumber  String    @unique        // AES-256 encrypted
  cardIndex   String    @unique        // Blind index hash
  password    String                   // Bcrypt hashed
  balance     Float     @default(0)    // Account balance
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Database Fields Explained

| Field | Type | Purpose | Encryption |
|-------|------|---------|-----------|
| `id` | Int | Primary key | - |
| `firstName` | String | User's first name | None |
| `surName` | String | User's surname | None |
| `email` | String | Email (unique) | None |
| `cardNumber` | String | Bank card number | AES-256-CTR |
| `cardIndex` | String | Searchable blind index | HMAC-SHA256 |
| `password` | String | Login password | Bcrypt (10 rounds) |
| `balance` | Float | Account balance for transfers | None |
| `createdAt` | DateTime | Account creation time | - |
| `updatedAt` | DateTime | Last update time | - |

---

## Security Features

### 1. **Password Security**
- Hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Compared securely during login

```typescript
// Example: Password hashing
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

### 2. **Card Encryption**
- Algorithm: AES-256-CTR
- Initialization Vector (IV): Random 16 bytes
- Stored as: `{iv}:{ciphertext}`

```typescript
// Example: Card encryption
const iv = randomBytes(16);
const cipher = createCipheriv('aes-256-ctr', key, iv);
const encrypted = Buffer.concat([
  cipher.update(cardNumber),
  cipher.final()
]);
const stored = `${iv.toString('hex')}:${encrypted.toString('base64')}`;
```

### 3. **Blind Indexing**
- Enables searching encrypted data without decryption
- Uses HMAC-SHA256
- Prevents full disclosure of card numbers

```typescript
// Example: Blind index
const hash = createHmac('sha256', pepper)
  .update(cardNumber + pepper)
  .digest('hex');
```

### 4. **JWT Authentication**
- Token-based authentication
- Includes user ID in payload
- Validated on protected routes
- Secret key stored in environment

```typescript
// Example: JWT token creation
const token = this.jwt.sign({ id: user.id });
```

### 5. **Protected Routes**
- JWT Guard validates every request
- Automatically rejects invalid tokens
- Decorated with `@UseGuards(JwtGuard)`

### 6. **ACID Transactions**
- Money transfers use `prisma.$transaction()`
- Ensures atomic updates (all-or-nothing)
- Prevents partial transfers if errors occur
- Both sender and recipient balances update simultaneously
- Database rollback on failure

```typescript
// Example: Atomic transfer
await prisma.$transaction(async () => {
  // Deduct from sender
  await prisma.user.update({
    where: { id: senderId },
    data: { balance: { decrement: amount } }
  })
  
  // Add to recipient
  await prisma.user.update({
    where: { id: recipientId },
    data: { balance: { increment: amount } }
  })
})
```

### 7. **Automatic Data Rendering**
- Dashboard auto-fetches user data on component mount
- Real-time balance updates after transfers
- Automatic card number decryption on load
- State synchronization with backend
- Error handling for failed requests

```typescript
// Example: Auto-fetch on mount
useEffect(() => {
  const init = async () => {
    const userData = await isAuthorized()
    if (userData) {
      await decryptCardNumber(userData.cardNumber)
      setCurrentSumAccount(userData.balance)
    }
  }
  init()
}, [])
```

---

## Environment Variables

### Backend (.env)

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this

# Server
PORT=3000

# Database
DATABASE_URL="postgresql://postgres:1111@localhost:5434/paydaybank?schema=public"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=1111
POSTGRES_DB=paydaybank

# Encryption
ENCRYPTION_PASSWORD=your-strong-encryption-password
ENCRYPTION_SALT=your-encryption-salt
HASHING_PEPPER=your-hashing-pepper
```

### Frontend (.env)

```env
VITE_SIGNUP=http://localhost:3000/auth/signup
VITE_SIGNIN=http://localhost:3000/auth/signin
VITE_GET_USER=http://localhost:3000/auth/me
```

⚠️ **IMPORTANT:** 
- Never commit `.env` files to git
- Create `.env.example` with dummy values
- Use strong, random values in production
- Change default credentials before deployment

---

## Available Scripts

### Backend

```bash
npm run build          # Build TypeScript to JavaScript
npm run start          # Run production build
npm run start:dev      # Start with hot reload (development)
npm run start:debug    # Start with debugger
npm run lint           # Run ESLint and fix issues
npm run format         # Format code with Prettier
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Generate coverage report
npm run test:e2e       # Run end-to-end tests
```

### Frontend

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

---

## Project Roadmap

### Phase 1: Authentication ✅
- [x] User registration
- [x] User login with JWT
- [x] Password hashing
- [x] Protected routes

### Phase 2: Card Management ✅
- [x] Auto card generation
- [x] Card encryption
- [x] Blind indexing

### Phase 3: Dashboard ✅
- [x] User profile display
- [x] Analytics charts
- [x] Revenue tracking
- [x] Real-time balance display

### Phase 4: Money Transfers ✅
- [x] Transfer functionality
- [x] ACID transactions
- [x] Balance management
- [x] Error validation
- [x] Frontend modal interface

### Phase 5: Multi-Factor Auth 🔄
- [ ] Email verification
- [ ] OTP (One-Time Password)
- [ ] SMS 2FA
- [ ] Authenticator app support

### Phase 6: Advanced Features 🚀
- [ ] Transaction history & detailed logs
- [ ] Card blocking/unblocking
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Rate limiting
- [ ] Audit logging
- [ ] Recurring transfers
- [ ] Transfer scheduling

### Phase 7: Deployment 🔮
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Cloud deployment (AWS/GCP)
- [ ] Database backup strategy
- [ ] Monitoring & logging

---

## Testing

### Run Unit Tests

```bash
cd backend
npm run test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:cov
```

### Run E2E Tests

```bash
npm run test:e2e
```

---

## Troubleshooting

### Database Connection Issues

**Error:** `Can't reach database server at db:5432`

**Solution:**
```bash
# Restart Docker containers
docker-compose down -v
docker-compose up -d

# Update .env DATABASE_URL to localhost:5434
DATABASE_URL="postgresql://postgres:1111@localhost:5434/paydaybank?schema=public"
```

### Port Already in Use

**Port 3000 (Backend):**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run start:dev
```

**Port 5173 (Frontend):**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Vite will auto-increment port
npm run dev
```

### Authentication Token Issues

**Token not persisted:**
- Check if localStorage is enabled in browser
- Verify token format in developer tools

**Token expired:**
- Re-login to get new token
- Add token refresh logic in future updates

---

## Contributing

### Setup Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/PayDayBankSystem.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make changes and commit: `git commit -am 'Add new feature'`
5. Push to branch: `git push origin feature/your-feature`
6. Open a Pull Request

### Code Style Guidelines

- Follow TypeScript strict mode
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### Running Linter

```bash
# Backend
cd backend && npm run lint

# Frontend  
cd frontend && npm run lint
```

---

## License

This project is licensed under the **UNLICENSED** license. It's provided as an educational project for learning purposes.

---

## Support & Contact

For questions or issues, please:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error logs and reproduction steps

---

## Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Styled with [React](https://react.dev/)
- Database management with [Prisma](https://www.prisma.io/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Icons from [FontAwesome](https://fontawesome.com/)

---

**Happy coding! 🚀**

Last Updated: April 24, 2026
