import express, { Request, Response } from "express";
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/EventService";
import { getAllBooks, getBookByTitle, getBookById, addOrUpdateBook } from "./services/BookService";
import type { Event } from "./models/Event";
import type { Book } from "./models/Book";
import multer from 'multer';
import dotenv from 'dotenv';
import { uploadFile } from './services/UploadFileService';

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

app.get("/events", async (req: Request, res: Response) => {
    if (req.query.category) {
        const category = req.query.category as string;
        const filteredEvents = await getEventByCategory(category);
        res.json(filteredEvents);
    } else {
        res.json(await getAllEvents());
    }
});

app.get("/events/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const event = await getEventById(id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send("ไม่พบ Event");
    }
});

app.post("/events", async (req: Request, res: Response) => {
    const newEvent: Event = req.body;
    const addedEvent = await addEvent(newEvent);
    res.json(addedEvent);
});

app.get("/books", async (req: Request, res: Response) => {
    const title = req.query.title as string;
    if (title) {
        const filteredBooks = await getBookByTitle(title);
        res.json(filteredBooks);
    } else {
        res.json(await getAllBooks());
    }
});

app.get("/books/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("ไม่พบหนังสือ");
    }
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/books", upload.single('file'), async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    const file = req.file;
    const result = await addOrUpdateBook(newBook, file);
    res.json(result);
});

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