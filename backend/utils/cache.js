const redis = require("../config/RedisConenction");

const generateCacheKey = (prefix, params = {}) => {
  const entries = Object.entries(params).sort();
  const serialized = entries
    .map(([key, value]) => {
      if (value === undefined || value === null) return `${key}=`;
      if (Array.isArray(value)) return `${key}=${value.join(",")}`;
      if (typeof value === "object") return `${key}=${JSON.stringify(value)}`;
      return `${key}=${value}`;
    })
    .join("&");
  return `${prefix}:${serialized}`;
};

const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error(`Redis get error for key ${key}:`, err.message);
    return null;
  }
};

const setCache = async (key, value, ttl = 60 * 60) => {
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch (err) {
    console.error(`Redis set error for key ${key}:`, err.message);
  }
};

const deleteCache = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (err) {
    console.error(`Redis delete error for pattern ${pattern}:`, err.message);
  }
};

module.exports = { generateCacheKey, getCache, setCache, deleteCache };