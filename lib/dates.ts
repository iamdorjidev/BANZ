import type { Locale } from "./i18n";

export const NZ_TZ = "Pacific/Auckland";

/** Today's date in New Zealand as YYYY-MM-DD. */
export function todayNZ(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: NZ_TZ }).format(now);
}

/** Parse "YYYY-MM-DD" as a calendar date (noon UTC avoids timezone edge cases). */
function parse(date: string): Date {
  return new Date(`${date}T12:00:00Z`);
}

// Dzongkha month names are not reliably supported by Intl, so dates stay in
// English formatting on both sites until the committee supplies a format.
export function formatDate(date: string, _lang: Locale, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat("en-NZ", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...opts,
  }).format(parse(date));
}

export function dateParts(date: string) {
  const d = parse(date);
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-NZ", { timeZone: "UTC", ...o }).format(d);
  return { day: f({ day: "numeric" }), month: f({ month: "long" }), year: f({ year: "numeric" }), weekday: f({ weekday: "long" }) };
}
