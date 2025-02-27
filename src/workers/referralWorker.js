const { Worker } = require('bullmq');
const redisClient = require('../config/redis');
const sendEmail = require('../utils/emailService'); // Assume you have an email service

const worker = new Worker(
  'referralQueue',
  async (job) => {
    const { email, referrer } = job.data;
    await sendEmail(email, `You were referred by ${referrer}!`);
  },
  { connection: redisClient }
);

worker.on('completed', (job) => {
  console.log(`✅ Referral email sent to ${job.data.email}`);
});
