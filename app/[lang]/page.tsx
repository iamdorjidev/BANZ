import Image from "next/image";
import { notFound } from "next/navigation";
import { href, isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { pillars } from "@/content/community";
import { upcomingEvents } from "@/content/queries";
import { ui } from "@/content/ui";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { EventList } from "@/components/EventCard";
import { ButtonLink, Container, NumberedList, SectionHeading, T } from "@/components/ui";
import signingPhoto from "@/public/images/committee-signing.jpg";
import templePhoto from "@/public/images/temple-gathering.jpg";

// Re-render daily so upcoming events move on without a redeploy.
export const revalidate = 86400;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Hero lang={lang} />
      <Intro lang={lang} />
      <Gatherings lang={lang} />
    </>
  );
}

/**
 * Headline, mission and joining, beside two overlapping photographs —
 * with "What we do" underneath in the same section.
 */
function Intro({ lang }: { lang: Locale }) {
  return (
    <section aria-labelledby="hero-title" className="py-24 md:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <div>
          <h1 id="hero-title" className="h1 whitespace-pre-line text-heading lg:text-[clamp(3rem,4.6vw,4.5rem)]">
            <T t={site.tagline} lang={lang} />
          </h1>
          <p className="mt-8 max-w-[44ch] text-[1.25rem] leading-relaxed text-ink-soft">
            <T t={site.mission} lang={lang} />
          </p>
          <p className="mt-5 max-w-[44ch] text-ink-soft">
            <T t={ui.home.joinText} lang={lang} />
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={href(lang, "/membership")}>
              <T t={ui.hero.join} lang={lang} />
            </ButtonLink>
            <ButtonLink href={href(lang, "/about")} variant="text">
              <T t={ui.home.ourStory} lang={lang} />
            </ButtonLink>
          </div>
        </div>

        {/* Two photographs, the smaller one overlapping the larger. */}
        <div className="relative pb-16 pl-10 sm:pl-20">
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-5/6">
            <Image
              src={signingPhoto}
              alt="Three people in gho and kira, one holding up a signed document, in a temple hall."
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="graded object-cover object-[50%_55%]"
            />
          </div>
          <div className="absolute bottom-0 left-0 aspect-4/3 w-[55%] overflow-hidden rounded-2xl ring-8 ring-cream">
            <Image
              src={templePhoto}
              alt="The community gathered together inside a temple."
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="graded object-cover"
            />
          </div>
        </div>
      </Container>

      <Container className="mt-24 md:mt-32">
        <h2 id="what-we-do" className="h2">
          <T t={ui.home.whatWeDo} lang={lang} />
        </h2>
        <NumberedList
          lang={lang}
          columns={4}
          className="mt-12"
          items={pillars.map((p) => ({ title: p.title, text: p.summary }))}
        />
      </Container>
    </section>
  );
}

/** Upcoming events and the photo gallery, together in one section. */
function Gatherings({ lang }: { lang: Locale }) {
  const upcoming = upcomingEvents().slice(0, 3);
  return (
    <section aria-labelledby="gatherings" className="bg-sand/60 py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="gatherings" title={ui.home.events} lede={ui.home.eventsLede} lang={lang} />
          <ButtonLink href={href(lang, "/events")} variant="outline">
            <T t={ui.home.allEvents} lang={lang} />
          </ButtonLink>
        </div>

        <h3 className="kicker mt-14">
          <T t={ui.home.upcoming} lang={lang} />
        </h3>
        <div className="mt-2">
          {upcoming.length > 0 ? (
            <EventList events={upcoming} lang={lang} />
          ) : (
            <p className="font-display text-[1.75rem] text-heading">
              <T t={ui.home.noEvents} lang={lang} />
            </p>
          )}
        </div>

        <h3 className="kicker mt-20">
          <T t={ui.home.galleryTitle} lang={lang} />
        </h3>
        <div className="mt-6">
          <Gallery lang={lang} />
        </div>
      </Container>
    </section>
  );
}
