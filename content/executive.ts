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
    years: "2025 – 2026",
    label: { en: "Founding Executive" },
    // Founding executive, appointed 23 August 2025.
    // TODO(committee): add a portrait for each member.
    members: [
      { name: "Tashi Wangdi", role: { en: "President" } },
      { name: "Yeshey Rangdol", role: { en: "General Secretary" } },
      { name: "Sonam Zangmo", role: { en: "Treasurer" } },
    ],
  },
];
