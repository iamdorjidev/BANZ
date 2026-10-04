import "server-only";

/**
 * Sends email through Resend (https://resend.com) using its HTTP API, so no
 * extra package is needed. Configure on the hosting platform:
 *   RESEND_API_KEY   API key
 *   MAIL_FROM        e.g. "BANZ Website <website@banz.org.nz>" (domain must be verified in Resend)
 *   MAIL_TO          where messages are delivered, e.g. the committee inbox
 *
 * Message contents are never logged.
 */
export type SendResult = "sent" | "not-configured" | "error";

export async function sendMail(opts: { subject: string; text: string; replyTo?: string }): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;
  if (!key || !from || !to) return "not-configured";

  try {
    const res = await fetch("https://api.resend.com/emails", {
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
