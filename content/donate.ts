/**
 * DONATE PAGE
 * ---------------------------------------------------------------------------
 * TODO(committee): add the Association's bank account details below. Until
 * `bankAccount` is filled in, the page asks donors to phone or email for
 * them instead — no account number is ever guessed.
 */

import type { Localized } from "@/lib/i18n";

export const donate = {
  /** e.g. { name: "Bhutanese Association of New Zealand", number: "12-3456-7890123-00", reference: "Your name + DONATION" } */
  bankAccount: null as null | { name: string; number: string; reference: Localized },

  reasons: [
    {
      title: { en: "Welfare support" },
      text: { en: "Helping families through illness, bereavement and hardship — often at very short notice." },
    },
    {
      title: { en: "Newcomers & students" },
      text: { en: "Welcoming new arrivals and helping students and workers find their feet in a new country." },
    },
    {
      title: { en: "Culture & gatherings" },
      text: { en: "Losar, Tshechu and community days — venues, food and everything that brings us together." },
    },
  ] satisfies { title: Localized; text: Localized }[],

  otherWays: [
    { title: { en: "Give your time" }, text: { en: "Volunteer at an event, cook, drive, or welcome a newcomer." } },
    { title: { en: "Give in kind" }, text: { en: "Food, venues, printing or professional skills for community events." } },
  ] satisfies { title: Localized; text: Localized }[],
};
