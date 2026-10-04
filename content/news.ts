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
];
