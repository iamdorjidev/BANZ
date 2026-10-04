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
    id: "khadar-2026",
    title: { en: "Khadar for the newly elected Executive Committee" },
    // TODO(committee): add the time and venue, and check the description below.
    date: "2026-10-04",
    venue: { en: "Venue to be announced, Auckland" },
    summary: {
      en: "The community offers khadar to welcome the newly elected Executive Committee.",
    },
  },
  {
    id: "losar-2027",
    title: { en: "Losar celebration" },
    // TODO(committee): replace with the real date once set.
    date: "2027-02-06",
    venue: { en: "Venue to be confirmed, Auckland" },
    summary: {
      en: "Welcoming the new year together with food, song and family.",
    },
    draft: true,
  },
  {
    id: "founding-gathering",
    title: { en: "Community gathering" },
    // TODO(committee): this is the stage photograph in /public/images. Confirm its name and date.
    date: "2025-11-11",
    venue: { en: "Auckland" },
    summary: {
      en: "One of the first large gatherings of the Bhutanese community in Auckland.",
    },
    photos: [
      {
        src: "/images/community-gathering.jpg",
        alt: { en: "The Bhutanese community in Auckland gathered on stage, many in gho and kira." },
      },
    ],
    draft: true,
  },
];
