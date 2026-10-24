import "server-only";
import { site } from "@/content/site";
import { deliver, type Delivery } from "./mail";
import { memberNumber, recordEmailResult, type Member } from "./members";

/** Sends the welcome / confirmation email to a member and records the outcome. */
export async function sendWelcome(m: Pick<Member, "id" | "name" | "email" | "city">): Promise<Delivery> {
  const memberNo = memberNumber(m.id);
  const out = await deliver({
    to: m.email,
    replyTo: site.email,
    subject: `Welcome to the Bhutanese Association of New Zealand (${memberNo})`,
    text: [
      `Kuzuzangpo la ${m.name},`,
      "",
      "Thank you for registering as a member of the Bhutanese Association of New Zealand. We are glad to have you with us.",
      "",
      `Your member number: ${memberNo}`,
      `Name: ${m.name}`,
      `Email: ${m.email}`,
      `Town or city: ${m.city}`,
      "",
      "A member of the committee will be in touch about gatherings and ways to get involved. If any of these details are wrong, just reply to this email.",
      "",
      "Tashi delek,",
      site.name,
      site.phone,
      site.url,
    ].join("\n"),
  });
  await recordEmailResult(m.id, out.result === "sent", out.detail);
  return out;
}
