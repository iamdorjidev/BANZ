/**
 * MEMBERSHIP
 * ---------------------------------------------------------------------------
 * TODO(committee): the trust deed decides who can be a member, whether there
 * is a fee. Check every line below against the deed.
 */

import type { Localized } from "@/lib/i18n";

export const membership = {
  // TODO(committee): confirm eligibility wording against the trust deed.
  whoCanJoin: {
    en: "Membership is open to Bhutanese people living in New Zealand, and to their spouses and partners.",
  } satisfies Localized,

  // TODO(committee): is there a fee? If so, how much and how is it paid?
  fee: { en: "Membership is currently free." } satisfies Localized,

  benefits: [
    { title: { en: "A voice" }, text: { en: "Have your say in how the Association is run and who leads it." } },
    { title: { en: "First to know" }, text: { en: "Hear about gatherings, festivals and notices before they are announced publicly." } },
    { title: { en: "Support when it matters" }, text: { en: "Be part of the network that rallies around members in hardship, illness or loss." } },
    { title: { en: "A way to give back" }, text: { en: "Volunteer, mentor a newcomer, or share your skills with the community." } },
  ] satisfies { title: Localized; text: Localized }[],
};
