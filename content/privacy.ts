/**
 * PRIVACY NOTICE
 * ---------------------------------------------------------------------------
 * Plain-English notice under the New Zealand Privacy Act 2020.
 *
 * TODO(committee): confirm the retention period below, and name the person
 * who handles privacy requests (the Privacy Officer). Review yearly.
 */

import type { Localized } from "@/lib/i18n";

export const privacy = {
  updated: "2026-10-05",
  intro: {
    en: "We collect as little personal information as we can, use it only to run the Association, and never sell or share it. This notice explains exactly what we keep and why.",
  } satisfies Localized,

  sections: [
    {
      title: { en: "Membership applications and messages" },
      body: [
        { en: "When you apply to join or send us a message, your name, email address, and the details you choose to give are emailed to the committee. They are used only to manage your membership or to reply to you." },
        { en: "The website itself does not keep a database of visitors or members." },
      ],
    },
    {
      title: { en: "How long we keep things" },
      body: [
        // TODO(committee): confirm this period.
        { en: "Membership details: while you are a member, and removed within 3 months of you leaving." },
        { en: "Messages: as long as needed to reply and follow up, then deleted." },
      ],
    },
    {
      title: { en: "Cookies" },
      body: [{ en: "This website does not use advertising, analytics or tracking cookies, and does not track you." }],
    },
    {
      title: { en: "Your rights" },
      body: [
        { en: "You can ask to see the personal information we hold about you, and ask us to correct it. Contact us using the details below and we will reply within 20 working days." },
        { en: "If you are not happy with how we handle your information, you can complain to the Office of the Privacy Commissioner (privacy.org.nz)." },
      ],
    },
  ] satisfies { title: Localized; body: Localized[] }[],
};
