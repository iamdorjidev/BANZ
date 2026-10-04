"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/** Strip the internal /en prefix so server and browser agree on the path. */
function usePublicPath() {
  const raw = usePathname() ?? "/";
  return raw.replace(/^\/(en|dz)(?=\/|$)/, "") || "/";
}

function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

/** Desktop navigation links with an underline on the current page. */
export function NavLinks({ items }: { items: { href: string; label: ReactNode }[] }) {
  const path = usePublicPath();
  return (
    <ul className="flex items-center gap-0.5 text-[0.9375rem] font-medium tracking-[0.01em] whitespace-nowrap">
      {items.map((item) => {
        const active = isActive(path, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group relative inline-flex h-10 items-center rounded-full px-3 transition-colors ${
                active ? "text-heading" : "text-ink/80 hover:text-heading"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-saffron transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Header wrapper that gains a soft shadow once the page is scrolled. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 bg-cream/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-18px_rgb(36_19_15/0.45)]" : "shadow-[0_1px_0_var(--line)]"
      }`}
    >
      {children}
    </header>
  );
}
