import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { pastEvents, upcomingEvents } from "@/content/queries";
import { EventList } from "@/components/EventCard";
import { Gallery } from "@/components/Gallery";
import { Container, PageHeader, T } from "@/components/ui";
import headerPhoto from "@/public/images/temple-gathering.jpg";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past gatherings of the Bhutanese community in New Zealand.",
};

export default async function EventsPage({ params }: PageProps<"/[lang]/events">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.events;
  const upcoming = upcomingEvents();
  const past = pastEvents();

  return (
    <>
      <PageHeader
        lang={lang}
        kicker={t.kicker}
        title={t.title}
        lede={t.lede}
        image={headerPhoto}
        imageAlt={{ en: "The community gathered together inside a temple." }}
      />

      <Container as="section" aria-labelledby="upcoming" className="py-24 md:py-32">
        <h2 id="upcoming" className="h2">
          <T t={ui.events.upcoming} lang={lang} />
        </h2>
        <div className="mt-8">
          {upcoming.length > 0 ? (
            <EventList events={upcoming} lang={lang} />
          ) : (
            <p className="font-display text-[1.75rem] text-heading">
              <T t={ui.events.none} lang={lang} />
            </p>
          )}
        </div>
      </Container>

      <section aria-labelledby="moments" className="bg-sand/60 py-24 md:py-32">
        <Container>
          <h2 id="moments" className="h2">
            <T t={ui.home.galleryTitle} lang={lang} />
          </h2>
          <div className="mt-12">
            <Gallery lang={lang} />
          </div>
        </Container>
      </section>

      <Container as="section" aria-labelledby="past" className="py-24 md:py-32">
        <h2 id="past" className="h2">
          <T t={ui.events.past} lang={lang} />
        </h2>
        <div className="mt-8">
          {past.length > 0 ? (
            <EventList events={past} lang={lang} />
          ) : (
            <p className="text-ink-soft">
              <T t={ui.events.noPast} lang={lang} />
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
