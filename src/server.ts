// filepath: /C:/Users/ASUS/Thanaphat-Sr-713-Lab02/src/server.ts
import express, { Request, Response } from "express";
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/EventService";
import { getAllBooks, getBookByTitle, getBookById, addOrUpdateBook } from "./services/BookService";
import type { Event } from "./models/Event";
import type { Book } from "./models/Book";
import multer from 'multer';
import { uploadFile } from './services/UploadFileService';

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
    const output = "Welcome to the Event API";
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
        res.status(404).send("Event not found");
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
        res.status(404).send("Book not found");
    }
});

app.post("/books", async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    const result = await addOrUpdateBook(newBook);
    res.json(result);
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const bucket = 'bucket01'; // Ensure this bucket exists in your Supabase storage
    const filePath = `uploads/${file.originalname}`;

    const outputUrl = await uploadFile(bucket, filePath, file);

    res.status(200).send(outputUrl);
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});