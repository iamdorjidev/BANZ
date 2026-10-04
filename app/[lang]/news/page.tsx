import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/dates";
import { visible } from "@/lib/drafts";
import { news } from "@/content/news";
import { Container, DraftTag, PageHeader, T } from "@/components/ui";
import { showDrafts } from "@/lib/drafts";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements and notices from the Bhutanese Association of New Zealand.",
  alternates: { types: { "application/rss+xml": "/news/rss.xml" } },
};

export default async function NewsPage({ params }: PageProps<"/[lang]/news">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const items = visible(news).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader lang={lang} kicker={{ en: "News" }} title={{ en: "Announcements and notices." }} />
      <Container className="py-24 md:py-32">
        {items.length === 0 && <p className="lede">No notices yet.</p>}
        <div className="divide-y divide-line/70">
          {items.map((n) => (
            <article key={n.slug} id={n.slug} className="grid scroll-mt-8 gap-6 py-12 first:pt-0 md:grid-cols-[12rem_1fr] md:gap-12">
              <p className="kicker">
                <time dateTime={n.date}>{formatDate(n.date, lang)}</time>
              </p>
              <div>
                {n.draft && showDrafts && <DraftTag lang={lang} className="mb-3" />}
                <h2 className="font-display text-[clamp(1.875rem,3vw,2.5rem)] leading-tight text-heading">
                  <T t={n.title} lang={lang} />
                </h2>
                <div className="measure mt-6 space-y-4 text-[1.125rem] text-ink-soft">
                  {n.body.en.split(/\n\s*\n/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-16 text-ink-soft">
          Follow along with the <a href="/news/rss.xml" className="prose-link">RSS feed</a>.
        </p>
      </Container>
    </>
  );
}
