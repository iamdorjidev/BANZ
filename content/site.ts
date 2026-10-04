/**
 * ORGANISATION DETAILS
 * ---------------------------------------------------------------------------
 * Facts about the Association used across the whole site (footer, About page,
 * search-engine data). Lines marked TODO(committee) are placeholders that
 * must be replaced with real information before launch.
 */

import type { Localized } from "@/lib/i18n";

export const site = {
  name: "Bhutanese Association of New Zealand",
  shortName: "BANZ",
  // TODO(committee): confirm the domain that has been (or will be) registered.
  url: "https://banz.org.nz",

  location: "Auckland, New Zealand",
  founded: 2025,

  // TODO(committee): confirm the public contact email and whether it is monitored.
  email: "hello@banz.org.nz",

  /** Public phone number, shown as written and dialled as `phoneTel`. */
  phone: "022 036 1903",
  phoneTel: "+64220361903",

  socials: [
    { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61581117650908" },
  ],

  // A line break (\n) in the headline is kept on large screens.
  tagline: {
    en: "Rooted in Bhutan.\nAt home in Aotearoa.",
  } satisfies Localized,

  description: {
    en: "Uniting Bhutanese people across New Zealand through culture, welfare and community.",
  } satisfies Localized,

  mission: {
    en: "A united, vibrant and empowered Bhutanese community in New Zealand — rooted in our heritage, caring for one another, and contributing to the country we now call home.",
  } satisfies Localized,

  /** Credit line in the footer. */
  credit: { label: "Website by enVision Studio", url: "" },
};

/**
 * HOMEPAGE HERO IMAGE
 * To change the photograph: put the new file in /public/images, change the
 * `import` line below to point at it, and update the description (`alt`).
 * Set `src: null` to show a quiet placeholder panel instead.
 * `position` chooses which part of the photo stays visible when it is
 * cropped to fit the screen ("50% 50%" = centre).
 */
import heroPhoto from "@/public/images/prayer-gathering.jpg";
import type { StaticImageData } from "next/image";

export const heroImage: { src: StaticImageData | null; alt: Localized; position: string } = {
  src: heroPhoto,
  // TODO(committee): confirm the event, and that the people pictured (including the child) are happy for it to be published.
  alt: {
    en: "Rows of the Bhutanese community in gho and kira standing with palms together in a sunlit hall in Auckland.",
  },
  position: "45% 55%",
};
