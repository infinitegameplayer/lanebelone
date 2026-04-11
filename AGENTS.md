# AGENTS.md — lanebelone.com

## Project Identity

lanebelone.com is Lane Belone's personal signal site: Infinite Game philosophy, thought leadership, speaking, and blog archive. It is the depth anchor and primary entry surface for Lane's public body of work. This is not a conversion funnel — it is a signal site that earns trust through depth.

### Ecosystem Position

This repo is one node in a four-node expertise web designed so that any reader or AI agent entering any node can find the others:

| Node | URL | Role |
|---|---|---|
| **lanebelone.com** (this repo) | https://lanebelone.com | Infinite game signal surface, thought leadership anchor |
| **sidequesthq.co** | https://sidequesthq.co | Practical contribution engine — workshops, advisory, retreats |
| **infinitegameos.io** | https://infinitegameos.io | AI-agent-first structured knowledge base — Infinite Game OS (Phase 5 build) |
| **Sovereign Ecosystem GitHub** | https://github.com/InfiniteGamePlayer/sovereign-ecosystem | Technical infrastructure and agentic architecture reference |

Canonical ecosystem architecture: `Council Chamber/Codices/Sovereignty/Sovereign Ecosystem Architecture Codex.md` (Kingdom vault).

Cross-links between these nodes are intentional and load-bearing. Maintain them when URLs or offers change.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router, TypeScript, static export |
| React | 19.0.0 |
| Styling | Tailwind CSS 3.4 + `globals.css` custom classes |
| Fonts | EB Garamond (display) + Inter (body) via Fontsource |
| Hosting | Vercel (auto-deploy from `master`) |
| Forms | HubSpot — portal `23478458` |
| Blog | gray-matter + markdown files in `src/content/blog/*.md` |

---

## Build and Dev

```bash
npm run dev      # localhost:3000
npm run build    # must pass 40 static pages, 0 errors before any deploy
```

Auto-deploys to Vercel on push to `master`. Always run `npm run build` locally before pushing.

---

## Critical Rules

These are non-negotiable. Each has caused real production problems when violated.

**No Framer Motion.** Triggers CSP `unsafe-eval` violations in Brave Browser with Shields enabled — all client-side JS is blocked and site text becomes invisible. Use CSS `@keyframes` for animations and vanilla `IntersectionObserver` + CSS transitions for scroll reveals. The `SectionReveal` component handles this pattern.

**No em dashes.** Replace with a period and new sentence, or a comma. This applies everywhere: JSX strings, markdown content, copy, frontmatter. No exceptions.

**Blog URL pattern is SEO-critical and fixed.** All 31 articles must be served at `/blog/f/[slug]`. This matches legacy GoDaddy URLs indexed in search engines. Never simplify to `/blog/[slug]`. The canonical slug list lives in `src/lib/blog.ts` → `CARRY_FORWARD_SLUGS`.

**HubSpot button styling requires `!important` on every property.** HubSpot injects portal-level `<style>` tags that override standard specificity. Both the `cssRequired` string and the `globals.css` `.hs-form-override` block must carry `!important`. Do not simplify.

**`suppressHydrationWarning` on `<body>`.** Password managers inject DOM attributes causing React hydration mismatches. Never remove this from `layout.tsx`.

**Dev sourcemaps already configured.** `config.devtool = 'cheap-module-source-map'` when `dev === true` is in `next.config.ts`. Do not remove — it prevents Brave Shields from blocking Next.js eval in development.

**`vercel.json` redirect rules are permanent.** 37 rules redirect expired and dropped article URLs. Do not remove them.

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

src/lib/blog.ts           CARRY_FORWARD_SLUGS canonical list + data functions
src/content/blog/*.md     31 article files with frontmatter

src/components/
  Nav.tsx / Footer.tsx / SectionReveal.tsx / ShootingStars.tsx
  HubSpotForm.tsx / BlogCard.tsx

public/
  images/                 WebP, lowercase-hyphenated filenames, max 1920px / under 200KB
  llms.txt                AI citation manifest — update if bio or offers change significantly
  llms-full.txt           Full page text for deep LLM reads — update quarterly
  robots.txt              8 AI crawlers explicitly allowed — do not restrict
  sitemap.xml             All routes including 31 blog slugs
vercel.json               37 redirect rules
```

---

## Content and Voice

Lane's work sits at the intersection of Infinite Game philosophy, sovereign creative operating systems, and agentic architecture. The content voice is warm, first-person, and invitational — not prescriptive, not conversion-oriented.

**Use:** Infinite Game, Joyful Sovereignty, breadcrumbs, flow, play, mastery, aliveness, presence, depth, invite, explore, curious

**Avoid:** sovereignty as a standalone term (that belongs on SQHQ), transform, unlock, game-changer, level up, should, must, need to

---

## AI Discoverability

`robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, and 5 others. Do not restrict AI crawlers — discoverability is a design goal, not an afterthought.

`llms.txt` and `llms-full.txt` are active in `public/`. These provide structured, machine-legible content for AI citation. Maintain them as the site evolves.

**Note:** A comprehensive AI Discoverability Upgrade is planned for this repo as part of the Post Web Expertise Web and Sovereign Signal Architecture strategy (Phase 4). This AGENTS.md will be revised at that time to reflect expanded schema coverage and ecosystem cross-linking standards. Treat the current state as a solid baseline, not the ceiling.

---

## Cross-Ecosystem Links to Maintain

| Link | Location | Points To |
|---|---|---|
| "Happening Now" workshop | `src/app/page.tsx` ~line 275 | `https://sidequesthq.co/workshop` |
| Workshop registration copy | Any page mentioning the workshop | `https://sidequesthq.co/workshop` |
| Joyful Sovereignty → SQHQ | `/joyful-sovereignty` page | `https://sidequesthq.co` |
| Speaking → SQHQ bridge | `/speaking` page | `https://sidequesthq.co` |

Update these when SQHQ offers or URLs change.
