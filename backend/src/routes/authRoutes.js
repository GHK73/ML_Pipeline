// backend/src/routes/authRoutes.js
import express from "express";
import {signup,signin, googleSignup,getCurrentUser} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",googleSignup);
router.get("/me",authMiddleware,getCurrentUser);

export default router;

