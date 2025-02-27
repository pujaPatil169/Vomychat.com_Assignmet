const express = require('express');
const { getReferrals, getReferralStats } = require('../controllers/referralController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/referrals', authMiddleware,rateLimiter, getReferrals);
router.get('/referral-stats', authMiddleware,rateLimiter, getReferralStats);
router.post('/send-email', sendReferralEmail);

module.exports = router;