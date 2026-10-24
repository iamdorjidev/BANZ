"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Phone menu. A native <details> element (so it works before the page's
 * scripts load) that also closes itself when a link inside it is tapped, when
 * Escape is pressed, or when the screen is tapped outside it.
 */
export function MobileMenu({
  openLabel,
  closeLabel,
  children,
}: {
  openLabel: ReactNode;
  closeLabel: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <details
      ref={ref}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="group xl:hidden"
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-full border-[1.5px] border-maroon px-5 text-[0.9375rem] font-semibold text-heading [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{openLabel}</span>
        <span className="hidden group-open:inline">{closeLabel}</span>
        <span aria-hidden className="flex w-5 flex-col gap-1.25">
          <span className="h-0.5 rounded bg-maroon transition-transform group-open:translate-y-[3.5px] group-open:rotate-45" />
          <span className="h-0.5 rounded bg-maroon transition-transform group-open:translate-y-[-3.5px] group-open:-rotate-45" />
        </span>
      </summary>
      <nav
        aria-label="Main"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full max-h-[calc(100svh-5rem)] overflow-y-auto bg-cream px-6 pt-12 pb-10 shadow-2xl"
      >
        {children}
      </nav>
    </details>
  );
}
