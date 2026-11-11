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
  /** The full write-up shown on the event's own page; paragraphs are separated by a blank line. */
  details?: Localized;
  /** `position` is where a wide crop is anchored (CSS object-position), so heads are not cut off. */
  photos?: { src: string; alt: Localized; position?: string }[];
  draft?: boolean;
};

export const events: EventItem[] = [
  {
    id: "fourth-druk-gyalpo-birth-anniversary-2026",
    title: { en: "Birth Anniversary of the Fourth Druk Gyalpo, His Majesty Jigme Singye Wangchuck" },
    date: "2026-11-11",
    time: "11:00 am",
    venue: { en: "72 Albany Highway, Greenhithe, Auckland 0632" },
    summary: {
      en: "The community gathered with pride, gratitude and devotion to celebrate the birth anniversary of His Majesty the Great Fourth Druk Gyalpo, with a ceremonial cake offering, the National Anthem and prayers for His Majesty's long life and good health.",
    },
    details: {
      en: "On this historic day, the Bhutanese community in New Zealand came together with deep pride, gratitude and devotion to celebrate the birth anniversary of His Majesty the Great Fourth Druk Gyalpo, Jigme Singye Wangchuck.\n\nAt 11.00 am in New Zealand, as Bhutan was still awaiting the dawn at 4.00 am, our community was among the first Bhutanese communities around the world to pay tribute to His Majesty on this special day.\n\nWe began with a ceremonial cake offering in honour of His Majesty, followed by the singing of our National Anthem and the recitation of His Majesty's Zhabten. With one voice and one heart, we offered prayers for His Majesty's long life and good health, and for the flourishing of His Majesty's Ku, Sung and Thug.\n\nThough far from our beloved homeland, we remain united in our love for Bhutan, our devotion to the Wangchuck Dynasty and our gratitude for the Great Fourth's extraordinary service to our nation.\n\nThe President of the Bhutanese Association in New Zealand, Dr. Jamba Tobden, told the community that the extraordinary nature and deeds of His Majesty the Great Fourth King, who pronounced the concept of Gross National Happiness, are well documented in several books and articles. He said, \u201cHis Majesty the Great Fourth King is referred to as the Bodhisattva King, the Dharmaraja, the Cakravartin King, the one who turns the wheel of dharma and rules benevolently, His Majesty is the King of Prophecy, the Rig sum goenpai namthrul.\u201d\n\nThank you Your Majesty la.",
    },
    photos: [
      { src: "/images/events/fourth-druk-gyalpo-altar-portrait.jpg", position: "50% 22%", alt: { en: "A portrait of His Majesty the Fourth Druk Gyalpo on the altar, with butter lamps, offering bowls and a bowl of fruit." } },
      { src: "/images/events/fourth-druk-gyalpo-cake-offering.jpg", alt: { en: "A monk and a community member together cutting the ceremonial cake offered in honour of His Majesty, beside a bowl of fruit." } },
      { src: "/images/events/fourth-druk-gyalpo-website-unveiling.jpg", alt: { en: "Three men offering white scarves in front of the altar, with a laptop showing the association's website on the table." } },
      { src: "/images/events/fourth-druk-gyalpo-community-group.jpg", alt: { en: "Members of the Bhutanese community in New Zealand standing and kneeling together outside, several holding framed portraits." } },
      { src: "/images/events/fourth-druk-gyalpo-portrait-presentation.jpg", alt: { en: "Two men holding a framed black-and-white portrait in front of the altar under a colourful canopy." } },
      { src: "/images/events/fourth-druk-gyalpo-prayer-hall.jpg", alt: { en: "Community members seated on the floor of the prayer hall during the ceremony, facing the altar." } },
    ],
  }
];
