
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('connect', () => console.log('🔹 Connected to Redis'));

redisClient.connect();

module.exports = redisClient;
