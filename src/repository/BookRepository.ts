import type { Book } from "../models/Book";
import { uploadFile } from '../services/UploadFileService';
import { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const books: Book[] = [
    {
        id: 1,
        title: "Book One",
        author: "Author One",
        publishedDate: "2021-01-01",
        fileUrl: ""
    },
    {
        id: 2,
        title: "Book Two",
        author: "Author Two",
        publishedDate: "2021-02-01",
        fileUrl: ""
    },
    {
        id: 3,
        title: "Book Three",
        author: "Author Three",
        publishedDate: "2021-03-01",
        fileUrl: ""
    }
];

export function getBookByTitle(title: string): Promise<Book[]> {
    const filteredBooks = books.filter((book) => book.title.toLowerCase().startsWith(title.toLowerCase()));
    return Promise.resolve(filteredBooks);
}

export function getAllBooks(): Promise<Book[]> {
    return Promise.resolve(books);
}

export function getBookById(id: number): Promise<Book | undefined> {
    return Promise.resolve(books.find((book) => book.id === id));
}

export async function addOrUpdateBook(newBook: Book, file?: Express.Multer.File): Promise<{ message: string, book: Book }> {
    const existingBookIndex = books.findIndex((book) => book.id === newBook.id);

    if (file) {
        const bucket = process.env.SUPABASE_BUCKET_NAME;
        const filePath = process.env.UPLOAD_DIR;
        if (!bucket || !filePath) {
            throw new Error('Bucket name or file path is not defined');
        }
        const imageUrl = await uploadFile(bucket, filePath, file);
        newBook.imageUrl = imageUrl;
    }

    if (existingBookIndex !== -1) {
        // Update existing book
        books[existingBookIndex] = newBook;
        return Promise.resolve({ message: "Book updated", book: newBook });
    } else {
        // Add new book
        newBook.id = books.length + 1;
        books.push(newBook);
        return Promise.resolve({ message: "Book added", book: newBook });
    }
}