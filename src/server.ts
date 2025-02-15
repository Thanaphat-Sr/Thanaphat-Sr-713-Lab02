import express, { Request, Response } from "express";
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/EventService";
import { getAllBooks, getBookByTitle, getBookById, addOrUpdateBook } from "./services/BookService";
import type { Event } from "./services/EventService";
import type { Book } from "./services/BookService";

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