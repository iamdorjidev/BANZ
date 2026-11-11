import Image from "next/image";
import { href, tr, type Locale } from "@/lib/i18n";
import { heroImage } from "@/content/site";
import { ui } from "@/content/ui";
import { ButtonLink, Container, Kicker, T } from "./ui";

/**
 * Homepage opening: one bright, full-bleed photograph, with a small light
 * panel in the corner inviting people to register as members.
 */
export function Hero({ lang }: { lang: Locale }) {
  if (!heroImage.src) return null;
  return (
    <section aria-label="Homepage banner">
      {/* The banner carries its own text, so it is shown whole (never cropped or covered). */}
      <Image
        src={heroImage.src}
        alt={tr(heroImage.alt, lang)}
        priority
        placeholder="blur"
        sizes="100vw"
        className="h-auto w-full"
      />

      <div className="bg-sand">
        <Container className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <div className="max-w-2xl">
            <Kicker>
              <T t={ui.home.heroKicker} lang={lang} />
            </Kicker>
            <h2 className="font-display mt-2 text-[1.75rem] leading-tight text-heading md:text-[2rem]">
              <T t={ui.home.heroTitle} lang={lang} />
            </h2>
            <p className="mt-3 text-[1.0625rem] text-ink-soft">
              <T t={ui.home.heroText} lang={lang} />
            </p>
          </div>
          <ButtonLink href={href(lang, "/membership")}>
            <T t={ui.home.heroButton} lang={lang} />
          </ButtonLink>
        </Container>
      </div>
    </section>
  );
}
