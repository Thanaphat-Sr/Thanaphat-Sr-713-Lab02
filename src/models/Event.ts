import type { Organizer } from "./Organizer";

export type Event = {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: Organizer;
};