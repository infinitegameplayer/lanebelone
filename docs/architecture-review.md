# Architecture Review — lanebelone.com
_Generated: 2026-04-10_

---

## 1. Module Map

| Path | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout: fonts, global OG/Twitter/JSON-LD metadata, Nav, Footer, ShootingStars, HubSpot script loader |
| `src/app/page.tsx` | Home page: split-layout hero, three-path grid, books, about teaser, SQHQ section, "Happening Now" event card, Distillation newsletter form, Connect form |
| `src/app/about/page.tsx` | Bio and background page |
| `src/app/blog/page.tsx` | Blog index: grid of BlogCards from getAllPosts() |
| `src/app/blog/f/[slug]/page.tsx` | Blog post: static generation from CARRY_FORWARD_SLUGS, markdown rendered via dangerouslySetInnerHTML |
| `src/app/joyful-sovereignty/page.tsx` | Core philosophy page |
| `src/app/speaking/page.tsx` | Speaking topics grid, formats, SQHQ cross-link, HubSpot speaking inquiry form |
| `src/app/privacy/page.tsx` | Privacy policy |
| `src/app/terms/page.tsx` | Terms of service |
| `src/app/globals.css` | Full design system: CSS vars, btn-gold/btn-outline/btn-ghost/dark-card/grain-overlay/section, prose-blog styles, HubSpot form overrides |
| `src/app/icon.png` | App icon (Next.js App Router favicon convention — served as /favicon) |
| `src/components/Nav.tsx` | Sticky nav with scroll-triggered background, desktop links, mobile hamburger |
| `src/components/Footer.tsx` | Site footer |
| `src/components/ShootingStars.tsx` | Canvas-based shooting star animation (4 stars, one-shot sequence, ~50 sec total, gold palette) |
| `src/components/SectionReveal.tsx` | IntersectionObserver fade-in wrapper for page sections |
| `src/components/HubSpotForm.tsx` | HubSpot embed: retry loop until SDK ready, inline dark-theme CSS override, renders into isolated div |
| `src/components/GoldButton.tsx` | Standalone gold button component (for inline JSX use) |
| `src/components/BlogCard.tsx` | Blog post card with hero image, date, title, description |
| `src/lib/blog.ts` | Blog data layer: CARRY_FORWARD_SLUGS (31 slugs), getAllPosts(), getPostBySlug() |
| `src/content/blog/*.md` | Markdown source files for all blog posts (~50 files, gray-matter frontmatter) |
| `public/images/` | All image assets (webp for photos, png/jpg for logos and blog heroes) |
| `public/llms.txt` + `public/llms-full.txt` | AI discoverability layer (Phase 4 update pending) |
| `public/sitemap.xml` + `public/robots.txt` | SEO |
| `vercel.json` | 35 permanent redirects: expired blog slugs → /blog, old GoDaddy paths, social/newsletter redirects |
| `next.config.ts` | WebP image optimization, Turbopack enabled |
| `scripts/scrape-blog.js` | One-time dev script (cheerio) for importing blog content from GoDaddy |
| `tailwind.config.ts` | Tailwind configuration |
| `CLAUDE.md` | AI session context (auto-loaded by Claude Code) |

---

## 2. Dependency Graph

```
layout.tsx
  └── Nav, Footer, ShootingStars
      └── (+ HubSpot script via next/script afterInteractive)

page.tsx (home)
  └── SectionReveal, HubSpotForm, next/image

blog/page.tsx
  └── BlogCard, blog.ts (getAllPosts)

blog/f/[slug]/page.tsx
  └── blog.ts (getPostBySlug, CARRY_FORWARD_SLUGS for generateStaticParams)

speaking/page.tsx
  └── SectionReveal, HubSpotForm, next/image

BlogCard.tsx
  └── next/image, next/link, blog.ts (BlogPost type)

blog.ts
  └── fs, path, gray-matter (reads src/content/blog/*.md at build time)
```

No circular dependencies. Data flow is strictly one-directional: blog.ts reads files → pages consume blog.ts → components render output.

---

## 3. Top 5 Bottlenecks / Problem Areas

**1. `dangerouslySetInnerHTML` in blog post rendering** (`src/app/blog/f/[slug]/page.tsx:87`)
Blog content is stored as pre-rendered HTML (output of the GoDaddy scraper) and injected directly into the DOM. This bypasses React's XSS protection. Not actively dangerous since content comes from a known source, but it's a fragile contract — if the content pipeline ever changes, the risk increases. Long-term, a markdown-to-JSX renderer (react-markdown or next-mdx-remote) would be safer.

**2. `cheerio` is in `dependencies`, not `devDependencies`** (`package.json:13`)
`scripts/scrape-blog.js` is a one-time import tool that was used to pull content from GoDaddy. It has no runtime role. Cheerio is listed under `dependencies`, which means it's technically included in production dependency resolution. Correct placement is `devDependencies`.

**3. "Happening Now" event card is hardcoded** (`src/app/page.tsx:276-305`)
The active workshop (title, description, date, href) is hardcoded inline in the homepage. Every event rotation requires a code edit and a Vercel deploy. Low risk at current event frequency, but grows as events increase.

**4. HubSpot form CSS is maintained in two places**
The full HubSpot button and form styling exists in both `globals.css` (`.hs-form-override` blocks, ~120 lines) and inline inside `HubSpotForm.tsx` (`formCss` string, ~30 lines). The inline CSS is intentional — it's passed as `cssRequired` to HubSpot's SDK, which runs inside an iframe that doesn't inherit `globals.css`. But any design change (gold values, font, radius) must be updated in both locations.

**5. No custom 404 page**
lanebelone has 35 redirects in `vercel.json` but no `src/app/not-found.tsx`. Users hitting an unknown route (bad blog slug, typo) get the default Next.js 404 — no brand, no nav, no recovery path.

---

## 4. Well-Designed — Do Not Touch

- **`globals.css` design system** — CSS vars, btn-* classes, grain-overlay, dark-card, prose-blog, section spacing. Cohesive, complete, and working. Do not refactor or reorganize.
- **`ShootingStars.tsx`** — Clean canvas animation with correct cleanup (cancelAnimationFrame, removeEventListener), proper resize handling, one-shot (not looping). Good as-is.
- **`SectionReveal.tsx`** — Minimal, correct IntersectionObserver with disconnect on first trigger. No overengineering.
- **`vercel.json` redirect structure** — Comprehensive coverage of expired slugs, old GoDaddy paths, and social redirects. Well-organized.
- **`blog.ts` CARRY_FORWARD_SLUGS** — Explicit canonical slug list with grouped comments. Protects against stale content and makes the blog's content inventory explicit and auditable.
- **Layout-level metadata** — Complete OG tags, Twitter card, JSON-LD Person schema, `metadataBase` set. Nothing missing for SEO or social sharing.
- **`src/app/icon.png` favicon approach** — App Router convention (not `favicon.ico`). Correct and stable.

---

## 5. Highest-Leverage Fix First

**Move `cheerio` to `devDependencies`** (`package.json`)

One-line change, zero risk, reduces the production dependency surface. The scrape script is done; cheerio has no runtime role.

**Second priority:** Add `src/app/not-found.tsx` — a branded 404 page with nav and a link back home. One new file, no dependencies, immediate UX improvement for any routing miss.

---

## Cross-Site Notes

_See sidequesthq `docs/architecture-review.md` for the cross-site synthesis section._
