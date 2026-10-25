import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { adminSession } from "@/lib/admin-auth";
import { Seal } from "@/components/Mark";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: { default: "Member register — BANZ", template: "%s — BANZ admin" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const name = await adminSession();
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh bg-cream text-ink antialiased">
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-3">
            <Link href="/admin" className="flex items-center gap-3">
              <Seal size={44} className="h-11 w-11" />
              <span className="font-display text-[1.25rem] text-heading">Member register</span>
            </Link>
            <nav className="flex items-center gap-3 text-[0.9375rem] font-medium">
              {name && (
                <>
                  <Link href="/admin" className="rounded-full px-3 py-2 hover:bg-sand">Overview</Link>
                  <Link href="/admin/members" className="rounded-full px-3 py-2 hover:bg-sand">Members</Link>
                  <Link href="/admin/messages" className="rounded-full px-3 py-2 hover:bg-sand">Messages</Link>
                </>
              )}
              <Link href="/" className="rounded-full px-3 py-2 hover:bg-sand">View website</Link>
              {name && (
                <form action={logout} className="flex items-center gap-2 border-l border-line pl-3">
                  <span className="text-ink-soft">{name}</span>
                  <button className="rounded-full px-3 py-2 font-semibold text-heading hover:bg-sand">Sign out</button>
                </form>
              )}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-[1240px] px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
