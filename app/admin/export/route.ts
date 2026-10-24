import { adminSession } from "@/lib/admin-auth";
import { listMembers, memberNumber } from "@/lib/members";

/** All members as a spreadsheet file. Committee only. */
export async function GET() {
  if (!(await adminSession())) return new Response("Sign in at /admin/login", { status: 401 });
  const { members } = await listMembers();
  const cell = (v: string | number | null) => {
    let s = String(v ?? "");
    // Stop spreadsheet programs treating text as a formula.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = [
    ["Member no.", "Name", "Email", "Phone", "Town or city", "Registered (UTC)", "Confirmation emailed"],
    ...members
      .slice()
      .reverse()
      .map((m) => [memberNumber(m.id), m.name, m.email, m.phone, m.city, m.registered_at, m.email_sent ? "Yes" : "No"]),
  ];
  return new Response("﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="banz-members.csv"',
      "Cache-Control": "no-store",
    },
  });
}
