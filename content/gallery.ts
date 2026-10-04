/**
 * PHOTO GALLERY
 * ---------------------------------------------------------------------------
 * Photographs shown in the homepage and Events galleries, in this order.
 * The layout is designed for four photos (one large, three smaller).
 * To add one: put the file in /public/images/, then add a block below with a
 * short description (`alt`) for people using screen readers, and a caption.
 *
 * TODO(committee): confirm each caption (event name, place, date), and that
 * the people pictured are happy for the photo to be published.
 */

import type { Localized } from "@/lib/i18n";

export type GalleryPhoto = {
  src: string;
  alt: Localized;
  caption: Localized;
};

export const gallery: GalleryPhoto[] = [
  {
    src: "/images/temple-gathering.jpg",
    alt: { en: "A large group of the community, many in gho and kira, gathered together inside a richly painted temple." },
    caption: { en: "The community gathered together at the temple." },
  },
  {
    src: "/images/prayer-gathering.jpg",
    alt: { en: "Rows of community members in gho and kira standing with palms together in a sunlit hall, facing a lama." },
    caption: { en: "Prayers together in Auckland." },
  },
  {
    src: "/images/community-gathering.jpg",
    alt: { en: "The community gathered on stage, many wearing matching T-shirts, in front of a projected photograph of Their Majesties." },
    caption: { en: "A community celebration on stage." },
  },
  {
    // Religious image: shown only as a captioned photograph, never as decoration.
    src: "/images/monks-buddha-statue.jpg",
    alt: { en: "Monks in maroon robes walking in front of a large seated Buddha statue set among trees." },
    caption: { en: "Monks at the Buddha statue." },
  },
];
