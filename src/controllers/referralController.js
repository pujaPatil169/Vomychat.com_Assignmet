const Referral = require('../models/Referral');
const User = require('../models/User');
const redisClient = require('../config/redis');
const referralQueue = require('../utils/referralQueue');

// Add user to referral queue for email
const sendReferralEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const referrer = req.user.name;

    await referralQueue.add('sendReferralEmail', { email, referrer });

    res.json({ message: 'Referral email will be sent shortly' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getReferrals = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const referrals = await Referral.find({ referrerId: req.user.id })
      .populate('referredUserId')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getReferralStats = async (req, res) => {
  try {
    const cacheKey = `referralStats:${req.user.id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData)); // Return cached response
    }

    const count = await Referral.countDocuments({ referrerId: req.user.id, status: 'successful' });

    await redisClient.set(cacheKey, JSON.stringify({ successfulReferrals: count }), {
      EX: 3600, // Cache for 1 hour
    });

    res.json({ successfulReferrals: count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReferrals, getReferralStats, sendReferralEmail };
