/**
 * ABOUT PAGE
 * ---------------------------------------------------------------------------
 * TODO(committee): the "story" paragraphs below use only verified facts.
 * Replace or extend them with the Association's own account of how it began.
 */

import type { Localized } from "@/lib/i18n";

export const about = {
  lede: {
    en: "The Bhutanese Association of New Zealand brings Bhutanese people across the country together under one democratic and inclusive platform.",
  } satisfies Localized,

  story: [
    {
      en: "Bhutanese people have been making their homes in New Zealand as students, workers and families for years. As the community grew, so did the need for one place to gather, to look after one another, and to speak together.",
    },
    {
      en: "In 2025 the Association was founded in Auckland, with its first executive members appointed to lead it.",
    },
  ] satisfies Localized[],

  missionPoints: [
    { en: "To unite all Bhutanese in New Zealand under one democratic and inclusive platform." },
    { en: "To promote Bhutanese cultural, spiritual and social values." },
    { en: "To provide welfare, settlement support and mentoring for students, workers and residents." },
    { en: "To encourage integration into, and contribution to, New Zealand's multicultural society." },
  ] satisfies Localized[],

  values: [
    { title: { en: "Unity" }, text: { en: "One community, whatever district, generation or visa brought us here." } },
    { title: { en: "Heritage" }, text: { en: "Our language, dress and customs are worth keeping, and worth sharing." } },
    { title: { en: "Care" }, text: { en: "No one in the community should face hardship alone." } },
    { title: { en: "Contribution" }, text: { en: "We belong here, and we give back to the country that welcomed us." } },
  ] satisfies { title: Localized; text: Localized }[],
};
