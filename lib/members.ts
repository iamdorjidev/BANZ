import "server-only";
import { database, type D1Database } from "./env";

/** The identity documents a member can say they hold. */
export const idDocuments = ["CID", "Passport", "NZ Driver Licence"] as const;

export type Member = {
  id: number;
  name: string;
  first_name: string | null; // null for members who registered before the split
  last_name: string | null;
  dob: string | null; // "YYYY-MM-DD"
  id_document: string | null; // which document they hold: one of idDocuments
  id_number: string | null;
  id_verified: number; // 1 once the committee has checked the original
  email: string;
  phone: string | null;
  city: string;
  registered_at: string; // UTC, "YYYY-MM-DD HH:MM:SS"
  email_sent: number;
  email_note: string | null; // why the confirmation was not sent, if it was not
};

/** "BANZ-0042": the member number shown to the member and the committee. */
export const memberNumber = (id: number) => `BANZ-${String(id).padStart(4, "0")}`;

// The table is created the first time the database is used, so nothing needs
// to be set up by hand. Each statement is one line (a D1 requirement).
const CREATE =
  "CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE, phone TEXT, city TEXT NOT NULL, registered_at TEXT NOT NULL DEFAULT (datetime('now')), email_sent INTEGER NOT NULL DEFAULT 0)";

const MESSAGES =
  "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))";

const ready = new WeakSet<D1Database>();
async function db(): Promise<D1Database | null> {
  const d = database();
  if (d && !ready.has(d)) {
    await d.prepare(CREATE).run();
    // Added after the first version: older databases get the column once.
    for (const col of ["email_note TEXT", "first_name TEXT", "last_name TEXT", "dob TEXT", "id_document TEXT", "id_number TEXT", "id_verified INTEGER NOT NULL DEFAULT 0"]) {
      await d.prepare(`ALTER TABLE members ADD COLUMN ${col}`).run().catch(() => {});
    }
    await d.prepare(MESSAGES).run();
    ready.add(d);
  }
  return d;
}

export async function addMember(m: {
  firstName: string;
  lastName: string;
  dob: string;
  idDocument: string;
  idNumber: string;
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
    .prepare("INSERT INTO members (name, first_name, last_name, dob, id_document, id_number, email, phone, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(`${m.firstName} ${m.lastName}`, m.firstName, m.lastName, m.dob, m.idDocument, m.idNumber, email, m.phone || null, m.city)
    .run();
  return { status: "created", id: Number(res.meta.last_row_id) };
}

export async function recordEmailResult(id: number, sent: boolean, note?: string) {
  const d = await db();
  await d?.prepare("UPDATE members SET email_sent = ?, email_note = ? WHERE id = ?").bind(sent ? 1 : 0, sent ? null : (note ?? null), id).run();
}

export async function getMember(id: number): Promise<Member | null> {
  const d = await db();
  return d ? await d.prepare("SELECT * FROM members WHERE id = ?").bind(id).first<Member>() : null;
}

export async function membersWithoutEmail(): Promise<Member[]> {
  const d = await db();
  if (!d) return [];
  return (await d.prepare("SELECT * FROM members WHERE email_sent = 0 ORDER BY id").all<Member>()).results;
}

export async function listMembers(query = ""): Promise<{ members: Member[]; total: number; connected: boolean }> {
  const d = await db();
  if (!d) return { members: [], total: 0, connected: false };
  const total = Number((await d.prepare("SELECT count(*) AS n FROM members").first<{ n: number }>())?.n ?? 0);
  const q = `%${query.trim().replace(/[%_]/g, "")}%`;
  const { results } = query.trim()
    ? await d
        .prepare("SELECT * FROM members WHERE name LIKE ? OR email LIKE ? OR city LIKE ? OR phone LIKE ? OR dob LIKE ? OR id_number LIKE ? ORDER BY id DESC")
        .bind(q, q, q, q, q, q)
        .all<Member>()
    : await d.prepare("SELECT * FROM members ORDER BY id DESC").all<Member>();
  return { members: results, total, connected: true };
}

export async function removeMember(id: number) {
  const d = await db();
  await d?.prepare("DELETE FROM members WHERE id = ?").bind(id).run();
}

/** The number the next person to register will get (shown read-only on the form). */
export async function nextMemberId(): Promise<number> {
  try {
    const d = await db();
    if (!d) return 1;
    const row = await d.prepare("SELECT seq FROM sqlite_sequence WHERE name = 'members'").first<{ seq: number }>();
    return Number(row?.seq ?? 0) + 1;
  } catch {
    return 1;
  }
}

export type Message = { id: number; name: string; email: string; message: string; created_at: string };

/** Keeps every contact-form message so the committee can read them in /admin. */
export async function addMessage(m: { name: string; email: string; message: string }): Promise<boolean> {
  const d = await db();
  if (!d) return false;
  await d.prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)").bind(m.name, m.email, m.message).run();
  return true;
}

export async function listMessages(): Promise<{ messages: Message[]; connected: boolean }> {
  const d = await db();
  if (!d) return { messages: [], connected: false };
  return { messages: (await d.prepare("SELECT * FROM messages ORDER BY id DESC").all<Message>()).results, connected: true };
}

export async function removeMessage(id: number) {
  const d = await db();
  await d?.prepare("DELETE FROM messages WHERE id = ?").bind(id).run();
}

export type Stats = {
  connected: boolean;
  members: number;
  last7: number;
  last30: number;
  thisYear: number;
  emailed: number;
  notEmailed: number;
  messages: number;
  messages7: number;
  ages: { label: string; n: number }[];
  months: { label: string; n: number }[];
};

export async function getStats(): Promise<Stats> {
  const d = await db();
  const empty: Stats = { connected: false, members: 0, last7: 0, last30: 0, thisYear: 0, emailed: 0, notEmailed: 0, messages: 0, messages7: 0, ages: [], months: [] };
  if (!d) return empty;
  const { results: all } = await d.prepare("SELECT registered_at, dob, email_sent FROM members").all<Pick<Member, "registered_at" | "dob" | "email_sent">>();
  const msg = await d
    .prepare("SELECT count(*) AS n, sum(created_at >= datetime('now','-7 days')) AS w FROM messages")
    .first<{ n: number; w: number | null }>();
  const now = new Date();
  const when = (m: { registered_at: string }) => new Date(m.registered_at.replace(" ", "T") + "Z").getTime();
  const days = (n: number) => all.filter((m) => now.getTime() - when(m) <= n * 864e5).length;

  const bands = [
    { label: "Under 18", min: 0, max: 17 },
    { label: "18–35", min: 18, max: 35 },
    { label: "36–59", min: 36, max: 59 },
    { label: "60 and over", min: 60, max: 200 },
  ].map((b) => ({ label: b.label, n: 0, min: b.min, max: b.max }));
  let unknown = 0;
  for (const m of all) {
    if (!m.dob) {
      unknown++;
      continue;
    }
    const b = new Date(m.dob);
    let age = now.getUTCFullYear() - b.getUTCFullYear();
    if (now.getUTCMonth() < b.getUTCMonth() || (now.getUTCMonth() === b.getUTCMonth() && now.getUTCDate() < b.getUTCDate())) age--;
    const band = bands.find((x) => age >= x.min && age <= x.max);
    if (band) band.n++;
  }

  const months = Array.from({ length: 6 }, (_, i) => {
    const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - i), 1));
    const key = t.toISOString().slice(0, 7);
    return { label: t.toLocaleString("en-NZ", { month: "short", year: "2-digit", timeZone: "UTC" }), n: all.filter((m) => m.registered_at.startsWith(key)).length };
  });

  return {
    connected: true,
    members: all.length,
    last7: days(7),
    last30: days(30),
    thisYear: all.filter((m) => m.registered_at.startsWith(String(now.getUTCFullYear()))).length,
    emailed: all.filter((m) => m.email_sent).length,
    notEmailed: all.filter((m) => !m.email_sent).length,
    messages: Number(msg?.n ?? 0),
    messages7: Number(msg?.w ?? 0),
    ages: [...bands.map(({ label, n }) => ({ label, n })), ...(unknown ? [{ label: "Not given", n: unknown }] : [])],
    months,
  };
}

export async function setIdVerified(id: number, verified: boolean) {
  const d = await db();
  await d?.prepare("UPDATE members SET id_verified = ? WHERE id = ?").bind(verified ? 1 : 0, id).run();
}
