"use server";

import { sendMail, type SendResult } from "@/lib/mail";

export type FormState = {
  status: "idle" | "invalid" | SendResult;
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
  if (isBot(data)) return { status: "sent" };

  const errors: FormState["errors"] = {};
  if (!values.name) errors.name = true;
  if (!EMAIL.test(values.email)) errors.email = true;
  if (!values.city) errors.city = true;
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const status = await sendMail({
    subject: `Membership application: ${values.name}`,
    replyTo: values.email,
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "—"}`,
      `Town or city: ${values.city}`,
    ].join("\n"),
  });
  return status === "sent" ? { status } : { status, values };
}
