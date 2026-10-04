export type Locale = "en" | "dz";
/**
 * Languages the site is built in. Dzongkha is switched off for now; content
 * files keep their `dz` fields so it can be switched back on later by adding
 * "dz" here and restoring a language switch in the header.
 */
export const locales: readonly Locale[] = ["en"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * A piece of text in both languages. Dzongkha is optional until the
 * committee translates it; missing strings fall back to English.
 */
export type Localized = { en: string; dz?: string };

/** Resolve text for a locale, and report which language was actually used. */
export function pick(text: Localized, lang: Locale): { text: string; lang: Locale } {
  if (lang === "dz" && text.dz) return { text: text.dz, lang: "dz" };
  return { text: text.en, lang: "en" };
}

/** Plain string version of `pick`, for attributes like alt text. */
export function tr(text: Localized, lang: Locale): string {
  return pick(text, lang).text;
}

/**
 * Build an internal link. English lives at clean URLs (/about);
 * Dzongkha lives under /dz (/dz/about).
 */
export function href(lang: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return lang === "en" ? clean || "/" : `/dz${clean}`;
}
