import { requireAdmin } from "@/lib/admin-auth";
import { listMembers, memberNumber } from "@/lib/members";
import { deleteMember, toggleIdVerified } from "../actions";
import { ResendAll, ResendOne } from "@/components/ResendButtons";

const nz = (utc: string) =>
  new Date(utc.replace(" ", "T") + "Z").toLocaleString("en-NZ", {
    timeZone: "Pacific/Auckland",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default async function AdminHome({ searchParams }: PageProps<"/admin/members">) {
  await requireAdmin();
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const { members, total, connected } = await listMembers(query);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker">Registered members</p>
          <h1 className="font-display text-[4rem] leading-none text-heading tabular-nums">{total}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <form className="flex gap-2">
            <label htmlFor="q" className="sr-only">Search members</label>
            <input
              id="q"
              name="q"
              defaultValue={query}
              placeholder="Search members"
              className="w-72 max-w-full rounded-full border border-ink-soft bg-cream px-5 py-3"
            />
            <button className="rounded-full border-[1.5px] border-maroon px-5 font-semibold text-heading hover:bg-maroon hover:text-on-dark">Search</button>
          </form>
          {/* A file download from a route handler, not a page — a plain link is correct. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/admin/export" className="rounded-full bg-maroon px-5 py-3 font-semibold text-on-dark hover:bg-maroon-deep">
            Download CSV
          </a>
        </div>
      </div>

      {connected && members.some((m) => !m.email_sent) && (
        <div className="mt-8 rounded-2xl bg-sand p-6">
          <p className="mb-4 font-semibold text-heading">
            Some members have not received their confirmation email. The reason is shown under “Not sent”. Once it is fixed, send them below.
          </p>
          <ResendAll pending={members.filter((m) => !m.email_sent).length} />
        </div>
      )}

      {!connected && (
        <p className="mt-10 rounded-2xl bg-sand p-6 font-semibold text-heading">
          The members database is not connected yet. On Cloudflare it is added automatically as the “DB” binding (see the README).
        </p>
      )}

      {connected && members.length === 0 && (
        <p className="mt-10 text-[1.25rem] text-ink-soft">
          {query ? `No members match “${query}”.` : "Nobody has registered yet. New members appear here as soon as they sign up."}
        </p>
      )}

      {members.length > 0 && (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-[1rem]">
            <thead>
              <tr className="border-b border-ink-soft">
                <th className="py-3 pr-4">No.</th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Phone</th>
                <th className="py-3 pr-4">Date of birth</th>
                <th className="py-3 pr-4">Identity document</th>
                <th className="py-3 pr-4">Home address</th>
                <th className="py-3 pr-4">Registered (NZ)</th>
                <th className="py-3 pr-4">Confirmation</th>
                <th className="py-3"><span className="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-line align-top">
                  <td className="py-3 pr-4 font-mono text-[0.9375rem]">{memberNumber(m.id)}</td>
                  <td className="py-3 pr-4 font-semibold text-heading">{m.name}</td>
                  <td className="py-3 pr-4"><a href={`mailto:${m.email}`} className="prose-link">{m.email}</a></td>
                  <td className="py-3 pr-4">{m.phone ? <a href={`tel:${m.phone}`}>{m.phone}</a> : "—"}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">{m.dob ?? "—"}</td>
                  <td className="py-3 pr-4">
                    {m.id_document ? (
                      <>
                        {m.id_document}
                        <p className="font-mono text-[0.875rem] text-ink-soft">{m.id_number ?? "—"}</p>
                        <form action={toggleIdVerified} className="mt-1">
                          <input type="hidden" name="id" value={m.id} />
                          <input type="hidden" name="verified" value={m.id_verified ? "0" : "1"} />
                          <button className={m.id_verified ? "font-semibold text-heading" : "text-ink-soft underline hover:text-heading"}>
                            {m.id_verified ? "✓ Verified (undo)" : "Mark verified"}
                          </button>
                        </form>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-3 pr-4">{m.city}</td>
                  <td className="py-3 pr-4 whitespace-nowrap text-ink-soft">{nz(m.registered_at)}</td>
                  <td className="py-3 pr-4">
                    {m.email_sent ? (
                      "Emailed"
                    ) : (
                      <>
                        <strong className="text-heading">Not sent</strong>
                        {m.email_note && <p className="mt-1 max-w-64 text-[0.8125rem] text-ink-soft">{m.email_note}</p>}
                        <div className="mt-2">
                          <ResendOne id={m.id} name={m.name} label="Send now" />
                        </div>
                      </>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <form action={deleteMember}>
                      <input type="hidden" name="id" value={m.id} />
                      <button className="text-[0.9375rem] text-ink-soft underline hover:text-heading" aria-label={`Remove ${m.name}`}>Remove</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
