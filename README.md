# Bhutanese Association of New Zealand — website

The official website of the Bhutanese Association of New Zealand (BANZ).

**Status:** complete and tested. Before launch, fill in every `TODO(committee)`.

---

## For committee members: editing the website

You never need to touch the design or the code. Everything the site *says*
lives in the `content/` folder, one file per subject. Each file starts with
plain-English notes explaining what to change.

| To change…                                   | Edit this file              |
| -------------------------------------------- | --------------------------- |
| Organisation details, email, social links    | `content/site.ts`           |
| The homepage photograph                      | `content/site.ts`           |
| Events                                       | `content/events.ts`         |
| The four areas of work                       | `content/community.ts`      |
| The settlement guide                         | `content/new-to-nz.ts`      |
| Membership wording                           | `content/membership.ts`     |
| Donate page, bank details                    | `content/donate.ts`         |
| Photo gallery                                | `content/gallery.ts`        |
| News and notices (also the RSS feed)         | `content/news.ts`           |
| Privacy notice                               | `content/privacy.ts`        |
| Executive members (current and past)         | `content/executive.ts`      |
| About page story, mission, values            | `content/about.ts`          |
| Dzongkha glossary                            | `content/glossary.ts`       |
| Every button, menu item and heading          | `content/ui.ts`             |

### Adding an event

Open `content/events.ts`, copy an existing block (from `{` to `},`), paste it
below, and change the words. Dates are written `"2026-10-17"`. The site puts
events in date order and moves them to "Past events" by itself.

### Placeholders (`draft: true`)

Anything marked `draft: true` is a placeholder — an invented number, quote or
date. Placeholders show on the preview site with a dashed **Placeholder** tag,
and are **automatically hidden on the live site**, so invented content can
never reach a funder or journalist. When you replace a placeholder with real
information, delete its `draft: true` line.

Search the project for `TODO(committee)` to find everything still needing
real information.

### Translating into Dzongkha

Every piece of text looks like `{ en: "About" }`. To translate it, add a
Dzongkha version: `{ en: "About", dz: "…" }`. Anything not yet translated
shows in English on the Dzongkha site. Most interface words are in
`content/ui.ts` — start there.

---

## For developers

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

- Next.js 16 (App Router), TypeScript, Tailwind CSS 4.
- **Languages:** English at clean URLs (`/about`), Dzongkha under `/dz`
  (`/dz/about`). `proxy.ts` remembers the visitor's choice in a cookie.
  All pages live under `app/[lang]/`.
- **Design tokens** are in `app/globals.css`. `--ochre` is never used for text
  (3.8:1); use `--ochre-ink` (5.9:1).
- **Forms** (contact, membership) send email through Resend. Set
  `RESEND_API_KEY`, `MAIL_FROM` and `MAIL_TO`. Without them, forms tell the
  visitor to email directly instead of silently dropping messages.
- **Placeholders** show when `NODE_ENV !== "production"`, on Vercel preview
  deployments, or with `SHOW_DRAFTS=1`.
- Lighthouse (mobile, throttled): 97–100 in all four categories on every
  Phase 1 page. The Newsreader font is loaded roman-only without its
  optical-size axis to keep the headline fast on slow connections — keep it
  that way.

### Photographs

Originals supplied by the committee are in `image/`. Web copies are in
`public/images/`. Every photograph gets the same warm grade (`.graded`).
The seal (`public/images/banz-seal.png`) is cut to a circle from the original
artwork for use on light and dark backgrounds.

### Deploying (Cloudflare Workers)

The site runs on Cloudflare Workers using the OpenNext adapter
(`open-next.config.ts`, `wrangler.jsonc`). Cloudflare builds it from GitHub:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

`npm run build` builds Next.js, adapts it for Workers, and copies the pre-built
pages into the deployment so every page is served instantly from cache.
Because pages are pre-built, **edits to `/content` go live on the next deploy**
(push to `main`).

- Preview the Workers build locally: `npm run preview` (or `npm run build` then `npx wrangler dev`).
- Images are optimised by Cloudflare Images through the `IMAGES` binding.
- To enable the contact and membership forms, add `RESEND_API_KEY`, `MAIL_FROM`
  and `MAIL_TO` under the Worker's Settings → Variables and Secrets.
- `wrangler.jsonc` → `name` must match the Worker name in the dashboard (`banz`).

