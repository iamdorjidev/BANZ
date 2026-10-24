import "server-only";
import { envVar } from "./env";

/**
 * Sends email through Resend (https://resend.com) using its HTTP API.
 * Set these in the Cloudflare Worker (Settings → Variables and Secrets):
 *   RESEND_API_KEY   API key (secret)
 *   MAIL_FROM        e.g. "BANZ <hello@banz.org.nz>" — the domain must be verified in Resend
 *   MAIL_TO          where committee notifications are delivered (comma-separated for several)
 *
 * Message contents are never logged.
 */
export type SendResult = "sent" | "not-configured" | "error";

export type Delivery = { result: SendResult; detail?: string };

/** Like sendMail, but also says WHY it failed (safe to show the committee). */
export async function deliver(opts: {
  subject: string;
  text: string;
  to?: string;
  replyTo?: string;
}): Promise<Delivery> {
  const key = envVar("RESEND_API_KEY");
  const from = envVar("MAIL_FROM");
  const to = opts.to ?? envVar("MAIL_TO");
  const missing = [!key && "RESEND_API_KEY", !from && "MAIL_FROM", !to && "MAIL_TO"].filter(Boolean);
  if (missing.length) return { result: "not-configured", detail: `Email is not set up yet — missing ${missing.join(", ")} in the Cloudflare settings.` };

  try {
    const res = await fetch(`${envVar("RESEND_API_URL") ?? "https://api.resend.com"}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to!.split(",").map((s) => s.trim()),
        subject: opts.subject,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
    });
    if (!res.ok) {
      // Resend explains the problem in plain words (e.g. "domain is not verified").
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      console.error(`[mail] send failed with status ${res.status}`);
      return { result: "error", detail: `Resend refused it (${res.status}): ${(body.message ?? "no reason given").slice(0, 240)}` };
    }
    return { result: "sent" };
  } catch {
    console.error("[mail] send failed (network)");
    return { result: "error", detail: "Could not reach Resend (network problem)." };
  }
}

export async function sendMail(opts: { subject: string; text: string; to?: string; replyTo?: string }): Promise<SendResult> {
  return (await deliver(opts)).result;
}
