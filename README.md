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
- **Language:** English only. Pages live under `app/[lang]/` and `next.config.ts` rewrites
  clean URLs (`/about`) to them; old `/en/…` and `/dz/…` links redirect.
- **Design tokens** are in `app/globals.css`. `--ochre` is never used for text
  (3.8:1); use `--ochre-ink` (5.9:1).
- **Forms** (contact, membership) send email through Resend — see "Member register"
  below. Without the settings, the contact form tells the visitor to email directly
  instead of silently dropping the message.
- **Placeholders** (`draft: true`) show in development and preview, and are hidden on the live site (set `SHOW_DRAFTS=1` to show them).
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
- `wrangler.jsonc` → `name` must match the Worker name in the dashboard (`banz`).

### Member register and confirmation emails

People who register on `/membership` are saved in a Cloudflare **D1** database
(binding `DB`, database `banz-members`). Cloudflare creates it automatically the
first time the Worker deploys, and the table is created on first use.

**Committee area:** `/admin` — sign in to see every registered member (number,
name, email, phone, town or city, when they registered, and whether their
confirmation email went out), search them, download them all as a spreadsheet
(CSV), or remove someone. Nothing is public.

**Settings** — add under the Worker's *Settings → Variables and Secrets*:

| Name | What it is |
|---|---|
| `ADMIN_PASSWORD` | Password for the committee area (secret) |
| `SESSION_SECRET` | 32+ random characters that keep sign-ins secure (secret) |
| `RESEND_API_KEY` | API key from resend.com (secret) — sends the emails |
| `MAIL_FROM` | Sender, e.g. `BANZ <hello@banz.org.nz>` — the domain must be verified in Resend |
| `MAIL_TO` | Committee inbox for "new member" and contact-form emails (comma-separate several) |

When someone registers they get a confirmation email with their member number
(BANZ-0001, …) and the committee is told. If the email cannot be sent, the
registration is still saved and the admin list shows "Not sent".

Local testing: put `ADMIN_PASSWORD` and `SESSION_SECRET` in `.dev.vars`
(never committed), then `npm run dev` — it uses a local copy of the database.
