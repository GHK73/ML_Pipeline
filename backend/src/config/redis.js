// backend/src/config/redis.js

import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.log("Redis Connection Failed:", error);
    }
};

export default connectRedis;
export { redisClient };