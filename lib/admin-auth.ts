import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { envVar } from "./env";

/**
 * One password protects the committee's member list.
 * Set ADMIN_PASSWORD and SESSION_SECRET (32+ random characters) as secrets
 * in the Cloudflare Worker settings.
 */
const COOKIE = "banz-admin";
const MAX_AGE = 60 * 60 * 12;

const sign = (payload: string) =>
  createHmac("sha256", envVar("SESSION_SECRET") ?? "").update(payload).digest("base64url");

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const adminConfigured = () => !!envVar("ADMIN_PASSWORD") && (envVar("SESSION_SECRET")?.length ?? 0) >= 32;

export function passwordOk(password: string) {
  const expected = envVar("ADMIN_PASSWORD");
  return !!expected && same(password, expected);
}

export async function startAdminSession(name: string) {
  const payload = Buffer.from(JSON.stringify({ name, exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endAdminSession() {
  (await cookies()).delete(COOKIE);
}

/** The signed-in admin's name, or null. */
export async function adminSession(): Promise<string | null> {
  if (!adminConfigured()) return null;
  const raw = (await cookies()).get(COOKIE)?.value;
  const [payload, sig] = raw?.split(".") ?? [];
  if (!payload || !sig || !same(sig, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { name: string; exp: number };
    return data.exp > Date.now() ? data.name : null;
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<string> {
  const name = await adminSession();
  if (!name) redirect("/admin/login");
  return name;
}
