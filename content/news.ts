/**
 * NEWS AND NOTICES
 * ---------------------------------------------------------------------------
 * Newest first. Each item needs a unique `slug` (lowercase-words-with-dashes),
 * a date, a title and the text. Paragraphs are separated by a blank line.
 * Items appear on /news and in the RSS feed (/news/rss.xml).
 */

import type { Localized } from "@/lib/i18n";

export type NewsItem = {
  slug: string;
  date: string; // YYYY-MM-DD
  title: Localized;
  body: Localized;
  draft?: boolean;
};

export const news: NewsItem[] = [
  {
    slug: "election-2026-timeline",
    date: "2026-09-26",
    title: { en: "Election 2026: revised timeline" },
    body: {
      en: `The Election Coordination Team has confirmed the revised timeline for the 2026 committee election.

Nominations opened on 1 August 2026. The extended closing date for nominations was 26 September 2026, when nominations were verified and the final candidates announced.

The election will be held on Saturday 3 October 2026. The khadar for the newly elected Executive Committee will follow on Sunday 4 October 2026.

Details on how to vote are on the Elections page.`,
    },
  },
];
