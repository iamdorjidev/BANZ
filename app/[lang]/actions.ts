"use server";

import { sendMail, type SendResult } from "@/lib/mail";
import { addMember, addMessage, idDocuments, memberNumber } from "@/lib/members";
import { sendWelcome } from "@/lib/welcome";

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

  // Keep a copy in the committee's inbox inside /admin, whatever happens to the email.
  const saved = await addMessage(values).catch(() => false);
  const status = await sendMail({
    subject: `Website message from ${values.name}`,
    replyTo: values.email,
    text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
  });
  return status === "sent" || saved ? { status: "sent" } : { status, values };
}

export async function applyForMembership(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    first_name: field(data, "first_name", 60),
    last_name: field(data, "last_name", 60),
    email: field(data, "email"),
    phone: field(data, "phone", 40),
    dob: field(data, "dob", 10),
    id_document: field(data, "id_document", 40),
    city: field(data, "city", 200),
  };
  if (isBot(data)) return { status: "registered" };

  const errors: FormState["errors"] = {};
  if (!values.first_name) errors.first_name = true;
  if (!values.last_name) errors.last_name = true;
  if (!EMAIL.test(values.email)) errors.email = true;
  const born = /^\d{4}-\d{2}-\d{2}$/.test(values.dob) ? new Date(values.dob) : null;
  if (!born || isNaN(born.getTime()) || born > new Date() || born.getUTCFullYear() < 1900) errors.dob = true;
  if (!(idDocuments as readonly string[]).includes(values.id_document)) errors.id_document = true;
  if (!values.city) errors.city = true;
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const fullName = `${values.first_name} ${values.last_name}`;
  const saved = await addMember({ firstName: values.first_name, lastName: values.last_name, dob: values.dob, idDocument: values.id_document, email: values.email, phone: values.phone, city: values.city });
  if (saved.status === "unavailable") return { status: "error", values };
  if (saved.status === "duplicate") return { status: "duplicate", values };

  const memberNo = memberNumber(saved.id);

  // Confirmation to the new member (the result is saved, so the committee can see and resend it).
  const confirmation = (await sendWelcome({ id: saved.id, name: fullName, email: values.email, city: values.city })).result;

  // Heads-up to the committee (the full list is always in the admin area).
  await sendMail({
    subject: `New member: ${fullName} (${memberNo})`,
    replyTo: values.email,
    text: [`${fullName} registered as a member.`, "", `Member number: ${memberNo}`, `Date of birth: ${values.dob}`, `Identity document: ${values.id_document}`, `Email: ${values.email}`, `Phone: ${values.phone || "—"}`, `Home address: ${values.city}`].join("\n"),
  });

  return { status: confirmation === "sent" ? "registered" : "registered-no-email", memberNo, values };
}
