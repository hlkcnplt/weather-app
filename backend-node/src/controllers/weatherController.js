import redisClient from "../config/redis.js";
import { fetchWeather } from "../services/weatherService.js";

const TTL_SECONDS = 60 * 30;

const tryGetCache = async (key) => {
  try {
    if (redisClient && redisClient.isReady) {
      const v = await redisClient.get(key);
      if (v) return JSON.parse(v);
    }
  } catch (err) {
    console.warn("Redis read error:", err?.message || err);
  }
  return null;
};

const trySetCache = async (key, value, ttl = TTL_SECONDS) => {
  try {
    if (redisClient && redisClient.isReady) {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    }
  } catch (err) {
    console.warn("Redis write error:", err?.message || err);
  }
};

export const getWeather = async (req, res) => {
  try {
    const city = (req.params.city || "").trim();
    if (!city)
      return res.status(400).json({ error: "City parameter required" });

    const key = `weather:current:${city.toLowerCase()}`;
    const cached = await tryGetCache(key);
    if (cached) return res.json({ source: "cache", data: cached });

    const data = await fetchWeather(city);
    if (!data) {
      return res
        .status(503)
        .json({ error: "Could not retrieve weather data." });
    }
    await trySetCache(key, data);
    res.json({ source: "api", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};
