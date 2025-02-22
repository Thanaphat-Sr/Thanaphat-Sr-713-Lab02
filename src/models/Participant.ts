import type { Event } from "./Event";

export interface Participant {
  id: number;
  name: string;
  email: string;
  events: Event[];
}