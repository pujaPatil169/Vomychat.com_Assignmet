import express from 'express';
import { register, login, forgotPassword } from '../controllers/authController.js';
const router = express.Router();
router.post('/register',rateLimiter, register);
router.post('/login',rateLimiter, login);
router.post('/forgot-password',rateLimiter, forgotPassword);
export default router;
