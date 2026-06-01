// backend/src/utils/checkS3Connection.js

import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

const checkS3Connection = async () => {
    try {
        const response = await s3.send(
            new ListBucketsCommand({})
        );

        console.log("✅ AWS S3 Connected Successfully");
        response.Buckets?.forEach((bucket) => {
            console.log(`Bucket: ${bucket.Name}`);
        });
    } catch (error) {
        console.error("❌ Failed To Connect AWS S3");
        console.error(error);
    }
};

export default checkS3Connection;