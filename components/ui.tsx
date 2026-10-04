import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { pick, tr, type Locale, type Localized } from "@/lib/i18n";
import { ui } from "@/content/ui";

/**
 * Localised text. On the Dzongkha site, untranslated strings fall back to
 * English and are marked lang="en" so screen readers pronounce them correctly.
 */
export function T({ t, lang }: { t: Localized; lang: Locale }) {
  const r = pick(t, lang);
  return r.lang === lang ? <>{r.text}</> : <span lang={r.lang}>{r.text}</span>;
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[1240px] px-6 md:px-10 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`kicker ${className}`}>{children}</p>;
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-[1.0625rem] font-semibold leading-tight transition duration-300";

/** Deep maroon with cream text: the main call to action. */
export const buttonPrimary = `${buttonBase} bg-maroon text-on-dark hover:bg-maroon-deep`;
/** Outlined, for secondary actions. */
export const buttonOutline = `${buttonBase} border-[1.5px] border-maroon text-heading hover:bg-maroon hover:text-on-dark`;
/** Kept for forms: same as primary. */
export const buttonMaroon = buttonPrimary;
/** Quiet text link with an arrow. */
export const buttonText =
  "group inline-flex min-h-12 items-center gap-2 text-[1.0625rem] font-semibold text-heading underline decoration-saffron decoration-2 underline-offset-[0.35em] hover:decoration-maroon";

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: "primary" | "outline" | "maroon" | "text" }) {
  const cls =
    variant === "outline" ? buttonOutline : variant === "text" ? buttonText : buttonPrimary;
  return (
    <Link {...props} className={`${cls} ${className}`}>
      {children}
      {variant === "text" && <Arrow />}
    </Link>
  );
}

export function Arrow() {
  return (
    <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  );
}

/** Visible marker on placeholder content. Only ever rendered on preview builds. */
export function DraftTag({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border border-dashed border-saffron-ink px-3 py-0.5 font-sans text-[0.8125rem] font-semibold text-saffron-ink ${className}`}
    >
      <T t={ui.placeholder} lang={lang} />
    </span>
  );
}

/** Section heading with an optional introduction. */
export function SectionHeading({
  id,
  title,
  lede,
  lang,
  className = "",
  center = false,
}: {
  id: string;
  title: Localized;
  lede?: Localized;
  lang: Locale;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[40rem] ${className}`}>
      <h2 id={id} className="h2">
        <T t={title} lang={lang} />
      </h2>
      {lede && (
        <p className="lede mt-5">
          <T t={lede} lang={lang} />
        </p>
      )}
    </div>
  );
}

/**
 * Numbered typographic list — the site's alternative to boxed card grids.
 * A large saffron numeral, a serif title, and a short paragraph.
 */
export function NumberedList({
  items,
  lang,
  columns = 3,
  className = "",
}: {
  items: { title: Localized; text: Localized }[];
  lang: Locale;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ol className={`grid gap-x-12 gap-y-14 ${cols} ${className}`}>
      {items.map((item, i) => (
        <li key={i}>
          <span aria-hidden className="font-display block text-[3.25rem] leading-none text-saffron-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display mt-5 text-[1.625rem] leading-snug text-heading">
            <T t={item.title} lang={lang} />
          </h3>
          <p className="mt-3 text-ink-soft">
            <T t={item.text} lang={lang} />
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Opening of every inner page: title and introduction on the left, a large
 * photograph on the right that runs to the edge of the screen.
 */
export function PageHeader({
  kicker,
  title,
  lede,
  lang,
  image,
  imageAlt,
}: {
  kicker: Localized;
  title: Localized;
  lede?: Localized;
  lang: Locale;
  image?: StaticImageData;
  imageAlt?: Localized;
}) {
  return (
    <section className="relative overflow-hidden bg-sand/60">
      <div className={`grid items-stretch ${image ? "lg:grid-cols-[1.05fr_1fr]" : ""}`}>
        <div
          className={`flex flex-col justify-center px-6 py-16 md:px-10 md:py-24 ${
            image
              ? "lg:py-28 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]"
              : "mx-auto w-full max-w-[1240px]"
          }`}
        >
          <Kicker className="rise">
            <T t={kicker} lang={lang} />
          </Kicker>
          <h1 className="h1 rise rise-2 mt-5 max-w-[15ch] text-heading">
            <T t={title} lang={lang} />
          </h1>
          {lede && (
            <p className="rise rise-3 mt-8 max-w-[46ch] text-[1.25rem] leading-relaxed text-ink-soft">
              <T t={lede} lang={lang} />
            </p>
          )}
        </div>
        {image && (
          <div className="relative min-h-80 lg:min-h-136">
            <Image
              src={image}
              alt={imageAlt ? tr(imageAlt, lang) : ""}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="graded object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
