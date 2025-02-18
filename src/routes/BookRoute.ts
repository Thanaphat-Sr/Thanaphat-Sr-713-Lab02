import express, { Request, Response } from "express";
import { getAllBooks, getBookByTitle, getBookById, addOrUpdateBook } from "../repository/BookRepository";
import type { Book } from "../models/Book";
import multer from 'multer';
import { uploadFile } from "../services/UploadFileService";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req: Request, res: Response) => {
    const title = req.query.title as string;
    if (title) {
        const filteredBooks = await getBookByTitle(title);
        res.json(filteredBooks);
    } else {
        res.json(await getAllBooks());
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("ไม่พบหนังสือ");
    }
});

router.post("/", upload.single('file'), async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    const file = req.file;

    if (file) {
        const bucket = process.env.SUPABASE_BUCKET_NAME;
        const filePath = process.env.UPLOAD_DIR;

        if (!bucket || !filePath) {
            res.status(500).send('ไม่ได้กำหนดชื่อ bucket หรือเส้นทางไฟล์');
            return;
        }

        const fileUrl = await uploadFile(bucket, filePath, file);
        newBook.fileUrl = fileUrl;
    }

    const result = await addOrUpdateBook(newBook, file);
    res.json(result);
});

export default router;