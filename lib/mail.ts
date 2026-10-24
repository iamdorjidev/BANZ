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

export async function sendMail(opts: {
  subject: string;
  text: string;
  to?: string;
  replyTo?: string;
}): Promise<SendResult> {
  const key = envVar("RESEND_API_KEY");
  const from = envVar("MAIL_FROM");
  const to = opts.to ?? envVar("MAIL_TO");
  if (!key || !from || !to) return "not-configured";

  try {
    const res = await fetch(`${envVar("RESEND_API_URL") ?? "https://api.resend.com"}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: opts.subject,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
    });
    if (!res.ok) {
      console.error(`[mail] send failed with status ${res.status}`);
      return "error";
    }
    return "sent";
  } catch {
    console.error("[mail] send failed (network)");
    return "error";
  }
}
