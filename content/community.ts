/**
 * WHAT WE DO
 * ---------------------------------------------------------------------------
 * The four areas of work, shown on the homepage and the Community page.
 * Keep the order: it matches the numbers shown in the corner of each card.
 *
 * TODO(committee): check each description reflects what the Association
 * actually does today, not only what it hopes to do.
 */

import type { Localized } from "@/lib/i18n";

export type Pillar = {
  id: string;
  title: Localized;
  summary: Localized;
  detail: Localized[];
};

export const pillars: Pillar[] = [
  {
    id: "culture",
    title: { en: "Culture & Celebration" },
    summary: {
      en: "Keeping our language, dress, festivals and values alive for the next generation born here.",
    },
    detail: [
      { en: "Losar and Tshechu gatherings, national day observances, and family celebrations." },
      { en: "Dzongkha, song and dance for children growing up in New Zealand." },
      { en: "Sharing Bhutanese culture with neighbours, schools and councils." },
    ],
  },
  {
    id: "welfare",
    title: { en: "Welfare & Support" },
    summary: {
      en: "Standing beside members through illness, bereavement, hardship and the unexpected.",
    },
    detail: [
      { en: "Practical and emotional support when a family faces loss or crisis." },
      { en: "Help finding the right service — health, legal, housing or financial." },
      { en: "A quiet, confidential first call for anyone who is struggling." },
    ],
  },
  {
    id: "students",
    title: { en: "Students & Newcomers" },
    summary: {
      en: "Settlement help and mentoring for students, workers and families arriving in New Zealand.",
    },
    detail: [
      { en: "A welcome contact for new arrivals in their first weeks." },
      { en: "Mentoring from people who have already studied and worked here." },
      { en: "A practical settlement guide, kept up to date by the community." },
    ],
  },
  {
    id: "voice",
    title: { en: "Community Voice" },
    summary: {
      en: "One democratic, inclusive platform for Bhutanese people across the country.",
    },
    detail: [
      { en: "Open membership and elected officers, accountable to members." },
      { en: "Representing the community to councils, agencies and funders." },
      { en: "Working alongside other cultural communities in Aotearoa." },
    ],
  },
];

