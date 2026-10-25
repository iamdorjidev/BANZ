import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { Container, T } from "./ui";
import { Fern } from "./Fern";
import { Seal } from "./Mark";

const explore = [
  { path: "/about", label: ui.nav.about },
  { path: "/executive", label: ui.nav.executive },
  { path: "/events", label: ui.nav.events },
  { path: "/news", label: ui.nav.news },
  { path: "/gallery", label: ui.nav.gallery },
  { path: "/community", label: ui.nav.community },
  { path: "/new-to-nz", label: ui.nav.newToNz },
  { path: "/membership", label: ui.nav.membership },
  { path: "/donate", label: ui.nav.donate },
];

const socialIcons: Record<string, string> = {
  Facebook:
    "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
  WhatsApp:
    "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z",
};

export function Footer({ lang }: { lang: Locale }) {
  const colTitle = "mb-5 font-display text-[1.375rem] text-heading";
  const link = "text-ink-soft transition-colors hover:text-heading";
  return (
    <footer className="relative overflow-hidden border-t border-line bg-sand text-ink">
      <Fern className="pointer-events-none absolute -right-6 -bottom-12 h-105 text-saffron/25" flip />
      <Container className="relative grid gap-14 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Seal size={112} className="h-24 w-24 rounded-full shadow-[0_10px_24px_-12px_rgb(36_19_15/0.45)] ring-1 ring-saffron/70 md:h-28 md:w-28" />
          <p className="font-display mt-6 text-[2rem] leading-tight text-heading">{site.name}</p>
          <p className="mt-3 text-ink-soft">{site.location}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className={colTitle}>
            <T t={ui.footer.explore} lang={lang} />
          </p>
          <ul className="space-y-2.5">
            {explore.map((item) => (
              <li key={item.path}>
                <Link href={href(lang, item.path)} className={link}>
                  <T t={item.label} lang={lang} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className={colTitle}>
            <T t={ui.footer.getInTouch} lang={lang} />
          </p>
          <ul className="space-y-2.5">
            <li>
              <a href={`tel:${site.phoneTel}`} className={link}>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
            </li>
            <li>
              <Link href={href(lang, "/contact")} className={link}>
                <T t={ui.nav.contact} lang={lang} />
              </Link>
            </li>
            <li className="flex items-center gap-3 pt-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  rel="noopener"
                  target="_blank"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-cream transition-colors hover:bg-heading"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d={socialIcons[s.label]} />
                  </svg>
                </a>
              ))}
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-[0.9375rem] text-ink-soft sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} ·{" "}
            <Link href={href(lang, "/privacy")} className="hover:text-heading">
              <T t={ui.footer.privacy} lang={lang} />
            </Link>
          </p>
          <p>
            {site.credit.url ? (
              <a href={site.credit.url} className="hover:text-heading" rel="noopener">
                {site.credit.label}
              </a>
            ) : (
              site.credit.label
            )}
          </p>
        </Container>
      </div>
    </footer>
  );
}
