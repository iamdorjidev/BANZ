"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfigured, endAdminSession, passwordOk, requireAdmin, startAdminSession } from "@/lib/admin-auth";
import { removeMember } from "@/lib/members";

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
