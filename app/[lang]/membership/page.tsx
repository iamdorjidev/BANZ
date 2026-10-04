import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { membership } from "@/content/membership";
import { applyForMembership } from "../actions";
import { Form } from "@/components/Form";
import { Container, Kicker, NumberedList, PageHeader, T } from "@/components/ui";
import headerPhoto from "@/public/images/temple-gathering.jpg";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join the Bhutanese Association of New Zealand.",
};

export default async function MembershipPage({ params }: PageProps<"/[lang]/membership">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.membership;

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

      <Container as="section" aria-labelledby="benefits" className="py-24 md:py-32">
        <h2 id="benefits" className="h2">
          <T t={t.benefits} lang={lang} />
        </h2>
        <NumberedList lang={lang} columns={4} className="mt-14" items={membership.benefits} />
      </Container>

      <section aria-labelledby="apply" className="bg-sand/60 py-24 md:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="apply" className="h2">
              <T t={t.apply} lang={lang} />
            </h2>
            <p className="lede mt-5">
              <T t={t.applyLede} lang={lang} />
            </p>
            <dl className="mt-12 space-y-8">
              <div>
                <dt className="kicker">
                  <T t={t.who} lang={lang} />
                </dt>
                <dd className="mt-2">
                  <T t={membership.whoCanJoin} lang={lang} />
                </dd>
              </div>
              <div>
                <dt className="kicker">
                  <T t={t.fee} lang={lang} />
                </dt>
                <dd className="mt-2">
                  <T t={membership.fee} lang={lang} />
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Form
              lang={lang}
              action={applyForMembership}
              submit={ui.forms.apply}
              success={ui.forms.applied}
              fields={[
                { name: "name", label: ui.forms.name, required: true, autoComplete: "name" },
                { name: "email", label: ui.forms.email, type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: ui.forms.phone, type: "tel", autoComplete: "tel" },
                { name: "city", label: ui.forms.city, required: true, autoComplete: "address-level2" },
              ]}
            />
            <Kicker className="mt-10 font-normal! text-ink-soft!">
              <T t={t.privacy} lang={lang} />
            </Kicker>
          </div>
        </Container>
      </section>
    </>
  );
}
