import type { Event } from "./Event";

export type Organizer = {
  id?: number;
  name: string;
  contact?: string;
  events?: Event[];
};