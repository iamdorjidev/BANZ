/**
 * NEWS AND NOTICES
 * ---------------------------------------------------------------------------
 * Newest first. Each item needs a unique `slug` (lowercase-words-with-dashes),
 * a date, a title and the text. Paragraphs are separated by a blank line.
 * Items appear on /news and in the RSS feed (/news/rss.xml).
 *
 * Photo (optional): put it in /public/images/news/ and add `image`.
 */

import type { Localized } from "@/lib/i18n";

export type NewsItem = {
  slug: string;
  date: string; // YYYY-MM-DD
  title: Localized;
  body: Localized;
  image?: { src: string; alt: Localized };
  draft?: boolean;
};

export const news: NewsItem[] = [
  {
    slug: "meeting-with-the-royal-bhutanese-embassy-canberra",
    date: "2026-11-24",
    title: { en: "Meeting with the Royal Bhutanese Embassy, Canberra" },
    image: {
      src: "/images/news/embassy-meeting-canberra.jpg",
      alt: { en: "The video call between the President and Executive Members of BANZ and the Royal Bhutanese Embassy in Australia." },
    },
    body: {
      en: `The Bhutanese Association of New Zealand (BANZ) was honoured to participate in a virtual meeting with the Royal Bhutanese Embassy in Canberra, Australia.

The meeting brought together the President and Executive Members of BANZ and the Kutshab and officials from the Embassy.

During the meeting, the Embassy congratulated the newly appointed executive team and expressed confidence in their commitment to serving the Bhutanese community in New Zealand.

Discussions focused on the wellbeing of the Bhutanese community, BANZ activities, key challenges faced by the community, and opportunities for future support and collaboration.

BANZ sincerely appreciates the Embassy’s encouragement, guidance, and continued interest in the wellbeing of Bhutanese living in New Zealand.

We look forward to working closely with the Royal Bhutanese Embassy to strengthen our community, promote unity, and foster meaningful connections among Bhutanese in New Zealand.

Together, we look forward to building a stronger and more connected Bhutanese community.`,
    },
  },
];
