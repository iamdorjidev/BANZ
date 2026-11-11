import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { href, isLocale, tr } from "@/lib/i18n";
import { dateParts } from "@/lib/dates";
import { ui } from "@/content/ui";
import { events } from "@/content/events";
import { visible } from "@/lib/drafts";
import { Container, T } from "@/components/ui";

const find = (id: string) => visible(events).find((e) => e.id === id);

export async function generateMetadata({ params }: PageProps<"/[lang]/events/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const e = find(id);
  if (!e || !isLocale(lang)) return {};
  return { title: tr(e.title, lang), description: tr(e.summary, lang) };
}

export default async function EventPage({ params }: PageProps<"/[lang]/events/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const e = find(id);
  if (!e) notFound();
  const d = dateParts(e.date);
  const paragraphs = tr(e.details ?? e.summary, lang).split(/\n\n+/);

  return (
    <Container as="article" className="py-16 md:py-24">
      <Link href={href(lang, "/events")} className="font-semibold text-heading underline decoration-saffron decoration-2 underline-offset-4">
        ← <T t={ui.events.back} lang={lang} />
      </Link>

      <p className="mt-10 text-[1.125rem] text-saffron-ink">
        <time dateTime={e.date}>
          {d.weekday} {d.day} {d.month} {d.year}
        </time>
        {e.time && ` · ${e.time}`}
      </p>
      <h1 className="font-display mt-3 max-w-4xl text-[clamp(2rem,4vw,3.25rem)] leading-tight text-heading">
        <T t={e.title} lang={lang} />
      </h1>
      <p className="mt-3 text-ink-soft">
        <T t={e.venue} lang={lang} />
      </p>

      <div className="measure mt-10 space-y-5 text-[1.125rem]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {e.photos && e.photos.length > 0 && (
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {e.photos.map((p, i) => (
            <li key={p.src} className={`relative aspect-4/3 overflow-hidden rounded-2xl ${i === 0 ? "sm:col-span-2 lg:col-span-3 lg:aspect-16/9" : ""}`}>
              <Image src={p.src} alt={tr(p.alt, lang)} fill sizes={i === 0 ? "100vw" : "(min-width: 1024px) 33vw, 50vw"} style={{ objectPosition: p.position }} className="object-cover" />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
