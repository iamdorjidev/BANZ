"use server";

import { sendMail, type SendResult } from "@/lib/mail";
import { addMember, markEmailSent, memberNumber } from "@/lib/members";
import { site } from "@/content/site";

export type FormState = {
  /** "registered" = saved and confirmation emailed; "registered-no-email" = saved, email not sent. */
  status: "idle" | "invalid" | "duplicate" | "registered" | "registered-no-email" | SendResult;
  memberNo?: string;
  errors?: Partial<Record<string, true>>;
  values?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: FormData, name: string, max = 200): string {
  return String(data.get(name) ?? "").trim().slice(0, max);
}

/** Hidden field real people never fill in. Bots usually do. */
function isBot(data: FormData): boolean {
  return field(data, "company") !== "";
}

export async function sendContact(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    name: field(data, "name"),
    email: field(data, "email"),
    message: field(data, "message", 5000),
  };
  if (isBot(data)) return { status: "sent" };

  const errors: FormState["errors"] = {};
  if (!values.name) errors.name = true;
  if (!EMAIL.test(values.email)) errors.email = true;
  if (values.message.length < 2) errors.message = true;
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const status = await sendMail({
    subject: `Website message from ${values.name}`,
    replyTo: values.email,
    text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
  });
  return status === "sent" ? { status } : { status, values };
}

export async function applyForMembership(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    name: field(data, "name"),
    email: field(data, "email"),
    phone: field(data, "phone", 40),
    city: field(data, "city", 80),
  };
  if (isBot(data)) return { status: "registered" };

  const errors: FormState["errors"] = {};
  if (!values.name) errors.name = true;
  if (!EMAIL.test(values.email)) errors.email = true;
  if (!values.city) errors.city = true;
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const saved = await addMember(values);
  if (saved.status === "unavailable") return { status: "error", values };
  if (saved.status === "duplicate") return { status: "duplicate", values };

  const memberNo = memberNumber(saved.id);

  // Confirmation to the new member.
  const confirmation = await sendMail({
    to: values.email,
    replyTo: site.email,
    subject: `Welcome to the Bhutanese Association of New Zealand (${memberNo})`,
    text: [
      `Kuzuzangpo la ${values.name},`,
      "",
      "Thank you for registering as a member of the Bhutanese Association of New Zealand. We are glad to have you with us.",
      "",
      `Your member number: ${memberNo}`,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Town or city: ${values.city}`,
      "",
      "A member of the committee will be in touch about gatherings and ways to get involved. If any of these details are wrong, just reply to this email.",
      "",
      "Tashi delek,",
      site.name,
      site.phone,
      site.url,
    ].join("\n"),
  });
  if (confirmation === "sent") await markEmailSent(saved.id);

  // Heads-up to the committee (the full list is always in the admin area).
  await sendMail({
    subject: `New member: ${values.name} (${memberNo})`,
    replyTo: values.email,
    text: [`${values.name} registered as a member.`, "", `Member number: ${memberNo}`, `Email: ${values.email}`, `Phone: ${values.phone || "—"}`, `Town or city: ${values.city}`].join("\n"),
  });

  return { status: confirmation === "sent" ? "registered" : "registered-no-email", memberNo, values };
}
