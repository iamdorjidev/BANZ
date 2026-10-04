import { glossary } from "@/content/glossary";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { SectionHeading, T } from "./ui";

/** Glossary of Dzongkha terms, from content/glossary.ts, set like a dictionary. */
export function Glossary({ lang, headingId = "glossary" }: { lang: Locale; headingId?: string }) {
  return (
    <section aria-labelledby={headingId}>
      <SectionHeading id={headingId} title={ui.glossary} lede={ui.pages.community.glossaryLede} lang={lang} />
      <dl className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
        {glossary.map((g) => (
          <div key={g.id} id={`term-${g.id}`}>
            <dt className="flex flex-wrap items-baseline gap-x-4">
              <dfn className="font-display text-[1.875rem] text-heading not-italic">{g.term}</dfn>
              {g.script && (
                <span lang="dz" className="text-[1.375rem] text-saffron-ink">
                  {g.script}
                </span>
              )}
            </dt>
            <dd className="mt-2 text-ink-soft">
              <T t={g.meaning} lang={lang} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
