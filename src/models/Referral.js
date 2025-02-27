const mongoose = require('mongoose');
const ReferralSchema = new mongoose.Schema({
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateReferred: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'successful'], default: 'pending' }
});
module.exports = mongoose.model('Referral', ReferralSchema);