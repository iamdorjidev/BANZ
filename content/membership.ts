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

  // From the "Are you a member yet?" poster.
  benefits: [
    { en: "Support during family loss, fire and emergencies" },
    { en: "Help with family issues, including domestic violence" },
    { en: "Guidance after theft, break-ins and legal matters" },
    { en: "Support for newcomers settling in New Zealand" },
    { en: "Help with NZ rules, including road incidents" },
    { en: "A united community where you belong" },
  ] satisfies Localized[],

  withoutJoining: [
    { en: "You may miss important updates and support" },
    { en: "You'll be on your own in difficult times" },
    { en: "You may not know where to get help" },
    { en: "You could feel isolated in a new country" },
  ] satisfies Localized[],
};
