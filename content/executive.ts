/**
 * EXECUTIVE MEMBERS
 * ---------------------------------------------------------------------------
 * Every executive term, newest first. The FIRST term in the list is shown as
 * the "Current Executive"; all the others are shown underneath, grouped by
 * year, as "Previous Executive Members".
 *
 * When a new executive takes office: copy a whole term block, paste it at the TOP of the
 * list, change the years and names. The old executive moves down on its own.
 *
 * Photos: square or portrait, put in /public/images/executive/ and write the
 * file name, e.g. photo: "/images/executive/tashi-wangdi.jpg".
 * Without a photo, the person's initials are shown in the seal ring.
 */

import type { Localized } from "@/lib/i18n";

export type ExecutiveMember = {
  name: string;
  role: Localized;
  photo?: string;
  bio?: Localized; // optional, one or two sentences written by the member
};

export type ExecutiveTerm = {
  years: string; // e.g. "2025 – 2026"
  label: Localized; // e.g. "Founding Executive"
  members: ExecutiveMember[];
};

export const executiveTerms: ExecutiveTerm[] = [
  {
    // Elected 3 October 2026.
    // TODO(committee): confirm the term end year, and add a portrait for each member.
    years: "2026 – present",
    label: { en: "Executive Committee" },
    members: [
      { name: "Dr. Jamba Tobden", role: { en: "President" } },
      { name: "Mr. Galey Nima", role: { en: "General Secretary" } },
      { name: "Mr. Tandin Tshewang", role: { en: "Treasurer" } },
      { name: "Mr. Sonam Gyaltshen", role: { en: "Religious and Special Envoy to Kunjung" } },
      { name: "Mr. Mipham Chogyel", role: { en: "Sports Officer" } },
      { name: "Mr. Nado", role: { en: "Cultural Officer" } },
      { name: "Mr. Phub Tshering", role: { en: "Welfare Officer" } },
      { name: "Dr. Tashi Wangchuk", role: { en: "Data and Employment Officer" } },
      { name: "Mr. Thinley Dorji", role: { en: "Media andCommunications Officer" } },
    ],
  },
  {
    years: "2025 – 2026",
    label: { en: "Founding Executive" },
    members: [
      { name: "Mr. Tashi Wangdi", role: { en: "President" } },
      { name: "Mr. Yeshey Rangdol", role: { en: "General Secretary" } },
      { name: "Mrs. Sonam Zangmo", role: { en: "Treasurer" } },
      { name: "Mr. Tashi Wangda", role: { en: "Event Coordinator (Cultural & Sports" } },
      { name: "Mrs. Kencho Dem", role: { en: "Youth Representative" }},
      { name: "Mr. Namgay Tshering", role: { en: "Religious Coordinator" } },
      { name: "Mr. Yeshi Wangdi", role: { en: "community relationship manager" } },
    ],
  },
];
