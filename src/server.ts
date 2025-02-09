import express, { Request, Response } from 'express'
const app = express()
const port = 3000

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })

// app.get('/test', (req, res) => {
//     let returnObj = {
//         name: 'test',
//         age: 20,
//         address: 'Thai'
//     }
//     res.send(returnObj);
// })

// app.get('/test', (req: Request, res: Response) => {
//     const id = req.query.id;   
//     const output = `id: ${id}`;
//     res.send(output);
//   })

interface Event {
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    petsAllowed: boolean;
    organizer: string;
  }
  
  const events: Event[] = [
    {
      id: 1,
      category: "Music",
      title: "Concert",
      description: "A live concert",
      location: "London",
      date: "2021-07-01",
      time: "19:00",
      petsAllowed: false,
      organizer: "Live Nation",
    },
    {
      id: 2,
      category: "Art",
      title: "Art Exhibition",
      description: "An exhibition of modern art",
      location: "Paris",
      date: "2021-08-15",
      time: "10:00",
      petsAllowed: true,
      organizer: "Art World",
    },
    {
      id: 3,
      category: "Technology",
      title: "Tech Conference",
      description: "A conference about the latest in tech",
      location: "San Francisco",
      date: "2021-09-10",
      time: "09:00",
      petsAllowed: false,
      organizer: "Tech Innovators",
    },
    {
      id: 4,
      category: "Food",
      title: "Food Festival",
      description: "A festival with food from around the world",
      location: "New York",
      date: "2021-10-05",
      time: "12:00",
      petsAllowed: true,
      organizer: "Food Lovers",
    },
    {
      id: 5,
      category: "Sports",
      title: "Marathon",
      description: "A city-wide marathon",
      location: "Boston",
      date: "2021-11-20",
      time: "07:00",
      petsAllowed: false,
      organizer: "Marathon Inc.",
    },
    {
      id: 6,
      category: "Education",
      title: "Science Fair",
      description: "A fair showcasing science projects",
      location: "Chicago",
      date: "2021-12-01",
      time: "10:00",
      petsAllowed: true,
      organizer: "Science Association",
    },
    // Additional events
    {
      id: 7,
      category: "Music",
      title: "Jazz Night",
      description: "A night of smooth jazz",
      location: "New Orleans",
      date: "2021-12-15",
      time: "20:00",
      petsAllowed: false,
      organizer: "Jazz Club",
    },
    {
      id: 8,
      category: "Art",
      title: "Sculpture Exhibit",
      description: "An exhibit of modern sculptures",
      location: "Rome",
      date: "2022-01-10",
      time: "11:00",
      petsAllowed: true,
      organizer: "Art Gallery",
    },
    {
      id: 9,
      category: "Technology",
      title: "AI Summit",
      description: "A summit on artificial intelligence",
      location: "Tokyo",
      date: "2022-02-20",
      time: "09:00",
      petsAllowed: false,
      organizer: "Tech World",
    },
    {
      id: 10,
      category: "Food",
      title: "Wine Tasting",
      description: "A wine tasting event",
      location: "Napa Valley",
      date: "2022-03-05",
      time: "14:00",
      petsAllowed: true,
      organizer: "Wine Lovers",
    },
    {
      id: 11,
      category: "Sports",
      title: "Basketball Tournament",
      description: "A local basketball tournament",
      location: "Los Angeles",
      date: "2022-04-10",
      time: "10:00",
      petsAllowed: false,
      organizer: "Sports Club",
    }
  ];
  
  app.get("/events", (req: Request, res: Response) => {
    const category = req.query.category as string;
    console.log(`Received category: ${category}`);
    if (category) {
      const filteredEvents = events.filter((event) => event.category === category);
      console.log(`Filtered events: ${JSON.stringify(filteredEvents)}`);
      res.json(filteredEvents);
    } else {
      res.json(events);
    }
  });
  
  interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
  }
  
  const books: Book[] = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedDate: "1925" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedDate: "1960" },
    { id: 3, title: "1984", author: "George Orwell", publishedDate: "1949" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", publishedDate: "1813" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", publishedDate: "1951" }
  ];
  
  app.get("/books", (req: Request, res: Response) => {
    const title = req.query.title as string;
    console.log(`Received title: ${title}`);
    if (title) {
      const filteredBooks = books.filter((book) => book.title.toLowerCase().startsWith(title.toLowerCase()));
      console.log(`Filtered books: ${JSON.stringify(filteredBooks)}`);
      res.json(filteredBooks);
    } else {
      res.json(books);
    }
  });

// Endpoint to get event by ID
app.get("/events/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const event = events.find((event) => event.id === id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).send("Event not found");
    }
  });
// http://localhost:3000/events/1

// Endpoint to get book by ID
app.get("/books/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Book not found");
    }
  });
//http://localhost:3000/books/1