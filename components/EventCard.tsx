import Image from "next/image";
import Link from "next/link";
import { href, tr, type Locale } from "@/lib/i18n";
import { dateParts } from "@/lib/dates";
import { showDrafts } from "@/lib/drafts";
import type { EventItem } from "@/content/events";
import { ui } from "@/content/ui";
import { DraftTag, T } from "./ui";

/** Editorial list of events: large date, title and details, photo when there is one. */
export function EventList({ events, lang }: { events: EventItem[]; lang: Locale }) {
  return (
    <ul className="divide-y divide-line/70">
      {events.map((e) => (
        <li key={e.id}>
          <EventRow e={e} lang={lang} />
        </li>
      ))}
    </ul>
  );
}

function EventRow({ e, lang }: { e: EventItem; lang: Locale }) {
  const d = dateParts(e.date);
  const cover = e.photos?.[0];
  const more = !!e.details || (e.photos?.length ?? 0) > 1;
  return (
    <article className="group grid gap-6 py-10 md:grid-cols-[10rem_1fr] md:gap-10 lg:grid-cols-[10rem_1fr_18rem] lg:items-center">
      <p className="font-display leading-none text-heading">
        <time dateTime={e.date}>
          <span className="block text-[4rem] tracking-[-0.03em]">{d.day}</span>
          <span className="mt-2 block text-[1.125rem] text-saffron-ink">
            {d.month} {d.year}
          </span>
        </time>
      </p>
      <div>
        {e.draft && showDrafts && <DraftTag lang={lang} className="mb-3" />}
        <h3 className="font-display text-[clamp(1.625rem,2.4vw,2.125rem)] leading-tight text-heading">
          <T t={e.title} lang={lang} />
        </h3>
        <p className="mt-2 text-ink-soft">
          {d.weekday}
          {e.time && ` · ${e.time}`} · <T t={e.venue} lang={lang} />
        </p>
        <p className="measure mt-4">
          <T t={e.summary} lang={lang} />
        </p>
        {more && (
          <Link
            href={href(lang, `/events/${e.id}`)}
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-heading underline decoration-saffron decoration-2 underline-offset-4 hover:decoration-maroon"
          >
            <T t={ui.events.more} lang={lang} />
          </Link>
        )}
      </div>
      {cover && (
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl md:col-start-2 lg:col-start-auto">
          <Image
            src={cover.src}
            alt={tr(cover.alt, lang)}
            fill
            sizes="(min-width: 1024px) 288px, 100vw"
            style={{ objectPosition: cover.position }}
            className="graded object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
    </article>
  );
}
