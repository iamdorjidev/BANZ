import Image from "next/image";
import { href, tr, type Locale } from "@/lib/i18n";
import { heroImage, site } from "@/content/site";
import { ui } from "@/content/ui";
import { ButtonLink, Container, Kicker, T } from "./ui";

/**
 * Homepage opening: one bright, full-bleed photograph, with a small light
 * panel in the corner inviting people to register as members.
 */
export function Hero({ lang }: { lang: Locale }) {
  if (!heroImage.src) return null;
  return (
    <section
      aria-label="Photograph of the community"
      className="relative h-[70svh] min-h-110 overflow-hidden bg-sand lg:h-[calc(100svh-7rem)]"
    >
      <Image
        src={heroImage.src}
        alt={tr(heroImage.alt, lang)}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectPosition: heroImage.position }}
        className="graded drift object-cover"
      />

      <Container className="absolute inset-x-0 bottom-0 pb-5 md:pb-10">
        <div className="rise max-w-md rounded-3xl bg-cream/92 p-6 shadow-2xl backdrop-blur-sm md:p-8">
          <Kicker>
            <T t={ui.home.heroKicker} lang={lang} />
          </Kicker>
          <h2 className="font-display mt-2 text-[1.75rem] leading-tight text-heading md:text-[2rem]">
            <T t={ui.home.heroTitle} lang={lang} />
          </h2>
          <p className="mt-3 text-[1.0625rem] text-ink-soft">
            <T t={ui.home.heroText} lang={lang} />
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={href(lang, "/membership")}>
              <T t={ui.home.heroButton} lang={lang} />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
