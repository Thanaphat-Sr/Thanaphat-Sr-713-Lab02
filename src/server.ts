import express, { Request, Response } from "express";
import multer from 'multer';
import dotenv from 'dotenv';
import eventRoute from './routes/EventRoute';
import bookRoute from './routes/BookRoute';
import { uploadFile } from "./services/UploadFileService";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json()); // Middleware เพื่อแปลง JSON bodies

app.listen(port, () => {
    console.log(`แอปกำลังฟังที่ http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
    const output = "ยินดีต้อนรับสู่ Event API";
    res.send(output);
});

app.use('/events', eventRoute);
app.use('/books', bookRoute);

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send('ไม่มีไฟล์ที่อัปโหลด');
      return;
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME;
    const filePath = process.env.UPLOAD_DIR;

    if (!bucket || !filePath) {
      res.status(500).send('ไม่ได้กำหนดชื่อ bucket หรือเส้นทางไฟล์');
      return;
    }

    const outputUrl = await uploadFile(bucket as string, filePath as string, file);

    res.status(200).send(outputUrl);
  } catch (error) {
    res.status(500).send('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
  }
});