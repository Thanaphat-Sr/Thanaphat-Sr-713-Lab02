// filepath: /C:/Users/ASUS/Thanaphat-Sr-713-Lab02/src/services/UploadFileService.ts
import s3Client from '../awsConfig';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Express } from 'express';

export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<string> {
  const params = {
    Bucket: bucket,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log('File uploaded successfully:', data);
    const publicUrl = `https://{your-supabase-url}/storage/v1/object/public/${bucket}/${filePath}`;
    console.log('File uploaded successfully:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}