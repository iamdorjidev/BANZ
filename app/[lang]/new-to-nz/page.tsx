import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { href, isLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { guide, importantNumbers, consularNote } from "@/content/new-to-nz";
import { ButtonLink, Container, Kicker, PageHeader, T } from "@/components/ui";

export const metadata: Metadata = {
  title: "New to New Zealand",
  description: "A practical settlement guide for Bhutanese students, workers and families arriving in New Zealand.",
};

export default async function NewToNzPage({ params }: PageProps<"/[lang]/new-to-nz">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.newToNz;

  return (
    <>
      <PageHeader lang={lang} kicker={t.kicker} title={t.title} lede={t.lede} />

      <Container className="pb-16">
        <nav aria-labelledby="contents" className="pt-12">
          <h2 id="contents" className="kicker">
            <T t={t.contents} lang={lang} />
          </h2>
          <ol className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {guide.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex min-h-12 items-center gap-3 hover:text-saffron-ink">
                  <span className="font-display text-saffron-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <T t={s.title} lang={lang} />
                </a>
              </li>
            ))}
            <li>
              <a href="#numbers" className="inline-flex min-h-12 items-center gap-3 hover:text-saffron-ink">
                <span className="font-display text-saffron-ink">·</span>
                <T t={t.numbers} lang={lang} />
              </a>
            </li>
          </ol>
        </nav>
      </Container>

      {guide.map((stage) => (
        <Container
          key={stage.id}
          as="section"
          aria-labelledby={`${stage.id}-title`}
          className="grid scroll-mt-8 gap-10 py-16 lg:grid-cols-12 md:py-24"
        >
          <div id={stage.id} className="lg:sticky lg:top-8 lg:col-span-4 lg:self-start">
            <Kicker>
              <T t={stage.eyebrow} lang={lang} />
            </Kicker>
            <h2 id={`${stage.id}-title`} className="h2 mt-4">
              <T t={stage.title} lang={lang} />
            </h2>
            <p className="mt-4 text-ink-soft">
              <T t={stage.intro} lang={lang} />
            </p>
          </div>
          <ol className="space-y-12 lg:col-span-7 lg:col-start-6">
            {stage.items.map((item, i) => (
              <li key={i}>
                <h3 className="h3">
                  <T t={item.title} lang={lang} />
                </h3>
                <p className="measure mt-3">
                  <T t={item.text} lang={lang} />
                </p>
                {item.links && (
                  <ul className="mt-4 space-y-1">
                    {item.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} className="prose-link" rel="noopener">
                          <T t={l.label} lang={lang} />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Container>
      ))}

      <section id="numbers" aria-labelledby="numbers-title" className="scroll-mt-8 bg-sand/60 py-24 md:py-32">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 id="numbers-title" className="h2 lg:col-span-4">
            <T t={t.numbers} lang={lang} />
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <dl>
              {importantNumbers.map((n) => (
                <div key={n.number} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-5">
                  <dt>
                    <T t={n.label} lang={lang} />
                  </dt>
                  <dd>
                    <a
                      href={`tel:${n.number.replace(/\s/g, "")}`}
                      className="font-display text-[1.75rem] tabular-nums hover:text-saffron-ink"
                    >
                      {n.number}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <h3 className="h3 mt-12">
              <T t={t.consular} lang={lang} />
            </h3>
            {/* TODO(committee): consular contact — see content/new-to-nz.ts */}
            <p className="mt-3 text-ink-soft">
              <T t={consularNote} lang={lang} />
            </p>
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-24 lg:grid-cols-12 md:py-32">
        <div className="lg:col-span-6">
          <h2 className="h2">
            <T t={t.ask} lang={lang} />
          </h2>
          <p className="lede mt-6">
            <T t={t.askText} lang={lang} />
          </p>
          <ButtonLink href={href(lang, "/contact")} className="group mt-8">
            <T t={ui.nav.contact} lang={lang} />
          </ButtonLink>
        </div>
        <p className="text-[0.9375rem] text-ink-soft lg:col-span-4 lg:col-start-9 lg:self-end">
          <T t={t.disclaimer} lang={lang} />
        </p>
      </Container>
    </>
  );
}
