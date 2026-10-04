/**
 * INTERFACE WORDS — ENGLISH AND DZONGKHA
 * ---------------------------------------------------------------------------
 * Every button, menu item and label on the site. To translate, add a `dz:`
 * line next to the `en:` line. Anything without a `dz:` line shows in
 * English on the Dzongkha site until it is translated.
 *
 * TODO(committee): Dzongkha translation of this whole file (only needed if
 * the Dzongkha site is switched back on).
 */

import type { Localized } from "@/lib/i18n";

const L = (en: string, dz?: string): Localized => ({ en, dz });

export const ui = {
  languageName: { en: L("English", "English"), dz: L("རྫོང་ཁ", "རྫོང་ཁ") },
  skipToContent: L("Skip to content"),
  menu: L("Menu"),
  close: L("Close"),

  nav: {
    about: L("About"),
    executive: L("Executive"),
    community: L("Community"),
    events: L("Events"),
    newToNz: L("New to NZ"),
    membership: L("Membership"),
    contact: L("Contact"),
    donate: L("Donate"),
    news: L("News"),
    gallery: L("Gallery"),
  },

  hero: {
    join: L("Become a member"),
  },

  home: {
    ourStory: L("Our story"),
    whatWeDo: L("What we do"),
    events: L("Gatherings"),
    eventsLede: L("Festivals, celebrations and community days across New Zealand."),
    upcoming: L("Coming up"),
    noEvents: L("No upcoming events — check back soon."),
    allEvents: L("All events"),
    joinText: L("Membership is open to Bhutanese people across New Zealand. It takes two minutes."),
    galleryTitle: L("Moments from our community"),
  },

  events: {
    upcoming: L("Upcoming"),
    past: L("Past events"),
    none: L("No upcoming events — check back soon."),
    noPast: L("Past events will appear here."),
  },

  footer: {
    explore: L("Explore"),
    getInTouch: L("Get in touch"),
    follow: L("Follow"),
    privacy: L("Privacy"),
  },

  forms: {
    name: L("Full name"),
    email: L("Email"),
    phone: L("Phone (optional)"),
    city: L("Town or city"),
    message: L("Message"),
    send: L("Send message"),
    apply: L("Send application"),
    sending: L("Sending…"),
    required: L("Required"),
    sent: L("Thank you. Your message has been sent — we will reply as soon as we can."),
    applied: L("Thank you. The General Secretary will be in touch to confirm your membership."),
    notConnected: L("Online sending is not set up yet. Please email us directly at"),
    error: L("Something went wrong. Please try again, or email us directly at"),
  },

  placeholder: L("Placeholder"),
  glossary: L("Glossary"),

  pages: {
    about: {
      kicker: L("About us"),
      title: L("One community, one platform."),
      story: L("Our story"),
      mission: L("Mission"),
      values: L("Our values"),
    },
    community: {
      kicker: L("Community"),
      title: L("What we do together."),
      lede: L("Four areas of work, all carried by volunteers from within the community."),
      glossaryLede: L("Dzongkha words you will meet on this site and at our gatherings."),
    },
    events: {
      kicker: L("Events"),
      title: L("Gatherings"),
      lede: L("Everyone in the Bhutanese community is welcome at our events — members or not. Times are New Zealand time."),
    },
    newToNz: {
      kicker: L("New to New Zealand"),
      title: L("A practical guide to your first year."),
      lede: L("Written by Bhutanese people who have made the same journey. Start at the top, and ask us if anything is unclear."),
      contents: L("On this page"),
      numbers: L("Numbers to save today"),
      consular: L("Consular help"),
      disclaimer: L("This guide is general information, not legal or immigration advice. Rules change — always check the official site linked."),
      ask: L("Ask the community"),
      askText: L("Stuck on something this guide does not cover? Send us a message and someone who has been through it will reply."),
    },
    membership: {
      kicker: L("Membership"),
      title: L("Join the Association."),
      lede: L("Membership gives you a voice in how the Association is run, and connects you with Bhutanese people across New Zealand."),
      who: L("Who can join"),
      fee: L("Fee"),
      benefits: L("What membership means"),
      apply: L("Apply to join"),
      applyLede: L("Fill in this short form. The General Secretary will confirm your membership by email."),
      privacy: L("We only use these details to manage your membership and contact you about the Association. We never share them."),
    },
    contact: {
      kicker: L("Contact"),
      title: L("We would like to hear from you."),
      lede: L("Whether you have just arrived, want to help, or represent an organisation that works with our community, write to us."),
      emailUs: L("Email us"),
      callUs: L("Call us"),
      formTitle: L("Send a message"),
      responseNote: L("We are all volunteers. We aim to reply within a few days."),
    },
    executive: {
      kicker: L("Executive Members"),
      title: L("The people serving our community."),
      lede: L("Elected by members to lead the Association. Earlier executive members are listed by the year they served."),
      current: L("Current Executive"),
      previous: L("Previous Executive Members"),
      photoSoon: L("Photo coming soon"),
    },
    donate: {
      kicker: L("Donate"),
      title: L("Support our community."),
      lede: L("Every gift, large or small, goes straight back into the Bhutanese community in New Zealand."),
      where: L("Where your support goes"),
      how: L("How to give"),
      bank: L("Bank transfer"),
      accountName: L("Account name"),
      accountNumber: L("Account number"),
      reference: L("Reference"),
      askForDetails: L("Call or email us and we will send you the bank details."),
      callUs: L("Call us"),
      emailUs: L("Email us"),
      other: L("Other ways to help"),
      thanks: L("Thank you. Your support keeps our community strong."),
    },
    notFound: {
      title: L("This page could not be found."),
      back: L("Return to the homepage"),
    },
  },
};
