// backend/src/server.js

import dotenv from "dotenv";
import app from "./app.js";
import connectRedis from "./config/redis.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectRedis();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});