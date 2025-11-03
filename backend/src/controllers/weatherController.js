import redisClient from '../config/redis.js';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherService.js';

const TTL_SECONDS = 60 * 30; // 30 minutes

const tryGetCache = async (key) => {
  try {
    if (redisClient && redisClient.isReady) {
      const v = await redisClient.get(key);
      if (v) return JSON.parse(v);
    }
  } catch (err) {
    console.warn('Redis read error:', err?.message || err);
  }
  return null;
};

const trySetCache = async (key, value, ttl = TTL_SECONDS) => {
  try {
    if (redisClient && redisClient.isReady) {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    }
  } catch (err) {
    console.warn('Redis write error:', err?.message || err);
  }
};

export const getCurrentWeather = async (req, res, next) => {
  try {
    const city = (req.params.city || '').trim();
    if (!city) return res.status(400).json({ error: 'City parameter required' });

    const key = `weather:current:${city.toLowerCase()}`;
    const cached = await tryGetCache(key);
    if (cached) return res.json({ source: 'cache', data: cached });

    const data = await fetchCurrentWeather(city);
    await trySetCache(key, data);
    res.json({ source: 'api', data });
  } catch (err) {
    next(err);
  }
};

export const getWeatherForecast = async (req, res, next) => {
  try {
    const city = (req.params.city || '').trim();
    if (!city) return res.status(400).json({ error: 'City parameter required' });

    const key = `weather:forecast:${city.toLowerCase()}`;
    const cached = await tryGetCache(key);
    if (cached) return res.json({ source: 'cache', data: cached });

    const data = await fetchForecast(city);
    await trySetCache(key, data);
    res.json({ source: 'api', data });
  } catch (err) {
    next(err);
  }
};
