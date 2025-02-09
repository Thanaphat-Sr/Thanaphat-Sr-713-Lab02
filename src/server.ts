import express, { Request, Response } from 'express'
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.get('/test', (req, res) => {
    let returnObj = {
        name: 'test',
        age: 20,
        address: 'Thai'
    }
    res.send(returnObj);
})

app.get('/test', (req: Request, res: Response) => {
    const id = req.query.id;   
    const output = `id: ${id}`;
    res.send(output);
  })

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
  }
];

app.get("/events", (req, res) => {
    res.json(events);
  });
  