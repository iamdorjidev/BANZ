import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/dates";
import { site } from "@/content/site";
import { privacy } from "@/content/privacy";
import { Container, PageHeader, T } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What personal information we keep, why, and for how long.",
};

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <PageHeader lang={lang} kicker={{ en: "Privacy notice" }} title={{ en: "Your information, handled with care." }} lede={privacy.intro} />
      <Container className="py-24 md:py-32">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-12">
          {privacy.sections.map((s, i) => (
            <section key={i} aria-labelledby={`p-${i}`} className="grid gap-6 lg:col-span-12 lg:grid-cols-12">
              <h2 id={`p-${i}`} className="font-display text-[1.875rem] leading-snug text-heading lg:col-span-4">
                <T t={s.title} lang={lang} />
              </h2>
              <div className="measure space-y-4 text-ink-soft lg:col-span-7 lg:col-start-6">
                {s.body.map((p, j) => (
                  <p key={j}>
                    <T t={p} lang={lang} />
                  </p>
                ))}
              </div>
            </section>
          ))}
          <section className="grid gap-6 lg:col-span-12 lg:grid-cols-12">
            <h2 className="font-display text-[1.875rem] leading-snug text-heading lg:col-span-4">Contact us about privacy</h2>
            <div className="measure space-y-2 text-ink-soft lg:col-span-7 lg:col-start-6">
              <p>
                Email <a href={`mailto:${site.email}`} className="prose-link">{site.email}</a> or call{" "}
                <a href={`tel:${site.phoneTel}`} className="prose-link">{site.phone}</a>.
              </p>
              <p className="text-[0.9375rem]">Last updated {formatDate(privacy.updated, lang)}.</p>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
