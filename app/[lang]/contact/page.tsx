import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { sendContact } from "../actions";
import { Form } from "@/components/Form";
import { Container, PageHeader, T } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Bhutanese Association of New Zealand.",
};

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.contact;
  const big = "font-display block text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-heading hover:text-saffron-ink";

  return (
    <>
      <PageHeader lang={lang} kicker={t.kicker} title={t.title} lede={t.lede} />

      <Container className="grid gap-16 py-24 md:py-32 lg:grid-cols-12">
        <dl className="space-y-10 lg:col-span-4">
          <div>
            <dt className="kicker">
              <T t={t.callUs} lang={lang} />
            </dt>
            <dd className="mt-1">
              <a href={`tel:${site.phoneTel}`} className={big}>
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="kicker">
              <T t={t.emailUs} lang={lang} />
            </dt>
            <dd className="mt-1">
              <a href={`mailto:${site.email}`} className={`${big} wrap-break-word`}>
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="kicker">
              <T t={ui.footer.follow} lang={lang} />
            </dt>
            {site.socials.map((s) => (
              <dd key={s.label} className="mt-1">
                <a href={s.url} className={big} rel="noopener">
                  {s.label}
                </a>
              </dd>
            ))}
          </div>
        </dl>

        <section aria-labelledby="form-title" className="lg:col-span-7 lg:col-start-6">
          <h2 id="form-title" className="h2">
            <T t={t.formTitle} lang={lang} />
          </h2>
          <p className="mt-4 mb-10 text-ink-soft">
            <T t={t.responseNote} lang={lang} />
          </p>
          <Form
            lang={lang}
            action={sendContact}
            submit={ui.forms.send}
            success={ui.forms.sent}
            fields={[
              { name: "name", label: ui.forms.name, required: true, autoComplete: "name" },
              { name: "email", label: ui.forms.email, type: "email", required: true, autoComplete: "email" },
              { name: "message", label: ui.forms.message, type: "textarea", required: true },
            ]}
          />
        </section>
      </Container>
    </>
  );
}
