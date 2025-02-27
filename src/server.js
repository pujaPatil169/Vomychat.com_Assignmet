import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import referralRoutes from './routes/referral.js';
import { verifyToken } from './middleware/auth.js';
const rateLimiter = require('./middleware/rateLimiter');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(rateLimiter); // Apply rate limiting to all API routes


  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Connection pooling to limit connections
  }).then(() => console.log("🚀 MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
// Routes
app.use('/api', authRoutes);
app.use('/api', referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));