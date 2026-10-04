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
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} className={link} rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
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
