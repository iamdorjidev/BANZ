import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { buttonOutline, buttonPrimary, Container, T } from "./ui";
import { Seal } from "./Mark";
import { HeaderShell, NavLinks } from "./NavLinks";

const primaryNav = [
  { path: "/about", label: ui.nav.about },
  { path: "/executive", label: ui.nav.executive },
  { path: "/events", label: ui.nav.events },
  { path: "/community", label: ui.nav.community },
  { path: "/new-to-nz", label: ui.nav.newToNz },
  { path: "/contact", label: ui.nav.contact },
];

export function Header({ lang }: { lang: Locale }) {
  return (
    <HeaderShell>
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        {/*
          The seal is a badge: full size, framed by a cream mount and a fine
          saffron ring, hanging below the slim bar.
        */}
        <Link
          href={href(lang, "/")}
          className="relative z-10 mt-2 shrink-0 self-start rounded-full bg-cream p-1.5 shadow-[0_14px_30px_-12px_rgb(36_19_15/0.45)] ring-1 ring-saffron/70 transition-transform duration-500 hover:-translate-y-0.5"
        >
          <Seal
            size={104}
            priority
            alt="Bhutanese Association of New Zealand — home"
            className="h-20 w-20 lg:h-26 lg:w-26"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 whitespace-nowrap xl:flex">
          <NavLinks
            items={primaryNav.map((item) => ({
              href: href(lang, item.path),
              label: <T t={item.label} lang={lang} />,
            }))}
          />
          <span aria-hidden className="h-6 w-px bg-line" />
          <div className="flex items-center gap-2.5">
            <Link href={href(lang, "/donate")} className={`${buttonOutline} min-h-11 px-5 text-[0.9375rem]`}>
              <T t={ui.nav.donate} lang={lang} />
            </Link>
            <Link href={href(lang, "/membership")} className={`${buttonPrimary} min-h-11 px-5 text-[0.9375rem]`}>
              <T t={ui.hero.join} lang={lang} />
            </Link>
          </div>
        </nav>

        {/* Mobile menu: <details> works without JavaScript on any phone. */}
        <details className="group xl:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-full border-[1.5px] border-maroon px-5 text-[0.9375rem] font-semibold text-heading [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              <T t={ui.menu} lang={lang} />
            </span>
            <span className="hidden group-open:inline">
              <T t={ui.close} lang={lang} />
            </span>
            <span aria-hidden className="flex w-5 flex-col gap-1.25">
              <span className="h-0.5 rounded bg-maroon transition-transform group-open:translate-y-[3.5px] group-open:rotate-45" />
              <span className="h-0.5 rounded bg-maroon transition-transform group-open:translate-y-[-3.5px] group-open:-rotate-45" />
            </span>
          </summary>
          <nav
            aria-label="Main"
            className="absolute inset-x-0 top-full max-h-[calc(100svh-5rem)] overflow-y-auto bg-cream px-6 pt-12 pb-10 shadow-2xl"
          >
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.path} className="border-b border-line/70">
                  <Link href={href(lang, item.path)} className="font-display block py-4 text-[1.625rem] text-heading">
                    <T t={item.label} lang={lang} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(lang, "/membership")} className={buttonPrimary}>
                <T t={ui.hero.join} lang={lang} />
              </Link>
              <Link href={href(lang, "/donate")} className={buttonOutline}>
                <T t={ui.nav.donate} lang={lang} />
              </Link>
            </div>
          </nav>
        </details>
      </Container>
    </HeaderShell>
  );
}
