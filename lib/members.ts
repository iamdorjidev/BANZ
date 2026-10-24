import "server-only";
import { database, type D1Database } from "./env";

export type Member = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  city: string;
  registered_at: string; // UTC, "YYYY-MM-DD HH:MM:SS"
  email_sent: number;
};

/** "BANZ-0042": the member number shown to the member and the committee. */
export const memberNumber = (id: number) => `BANZ-${String(id).padStart(4, "0")}`;

// The table is created the first time the database is used, so nothing needs
// to be set up by hand. Each statement is one line (a D1 requirement).
const CREATE =
  "CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE, phone TEXT, city TEXT NOT NULL, registered_at TEXT NOT NULL DEFAULT (datetime('now')), email_sent INTEGER NOT NULL DEFAULT 0)";

const ready = new WeakSet<D1Database>();
async function db(): Promise<D1Database | null> {
  const d = database();
  if (d && !ready.has(d)) {
    await d.prepare(CREATE).run();
    ready.add(d);
  }
  return d;
}

export async function addMember(m: {
  name: string;
  email: string;
  phone?: string;
  city: string;
}): Promise<{ status: "created"; id: number } | { status: "duplicate" } | { status: "unavailable" }> {
  const d = await db();
  if (!d) return { status: "unavailable" };
  const email = m.email.trim().toLowerCase();
  const existing = await d.prepare("SELECT id FROM members WHERE email = ?").bind(email).first();
  if (existing) return { status: "duplicate" };
  const res = await d
    .prepare("INSERT INTO members (name, email, phone, city) VALUES (?, ?, ?, ?)")
    .bind(m.name, email, m.phone || null, m.city)
    .run();
  return { status: "created", id: Number(res.meta.last_row_id) };
}

export async function markEmailSent(id: number) {
  const d = await db();
  await d?.prepare("UPDATE members SET email_sent = 1 WHERE id = ?").bind(id).run();
}

export async function listMembers(query = ""): Promise<{ members: Member[]; total: number; connected: boolean }> {
  const d = await db();
  if (!d) return { members: [], total: 0, connected: false };
  const total = Number((await d.prepare("SELECT count(*) AS n FROM members").first<{ n: number }>())?.n ?? 0);
  const q = `%${query.trim().replace(/[%_]/g, "")}%`;
  const { results } = query.trim()
    ? await d
        .prepare("SELECT * FROM members WHERE name LIKE ? OR email LIKE ? OR city LIKE ? OR phone LIKE ? ORDER BY id DESC")
        .bind(q, q, q, q)
        .all<Member>()
    : await d.prepare("SELECT * FROM members ORDER BY id DESC").all<Member>();
  return { members: results, total, connected: true };
}

export async function removeMember(id: number) {
  const d = await db();
  await d?.prepare("DELETE FROM members WHERE id = ?").bind(id).run();
}
