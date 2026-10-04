/**
 * NEW TO NEW ZEALAND — SETTLEMENT GUIDE
 * ---------------------------------------------------------------------------
 * The most useful page on the site. Keep it practical and current.
 *
 * Rules for editing:
 *  - Link to the official government page instead of repeating rules that
 *    change (wage rates, visa conditions, fees). Official pages stay current;
 *    this file will not.
 *  - Never give immigration advice. Only licensed immigration advisers and
 *    lawyers can do that in New Zealand.
 *
 * TODO(committee): ask two or three recent arrivals to read this page and
 * say what is missing. Review it every six months.
 * Last reviewed: 2026-09-25 (by the website builder, not yet by the committee).
 */

import type { Localized } from "@/lib/i18n";

export type GuideLink = { label: Localized; url: string };
export type GuideItem = { title: Localized; text: Localized; links?: GuideLink[] };
export type GuideStage = {
  id: string;
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  items: GuideItem[];
};

export const guide: GuideStage[] = [
  {
    id: "arriving",
    eyebrow: { en: "Stage one" },
    title: { en: "Arriving" },
    intro: { en: "The first two weeks. Do these in roughly this order." },
    items: [
      {
        title: { en: "Get a local phone number" },
        text: {
          en: "A prepaid SIM from any supermarket or phone shop is enough to start. Almost every form you fill in will ask for a New Zealand number.",
        },
      },
      {
        title: { en: "Open a bank account" },
        text: {
          en: "Bring your passport and visa. Banks also ask for proof of address — a letter from your employer, school or landlord usually works. Some banks let you start the application before you arrive.",
        },
      },
      {
        title: { en: "Apply for an IRD number" },
        text: {
          en: "You need an IRD (tax) number to be paid correctly. Without one, your employer must deduct tax at a much higher rate. Apply online once you have a bank account.",
        },
        links: [{ label: { en: "Inland Revenue — IRD numbers" }, url: "https://www.ird.govt.nz/managing-my-tax/ird-numbers" }],
      },
      {
        title: { en: "Tell us you have arrived" },
        text: {
          en: "Send us a message. Someone from the community will get in touch, and you will hear about the next gathering.",
        },
      },
    ],
  },
  {
    id: "settling",
    eyebrow: { en: "Stage two" },
    title: { en: "Settling" },
    intro: { en: "The first months: work, housing, health and getting around." },
    items: [
      {
        title: { en: "Know your work rights" },
        text: {
          en: "Everyone working in New Zealand is entitled to a written employment agreement, at least the minimum wage, paid holidays and a safe workplace — whatever your visa. If something feels wrong, ask before you sign.",
        },
        links: [{ label: { en: "Employment New Zealand" }, url: "https://www.employment.govt.nz/" }],
      },
      {
        title: { en: "Keep to your visa conditions" },
        text: {
          en: "Your visa sets where, how much and for whom you can work or study. Check your conditions yourself on the Immigration New Zealand site. Only use licensed immigration advisers — unlicensed 'agents' are a common source of harm.",
        },
        links: [
          { label: { en: "Immigration New Zealand" }, url: "https://www.immigration.govt.nz/" },
          { label: { en: "Check an adviser is licensed" }, url: "https://www.iaa.govt.nz/" },
        ],
      },
      {
        title: { en: "Renting a home" },
        text: {
          en: "Landlords may ask for a bond of up to four weeks' rent, which must be lodged with Tenancy Services — ask for the receipt. Letting fees are not allowed. Take dated photos of the property when you move in.",
        },
        links: [{ label: { en: "Tenancy Services" }, url: "https://www.tenancy.govt.nz/" }],
      },
      {
        title: { en: "Enrol with a doctor" },
        text: {
          en: "Find a GP (family doctor) near you and enrol before you are unwell. Whether your visits are publicly funded depends on your visa. Accidents are covered by ACC for everyone in New Zealand, including visitors.",
        },
        links: [
          { label: { en: "Health New Zealand — eligibility" }, url: "https://www.tewhatuora.govt.nz/" },
          { label: { en: "ACC — injury cover" }, url: "https://www.acc.co.nz/" },
        ],
      },
      {
        title: { en: "Driving" },
        text: {
          en: "You can usually drive on your overseas licence for up to 12 months from arrival, then you need a New Zealand licence. Check early whether you will need to sit theory and practical tests. Traffic keeps left, as in Bhutan.",
        },
        links: [{ label: { en: "NZ Transport Agency — overseas licences" }, url: "https://www.nzta.govt.nz/" }],
      },
      {
        title: { en: "Prepare for winter" },
        text: {
          en: "Many New Zealand houses are cold and damp. Heat the rooms you use, open windows for a few minutes each day, and wipe condensation off windows in the morning.",
        },
      },
    ],
  },
  {
    id: "belonging",
    eyebrow: { en: "Stage three" },
    title: { en: "Belonging" },
    intro: { en: "Making a life here without losing the one you came from." },
    items: [
      {
        title: { en: "Come to a gathering" },
        text: {
          en: "Losar, Tshechu and community days are the easiest way to meet people. You do not need to be a member to come.",
        },
      },
      {
        title: { en: "Become a member" },
        text: {
          en: "Members shape what the Association does, and are the first to hear about gatherings and when someone needs help.",
        },
      },
      {
        title: { en: "Free independent advice" },
        text: {
          en: "Citizens Advice Bureau gives free, confidential advice on almost anything — tenancy, work, money, family — in many languages.",
        },
        links: [{ label: { en: "Citizens Advice Bureau" }, url: "https://www.cab.org.nz/" }],
      },
    ],
  },
];

/** Numbers to save in your phone on the first day. */
export const importantNumbers: { label: Localized; number: string; note?: Localized }[] = [
  { label: { en: "Emergency — police, fire, ambulance" }, number: "111" },
  { label: { en: "Police, non-emergency" }, number: "105" },
  { label: { en: "Healthline — free health advice, 24/7" }, number: "0800 611 116" },
  { label: { en: "Citizens Advice Bureau" }, number: "0800 367 222" },
  { label: { en: "Employment New Zealand" }, number: "0800 20 90 20" },
];

// TODO(committee): confirm the correct consular contact for Bhutanese
// citizens in New Zealand (embassy accreditation / honorary consul) and add
// it here with its official source.
export const consularNote: Localized = {
  en: "Consular contact details for Bhutanese citizens in New Zealand will be added here once confirmed.",
};
