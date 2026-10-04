import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { donate } from "@/content/donate";
import { Container, NumberedList, PageHeader, T } from "@/components/ui";
import headerPhoto from "@/public/images/prayer-gathering.jpg";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the Bhutanese community in New Zealand.",
};

export default async function DonatePage({ params }: PageProps<"/[lang]/donate">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.donate;
  const bank = donate.bankAccount;
  const contactLink = "font-display block text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-heading hover:text-saffron-ink";

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

      <Container as="section" aria-labelledby="where" className="py-24 md:py-32">
        <h2 id="where" className="h2">
          <T t={t.where} lang={lang} />
        </h2>
        <NumberedList lang={lang} columns={3} className="mt-14" items={donate.reasons} />
      </Container>

      <section aria-labelledby="how" className="bg-sand/60 py-24 md:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="how" className="h2">
              <T t={t.how} lang={lang} />
            </h2>
            <p className="lede mt-5">
              <T t={t.thanks} lang={lang} />
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="font-display text-[2rem] text-heading">
              <T t={t.bank} lang={lang} />
            </h3>
            {bank ? (
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="kicker">
                    <T t={t.accountName} lang={lang} />
                  </dt>
                  <dd className="text-[1.25rem]">{bank.name}</dd>
                </div>
                <div>
                  <dt className="kicker">
                    <T t={t.accountNumber} lang={lang} />
                  </dt>
                  <dd className="font-display text-[2rem] tracking-wide text-heading tabular-nums">{bank.number}</dd>
                </div>
                <div>
                  <dt className="kicker">
                    <T t={t.reference} lang={lang} />
                  </dt>
                  <dd className="text-[1.25rem]">
                    <T t={bank.reference} lang={lang} />
                  </dd>
                </div>
              </dl>
            ) : (
              // TODO(committee): bank details — see content/donate.ts
              <p className="mt-4 text-[1.125rem] text-ink-soft">
                <T t={t.askForDetails} lang={lang} />
              </p>
            )}

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="kicker">
                  <T t={t.callUs} lang={lang} />
                </dt>
                <dd>
                  <a href={`tel:${site.phoneTel}`} className={contactLink}>
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="kicker">
                  <T t={t.emailUs} lang={lang} />
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`} className={`${contactLink} wrap-break-word`}>
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <h3 className="font-display mt-16 text-[2rem] text-heading">
              <T t={t.other} lang={lang} />
            </h3>
            <NumberedList lang={lang} columns={2} className="mt-8" items={donate.otherWays} />
          </div>
        </Container>
      </section>
    </>
  );
}
