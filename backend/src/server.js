// backend/src/server.js

import dotenv from "dotenv";
import app from "./app.js";
import connectRedis from "./config/redis.js";
import checkS3Connection from "./utils/checkS3Connection.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectRedis();

await checkS3Connection();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});