// backend/src/utils/generateFileHash.js

import crypto from "crypto";
import fs from "fs";

const generateFileHash = (filePath)=>{
    return new Promise((resolve, reject)=>{
        const hash = crypto.createHash("sha256");
        const stream = fs.createReadStream(filePath);

        stream.on("data",(chunk)=>{
            hash.update(chunk);
        });

        stream.on("end",()=>{
            resolve(hash.digest("hex"));
        });
        stream.on("error",(error)=>{
            reject(error);
        });
    });
};

export default generateFileHash;