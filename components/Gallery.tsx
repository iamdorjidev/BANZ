import Image from "next/image";
import { tr, type Locale } from "@/lib/i18n";
import { gallery } from "@/content/gallery";
import { T } from "./ui";

/**
 * Photo essay: one wide photograph, then the rest in a row beneath it,
 * each with a small caption underneath.
 */
export function Gallery({ lang }: { lang: Locale }) {
  const [lead, ...rest] = gallery;
  if (!lead) return null;
  return (
    <div className="space-y-10">
      <figure>
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl md:aspect-21/9">
          <Image src={lead.src} alt={tr(lead.alt, lang)} fill sizes="100vw" className="graded object-cover object-[50%_40%]" />
        </div>
        <figcaption className="mt-3 text-[0.9375rem] text-ink-soft">
          <T t={lead.caption} lang={lang} />
        </figcaption>
      </figure>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <figure key={p.src}>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image src={p.src} alt={tr(p.alt, lang)} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="graded object-cover" />
            </div>
            <figcaption className="mt-3 text-[0.9375rem] text-ink-soft">
              <T t={p.caption} lang={lang} />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
