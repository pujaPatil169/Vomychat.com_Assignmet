const { Queue } = require('bullmq');
const redisClient = require('../config/redis');

const referralQueue = new Queue('referralQueue', {
  connection: redisClient,
});

module.exports = referralQueue;
