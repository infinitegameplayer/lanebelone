@AGENTS.md

# CLAUDE.md — lanebelone.com

## Project

Personal signal site for Lane Belone. Thought leadership, speaking, and blog archive.
Not a conversion funnel — an infinite game signal surface.

Local path: `C:\Users\User\sites\lanebelone\`
Repo: `InfiniteGamePlayer/lanebelone` (GitHub, branch: `master` — auto-deploys to Vercel)
Deploy fallback: `npx vercel --prod --yes` from `C:\Users\User\sites\lanebelone\` — use if webhook fails. GitHub org URL case change broke Vercel webhook (2026-04-10); reconnect GitHub integration in Vercel settings to permanently fix.
Live: https://lanebelone.com
Dev server: `npm run dev` → localhost:3000
Build check: `npm run build` (must pass 40 static pages, 0 errors)
Contact email: howdy@lanebelone.com

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.1, App Router, TypeScript, static export |
| React | 19.2.4 |
| Styling | Tailwind CSS 3.4 + `globals.css` custom classes |
| Fonts | EB Garamond (display) + Inter (body) via Fontsource |
| Hosting | Vercel |
| Forms | HubSpot — portal `23478458` |
| Blog | gray-matter + markdown files in `src/content/blog/*.md` |

---

## Critical Rules

**No Framer Motion.** Triggers CSP `unsafe-eval` in Brave with Shields enabled — all JS blocked, text invisible. Use CSS `@keyframes` for hero animations and vanilla IntersectionObserver + CSS transitions for scroll reveals. `SectionReveal` component handles this.

**No em dashes.** Kingdom-wide rule. Replace with a period and new sentence, or a comma. Applies everywhere: JSX, markdown frontmatter, copy strings.

**Blog URL pattern is SEO-critical.** All 31 articles must be served at `/blog/f/[slug]`. This matches the legacy GoDaddy URL structure indexed in search engines. Do not simplify to `/blog/[slug]`. Canonical slug list: `src/lib/blog.ts` → `CARRY_FORWARD_SLUGS`.

**`suppressHydrationWarning` on body.** Already in `layout.tsx`. Password managers inject attributes. Never remove it.

**Do NOT add `'use client'` to page files unless they use client-side hooks directly.** `SectionReveal`, `HubSpotForm`, and other client components already carry their own `'use client'` — server component pages can import them without the directive. Adding `'use client'` to a page prevents JSON-LD `<script>` tags from rendering into static HTML (Google can't read them). Pages that genuinely need `'use client'` (direct useState/useEffect): none currently.

**Dev sourcemaps.** `config.devtool = 'cheap-module-source-map'` when `dev === true` in `next.config.ts`. Already present. Prevents Brave Shields from blocking Next.js eval.

---

## HubSpot Forms

Portal: `23478458`. Script loads once in `layout.tsx` — do not add it again on individual pages.

| Form | ID | Location |
|---|---|---|
| Newsletter / Personal | `be6f8412-8e52-4571-94f9-197ff18f9f90` | Homepage |
| Contact | `eddc876e-e15f-419f-af48-7506a8767fcc` | Homepage #connect |
| Speaking inquiry | `56ffe32f-432f-48a5-9949-6f14d3ec53ee` | /speaking #speak |

HubSpot button styling requires `!important` on every button property in `cssRequired`. HubSpot injects its own portal-level `<style>` tags after processing. Both `cssRequired` and the `globals.css` `.hs-form-override` block use `!important` — both layers are required.

---

## Site Architecture

```
src/app/
  layout.tsx              Root layout — JSON-LD Person schema, HubSpot script
  page.tsx                Homepage
  about/page.tsx
  joyful-sovereignty/page.tsx
  speaking/page.tsx
  blog/page.tsx           Blog index
  blog/f/[slug]/page.tsx  Individual article — dynamicParams = false
  privacy/page.tsx
  terms/page.tsx

src/lib/
  blog.ts                 CARRY_FORWARD_SLUGS canonical list + data functions

src/content/blog/
  *.md                    31 article markdown files with frontmatter

src/components/
  Nav.tsx / Footer.tsx / SectionReveal.tsx / ShootingStars.tsx
  HubSpotForm.tsx         Dark theme override CSS inside
  BlogCard.tsx

public/
  images/                 WebP, lowercase-hyphenated, max 1920px / under 200KB
  llms.txt / llms-full.txt / robots.txt / sitemap.xml
vercel.json               37 redirect rules for expired/dropped articles — do not remove
```

---

## Hero Gradient

```css
/* Hero — green bloom top-left */
background: radial-gradient(ellipse at 25% -5%, #2a3a18 0%, #13201a 55%);
/* Base body color */
background: #0c1510;
```

Do not use flat `#0f1a12`. The radial green bloom is the correct treatment.

---

## Button CSS Classes

Defined in `globals.css`. Copy verbatim, do not recreate:

- `.btn-gold` — gold shimmer hover-sweep (primary CTAs)
- `.btn-outline` — transparent with parchment border
- `.btn-ghost` — border-bottom + letter-spacing expansion on hover
- `.dark-card` — dark card component

---

## Blog System

Blog is SEO archive only. Active writing is at Substack. Nav "Writing" link goes to Substack — intentional.

New article: add slug to `CARRY_FORWARD_SLUGS` in `blog.ts` and add `.md` file in `src/content/blog/`.

Required frontmatter: `title`, `slug`, `date` (YYYY-MM-DD), `category`, `heroImage`, `description`.

---

## AI Discoverability Layer

Current state as of 2026-04-10:

| File | Status |
|---|---|
| `public/llms.txt` | Active — third-person citation format, rich content |
| `public/llms-full.txt` | Active — full text of About, Joyful Sovereignty, Speaking |
| `public/robots.txt` | Active — 8 AI crawlers explicitly allowed |
| `public/sitemap.xml` | Active — static XML, all 31 blog slugs included |
| `src/app/layout.tsx` JSON-LD | Active — Person schema (`@id` anchor) + Organization schema, `knowsAbout` (10 topics), `jobTitle` |
| `src/app/blog/f/[slug]/page.tsx` JSON-LD | Active — Article schema (headline, datePublished, author, publisher, url, image) + BreadcrumbList (Home > Writing > Post Title) |
| `src/app/joyful-sovereignty/page.tsx` JSON-LD | Active — FAQPage schema (4 Q&As: Joyful Sovereignty, Infinite Game, Playgrounds of Exploration, Perception Upgrade) + BreadcrumbList |

Do not restrict AI crawlers. Update `llms.txt` if bio, speaking territories, or offers change significantly. Update `llms-full.txt` quarterly. When new evergreen pages are added, add FAQPage + BreadcrumbList schema following the pattern in `joyful-sovereignty/page.tsx`.

---

## Workshop Registration

Always use `https://sidequesthq.co/workshop` for workshop registration links. Do not use the direct Luma URL.

---

## Manual Maintenance

"Happening Now" workshop section: `src/app/page.tsx` ~line 275. Update when active SQHQ offer changes. Links to `https://sidequesthq.co/workshop`.

---

## Image Pipeline

Originals: `C:\Users\User\Pictures\Brand Assets\LaneBelone\` (local, never committed)
Working copies: `~/sites/lanebelone/public/images/` (committed to GitHub, served by Vercel)
Optimization: max 1920px wide, under 200KB, WebP, lowercase-hyphenated filename.
Tool: Squoosh (squoosh.app) or the sharp image script.

Android photos may be saved rotated. Fix before staging: `sharp(input).rotate(90).toFile(output)`.

Hero `objectPosition`: images need per-image tuning via `style={{ objectPosition: '50% [Y%]' }}`. Higher Y% shows lower in the image. Budget time during any image swap.

Outstanding: `/images/lane-cowboy-action.webp` (speaking page hero) is low quality — needs replacement with a real speaking photo.

---

## Voice and Copy Standard

All outward copy on this site follows the per-site register in the Kingdom Site Voice Codex (`Council Chamber/Codices/Expression/Site Voice Codex.md`). Load it before writing or editing any page copy. lanebelone.com carries the full register: mythic warmth (the host voice, warm opens, open-door closes, plain naming) plus a featherweight nonchalant humor layer (the unbothered host and the knowing aside, used sparingly, never cheeky).

Standing rules:
- Tone goes unhurried. Direction stays specific. Never vague about where a link or offer points.
- The library page is the frozen reference model. Match its register, do not edit its voice.
- Joyful Sovereignty stays sacred: lightest warmth, no humor.
- Legal and utility pages (terms, privacy, unsubscribe, cite) stay clinical.
- The `/markdown` content twin (`src/lib/markdown-content.ts`) must stay synced with component copy. Some prose strings are hardcoded there in addition to the structured `page-data.ts` reads. The copy edit and the markdown sync are one unit of work.
- Baseline always applies: no em dashes, no Oxford comma, short declarative sentences, affirmative framing, no "signal" in product copy. Infinite Game is a proper noun.

## Cross-Site Relationship

lanebelone.com is the infinite game signal surface. sidequesthq.co is the practical contribution engine nested within it.

Current cross-links to keep in sync:
- Homepage "Happening Now" → SQHQ active offer
- Joyful Sovereignty → `https://sidequesthq.co`
- Speaking → SQHQ bridge section
- About → SQHQ reference in "Today" section

---

## Known Quirks

**create-next-app blocked by existing files.** If a directory exists when scaffolding, create-next-app blocks. Use the manual scaffold pattern from the original build sessions — documented in the lanebelone Full Build plan breadcrumbs (Session B).

**RPG book cover cache issue.** Reported during early build sessions — may resolve on future Vercel deploys. Monitor if it recurs.

**Blog gray-matter empty array.** `getAllPosts()` returns an empty array with no error thrown if `src/content/blog/` does not exist. Silent failure — check the directory first if blog pages render empty.

**Cached redirects from old hosting.** URLs previously pointing to GoDaddy or other hosts are permanently cached in browsers. Always test new or recently-migrated links in a private/incognito window. The Vercel deployment may be correct even when the browser shows the old site.

---

## Security

Last check: 2026-04-10 (Session E — Website Maintenance and Security Protocol baseline).
Status: security headers active, SECURITY.md present, `cheerio` moved to devDependencies, branded 404 added.
Deferred: CSP (requires HubSpot integration testing before enabling), blog `dangerouslySetInnerHTML` migration to sanitized renderer.
Next dep sprint: 2026-07-01. Per Website Maintenance Protocol — `npm outdated`, `npm audit`, update minor/patch, build, preview deploy, promote.
Cross-site note: security checks run against all Kingdom sites together. A finding here should be checked on sidequesthq.co and vice versa.

---

## Refinements

**2026-04-10 — CLAUDE.md created (Session C, Post Web cross-plan sequence)**
Context file created from BuildNotes. AI discoverability layer documented at current state. Phase 4 of the Post Web plan will expand this significantly — schema additions, validation pass, possible llms.txt restructure. Update this CLAUDE.md when Phase 4 closes and add a Refinements entry reflecting what changed.

**2026-05-31 — Voice refresh and Site Voice Standard**
Multi-layer copy refresh shipped across the durable pages (home, about, speaking, links, joyful-sovereignty, 404). Style and slop sweep, mythic warmth, nonchalant humor. Library cleanup-only, voice frozen as the reference model. Commit `7e84e52`, live at https://www.lanebelone.com. The standard is now canonical in the Site Voice Codex and enforced via the Voice and Copy Standard section above and the Kingdom pre-publish sweep gate. Cross-site carryover (SQHQ lighter register, IGOS none) scoped as a follow-on. When editing page copy, load the Site Voice Codex first and sync the `/markdown` twin in the same pass.

**2026-04-10 — Phase 4 AI Discoverability Upgrade complete**
Organization schema added to `layout.tsx` alongside existing Person schema (both with `@id` anchors for cross-page linking). Article JSON-LD added to `blog/f/[slug]/page.tsx` — fields: headline, description, datePublished, author, publisher, url, image. BreadcrumbList added to blog post pages (Home > Writing > Post Title) and `joyful-sovereignty/page.tsx` (Home > Joyful Sovereignty). FAQPage schema added to `joyful-sovereignty/page.tsx` with 4 Q&As sourced from page content. Schema pattern for future evergreen pages: FAQPage + BreadcrumbList in the page component following the joyful-sovereignty pattern. Verified by Google Rich Results Test before Phase 4 close (King action).
