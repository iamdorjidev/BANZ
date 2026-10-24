"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfigured, endAdminSession, passwordOk, requireAdmin, startAdminSession } from "@/lib/admin-auth";
import { getMember, membersWithoutEmail, removeMember } from "@/lib/members";
import { sendWelcome } from "@/lib/welcome";

export type LoginState = { error?: string; name?: string };

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const name = String(form.get("name") ?? "").trim().slice(0, 80);
  if (!adminConfigured()) return { name, error: "The admin password has not been set up yet (ADMIN_PASSWORD and SESSION_SECRET)." };
  if (!name) return { error: "Enter your name." };
  if (!passwordOk(String(form.get("password") ?? ""))) return { name, error: "That password is not right." };
  await startAdminSession(name);
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin/login");
}

export async function deleteMember(form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id"));
  if (Number.isInteger(id) && id > 0) await removeMember(id);
  revalidatePath("/admin");
}

export type ResendState = { message?: string; error?: string };

/** Send (or re-send) the confirmation email to one member. */
export async function resendOne(_prev: ResendState, form: FormData): Promise<ResendState> {
  await requireAdmin();
  const m = await getMember(Number(form.get("id")));
  if (!m) return { error: "Member not found." };
  const out = await sendWelcome(m);
  revalidatePath("/admin");
  return out.result === "sent" ? { message: `Sent to ${m.email}.` } : { error: out.detail };
}

/** Send the confirmation to everyone who has not had one yet. */
export async function resendAll(): Promise<ResendState> {
  await requireAdmin();
  const pending = await membersWithoutEmail();
  let sent = 0;
  let firstError: string | undefined;
  for (const m of pending) {
    const out = await sendWelcome(m);
    if (out.result === "sent") sent++;
    else {
      firstError = out.detail;
      break; // the same problem would hit everyone — stop and report it
    }
  }
  revalidatePath("/admin");
  return firstError
    ? { error: `${sent} sent. Stopped because: ${firstError}` }
    : { message: pending.length ? `${sent} confirmation emails sent.` : "Everyone has already been emailed." };
}
