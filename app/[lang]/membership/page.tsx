import type { Metadata } from "next";
import { nzPlaces } from "@/lib/nz-places";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { membership } from "@/content/membership";
import { applyForMembership } from "../actions";
import { idDocuments, memberNumber, nextMemberId } from "@/lib/members";
import { Form } from "@/components/Form";
import { Seal } from "@/components/Mark";
import { Container, T } from "@/components/ui";

export const metadata: Metadata = {
  title: "Membership",
  description: "Are you a member yet? Register with the Bhutanese Association of New Zealand — free for now.",
};

// The Member ID shown on the form comes from the database, so this page is never cached.
export const dynamic = "force-dynamic";

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-none stroke-current stroke-[3]">
    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Alert = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-none stroke-current stroke-[2.5]">
    <path d="M12 7v6M12 17h.01" strokeLinecap="round" />
  </svg>
);

/**
 * The poster as a page: the "Are you a member yet?" pitch on the left and the
 * form on the right, so people can register without scrolling. On phones the
 * pitch is cut to the headline and the form comes straight after.
 */
export default async function MembershipPage({ params }: PageProps<"/[lang]/membership">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.membership;
  const nextNo = memberNumber(await nextMemberId());
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <section className="relative overflow-hidden bg-maroon text-on-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(248_196_87/0.22),transparent_55%)]" />
        <Container className="relative grid gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
          {/* The pitch */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <Seal size={72} className="h-16 w-16 shrink-0 rounded-full ring-2 ring-gold/70" />
              <p className="font-display text-[1.125rem] italic text-gold">
                <T t={t.motto} lang={lang} />
              </p>
            </div>
            <h1 className="mt-6 font-sans text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] font-black uppercase italic tracking-tight">
              <T t={t.headlineA} lang={lang} /> <span className="text-gold"><T t={t.headlineB} lang={lang} /></span>{" "}
              <T t={t.headlineC} lang={lang} />
            </h1>
            <p className="mt-5 max-w-md text-[1.125rem] text-on-dark/90">
              <T t={t.lede} lang={lang} />
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <p className="rounded-full bg-gold px-5 py-2.5 font-black uppercase tracking-wide text-maroon-deep shadow-lg">
                <T t={t.free} lang={lang} />
              </p>
              <a href="#register" className="font-semibold underline decoration-gold decoration-2 underline-offset-4 lg:hidden">
                <T t={t.apply} lang={lang} /> ↓
              </a>
            </div>

            {/* Benefits sit beside the form on large screens; on phones they follow it. */}
            <div className="mt-10 hidden lg:block">
              <Benefits lang={lang} />
            </div>
          </div>

          {/* The form */}
          <div id="register" className="scroll-mt-6 lg:col-span-7">
            <div className="rounded-3xl bg-cream p-6 text-ink shadow-2xl ring-4 ring-gold/60 md:p-10">
              <h2 className="font-sans text-[clamp(1.75rem,3vw,2.25rem)] font-black uppercase italic text-heading">
                <T t={t.apply} lang={lang} />
              </h2>
              <p className="mt-2 mb-8 text-ink-soft">
                <T t={t.quick} lang={lang} />
              </p>
              <Form
                lang={lang}
                action={applyForMembership}
                submit={ui.forms.apply}
                success={ui.forms.applied}
                fields={[
                  { name: "member_id", label: ui.forms.memberId, fixed: nextNo, note: ui.forms.memberIdNote },
                  { name: "first_name", label: ui.forms.firstName, required: true, autoComplete: "given-name" },
                  { name: "last_name", label: ui.forms.lastName, required: true, autoComplete: "family-name" },
                  { name: "email", label: ui.forms.email, type: "email", required: true, autoComplete: "email" },
                  { name: "phone", label: ui.forms.phone, type: "tel", autoComplete: "tel" },
                  { name: "dob", label: ui.forms.dob, type: "date", required: true, autoComplete: "bday", max: today },
                  { name: "id_document", label: ui.forms.idDocument, type: "radio", required: true, options: idDocuments },
                  { name: "id_number", label: ui.forms.idNumber, required: true, showWhen: "id_document", note: ui.forms.idNumberNote },
                  { name: "city", label: ui.forms.city, required: true, autoComplete: "street-address", suggest: nzPlaces },
                ]}
              />
              <p className="mt-8 text-[0.9375rem] text-ink-soft">
                <T t={t.privacy} lang={lang} />
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Phones: the reasons to join, after the form. */}
      <section className="bg-maroon-deep pb-12 text-on-dark lg:hidden">
        <Container className="pt-10">
          <Benefits lang={lang} />
        </Container>
      </section>

      <section className="bg-sand py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl border-2 border-maroon/20 bg-cream p-7 md:p-9">
            <h2 className="font-sans text-[1.5rem] font-black uppercase italic text-maroon">
              <T t={t.without} lang={lang} />
            </h2>
            <ul className="mt-6 space-y-4">
              {membership.withoutJoining.map((w) => (
                <li key={w.en} className="flex items-start gap-4 text-[1.0625rem]">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon text-on-dark">
                    <Alert />
                  </span>
                  <T t={w} lang={lang} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <dl className="space-y-6">
              <div>
                <dt className="font-semibold text-heading">
                  <T t={t.who} lang={lang} />
                </dt>
                <dd className="mt-1">
                  <T t={membership.whoCanJoin} lang={lang} />
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-heading">
                  <T t={t.fee} lang={lang} />
                </dt>
                <dd className="mt-1">
                  <T t={membership.fee} lang={lang} />
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#register" className="rounded-full bg-maroon px-7 py-4 text-[1.125rem] font-black uppercase italic text-on-dark shadow-lg hover:bg-maroon-deep">
                <T t={t.apply} lang={lang} />!
              </a>
              <a href={`https://wa.me/${site.phoneTel.replace("+", "")}`} rel="noopener" target="_blank" className="font-semibold text-heading underline decoration-saffron decoration-2 underline-offset-4">
                {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Benefits({ lang }: { lang: Locale }) {
  const t = ui.pages.membership;
  return (
    <>
      <h2 className="font-sans text-[1.5rem] font-black uppercase italic">
        <T t={{ en: "As a member," }} lang={lang} /> <span className="text-gold"><T t={{ en: "you get" }} lang={lang} /></span>
        <span className="sr-only">
          <T t={t.benefits} lang={lang} />
        </span>
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {membership.benefits.map((b) => (
          <li key={b.en} className="flex items-start gap-3 rounded-2xl bg-white/8 p-4 text-[1rem] leading-snug ring-1 ring-white/15">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-maroon-deep">
              <Check />
            </span>
            <T t={b} lang={lang} />
          </li>
        ))}
      </ul>
    </>
  );
}
