import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { pillars } from "@/content/community";
import { Glossary } from "@/components/Glossary";
import { Container, PageHeader, T } from "@/components/ui";
import headerPhoto from "@/public/images/prayer-gathering.jpg";
import templePhoto from "@/public/images/temple-gathering.jpg";

export const metadata: Metadata = {
  title: "Community",
  description: "Culture, welfare, support for students and newcomers, and a shared community voice.",
};

export default async function CommunityPage({ params }: PageProps<"/[lang]/community">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.community;

  return (
    <>
      <PageHeader
        lang={lang}
        kicker={t.kicker}
        title={t.title}
        lede={t.lede}
        image={headerPhoto}
        imageAlt={{ en: "The community standing together in prayer in a sunlit hall." }}
      />

      {/* Each area of work as an editorial row: numeral and title, then detail. */}
      <Container className="py-24 md:py-32">
        {pillars.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            aria-labelledby={`${p.id}-title`}
            className="grid scroll-mt-8 gap-8 py-12 first:pt-0 md:grid-cols-[5rem_1fr_1fr] md:gap-12 md:py-16"
          >
            <span aria-hidden className="font-display text-[3.5rem] leading-none text-saffron-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 id={`${p.id}-title`} className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-tight text-heading">
                <T t={p.title} lang={lang} />
              </h2>
              <p className="mt-4 text-[1.25rem] leading-relaxed text-ink-soft">
                <T t={p.summary} lang={lang} />
              </p>
            </div>
            <ul className="space-y-4 md:pt-2">
              {p.detail.map((d, j) => (
                <li key={j} className="flex gap-4">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                  <span>
                    <T t={d} lang={lang} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>

      <div className="relative h-80 md:h-120">
        <Image
          src={templePhoto}
          alt="The community gathered together inside a temple."
          fill
          placeholder="blur"
          sizes="100vw"
          className="graded object-cover object-[50%_60%]"
        />
      </div>

      <Container className="py-24 md:py-32">
        <Glossary lang={lang} />
      </Container>
    </>
  );
}
