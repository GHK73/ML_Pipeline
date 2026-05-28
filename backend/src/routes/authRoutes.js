// backend/src/routes/authRoutes.js
import express from "express";
import {signup, googleSignup} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/google",googleSignup);

export default router;

