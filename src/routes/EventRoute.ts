import express, { Request, Response } from "express";
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "../services/EventService";
import type { Event } from "../models/Event";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    if (req.query.category) {
        const category = req.query.category as string;
        const filteredEvents = await getEventByCategory(category);
        res.json(filteredEvents);
    } else {
        res.json(await getAllEvents());
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const event = await getEventById(id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send("Event not found");
    }
});

router.post("/", async (req: Request, res: Response) => {
    const newEvent: Event = req.body;
    await addEvent(newEvent);
    res.json(newEvent);
});

export default router;