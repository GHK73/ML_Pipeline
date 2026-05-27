// backend/src/app.js

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })    
);

app.get("/",(req,res)=>{
    res.json({
        message: "Backend Running",
    });
});

app.use("/api/auth",authRoutes);

export default app;