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
    ["Member no.", "First name", "Last name", "Email", "Phone", "Date of birth", "Identity document", "Home address", "Registered (UTC)", "Confirmation emailed", "Email problem"],
    ...members
      .slice()
      .reverse()
      .map((m) => [memberNumber(m.id), m.first_name ?? m.name, m.last_name, m.email, m.phone, m.dob, m.id_document, m.city, m.registered_at, m.email_sent ? "Yes" : "No", m.email_note]),
  ];
  return new Response("﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="banz-members.csv"',
      "Cache-Control": "no-store",
    },
  });
}
