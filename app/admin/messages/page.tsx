import { requireAdmin } from "@/lib/admin-auth";
import { listMessages } from "@/lib/members";
import { deleteMessage } from "../actions";

export const metadata = { title: "Messages" };

const nz = (utc: string) =>
  new Date(utc.replace(" ", "T") + "Z").toLocaleString("en-NZ", {
    timeZone: "Pacific/Auckland",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default async function Messages() {
  await requireAdmin();
  const { messages, connected } = await listMessages();

  return (
    <div>
      <p className="kicker">People who contacted us</p>
      <h1 className="font-display text-[4rem] leading-none text-heading tabular-nums">{messages.length}</h1>

      {!connected && (
        <p className="mt-10 rounded-2xl bg-sand p-6 font-semibold text-heading">The database is not connected yet (see the README).</p>
      )}
      {connected && messages.length === 0 && (
        <p className="mt-10 text-[1.25rem] text-ink-soft">No messages yet. Messages sent from the Contact page appear here.</p>
      )}

      <ul className="mt-10 space-y-5">
        {messages.map((m) => (
          <li key={m.id} className="rounded-2xl border border-line p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-heading">
                {m.name} · <a href={`mailto:${m.email}`} className="prose-link font-normal">{m.email}</a>
              </p>
              <p className="text-[0.9375rem] text-ink-soft">{nz(m.created_at)}</p>
            </div>
            <p className="mt-3 whitespace-pre-wrap">{m.message}</p>
            <div className="mt-4 flex items-center gap-5">
              <a href={`mailto:${m.email}?subject=Re: your message to BANZ`} className="font-semibold text-heading underline decoration-saffron decoration-2 underline-offset-4">Reply</a>
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={m.id} />
                <button className="text-[0.9375rem] text-ink-soft underline hover:text-heading" aria-label={`Delete message from ${m.name}`}>Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
