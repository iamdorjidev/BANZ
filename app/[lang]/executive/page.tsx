import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { executiveTerms, type ExecutiveMember } from "@/content/executive";
import { Container, PageHeader, T } from "@/components/ui";
import headerPhoto from "@/public/images/community-gathering.jpg";

export const metadata: Metadata = {
  title: "Executive Members",
  description: "The current and previous Executive Members of the Bhutanese Association of New Zealand.",
};

export default async function ExecutivePage({ params }: PageProps<"/[lang]/executive">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = ui.pages.executive;
  const [current, ...previous] = executiveTerms;

  return (
    <>
      <PageHeader
        lang={lang}
        kicker={t.kicker}
        title={t.title}
        lede={t.lede}
        image={headerPhoto}
        imageAlt={{ en: "The Bhutanese community in Auckland gathered together on stage." }}
      />

      {current && (
        <section aria-labelledby="current" className="py-20 md:py-28">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="current" className="h2">
                <T t={t.current} lang={lang} />
              </h2>
              <p className="rounded-full bg-sand px-5 py-2 font-semibold text-saffron-ink">
                <T t={current.label} lang={lang} /> · {current.years}
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {current.members.map((m) => (
                <li key={m.name}>
                  <MemberCard m={m} lang={lang} ringGap="cream" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {previous.length > 0 && (
        <section aria-labelledby="previous" className="bg-sand py-20 md:py-28">
          <Container>
            <h2 id="previous" className="h2">
              <T t={t.previous} lang={lang} />
            </h2>
            {previous.map((term) => (
              <div key={term.years} className="mt-14">
                <h3 className="font-display flex items-baseline gap-4 text-[2rem] text-heading">
                  {term.years}
                  <span className="font-sans text-[1rem] font-semibold text-saffron-ink">
                    <T t={term.label} lang={lang} />
                  </span>
                </h3>
                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                  {term.members.map((m) => (
                    <li key={`${term.years}-${m.name}`}>
                      <MemberCard m={m} lang={lang} ringGap="sand" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Container>
        </section>
      )}
    </>
  );
}

function initials(name: string) {
  return name
    .replace(/^(Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Round portrait with a saffron ring, name and role. One size for every term. */
function MemberCard({ m, lang, ringGap }: { m: ExecutiveMember; lang: Locale; ringGap: "cream" | "sand" }) {
  return (
    <figure className="group flex flex-col items-center text-center">
      <div
        className={`photo-ring relative h-32 w-32 overflow-hidden bg-peach transition-transform duration-500 group-hover:scale-[1.03] ${
          ringGap === "sand" ? "[--cream:var(--sand)]" : ""
        }`}
      >
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill sizes="128px" className="graded object-cover" />
        ) : (
          // TODO(committee): portrait photo — see content/executive.ts
          <span aria-hidden className="font-display absolute inset-0 flex items-center justify-center text-[2.5rem] text-heading">
            {initials(m.name)}
          </span>
        )}
      </div>
      <figcaption className="mt-6">
        <p className="font-display text-[1.375rem] leading-tight text-heading">{m.name}</p>
        <p className="mt-2 text-[1rem] font-semibold text-saffron-ink">
          <T t={m.role} lang={lang} />
        </p>
        {m.bio && (
          <p className="mx-auto mt-3 max-w-[30ch] text-[0.9375rem] text-ink-soft">
            <T t={m.bio} lang={lang} />
          </p>
        )}
      </figcaption>
    </figure>
  );
}
