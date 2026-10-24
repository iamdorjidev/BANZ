import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { buttonOutline, buttonPrimary, Container, T } from "./ui";
import { Seal } from "./Mark";
import { HeaderShell, NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

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

        <MobileMenu openLabel={<T t={ui.menu} lang={lang} />} closeLabel={<T t={ui.close} lang={lang} />}>
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
        </MobileMenu>
      </Container>
    </HeaderShell>
  );
}
