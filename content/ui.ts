/**
 * INTERFACE WORDS — ENGLISH AND DZONGKHA
 * ---------------------------------------------------------------------------
 * Every button, menu item and label on the site. To translate, add a `dz:`
 * line next to the `en:` line. Anything without a `dz:` line shows in
 * English on the Dzongkha site until it is translated.
 *
 * TODO(committee): Dzongkha translation of this whole file. The voting and
 * verification wording (added in later phases) must be translated before
 * the election.
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
    elections: L("Elections"),
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
    elections: {
      kicker: L("Election 2026"),
      title: L("Electing our Executive Committee."),
      lede: L("On Saturday 3 October 2026, members will elect the President, General Secretary and Treasurer in person, by secret ballot, on their own phones."),
      facts: {
        day: L("Polling day"),
        offices: L("Offices"),
        where: L("Where"),
        hours: L("Voting hours"),
        tba: L("To be announced"),
      },
      timeline: L("Timeline"),
      done: L("Done"),
      today: L("Today"),
      howTitle: L("How to vote"),
      howLede: L("Voting takes place in person. It takes about five minutes."),
      steps: [
        { title: L("Bring your passport"), text: L("Come to the venue with your Bhutanese passport. An expired passport is fine.") },
        { title: L("Register at the desk"), text: L("An officer checks your passport by eye and ticks your name. Nothing is copied, photographed or written down from it.") },
        { title: L("Take a voting code"), text: L("You are handed a printed slip from a shuffled pile. Nobody records which slip went to whom.") },
        { title: L("Vote on your phone"), text: L("Scan the QR code on the slip, choose one candidate — or abstain — for each office, then press and hold to cast your vote.") },
      ],
      noPhone: L("No smartphone? Tablets will be available at the venue. Ask at the desk."),
      bring: L("What to bring"),
      bringPhone: L("Your phone, charged, if you have one"),
      secretTitle: L("Your vote is secret"),
      secret: [
        L("The registration desk records that you attended. It never records which code you were given."),
        L("Codes are printed in advance and shuffled by hand, so no one can link a code to a person."),
        L("Votes are stored with no name, no code and no time — only your three choices."),
        L("You receive a receipt code that proves your vote was counted, without revealing how you voted — to anyone."),
      ],
      candidatesTitle: L("The candidates"),
      candidatesCta: L("See the candidates"),
      questions: L("Questions about the election"),
      questionsText: L("Contact the Election Coordination Team through our contact page."),
      results: L("Results"),
    },
    candidates: {
      kicker: L("Election 2026"),
      title: L("The candidates"),
      lede: L("Candidates for President, General Secretary and Treasurer, as verified by the Election Coordination Team."),
      pending: L("The final list of candidates will be published here once it has been verified by the Election Coordination Team."),
      noneForOffice: L("No candidates have been announced for this office yet."),
      uncontested: L("Uncontested"),
      readStatement: L("Read statement"),
      office: L("Office"),
      abstain: L("On the ballot, you can also choose to abstain for any office."),
      backToElection: L("How to vote"),
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
