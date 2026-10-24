/**
 * EVENTS
 * ---------------------------------------------------------------------------
 * Add a new event by copying one block and changing the details.
 * Dates are written as "YYYY-MM-DD" (for example "2026-10-17").
 * Times are New Zealand time. The site sorts events automatically into
 * upcoming and past each time it is published (redeploy after editing).
 *
 * Photos: put them in /public/images/events/ and list them under `photos`.
 * The first photo is the cover. Events without photos get a designed card.
 *
 * `draft: true` means the event is a placeholder. Drafts show on the
 * preview site with a "Placeholder" tag but are hidden on the live site.
 */

import type { Localized } from "@/lib/i18n";

export type EventItem = {
  id: string;
  title: Localized;
  date: string; // YYYY-MM-DD
  time?: string; // e.g. "6:00 pm – 9:00 pm"
  venue: Localized;
  summary: Localized;
  photos?: { src: string; alt: Localized }[];
  draft?: boolean;
};

export const events: EventItem[] = [
  {
    id: "fourth-druk-gyalpo-birth-anniversary-2026",
    title: { en: "Birth Anniversary of the Fourth Druk Gyalpo, His Majesty Jigme Singye Wangchuck" },
    date: "2026-11-11",
    // TODO(committee): add the time, the venue, and what is planned.
    venue: { en: "Venue to be announced, Auckland" },
    summary: {
      en: "The community gathers to mark the Birth Anniversary of the Fourth Druk Gyalpo, His Majesty Jigme Singye Wangchuck — a day also celebrated as Constitution Day and National Happiness Day.",
    },
  }
];
