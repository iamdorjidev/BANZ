import Image from "next/image";
import { tr, type Locale } from "@/lib/i18n";
import { heroImage } from "@/content/site";

/** Homepage opening: one bright, full-bleed photograph and nothing on top of it. */
export function Hero({ lang }: { lang: Locale }) {
  if (!heroImage.src) return null;
  return (
    <section aria-label="Photograph of the community" className="relative h-[62svh] min-h-90 overflow-hidden bg-sand lg:h-[calc(100svh-7rem)]">
      <Image
        src={heroImage.src}
        alt={tr(heroImage.alt, lang)}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={{ objectPosition: heroImage.position }}
        className="graded drift object-cover"
      />
    </section>
  );
}
