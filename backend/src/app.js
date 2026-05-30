// backend/src/app.js

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })    
);

app.use(helmet());

app.use(morgan("dev"));

app.get("/",(req,res)=>{
    res.json({
        message: "Backend Running",
    });
});

app.use("/api/auth",authRoutes);

export default app;