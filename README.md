# Bhutanese Association of New Zealand — website

The official website of the Bhutanese Association of New Zealand (BANZ).

**Status:** complete and tested — public site, election information,
registration desk, code slips, voting, admin, turnout and results.
Before launch: fill in every `TODO(committee)` and follow "Going live" below.

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

---

## The election system

Everything for 3 October 2026: the registration desk, code slips, voting on
members' phones, turnout, and results.

| Who | Where | What |
|---|---|---|
| Committee | `/admin` | Phases, turnout, codes, results, roll, audit log |
| Desk officers | `/admin/desk` | Check people in, hand out code slips (works offline) |
| Voters | `/vote` (or scan the QR on the slip) | Enter code, vote for three offices, get a receipt |
| Public | `/elections/live`, `/elections/results` | Turnout only; results once published |

### Rehearsing on this computer

1. `npm run dev`, then open `http://localhost:3000/admin/login`.
2. Passwords are in `.env.local` (`ADMIN_PASSWORD`, `DESK_PASSWORD`).
3. Rehearsal mode uses its own database in `.data/rehearsal` and obviously
   fictional candidates ("Test Candidate …"). Every screen says "Rehearsal".
4. To try voting from a real phone, connect it to the same wifi and open the
   address the dev server prints as "Network" (e.g. `http://192.168.1.20:3000/vote`).
   Printed slips and the poster use that address automatically in rehearsal.
5. "Reset rehearsal" on the dashboard clears everything and starts again.

### The day, in order

1. **Codes** → create codes (30% more than expected turnout) → print slips →
   cut and shuffle. Print the voting poster.
2. **Dashboard** → type `OPEN VOTING`.
3. Desk checks passports and hands out slips; members vote on their phones.
4. When the queue is done → `CLOSE REGISTRATION`. When the room has voted → `CLOSE POLL`.
5. Paper ballots (only if the system failed) → **Results** → add totals with a note.
6. `REVEAL RESULTS` (committee only) → check → `PUBLISH RESULTS` (public page).
7. **Roll** → print or save as PDF, sign it.

Desk officers: print **Runbook** (`/admin/runbook`) — one page covering the
passport check, issuing codes, duplicates and what to do if something breaks.
Committee: read `docs/committee-explainer.md` — how vote secrecy works and how
to defend it if challenged. The public privacy notice is at `/privacy`.

Every step is irreversible and needs its words typed exactly.

### Going live (before the day)

The embedded database is for testing only — it does not persist on Vercel.
For the real election:

1. Create a Postgres database (Neon or Supabase) and set `DATABASE_URL`.
2. Set `ELECTION_MODE=live`, strong `ADMIN_PASSWORD` / `DESK_PASSWORD`, and a
   random `SESSION_SECRET` (32+ characters) in the hosting settings.
3. Fill in and confirm the candidates in `content/election.ts`
   (`candidatesConfirmed = true`). Live voting will not open without them.
4. Turn off request-body logging, analytics and error monitoring for `/vote`
   and `/api/vote/*` on the host.

### Automated rehearsal

With the dev server running in rehearsal mode: `npm run test:election`
(set `BASE_URL` if it is not on port 3000). It drives the whole day through a
real browser — 42 checks including offline desk sync, press-and-hold, code
reuse, rate limiting, locked results, and receipt verification. It resets the
rehearsal data first.
