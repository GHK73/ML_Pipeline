// backend/src/routes/authRoutes.js

import express from "express";
import { signup, signin, googleSignup, getCurrentUser } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", rateLimiter({ api: "signup", bucketSize: 5, refillTime: 60 }), signup);

router.post("/signin", rateLimiter({ api: "signin", bucketSize: 5, refillTime: 60 }), signin);

router.post("/google", rateLimiter({ api: "google", bucketSize: 10, refillTime: 60 }), googleSignup);

router.get("/me", rateLimiter({ api: "me", bucketSize: 20, refillTime: 60 }), authMiddleware, getCurrentUser);

export default router;