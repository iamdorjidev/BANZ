import { site } from "@/content/site";
import { news } from "@/content/news";
import { visible } from "@/lib/drafts";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** RSS feed of news and notices. */
export function GET() {
  const items = visible(news)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (n) => `    <item>
      <title>${esc(n.title.en)}</title>
      <link>${site.url}/news#${n.slug}</link>
      <guid isPermaLink="false">${n.slug}</guid>
      <pubDate>${new Date(`${n.date}T09:00:00+12:00`).toUTCString()}</pubDate>
      <description>${esc(n.body.en)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)} — News</title>
    <link>${site.url}/news</link>
    <description>Announcements and notices from the ${esc(site.name)}.</description>
    <language>en-nz</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
