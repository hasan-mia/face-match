const Redis = require('ioredis')
const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = require('../constant')

class RedisClient {
  constructor(options) {
    // Set default options or use provided options
    this.options = options || {
      host:
        process.env.NODE_ENV === 'production'
          ? 'redis-service.default.svc.cluster.local'
          : REDIS_HOST,
      port: process.env.NODE_ENV === 'production' ? 6379 : REDIS_PORT,
      password: process.env.NODE_ENV === 'production' ? undefined : REDIS_PASS,
    }

    // Create a new Redis client instance with authentication options
    this.redis = new Redis(this.getRedisOptions())

    // Log connection success
    this.redis.on('connect', () => {
      console.log('Connected to Redis Cache Server')
    })
  }

  // Helper method to construct the Redis options object
  getRedisOptions() {
    const { host, port, password } = this.options
    return {
      host,
      port,
      password,
    }
  }

  // Method to set a key-value pair in Redis
  async set(key, value, expire = 300) {
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', expire)
    } catch (error) {
      console.error(`Error setting key '${key}' in Redis:`, error)
    }
  }

  // Method to get the value of a key from Redis
  async get(key) {
    try {
      const value = await this.redis.get(key)
      return JSON.parse(value)
    } catch (error) {
      console.error(
        `Error retrieving value for key '${key}' from Redis:`,
        error,
      )
      return null
    }
  }

  // Method to remove a key from Redis
  async remove(key) {
    try {
      const result = await this.redis.del(key)
      if (result === 1) {
        console.log(`Key '${key}' removed successfully from Redis.`)
      } else {
        console.log(`Key '${key}' does not exist in Redis.`)
      }
    } catch (error) {
      console.error(`Error removing key '${key}' from Redis:`, error)
    }
  }

  // Method to pop an item from a list in Redis
  async lpop(listKey) {
    try {
      const item = await this.redis.lpop(listKey);
      if (item) {
        console.log(`Item '${item}' popped from list '${listKey}'.`);
        return JSON.parse(item);
      } else {
        console.log(`List '${listKey}' is empty.`);
        return null;
      }
    } catch (error) {
      console.error(`Error popping item from list '${listKey}':`, error);
      return null;
    }
  }

  // Method count from a list in Redis
  async llen(listKey) {
    try {
      const length = await this.redis.llen(listKey);
      console.log(`Length of list '${listKey}': ${length}`);
      return length;
    } catch (error) {
      console.error(`Error getting length of list '${listKey}':`, error);
      return 0;
    }
  }

  // Method to push an item from a list in Redis
  async rpush(listKey, item) {
    try {
      await this.redis.rpush(listKey, item);
      console.log(`Item '${item}' pushed to list '${listKey}'.`);
    } catch (error) {
      console.error(`Error pushing item to list '${listKey}':`, error);
    }
  }

  // Method to close the Redis connection
  async close() {
    try {
      await this.redis.quit()
      console.log('Redis connection closed.')
    } catch (error) {
      console.error('Error closing Redis connection:', error)
    }
  }
}

// Create a single instance of RedisClient for reusability
const redis = new RedisClient()

module.exports = {
  redis,
}
