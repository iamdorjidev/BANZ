import { events, type EventItem } from "./events";
import { visible } from "@/lib/drafts";
import { todayNZ } from "@/lib/dates";

/** Upcoming events, soonest first. An event stays "upcoming" through its own day. */
export function upcomingEvents(): EventItem[] {
  const today = todayNZ();
  return visible(events)
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Past events, most recent first. */
export function pastEvents(): EventItem[] {
  const today = todayNZ();
  return visible(events)
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
}
