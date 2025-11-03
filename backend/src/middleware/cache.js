import redisClient from '../config/redis.js';

const CACHE_DURATION = 1800;

const cacheMiddleware = async (req, res, next) => {
  try {
    if (!redisClient.isReady) {
      return next();
    }

    const key = req.originalUrl;
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
      try {
        await redisClient.setEx(key, CACHE_DURATION, JSON.stringify(body));
      } catch (err) {
        console.warn('Cache write failed:', err.message);
      }
      res.sendResponse(body);
    };

    next();
  } catch (error) {
    console.warn('Cache middleware error:', error.message);
    next();
  }
};

export default cacheMiddleware;
