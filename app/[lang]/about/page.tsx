import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { about } from "@/content/about";
import { ui } from "@/content/ui";
import { Container, NumberedList, PageHeader, T } from "@/components/ui";
import gatheringPhoto from "@/public/images/community-gathering.jpg";
import prayerPhoto from "@/public/images/prayer-gathering.jpg";

export const metadata: Metadata = {
  title: "About",
  description: "Our story, mission and values.",
};

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.about;

  return (
    <>
      <PageHeader
        lang={lang}
        kicker={t.kicker}
        title={t.title}
        lede={about.lede}
        image={gatheringPhoto}
        imageAlt={{ en: "The Bhutanese community in Auckland gathered together on stage." }}
      />

      <Container as="section" aria-labelledby="story" className="grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <h2 id="story" className="h2 lg:col-span-4">
          <T t={t.story} lang={lang} />
        </h2>
        <div className="measure space-y-6 text-[1.25rem] leading-relaxed text-ink-soft lg:col-span-7 lg:col-start-6">
          {about.story.map((p, i) => (
            <p key={i} className={i === 0 ? "font-display text-[1.875rem] leading-snug text-heading" : ""}>
              <T t={p} lang={lang} />
            </p>
          ))}
        </div>
      </Container>

      <div className="relative h-80 md:h-120">
        <Image
          src={prayerPhoto}
          alt="The community standing together in prayer in a sunlit hall."
          fill
          placeholder="blur"
          sizes="100vw"
          className="graded object-cover"
        />
      </div>

      <Container as="section" aria-labelledby="mission" className="py-24 md:py-32">
        <h2 id="mission" className="h2">
          <T t={t.mission} lang={lang} />
        </h2>
        <ol className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {about.missionPoints.map((m, i) => (
            <li key={i} className="flex gap-6">
              <span aria-hidden className="font-display text-[3.25rem] leading-none text-saffron-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display pt-1 text-[1.625rem] leading-snug text-heading">
                <T t={m} lang={lang} />
              </span>
            </li>
          ))}
        </ol>
      </Container>

      <section aria-labelledby="values" className="bg-sand/60 py-24 md:py-32">
        <Container>
          <h2 id="values" className="h2">
            <T t={t.values} lang={lang} />
          </h2>
          <NumberedList lang={lang} columns={4} className="mt-14" items={about.values} />
        </Container>
      </section>
    </>
  );
}
