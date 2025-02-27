# Linktree/Bento.me Backend with Referral System

## Overview
This project is a **backend system** for a **Linktree/Bento.me-like** platform with a built-in **referral system**. It provides **user authentication, referral tracking, and analytics** using **Node.js, Express, MongoDB, and Redis**.

## Features
- **User Authentication** (Register, Login with JWT)
- **Referral System** (Unique referral codes, tracking referrals)
- **Referral Analytics** (Count successful referrals, fetch referral details)
- **Caching & Optimization** (Redis for caching, BullMQ for background processing)
- **Rate Limiting** (Prevents abuse and improves security)
- **Testing** (Unit and integration tests for APIs, referral system edge cases)
- **Production Ready** (PM2 for process management, scalable architecture)

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Caching & Queues**: Redis, BullMQ
- **Security**: JWT, Express-Rate-Limit
- **Process Management**: PM2
- **Testing**: Jest, Supertest

## Project Structure
```
backend/
│── controllers/
│   ├── authController.js
│   ├── referralController.js
│── models/
│   ├── User.js
│   ├── Referral.js
│── routes/
│   ├── authRoutes.js
│   ├── referralRoutes.js
│── middleware/
│   ├── authMiddleware.js
│   ├── rateLimiter.js
│── utils/
│   ├── emailService.js
│   ├── jwtService.js
│── config/
│   ├── db.js
│   ├── dotenv.config.js
│── tests/
│   ├── auth.test.js
│   ├── referral.test.js
│   ├── setupTestDB.js
│── jest.setup.js
│── server.js
│── package.json
│── README.md
```

## Installation & Setup

### 1. Clone the Repository
```sh
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://localhost:6379
```

### 4. Start the Server
For development:
```sh
npm start
```
For production (with PM2):
```sh
npm install -g pm2
pm run start:prod
```

### 5. Run Tests
Run unit and integration tests using Jest:
```sh
npm test
```

## API Endpoints

### **Auth Routes** (`/api/auth`)
| Method | Endpoint      | Description          |
|--------|-------------|----------------------|
| POST   | `/register`  | User Registration    |
| POST   | `/login`     | User Login (JWT)     |

### **Referral Routes** (`/api/referrals`)
| Method | Endpoint          | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/referrals`      | Get referrals for a user          |
| GET    | `/referral-stats` | Get successful referral count     |

## Deployment Notes
- **Use PM2 for production**: `pm2 start server.js -i max`
- **MongoDB should be hosted securely** (MongoDB Atlas recommended)
- **Redis must be configured properly for caching & job queues**

## Contributing
Feel free to fork and improve the project. PRs are welcome!

## License
MIT License

