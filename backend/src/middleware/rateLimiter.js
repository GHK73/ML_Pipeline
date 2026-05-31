// backend/src/middleware/rateLimiter.js

import { redisClient } from "../config/redis.js";

const rateLimiter = ({api, bucketSize, refillTime}) => 
{
    if(process.env.RATE_LIMITING !== "true"){
        return next();
    }
    return async (req, res, next) => {
        try {
            const ip = req.ip;
            const redisKey = `rl:${api}:${ip}`;
            const currentRequests = await redisClient.get(redisKey);

            // First Request
            if (currentRequests === null) {
                await redisClient.set(redisKey, 1, {
                    EX: refillTime
                });
                res.setHeader(
                    "X-RateLimit-Remaining",
                    bucketSize - 1
                );
                return next();
            }

            // Limit Exceeded
            if (Number(currentRequests) >= bucketSize) {

                return res.status(429).json({
                    success: false,
                    message: "Too many requests. Try again later."
                });
            }

            // Increment Request Count
            const updatedRequests = await redisClient.incr(redisKey);

            // Remaining Requests
            res.setHeader(
                "X-RateLimit-Remaining",
                bucketSize - updatedRequests
            );

            next();

        } catch (error) {
            console.log("Rate Limiter Error:", error);
            next();
        }
    };
};

export default rateLimiter;