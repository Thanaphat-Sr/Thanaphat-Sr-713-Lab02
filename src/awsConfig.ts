// filepath: /C:/Users/ASUS/Thanaphat-Sr-713-Lab02/src/awsConfig.ts
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: "a9b2f1a2c85f18cac3d244c13ed98148",
    secretAccessKey: "fe98d39269c52cba680fe0654826018a47b910878d5c004ee87c1518bfb2f124"
  },
  endpoint: "https://ltnigyywitvsjpraqkct.supabase.co/storage/v1/s3",
  region: "ap-southeast-1",
  forcePathStyle: true
});

export default s3Client;