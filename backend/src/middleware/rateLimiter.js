// backend/src/middleware/rateLimiter.js

import { redisClient } from "../config/redis.js";

const rateLimiter = ({api, limits,}) => {

    return async (req, res, next) => {
        try {
            // Disable Rate Limiting
            if (process.env.RATE_LIMITING !== "true") {
                return next();
            }
            // User Details
            const role = req.user?.role || "GUEST";
            const userId = req.user?.id;
            const ip = req.ip;

            // Role Config
            const roleConfig = limits[role];

            // If role config not found
            if (!roleConfig) {
                return res.status(500).json({
                    success: false,
                    message: "Rate limiter role configuration missing",
                });
            }

            const { bucketSize, refillTime,} = roleConfig;

            // Redis Key
            const redisKey = userId
                ? `rl:${api}:${role}:${userId}`
                : `rl:${api}:GUEST:${ip}`;

            // Current Requests
            const currentRequests = await redisClient.get(redisKey);

            // First Request
            if (currentRequests === null) {
                await redisClient.set(
                    redisKey,
                    1,
                    {
                        EX: refillTime,
                    }
                );

                res.setHeader(
                    "X-RateLimit-Limit",
                    bucketSize
                );

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
                    message: "Too many requests. Try again later.",
                });
            }
            // Increment Requests
            const updatedRequests = await redisClient.incr(redisKey);
            // Headers
            res.setHeader(
                "X-RateLimit-Limit",
                bucketSize
            );

            res.setHeader(
                "X-RateLimit-Remaining",
                bucketSize - updatedRequests
            );
            next();
        } catch (error) {
            console.log(
                "Rate Limiter Error:",
                error
            );
            next();
        }
    };
};

export default rateLimiter;