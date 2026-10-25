import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getStats } from "@/lib/members";

export const metadata = { title: "Overview" };

function Tile({ label, value, note }: { label: string; value: number | string; note?: string }) {
  return (
    <div className="rounded-2xl bg-sand p-6">
      <p className="kicker">{label}</p>
      <p className="font-display mt-2 text-[3rem] leading-none text-heading tabular-nums">{value}</p>
      {note && <p className="mt-2 text-[0.9375rem] text-ink-soft">{note}</p>}
    </div>
  );
}

function Bars({ title, rows }: { title: string; rows: { label: string; n: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  return (
    <section className="rounded-2xl border border-line p-6">
      <h2 className="font-display text-[1.375rem] text-heading">{title}</h2>
      <ul className="mt-5 space-y-3">
        {rows.map((r) => (
          <li key={r.label} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3 text-[1rem]">
            <span>{r.label}</span>
            <span className="h-3 rounded-full bg-sand" aria-hidden>
              <span className="block h-3 rounded-full bg-maroon" style={{ width: `${(r.n / max) * 100}%` }} />
            </span>
            <span className="text-right font-semibold tabular-nums text-heading">{r.n}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function Overview() {
  await requireAdmin();
  const s = await getStats();

  if (!s.connected)
    return (
      <p className="rounded-2xl bg-sand p-6 font-semibold text-heading">
        The members database is not connected yet. On Cloudflare it is added automatically as the “DB” binding (see the README).
      </p>
    );

  return (
    <div className="space-y-10">
      <h1 className="font-display text-[2.5rem] leading-none text-heading">Overview</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Total members" value={s.members} />
        <Tile label="Joined this year" value={s.thisYear} note={`${s.last30} in the last 30 days · ${s.last7} in the last 7`} />
        <Tile label="Messages received" value={s.messages} note={`${s.messages7} in the last 7 days`} />
        <Tile label="Confirmation emails" value={`${s.emailed}/${s.members}`} note={s.notEmailed ? `${s.notEmailed} not sent yet` : "Everyone emailed"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Bars title="New members, last 6 months" rows={s.months} />
        <Bars title="Members by age" rows={s.ages} />
      </div>

      <p className="flex flex-wrap gap-3">
        <Link href="/admin/members" className="rounded-full bg-maroon px-5 py-3 font-semibold text-on-dark hover:bg-maroon-deep">All registered members</Link>
        <Link href="/admin/messages" className="rounded-full border-[1.5px] border-maroon px-5 py-3 font-semibold text-heading hover:bg-maroon hover:text-on-dark">Contact messages</Link>
      </p>
    </div>
  );
}
