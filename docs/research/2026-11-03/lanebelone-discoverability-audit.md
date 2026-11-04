# lanebelone.com discoverability audit (2026-11-03)

Research date: searches and fetches ran on 2026-11-04. Code read at commit `79d8e4e` on `master`.
Scope: Part A reads the site's own code. Part B tests 60 natural questions plus 17 name searches against the open web.

**Method and access notes.** Web fetching worked in this environment. Every search ran through the session's WebSearch tool, a US index that is not Google. "Top 5" means the first five links it returned, in order. Standard mode was the default and extended mode ran where results were thin. Direct engine checks were limited. Perplexity returned HTTP 403. DuckDuckGo served a bot check. Bing returned only generic "Lane" brand results, which may be a degraded response to an automated client. A ChatGPT or Perplexity answer could not be captured directly, so section 2 reconstructs what an assistant would say from the sources those tools draw on. That reconstruction is marked as inference. Every count in this report comes from my own tally of the recorded results. No forms were submitted and nobody was contacted.

---

## The short version

1. **Lane's own domains are close to invisible on the open questions his writing answers.** Across 60 questions and 71 recorded result lists (390 result URLs), lanebelone.com showed up twice, infinitegameos.io twice, sidequesthq.co once and lanebelone.substack.com once. Five of those six hits came from two queries: the quoted phrase "Joyful Sovereignty" and an extended search for "Infinite Game OS".
2. **His name is a weak entity in quick search.** In 17 standard name searches (170 result slots), 6 slots were about him and 0 were his own domains. The index reads "Belone" as the garfish genus and "Humble" as Humble, Texas. One extended search for "Lane Belone" returned 9 of 9 results about him, led by his own pages. So the content exists. The quick lookup layer most assistants use first does not connect to it.
3. **The platforms that win are the ones Lane already uses.** Substack hosts took 43 of 390 slots, the largest share of any domain. Other people's newsletters outrank his. His own Substack mirrors every essay with a self-canonical and no link back, so the site and the newsletter compete instead of reinforcing each other.
4. **Many of his coined phrases are uncontested.** "The game within the game", "micro mastery" as a life practice, "build the mill where the water flows", "alive business", "the average is out there, you aren't", "playgrounds of exploration", "perception upgrade" and "Your Infinite RPG" return spam, academic PDFs or nothing relevant. A page titled as the question and opening with a definition has a clear lane on each.
5. **The code is in good shape, with a handful of fixable leaks.** Canonicals, sitemap, robots and schema are solid. The real defects are an RSS link that never renders on indexable pages, no visible author byline, 17 articles with no internal links, 36 archive images hotlinked from GoDaddy, unused `seoTitle` support and duplicate surfaces (markdown twins, an indexed vercel.app host).

---

## 1. The 10 highest-leverage moves, ranked by expected effect over effort

Effect and effort are my judgment from the evidence below. Effort assumes Claude Code does the site work.

| Rank | Move | Why (evidence) | Effect | Effort |
|---|---|---|---|---|
| 1 | **Unify the bio everywhere a lookup lands first.** Write one canonical fact block (service years, deployments, book title and co-author order, current work) and put it on /about. Then copy it to Amazon Author Central, the empty Goodreads author bio, Wikidata and the IMDb and LinkedIn summaries. Add references to the three unreferenced Wikidata education claims and check the AP byline citation. | Quick search finds Audible's 2020 bio (4 of 6 relevant name slots) and nothing current. Sources disagree on service length (2005 to 2017 vs "about eight years" vs "over a decade"), author order and current role (AsrayaOS co-founder on two podcast pages, absent from his sites). Section 2 lists every conflict with its source. | High | Low |
| 2 | **Make Substack point home.** Add an "Originally published at lanebelone.com/blog/f/…" line at the top of each Substack post, or send excerpts. Fix the site copy that says the writing lives at Substack (`src/lib/page-data.ts:166`, `public/llms-full.txt:112` and `:166`). | Substack is the top-winning domain (43 of 390 slots). His Substack posts carry self-canonicals with no link back, while `public/AGENTS.md:21` and `:52` claim lanebelone.com is canonical. Today the two copies split authority. | High | Low |
| 3 | **Use the unused `seoTitle` field on the evergreen archive posts.** Retitle them for search as the question each one answers, for example "What Is Micro Mastery?" and "What Is the Game Within the Game?". Leave the visible titles as they are. The field is already wired (`src/app/blog/f/[slug]/page.tsx:27`). It is set on 0 of 55 posts. | Winners put the query in the title (every batch noted this). Questions 7, 10, 11, 12, 18, 21 and 29 have matching archive posts with poetic titles and weak competitors. | High | Low |
| 4 | **Build answer pages for six coined terms**, following the FAQPage pattern on `/joyful-sovereignty`: The Infinite Player, Micro Mastery, The Game Within the Game, Playgrounds of Exploration, Perception Upgrade and The Alive Business. Each one gets a one-sentence definition first, examples and links to its articles. | "Joyful Sovereignty" is the only term Lane ranks for (#1 and #2, quoted). "Playgrounds of Exploration" and "Perception Upgrade" sit in FAQ schema but don't surface even when quoted (batch A, 13b and 14b). The field is spam and PDFs on every one. | High | Medium |
| 5 | **Give *Unleash Your Humble Alpha* its own page** on lanebelone.com: Book schema with the ISBN (`9781735254722`), both authors, publisher QOL Enterprises, the 2020 date, the Amazon, Audible and Goodreads links and a summary. Correct `/cite`'s 2023 `datePublished` (`src/app/cite/page.tsx:120`). | Searches for "Humble Alpha leadership" and the book title go to Steven Kuhn's interviews and retail pages. One search summary credited Kuhn alone. Lane's name appears only through Audible at rank 5 (batch C, Q31 and Q32). | Medium-high | Low |
| 6 | **Retitle and deepen /speaking.** Title it "Book Lane Belone to Speak: Keynotes and Workshops". Add an H1 that names speaking, a list of past appearances (about 10 podcast episodes were found, and an aggregator claims 28), a speaker FAQ and Event or appearance schema. Then get one speaker-bureau listing. | The title is "Speaking" and the H1 "Design. Play. Master." (`src/app/speaking/page.tsx:8`, `:89-93`). Green Beret and Infinite Game speaker searches go to BigSpeak and similar agency profiles. No bureau lists him. | Medium-high | Low-medium |
| 7 | **Give "Your Infinite RPG" a landing page** with "free ebook" in the title, a summary, a table of contents and the PDF link. Point `/cite`'s canonical for it there (`src/app/cite/page.tsx:250`). | The exact title, quoted, returned nothing from Lane (batch C, Q45). Life-as-RPG searches go to small Substacks, so an essay site can win this. | Medium | Low |
| 8 | **Fix the article template:** a visible "By Lane Belone" byline linked to /about, a "Keep reading" related-posts block and the RSS `<link>` in the layout head. | No byline (`src/app/blog/f/[slug]/page.tsx:139-152`). 17 articles have zero internal links. The RSS link is dropped on every indexable page by Next's shallow `alternates` merge (confirmed live on /about, 2026-11-04). | Medium | Low |
| 9 | **Close the duplicate surfaces.** Send a `Link: rel="canonical"` header from `/markdown` twins and noindex the twins of noindex pages. Request removal of `lanebelone.vercel.app` in Search Console (the redirect at `next.config.ts:45-50` is live, but the host is still indexed). Give the 404 its own metadata. | An extended search for his name returned the vercel.app host as its own result. Twins return 200 with no canonical (`src/app/markdown/[[...path]]/route.ts:35-37`). The 404 outputs both `noindex` and `index, follow`. | Medium | Low |
| 10 | **Bring the archive images home.** Move the 36 `img1.wsimg.com` images in 30 archive posts into `public/images/blog/` as WebP with real alt text. Compress the 5 MB PNG hero. | The images depend on a dead GoDaddy account, almost all carry `alt=""`, and the 5.0 MB hero used as og:image is at X's 5 MB limit. | Low-medium | Medium |

**What I recommend against:** competing for the bare head term "infinite game". Simon Sinek's book, Farnam Street (fs.blog, 11 slots) and Wikipedia hold it with deep authority. The long tail around the Infinite Game *as a way of living* is open, and that is where moves 3 and 4 aim.

---

## 2. How an AI assistant currently describes Lane Belone

### What a quick lookup returns

- Standard search for "Lane Belone" and "who is Lane Belone": 0 of 10 results about him. The results are the garfish *Belone belone* (naturalis.nl, fishipedia.fr, fao.org, calacademy.org) and the La Bellone arts centre in Brussels (kfda.be). The tool's own summary said "Lane Belone may be a private individual". Read 2026-11-04.
- "Unleash Your Humble Alpha": the search summary named Steven Kuhn alone as author. Top hit https://www.goodreads.com/topic/list_book/55202196, read 2026-11-04.
- "Lane Belone Green Beret": 4 of 10 relevant, all Audible author-page copies, for example https://www.audible.com/author/Lane-Belone/B08GJB5FFJ (read 2026-11-04). The bio there dates from 2020: Special Forces veteran, 40 countries, co-author with Steven Kuhn.
- Bing, fetched directly: 0 of 10 about him, no knowledge panel. https://www.bing.com/search?q=Lane+Belone, read 2026-11-04. This may be a degraded response to a bot.
- As the model writing this report, I had no prior knowledge of Lane Belone from training. That is consistent with a thin footprint in the training-era web. This is an observation about one model, not a measurement of others.

**Inference:** an assistant that answers from a quick search would likely say it can't find a notable person by that name, drift to the fish or the Brussels venue, or credit the book to Kuhn alone.

### What a deeper crawl returns

One extended search for "Lane Belone" (2026-11-04) returned 9 of 9 results about him. In order:

1. https://straightouttacombat.podbean.com/e/socrs069-lane-belone-ignite-your-authentic-alpha/
2. https://www.imdb.com/name/nm12689887/
3. https://www.linkedin.com/in/lanebelone/
4. https://www.facebook.com/increasefreedom/
5. https://lanebelone.vercel.app/
6. https://www.lanebelone.com/about
7. https://www.lanebelone.com/
8. https://iffassociation.org/podcast/34-from-green-beret-to-building-the-future-of-the-internet-lane-belone
9. https://www.sidequesthq.co/about

**Inference, the likely description:** "Lane Belone is an American writer and speaker on the Infinite Game, a former U.S. Army Special Forces (Green Beret) soldier and co-author with Steven Kuhn of *Unleash Your Humble Alpha* (QOL Enterprises, 2020). He founded Side Quest HQ and builds Infinite Game OS, an open library. Earlier he ran the Increase Freedom travel and high-performance brand." The supporting sources, all read 2026-11-04:

- https://www.lanebelone.com (title and meta description)
- https://www.sidequesthq.co/about
- https://www.wikidata.org/wiki/Q139889543
- https://books.google.com/books/about/Unleash_Your_Humble_Alpha.html?id=5fOyzQEACAAJ
- https://www.audible.com/author/Lane-Belone/B08GJB5FFJ
- https://www.pbs.org/newshour/health/colorado-veterans-and-conservatives-clash-over-psychedelic-therapy (AP story, 2025)

### Facts that conflict across sources

These are what an assistant will repeat or hedge on. All were read 2026-11-04.

| Topic | Versions found | Sources |
|---|---|---|
| Length of service | 2005 to 2017, "most of which as a Green Beret" / "about eight years total" / "over a decade" | https://straightouttacombat.podbean.com/e/socrs069-lane-belone-ignite-your-authentic-alpha/ ; https://screwthecommute.com/episodes/183-hes-a-special-forces-green-beret-tom-interviews-lane-belone/ ; https://www.lanebelone.com/about |
| Book author order | Belone first (Google Books, Powell's) / Kuhn first, then Belone, then Ron Lynch (Amazon, Audible, Apple) / Kuhn alone (search summary) | https://books.google.com/books/about/Unleash_Your_Humble_Alpha.html?id=5fOyzQEACAAJ ; https://www.amazon.com/Unleash-Your-Humble-Alpha-Presence/dp/173525472X |
| Book date | Paperback 2020-08-23 / Audible 2020-11-30 / Apple audio 2020-11-10 / lanebelone.com/cite says 2023 | Amazon and Audible as above; `src/app/cite/page.tsx:120` |
| Current role | Writer on the Infinite Game, Side Quest HQ (own sites) / "co-founder of AsrayaOS", "systems architect" (podcast pages) / travel and high-performance coach (2019) / "healer, spiritual seeker" (2023) | https://iffassociation.org/podcast/34-from-green-beret-to-building-the-future-of-the-internet-lane-belone ; https://www.youtube.com/watch?v=Iol3n8W4Dm0 |
| Substack tagline | Indexed: "Exploring sovereignty, thought leadership, and the infinite game" / live: "Writing at the intersection of poetic truth, visionary strategy and embodied power…" | https://lanebelone.substack.com/ |
| Wikidata AP citation | Credited "by Brittany Peterson" / PBS shows the byline Jesse Bedayn | https://www.wikidata.org/wiki/Q139889543 ; PBS link above |
| Wikidata education | FSU-Panama, FSU and Fayetteville Tech CC, all with 0 references. No own page mentions them | https://www.wikidata.org/wiki/Q139889543 |
| Location | Colorado Springs (LinkedIn snippet, AP) / Panama after service (/about, 2019 podcast) / San Diego clinic (SDVoyager 2020) | https://sdvoyager.com/interview/meet-lane-belone-inn-spot-community-acupuncture-mission-valley/ |

### Entity footprint (read 2026-11-04)

- **Present:**
  - Wikidata Q139889543
  - Goodreads author 20651883 (no bio, 20 ratings, 4.40 average)
  - Amazon, Audible, Google Books and Apple Books listings
  - LinkedIn, Instagram @increasefreedom, X @IncreaseFreedom and Facebook
  - IMDb nm12689887 and GitHub InfiniteGamePlayer
  - About 10 podcast episodes
  - One AP story, syndicated by PBS and others
- **Absent:** Wikipedia (https://en.wikipedia.org/wiki/Lane_Belone returns 404), Crunchbase, speaker-bureau listings, his own YouTube channel and book reviews in the press.
- **Name collisions:** none for "Lane Belone" itself. Misspellings ("Lane Bellone", "Lane Balone", "Lane Belloni", "Lane Belonie", "Lane Beloney") lead only to other people. Every misspelling returned 0 relevant results.

---

## 3. Citation-domain tally

### Question searches

Scope: 60 questions in four batches. Questions 1 to 15 had 24 recorded lists. Questions 16 to 30 had 15 main lists in the table plus noted variants. Questions 31 to 46 had 18 lists. Questions 47 to 60 had 22 lists across 14 rows. A script parsed every URL in the "Top 5" column of every row (71 rows, 390 URLs, some rows holding two variant lists) and folded subdomains to the registrable domain.

| Domain | Count | Notes |
|---|---|---|
| substack.com (all subdomains) | 43 | 1 is lanebelone.substack.com (Q59, extended). The other 42 are other writers |
| fs.blog | 11 | Farnam Street. Owns finite vs infinite games |
| medium.com | 11 | |
| goodreads.com | 9 | Book pages and highlights |
| beehiiv.com | 8 | Other newsletters |
| wikipedia.org | 7 | |
| squarespace.com | 7 | Coaching blogs on default subdomains |
| grinnell.edu | 6 | Spam PDFs |
| podbean.com | 6 | Podcast pages, including Humble Alpha interviews |
| buzzsprout.com | 5 | Podcasts |
| getabstract.com, oreilly.com | 4 each | Book summaries |
| apple.com, nih.gov, arxiv.org, pages.dev, google.com, bigspeak.com, chasejarvis.com, npr.org, srmd.org | 3 each | |
| **lanebelone.com** | **2** | Q4b quoted "Joyful Sovereignty" (#2). Q59 extended (#8, outside top 5) |
| **infinitegameos.io** | **2** | Q4b (#1). Q59 extended (#5) |
| **sidequesthq.co** | **1** | Q59 extended (#6, outside top 5) |
| **lanebelone.substack.com** | **1** | Q59 extended (#3) |
| Lane's other hosts | 3 | Hugging Face dataset, SSRN paper and GitHub repo, all on Q59 |
| 28 domains | 2 each | Listed in the batch files |
| All remaining domains | 1 each | |

Domains are counted once per appearance. A domain that holds three of five slots in one list counts three times.

### Name searches

Scope: 17 standard searches × 10 = 170 slots.

| Domain | Count | About him |
|---|---|---|
| wikipedia.org | 16 | 0 |
| cavac.at | 7 | 0 |
| redfin.com, naturalis.nl, grinnell.edu, consolegameswiki.com | 5 each | 0 |
| fao.org, calacademy.org | 4 each | 0 |
| audible (.com, .ca, .es) | 4 | 4 |
| substack.com | 3 | 1 |
| goodreads.com | 3 | 1 |
| lanebelone.com, sidequesthq.co, infinitegameos.io | 0 | n/a |

**Total about him:** 6 of 170 (3.5%).

### What the winners have that Lane's pages lack

These are the patterns the four batches recorded, row by row:

- The query, or a close paraphrase, in the title and URL ("How to…", "X vs Y", "What is…").
- A definition or a numbered structure in the first screen.
- A book or a named authority behind the page: Sinek, Carse, Burnett and Evans, Twigger, Taleb, Yu-kai Chou.
- Platform authority: Substack, Medium, Goodreads, Audible, podcast hosts.
- Speaker-agency profiles for every speaker query.
- On the weak queries the winners have nothing special. Spam PDFs and thin pages rank because nobody else answers.

---

## 4. Part A: the site itself (code and live output)


Source: /home/user/lanebelone at commit 79d8e4e (2026-11-03). I checked the live site at https://www.lanebelone.com on 2026-11-04 with GET requests only. I edited no repo files.

### A1. Route inventory

Indexable pages (10 static + 55 articles = 65, all in sitemap): `/`, `/about`, `/speaking`, `/joyful-sovereignty`, `/library`, `/links`, `/cite`, `/blog`, `/blog/f/[slug]` (55), `/privacy`, `/terms`.
Noindex (force-dynamic, nonce CSP via src/proxy.ts:28): `/preferences`, `/preferences/confirm-email-change`, `/preferences/cancel-email-change`, `/unsubscribe`, `/articles-subscribed`. None of them is in the sitemap. Good.
Machine surfaces: `/sitemap.xml` (src/app/sitemap.ts; there is no public/sitemap.xml, so nothing conflicts), `/rss.xml` (src/app/rss.xml/route.ts, 55 items, valid RSS 2.0 with atom:self), `/markdown/[[...path]]` twins plus Accept-header rewrite (next.config.ts:73-91), `/llms.txt`, `/llms-full.txt`, `/AGENTS.md`, `/robots.txt`, IndexNow key file.
OG images: generated for `/`, `/about`, `/blog`, `/blog/f/[slug]`, `/joyful-sovereignty`, `/library`, `/speaking`. None for `/cite`, `/links`, `/privacy`, `/terms`.
Redirects: 37 in vercel.json, plus 5 in next.config.ts:43-71 (vercel.app host, /privacy-policy, /terms-and-conditions, /f/:slug, /podcast).
Host handling (live): apex to www is 308 with the path kept. `http://lanebelone.com` takes 2 hops (to https apex, then to www). A trailing slash 308s to the bare path. `/blog/<slug>` (no `/f/`) returns 404. `/index.html` returns 404. Unknown paths return a branded 404.

### A2. Per-page record (live-verified)

| Page | Title (len) | Meta desc len | JSON-LD @types | Canonical | OG/Twitter image | H1 (count 1 on every page) | Outline notes |
|---|---|---|---|---|---|---|---|
| `/` | Lane Belone \| Writer on the Infinite Game (41) | 184 (long) | Person, WebSite, ProfilePage | https://www.lanebelone.com (www, no slash) | /opengraph-image | "Lane Belone" | Only 1 h2 ("Work with me at Side Quest HQ."). The section titles are `div.section-label` (page.tsx:93,124,261,414), so h3 cards sit under h1 with no h2 |
| `/about` | About Lane Belone \| Writer on the Infinite Game (47) | 110 | Person, ProfilePage, BreadcrumbList | /about | /about/opengraph-image | "Lane Belone" | h2 x6 story chapters. Good |
| `/speaking` | Speaking \| Lane Belone (22) | 193 (long) | Person, Service(+OfferCatalog), BreadcrumbList | /speaking | /speaking/opengraph-image | "Design. Play. Master." | h2 x3, h3 x3. The H1 says nothing about speaking or booking |
| `/joyful-sovereignty` | Joyful Sovereignty \| Lane Belone (32) | 174 | Person, FAQPage, BreadcrumbList | /joyful-sovereignty | yes | "Joyful Sovereignty" | Best page. FAQ is visible and matches the schema |
| `/library` | Library \| Lane Belone (21) | 260 (very long) | Person, CollectionPage(+ItemList), BreadcrumbList | /library | yes | a 90+ char sentence | 0 h2, 17 h3 |
| `/links` | Links \| Lane Belone (19) | 131 | Person, BreadcrumbList | /links | **none** | "Lane Belone" | no h2. Third page whose H1 is "Lane Belone" |
| `/cite` | Cite this Work \| Lane Belone (28) | 168 | Person, @graph[WebPage, Person, DefinedTerm, CreativeWork, ScholarlyArticle, Book x3, Dataset], BreadcrumbList | /cite | **none** | "Cite this Work" | Well structured. **Orphan: no internal link anywhere in src/** |
| `/blog` | Writing \| Lane Belone (21) | 105 | Person, Blog, ItemList | /blog | yes | "Writing" | h2 per card (56). No BreadcrumbList. Blog has no `blogPost` and is not tied to the ItemList |
| `/blog/f/[slug]` | post title, absolute (18 to 64) | 92 to 154 | Person, BlogPosting, BreadcrumbList | self, www | hero image (raw file) | post title | No visible author byline. The only h2 is "Get new writing by email" |
| `/privacy` | Privacy Policy \| Lane Belone | 84 | Person | /privacy | **none** | yes | no markdown alternate link |
| `/terms` | Terms of Use \| Lane Belone | 32 (thin) | Person | /terms | **none** | yes | no markdown alternate link |
| utility (5) | e.g. "Unsubscribe \| Lane Belone" | inherits the home description (184) | Person | none | inherits the home OG, og:url = homepage | yes | `noindex, nofollow`. Correct |
| 404 | inherits the home title | home desc | Person | none | home | "Page not found." | **Emits two robots metas: `noindex` and `index, follow, max-image-preview:large`** |

The RSS `<link rel="alternate" type="application/rss+xml">` shows up live **only** on the 5 noindex utility pages and the 404, never on an indexable page (see defect D1).
`<html lang="en">` is on every page. The schema uses inLanguage en-US and og:locale en_US. No hreflang is needed.

Missing or weak types by page:
- `/`: WebSite is fine, but ProfilePage is duplicated with /about. Peru 2027 "Happening Now" has no Event (it lives at SQHQ, so this is optional).
- `/speaking`: no FAQPage (fee, travel, formats), no Event or past-appearance list, no testimonials. The Service has no `offers` or `potentialAction`.
- `/blog`: no BreadcrumbList. Blog should carry `blogPost` or `hasPart`. No CollectionPage.
- `/links`: no ProfilePage/CollectionPage, OK for a link hub.
- `/joyful-sovereignty`: no DefinedTerm on the page itself. The `#concept` @id is defined only on /cite (cite/page.tsx:61).
- Articles: no `isPartOf` Blog, no image width/height/ImageObject, publisher is a Person (allowed).
- Sitewide: no Organization on lanebelone. That fits a personal site, but CLAUDE.md:141 and :232 claim one exists. Person lacks `worksFor`/`founder` (SQHQ org ref exists in identity.ts:113), `homeLocation` (llms.txt:101 says Colorado Springs) and `email`.

Does each page answer a stranger's question?
- "Who is Lane Belone": partly on the homepage. The hero sub is "Exploring the Infinite Game. Writing, speaking and sharing breadcrumbs along the way." (Hero.tsx). The Green Beret and co-author facts sit in the meta description, not in visible above-the-fold copy. /about answers clearly.
- "What is Joyful Sovereignty": yes, /joyful-sovereignty with a visible FAQ.
- "Book Lane to speak": weak. Title "Speaking", H1 "Design. Play. Master.", no "book" or "keynote speaker" phrasing in title, desc or H1. An inquiry form is present (speaking/page.tsx:208, InquiryForm).
- "What has he written / where to buy the book": /library has an Amazon link for Unleash Your Humble Alpha (page-data.ts:251,588). /cite's Book node has no url, isbn or Amazon sameAs.

### A3. Articles (55)

Every slug has a file and every file is in ALL_SLUGS (30 ARCHIVE + 25 LIVE; CARRY_FORWARD_SLUGS = ALL_SLUGS, blog.ts:83). Every heroImage exists in public/. All 55 are in the live sitemap and RSS. No em dashes found in any article file.
Frontmatter coverage: dateModified 25/55 (LIVE only), author/authorUrl 24/55 (`the-infinite-game-is-already-in-progress` lacks them), about/mentions 25/55, seoTitle 0/55.
Word counts strip HTML tags (rough). "internal" counts links to lanebelone.com pages. "GoDaddy imgs" counts `img1.wsimg.com` hotlinks.

| slug | title | date | dateModified | desc len | hero exists | in slugs | in sitemap | words | internal links | GoDaddy imgs (empty alt/total imgs) |
|---|---|---|---|---|---|---|---|---|---|---|
| 4-something-am-thoughts | 4-Something AM Thoughts | 2022-12-23 | - | 115 | yes | yes | yes | 316 | 0 | 1 (1/1) |
| 7-aligned-strategies-to-gamify-self-mastery | 7 Aligned Strategies to Gamify Self-Mastery | 2023-03-03 | - | 102 | yes | yes | yes | 3204 | 2 | 1 (1/1) |
| a-precise-trajectory-is-the-answer | A Precise Trajectory Is The Answer (3 of 3) | 2022-09-23 | - | 101 | yes | yes | yes | 392 | 3 | 1 (0/1) |
| an-ancient-path-to-wisdom | An Ancient Path to Wisdom | 2023-04-08 | - | 132 | yes | yes | yes | 1433 | 3 | 1 (1/1) |
| anchoring-purpose-peace-and-play-while-navigating-3-challenges | Anchoring Purpose, Peace and Play While Navigating 3 Challenges | 2022-12-01 | - | 147 | yes | yes | yes | 391 | 0 | 1 (1/1) |
| ancient-wisdom-meets-pioneering-technology | Ancient Wisdom Meets Pioneering Technology | 2022-10-28 | - | 135 | yes | yes | yes | 161 | 0 | 2 (0/2) |
| architect-your-life-for-curiosity-excitement | Architect Your Life For Curiosity & Excitement | 2023-04-01 | - | 120 | yes | yes | yes | 2971 | 1 | 1 (1/1) |
| build-the-mill-where-the-water-flows | Build the Mill Where the Water Flows | 2026-06-29 | 2026-06-29 | 130 | yes | yes | yes | 739 | 0 | 0 (0/0) |
| crafting-clarity-5-alignment-factors-for-project-initiation | Crafting Clarity: 5 Alignment Factors for Project Initiation | 2024-04-12 | - | 117 | yes | yes | yes | 1283 | 0 | 1 (1/1) |
| developing-a-playbook-for-the-infinite-game | Developing A Playbook For The Infinite Game | 2023-05-14 | - | 124 | yes | yes | yes | 2670 | 1 | 1 (1/1) |
| intrinsic-joy-the-game-within-the-game | Intrinsic Joy: The Game Within The Game | 2024-05-25 | - | 128 | yes | yes | yes | 1004 | 1 | 1 (1/1) |
| inviting-the-sweet-spot-a-gentle-approach-to-lifes-flow | Inviting the Sweet Spot: A Gentle Approach to Life's Flow | 2024-03-15 | - | 128 | yes | yes | yes | 866 | 5 | 2 (2/2) |
| it-all-arrived-at-once | It All Arrived at Once | 2026-08-10 | 2026-08-10 | 122 | yes | yes | yes | 884 | 1 | 0 (0/0) |
| it-feels-good-to-be-exactly-here | It Feels Good to Be Exactly Here | 2026-08-03 | 2026-08-03 | 154 | yes | yes | yes | 731 | 1 | 0 (0/0) |
| it-hasnt-finished-happening-yet | It Hasn't Finished Happening Yet | 2026-08-26 | 2026-08-26 | 137 | yes | yes | yes | 1057 | 0 | 0 (0/0) |
| micro-mastery-is-the-gateway-to-universal-mastery | Micro Mastery is the Gateway to Universal Mastery | 2023-03-18 | - | 139 | yes | yes | yes | 2546 | 1 | 1 (1/1) |
| navigating-lifes-rhythms-unveiling-the-hidden-wisdom-of-breath | Navigating Life’s Rhythms: Unveiling the Hidden Wisdom of Breath | 2024-02-16 | - | 119 | yes | yes | yes | 1491 | 2 | 2 (1/2) |
| nobody-thinks-about-gravity | Nobody Thinks About Gravity | 2026-07-20 | 2026-07-20 | 139 | yes | yes | yes | 922 | 1 | 0 (0/0) |
| nobodys-good-at-it-yet | Nobody's Good at It Yet | 2026-07-13 | 2026-07-13 | 117 | yes | yes | yes | 873 | 1 | 0 (0/0) |
| once-you-know-the-scales | Once You Know the Scales | 2026-11-02 | 2026-11-02 | 140 | yes | yes | yes | 829 | 1 | 0 (0/0) |
| overcome-transition-by-deciding-powerfully | Overcome Transition By Deciding Powerfully | 2023-03-24 | - | 137 | yes | yes | yes | 2373 | 2 | 1 (1/1) |
| rainbow-warriors-and-the-emerging-golden-age | Rainbow Warriors and the Emerging Golden Age | 2022-12-07 | - | 115 | yes | yes | yes | 1319 | 0 | 1 (0/1) |
| replay-transitioning-from-overwhelm-to-realizing-your-potential | REPLAY: Transitioning From Overwhelm to Realizing Your Potential | 2023-04-15 | - | 122 | yes | yes | yes | 9939 | 1 | 1 (1/1) |
| restoration-revolution-redefining-rest-for-optimal-living | Restoration Revolution: Redefining Rest for Optimal Living | 2024-03-08 | - | 118 | yes | yes | yes | 1470 | 3 | 2 (2/2) |
| self-mastery-the-antidote-to-distraction-regret-uncertainty | Self-Mastery: The Antidote to Distraction, Regret & Uncertainty | 2023-02-25 | - | 118 | yes | yes | yes | 2807 | 2 | 1 (1/1) |
| self-society-integrating-sovereignty-with-leadership-support | Self & Society: Integrating Sovereignty with Leadership Support | 2024-07-06 | - | 132 | yes | yes | yes | 1543 | 0 | 1 (1/1) |
| several-irons-in-the-fire | Several Irons in the Fire | 2026-10-12 | 2026-10-12 | 140 | yes | yes | yes | 893 | 0 | 0 (0/0) |
| someone-elses-yes | Someone Else's Yes | 2026-10-26 | 2026-10-26 | 123 | yes | yes | yes | 786 | 2 | 0 (0/0) |
| synergy-leveraging-self-organization-to-elevate-your-life | Synergy: Leveraging Self-Organization to Elevate Your Life | 2024-06-22 | - | 116 | yes | yes | yes | 1267 | 0 | 1 (1/1) |
| that-which-is-seeking-you | That Which Is Seeking You | 2026-10-19 | 2026-10-19 | 117 | yes | yes | yes | 685 | 1 | 0 (0/0) |
| the-architecture-and-the-music | The Architecture and the Music | 2026-04-27 | 2026-04-27 | 130 | yes | yes | yes | 1655 | 1 | 0 (0/0) |
| the-average-is-out-there-you-arent | The Average Is Out There. You Aren't. | 2026-06-26 | 2026-06-26 | 139 | yes | yes | yes | 1121 | 0 | 0 (0/0) |
| the-charter-jarvis-and-i-wrote | The Charter Jarvis and I Wrote | 2026-05-13 | 2026-05-13 | 137 | yes | yes | yes | 1585 | 0 | 0 (0/0) |
| the-dance-were-all-in | The Dance We're All In | 2026-06-03 | 2026-06-03 | 140 | yes | yes | yes | 787 | 2 | 0 (0/0) |
| the-dance-youre-already-in | The Dance You're Already In | 2026-06-01 | 2026-06-01 | 136 | yes | yes | yes | 970 | 1 | 0 (0/0) |
| the-full-spectrum-dance-of-life-2-of-3 | The Full Spectrum Dance of Life (2 of 3) | 2022-09-23 | - | 131 | yes | yes | yes | 261 | 3 | 1 (0/1) |
| the-game-i-was-already-playing | The Game I Was Already Playing | 2026-05-06 | 2026-05-06 | 144 | yes | yes | yes | 1265 | 1 | 0 (0/0) |
| the-infinite-game-is-already-in-progress | The Infinite Game Is Already in Progress | 2026-04-24 | 2026-04-24 | 137 | yes | yes | yes | 1299 | 2 | 0 (0/0) |
| the-joyful-sovereignty-infinite-game | The Joyful Sovereignty Infinite Game | 2023-05-05 | - | 123 | yes | yes | yes | 3205 | 3 | 1 (1/1) |
| the-key-to-joyful-sovereignty-is-gratitude | The Key to Joyful Sovereignty is Gratitude | 2023-02-18 | - | 116 | yes | yes | yes | 2460 | 1 | 5 (5/5) |
| the-people-process-and-trajectory-to-change-the-world | The People, Process and Trajectory to Change the World | 2023-04-22 | - | 123 | yes | yes | yes | 2025 | 2 | 1 (1/1) |
| the-safe-route-is-a-game-too | The Safe Route Is a Game Too | 2026-10-05 | 2026-10-05 | 112 | yes | yes | yes | 805 | 1 | 0 (0/0) |
| the-shape-reveals-itself | The Shape Reveals Itself | 2026-08-17 | 2026-08-17 | 139 | yes | yes | yes | 640 | 1 | 0 (0/0) |
| the-structure-flow-of-creativity | The Structure & Flow of Creativity | 2023-05-28 | - | 110 | yes | yes | yes | 2629 | 5 | 3 (2/3) |
| the-sweet-spot-of-self-mastery-strategy-flow-play | The Sweet Spot of Self-Mastery: Strategy, Flow & Play | 2023-03-10 | - | 109 | yes | yes | yes | 2499 | 2 | 1 (1/1) |
| the-true-message-of-your-heart | The True Message of Your Heart | 2023-01-04 | - | 112 | yes | yes | yes | 328 | 0 | 1 (1/1) |
| the-wheels-have-to-touch | The Wheels Have to Touch | 2026-07-27 | 2026-07-27 | 150 | yes | yes | yes | 802 | 1 | 0 (0/0) |
| theres-nobody-at-everest-base-camp-in-september | There's Nobody at Everest Base Camp in September | 2026-10-07 | 2026-10-07 | 132 | yes | yes | yes | 4009 | 1 | 0 (0/12) |
| transmuting-pressure-cultivating-the-anti-fragility-mindset | Transmuting Pressure: Cultivating The Anti-Fragility Mindset | 2024-02-23 | - | 139 | yes | yes | yes | 1264 | 2 | 2 (2/2) |
| truths-that-shift-our-perspective | Truths That Shift Our Perspective | 2022-09-23 | - | 130 | yes | yes | yes | 379 | 1 | 1 (1/1) |
| we-the-people-will-create-a-joyful-sovereign-society | We The People Will Create A Joyful Sovereign Society | 2023-02-11 | - | 136 | yes | yes | yes | 2323 | 0 | 1 (1/1) |
| what-are-we-going-to-play | What Are We Going to Play? | 2026-07-06 | 2026-09-25 | 136 | yes | yes | yes | 734 | 3 | 0 (0/0) |
| what-game-of-business-do-you-want-to-play | What Game of Business Do You Want to Play? | 2026-06-15 | 2026-09-25 | 120 | yes | yes | yes | 904 | 0 | 0 (0/0) |
| what-the-quiet-is-for | What the Quiet Is For | 2026-06-22 | 2026-06-22 | 135 | yes | yes | yes | 904 | 0 | 0 (0/0) |
| you-feel-your-way-in | You Feel Your Way In | 2026-06-08 | 2026-06-08 | 92 | yes | yes | yes | 849 | 0 | 0 (0/0) |

Article summary:
- **17 articles have zero internal links**: 4-something-am-thoughts, anchoring-purpose..., ancient-wisdom-meets-pioneering-technology, build-the-mill..., crafting-clarity..., it-hasnt-finished-happening-yet, rainbow-warriors..., self-society..., several-irons-in-the-fire, synergy..., the-average-is-out-there..., the-charter-jarvis..., the-true-message-of-your-heart, we-the-people..., what-game-of-business..., what-the-quiet-is-for, you-feel-your-way-in. The template adds only "Back to Writing" and no related posts.
- Thin archive posts (<400 words): ancient-wisdom-meets-pioneering-technology (161), the-full-spectrum-dance-of-life-2-of-3 (261), 4-something-am-thoughts (316), the-true-message-of-your-heart (328), truths-that-shift-our-perspective (379), anchoring-purpose... (391), a-precise-trajectory-is-the-answer (392).
- 30 of 30 archive posts hotlink 36 GoDaddy CDN images (`//img1.wsimg.com/...`), almost all with `alt=""`. They load today (200, 199 to 604 KB, unoptimised, outside next/image).
- 3 archive links point at `/mastery`, which 308s to `/` (vercel.json:159): an-ancient-path-to-wisdom.md:10, :86 and replay-transitioning-from-overwhelm-to-realizing-your-potential.md:9. They wrap a stale "cohort begins on 16 April" promo.
- Hero images: 48 of 55 are PNG/JPG rather than WebP. 17 are over 200 KB. `7-aligned-strategies-to-gamify-self-mastery` hero is a 5.0 MB PNG, used raw as og:image and twitter:image (X caps images at 5 MB).

Article JSON-LD (src/app/blog/f/[slug]/page.tsx:75-103), live-verified:
- dateModified: present, but falls back to `date` for the 30 archive posts (line 83).
- mainEntityOfPage: present, as a plain URL string (line 79). Fine.
- author @id: present, `https://infinitegameos.io/#person`, hardcoded at line 87 instead of the `PERSON_ID` import. It matches identity.ts:7. Note that the host is the apex, while every other ID in identity.ts uses www (identity.ts:12,16-17), and apex infinitegameos.io 308s to www.
- image: absolute (line 94). It has no width/height and is not an ImageObject.
- wordCount: counts raw HTML tokens for the 30 html-format posts (blog.ts:123-125, 152, 190). That is inaccurate, e.g. 293 for 4-something vs about 316 visible words.
- Times disagree: JSON-LD uses `T00:00:00Z` (lines 82-83), while OG article times (45-46) and RSS (rss.xml/route.ts:23) use `T12:00:00Z`.
- No isPartOf Blog `@id` (`/blog#blog` exists at blog/page.tsx:37).
- The page shows no visible byline: only the date (lines 139-144).

Substack pattern: no article carries a Substack link, canonical or "originally published" note. The live Substack posts carry a **self-canonical** (e.g. https://lanebelone.substack.com/p/nobodys-good-at-it-yet has `<link rel="canonical" href="https://lanebelone.substack.com/p/nobodys-good-at-it-yet">`). That is full-text duplication with no canonical pointing to lanebelone.com, while public/AGENTS.md:21 and :52 claim "lanebelone.com is canonical". The site also contradicts itself: page-data.ts:166 (rendered on /joyful-sovereignty) and llms-full.txt:112 say the writing "live[s] at the Substack", and llms-full.txt:166 says "Active writing: https://lanebelone.substack.com/".

### A4. Sitewide checks

**Sitemap** (src/app/sitemap.ts): 65 URLs, complete (every indexable route + 55 posts). No noindex URLs, www host, no trailing slashes. Lastmod for static routes comes from route-dates.json. Six routes share `2026-11-03T17:06:07Z` because route-dates.mjs dates a page by its `@/` imports, and page-data.ts is imported by six pages, so one copy edit re-dates them all. Archive posts' lastmod is their 2022 to 2024 publish date. `/rss.xml` is not listed (fine).

**robots.txt**: `Sitemap: https://www.lanebelone.com/sitemap.xml` (www, correct). Allows `*` and about 30 named AI and search bots. Blocks CCBot and Bytespider. Disallows `/markdown` for Googlebot and Bingbot only (lines 96-102). DuckDuckBot (line 69), Applebot (17), YandexBot (falls to `*`) and others can still crawl and index twins. The `Content-Signal` directive is commented out (line 112), so it has no effect. Cloudflare's spec expects it uncommented. It is also sent as an HTTP header, next.config.ts:115.

**/markdown twins**: return 200 `text/markdown` with `Vary: Accept`. They carry no `Link: <…>; rel="canonical"` header, no `X-Robots-Tag` and no source URL line in the body. Twins of noindex pages answer 200 with content (e.g. /markdown/unsubscribe), and the noindex does not carry over. Every indexable page except privacy and terms links its twin via `<link rel="alternate" type="text/markdown">`, which invites discovery of URLs that Google is blocked from crawling, so they can turn up as "Indexed, though blocked by robots.txt". The global Link header uses the unregistered `rel="ai-agent"` (next.config.ts:112), which is harmless.

**RSS**: valid. Items have title, link, guid, pubDate, description and category. No author/dc:creator, no content:encoded, no channel image. It is only linked from the head of noindex pages (D1).

**llms.txt**: all 70 URLs across llms.txt, llms-full.txt and AGENTS.md resolve 200. The exceptions are GitHub (403 to this proxy) and LinkedIn (429 rate limit), and those two are probably fine. The count "55" (llms.txt:39) matches. Stale or inconsistent items:
- header "Last updated: 2026-10-15" (line 2) predates three listed posts.
- "Social Profiles" (77-82) lists 4 of the 15 sameAs profiles (missing X, GitHub, ORCID, Goodreads, IMDb, Wikidata, SSRN).
- "Books" (45-46) gives no URL or ISBN for Unleash Your Humble Alpha.
- llms-full.txt line 155 says "Blog Archive Topics (55 articles)", but the topic list covers only the 30 archive themes plus a recent-25 list. Fine.
- llms-full.txt:112/166 contradict the canonical claim (above).

**public/AGENTS.md**: line 48 says "Every page exposes a `<link rel="alternate" type="text/markdown">`". That is false for /privacy, /terms and the utility pages. Line 46 says "every page answers in markdown", which includes noindex pages. Line 5 is copy addressed to AI agents ("You've arrived on someone's errand…").

**Text addressed to AI readers**: public/AGENTS.md:3-5; /cite visible section "For AI agents and crawlers" (cite/page.tsx:492-500); llms.txt:39-40 "A line you could pass along: …" (suggested quotes for agents to repeat). All benign, but the pass-along lines read as steering.

**sameAs** (identity.ts:40-56): Wikidata, the 3 own sites, LinkedIn, Instagram @increasefreedom, Facebook x2, X, Substack, GitHub, SSRN, ORCID, Goodreads, IMDb. All resolve, though Facebook lane.belone sits behind a login wall. Obvious absences to check: an Amazon Author Central page (the book sells on Amazon), YouTube, Threads, Hugging Face profile (huggingface.co/lanebelone, dataset already public), Zenodo. Instagram @lanebelone and Pinterest are excluded by ruling (identity.ts:37-38). Adding the own sites to sameAs is redundant but harmless.

**Image alt**: site templates are good. Pages show no empty alts except the GoDaddy images in archive posts. The speaking hero alt "Lane Belone speaking" sits on `lane-cowboy-action.webp` (speaking/page.tsx:78-79), which is not a speaking photo (CLAUDE.md flags it as low quality).

**Fact inconsistencies (repo docs)**:
- Article counts:
  - CLAUDE.md:40, :82: "31 articles"
  - CLAUDE.md:140, AGENTS.md:95: "31 blog slugs" in the sitemap
  - AGENTS.md:57: "47 articles"
  - AGENTS.md:84: "44 article files"
  - reality: 55 (30 archive + 25 live)
  - the "legacy GoDaddy" set is 30, not 31 (blog.ts:10)
- CLAUDE.md:140 and AGENTS.md:95 describe a static `public/sitemap.xml`, but it is generated by src/app/sitemap.ts.
- CLAUDE.md:141 and :232 claim Organization schema in layout.tsx, but there is none.
- CLAUDE.md:123 says Nav "Writing" goes to Substack, but it goes to /blog (Nav.tsx:64).
- CLAUDE.md:139 and AGENTS.md:94 say "8 AI crawlers", but robots.txt names about 30.
- The HubSpot sections (CLAUDE.md:29, 50-60, 86; AGENTS.md:33, 59, 88) describe a `HubSpotForm.tsx` that no longer exists.
- AGENTS.md:28-29 say Next 15 / React 19.0.0, while CLAUDE.md:24-25 say 16.2.1 / 19.2.4.
- Both say "static export", but the site has API routes, a proxy and force-dynamic pages.
- Humble Alpha datePublished '2023' (cite/page.tsx:120; APA at :236). ISBN 173525472X (page-data.ts:251) suggests an earlier year. Please verify.

### A5. Concrete defects

| # | Sev | File:line | Defect | Fix |
|---|---|---|---|---|
| D1 | High | src/app/layout.tsx:21-25 (overridden by src/app/page.tsx:23-28, about/page.tsx:12-17, speaking/page.tsx:10-15, joyful-sovereignty/page.tsx:9, library/page.tsx:25, links/page.tsx:9, cite/page.tsx:8, blog/page.tsx:10, blog/f/[slug]/page.tsx:31-36, privacy/page.tsx:6, terms/page.tsx:6) | Next merges `alternates` shallowly, so every indexable page drops the RSS `<link rel="alternate">`. Live: it appears only on noindex pages and the 404 | Hardcode `<link rel="alternate" type="application/rss+xml" …>` in the layout `<head>` (layout.tsx:57-63), or add the rss type to each page's `alternates.types` |
| D2 | High | src/content/blog/*.md (30 archive files, 36 refs, e.g. 4-something-am-thoughts.md:9) | Body images hotlinked from GoDaddy `img1.wsimg.com`, mostly `alt=""`, unoptimised. A dead-platform dependency with zero image SEO | Download into public/images/blog/<slug>/ as WebP, rewrite src, write real alt text |
| D3 | High | public/AGENTS.md:21, :52 vs live Substack self-canonicals; src/lib/page-data.ts:166; public/llms-full.txt:112, :166 | The "lanebelone.com is canonical" claim is unenforced. Substack mirrors full text with its own canonical, and the site itself says writing "lives at the Substack" / "Active writing: Substack" | Put an "Originally published at lanebelone.com/blog/f/…" link at the top of each Substack post, or post excerpts. Fix the page-data.ts:166 and llms-full.txt:112/166 copy to name /blog as home |
| D4 | Med | src/app/blog/f/[slug]/page.tsx:139-152 | No visible author byline or author box on any article. E-E-A-T and AI attribution rely on JSON-LD alone | Render "By Lane Belone" linked to /about next to the date, plus a short bio block |
| D5 | Med | src/app/blog/f/[slug]/page.tsx:209-218; 17 articles with 0 internal links (§3) | No related-posts or contextual internal links. 17 posts are internal-link dead ends | Add a "Keep reading" module (same category or `about` overlap) and a link to /joyful-sovereignty |
| D6 | Med | src/app/cite/page.tsx:14-28, links/page.tsx:15-27, privacy/page.tsx:9-21, terms/page.tsx:9-21 | No og:image or twitter:image at all. The page-level `openGraph` replaces the root and no segment image exists | Add `opengraph-image.tsx` in cite/ and links/ (and optionally privacy/terms), or set `openGraph.images` |
| D7 | Med | src/app/markdown/[[...path]]/route.ts:35-37 | Twins send no `Link: <html-url>; rel="canonical"` header, so non-Google engines can index duplicates. Twins of noindex pages return 200 | Add a `Link: <${SITE}/${joined}>; rel="canonical"` header. Return 404 or `X-Robots-Tag: noindex` when the source HTML has a noindex robots meta |
| D8 | Med | public/robots.txt:96-102 | `/markdown` is disallowed only for Googlebot and Bingbot. Disallow blocks crawling, not indexing (URLs are linked from every head) | Rely on the canonical Link header (D7) and consider dropping the disallow so Google can see it. Or extend the disallow to DuckDuckBot, Applebot, YandexBot |
| D9 | Med | src/components/Nav.tsx:84, :181 | "Connect" is `href="#connect"`, but `id="connect"` exists only on the homepage (page.tsx:596), so it is broken on every other page | Use `/#connect` |
| D10 | Med | src/app/cite/page.tsx (no inbound link; only sitemap.ts:43) | /cite is an orphan page | Link it from Footer.tsx:79-90 and /about |
| D11 | Med | src/app/speaking/page.tsx:8, :9, :89-93 | Title "Speaking", 193-char desc, H1 "Design. Play. Master." Nothing targets "book Lane Belone / keynote speaker" | Title "Book Lane Belone to Speak: Keynotes and Workshops". Keep desc to 155 chars or fewer. H1 or eyebrow that names speaking |
| D12 | Med | src/content/blog/an-ancient-path-to-wisdom.md:10, :86; replay-transitioning-from-overwhelm-to-realizing-your-potential.md:9 | Links to `/mastery` (308 to `/`, vercel.json:159) inside stale "cohort begins 16 April" promos | Remove the promos or point to a live SQHQ page |
| D13 | Med | public/images/blog/7-aligned-strategies-to-gamify-self-mastery-hero.png (5.0 MB), used raw at blog/f/[slug]/page.tsx:47, :53 | og:image and twitter:image over the 5 MB X limit. 16 more heroes are over 200 KB, and 48 of 55 are not WebP | Convert heroes to 1200 to 1920px WebP under 200 KB |
| D14 | Low | src/app/not-found.tsx:1 (no metadata) + layout.tsx:39-43 | The 404 emits both `noindex` and `index, follow` robots metas, plus the homepage title and description | Export `metadata = { title: 'Page not found', robots: { index: false } }` from not-found.tsx |
| D15 | Low | src/app/page.tsx:47-55 and src/app/about/page.tsx:33-40 | Two ProfilePage nodes for the same Person | Keep ProfilePage on /about. Make home a WebPage with `about` → Person |
| D16 | Low | src/lib/identity.ts:7 vs :12; hardcoded copies at blog/f/[slug]/page.tsx:87, page.tsx:40, :54, about/page.tsx:36, speaking/page.tsx:40, blog/page.tsx:40, library/page.tsx:85 | The Person @id lives on the apex `infinitegameos.io`, which redirects to www, while the org IDs use www. The ID is hardcoded 7 times | Import `PERSON_ID` everywhere. If you ever change the host, change it in all 3 repos at once (identity.ts is shared) |
| D17 | Low | src/app/blog/f/[slug]/page.tsx:82-83 vs :45-46 | JSON-LD `T00:00:00Z` vs OG `T12:00:00Z` | Use one timestamp helper |
| D18 | Low | src/lib/blog.ts:123-125 (used at :152, :190) | wordCount counts HTML tokens for html-format posts | Strip tags before counting |
| D19 | Low | src/app/blog/f/[slug]/page.tsx:75-103 | BlogPosting has no `isPartOf: {'@id': '…/blog#blog'}` and the image has no ImageObject dimensions | Add isPartOf and `image: {url, width, height}` |
| D20 | Low | src/app/blog/page.tsx:33-53 | Blog has no BreadcrumbList. Blog and ItemList are disjoint | Add a BreadcrumbList and `blogPost`/`mainEntity` linking to the ItemList |
| D21 | Low | src/app/blog/f/[slug]/opengraph-image.tsx:1-22 | 55 generated article OG cards are dead: page metadata images (page.tsx:47) win live | Delete it, or drop `openGraph.images` and use the generated card |
| D22 | Low | src/app/cite/page.tsx:111-122, :234, :250 | The Humble Alpha Book has no `isbn`/`url`/Amazon sameAs. Its visible canonicalUrl is the homepage. The RPG canonicalUrl is the homepage, not /files/your-infinite-rpg.pdf | Add `isbn: '173525472X'`, `url` = Amazon. Point the RPG at the PDF or its library anchor. Verify datePublished |
| D23 | Low | src/app/layout.tsx:19; speaking/page.tsx:9; library/page.tsx:20; page-data.ts:123; cite/page.tsx:7 | Meta descriptions run 184, 193, 260, 174 and 168 chars (truncated in SERPs) | Trim to 155 chars or fewer |
| D24 | Low | src/app/terms/page.tsx:5 (32 chars); privacy/page.tsx:5 (84) | Thin descriptions | Expand slightly (low value pages) |
| D25 | Low | src/app/page.tsx:93, :124, :261, :414; library/page.tsx:194 (no h2 on page) | Section titles are divs, so h3 jumps straight from h1. The library H1 is a 90+ char sentence | Make section labels h2. Give library a short H1 ("The Library") |
| D26 | Low | links/page.tsx:127, about/page.tsx:84, Hero.tsx:21 | Three pages share the H1 "Lane Belone" | Make the H1s distinct, e.g. "About Lane Belone" and "Lane Belone: Links" |
| D27 | Low | src/app/speaking/page.tsx:78-79 | The hero alt "Lane Belone speaking" sits on a cowboy-action photo | Replace the photo (already outstanding) or describe it accurately |
| D28 | Low | articles-subscribed/page.tsx:6-9, unsubscribe/page.tsx:9-12, preferences/page.tsx:15-18 (+2 subpages) | Utility pages inherit the homepage description and og:url | Set a short description. Optional, since they are noindex |
| D29 | Low | public/robots.txt:112 | `Content-Signal` is commented out, so it is inert in robots.txt | Uncomment it as a directive under `User-agent: *` if you intend the signal |
| D30 | Low | src/components/Footer.tsx:82-83 | Two footer links ("Writing", "Blog") point to /blog | Drop one |
| D31 | Low | public/llms.txt:2, :77-82 | Stale "Last updated" date. The social list is a subset of sameAs | Have sync-llms-counts.mjs bump the date. Mirror identity.ts sameAs |
| D32 | Low | public/AGENTS.md:46, :48 | Claims every page has a markdown alternate link (false for privacy, terms, utility) | Reword to "every indexable content page" |
| D33 | Low | scripts/route-dates.mjs (import-based dating) → src/lib/route-dates.json:2-7 | Six routes share one lastmod because they import page-data.ts | Date by page-data section or accept it. Low impact |
| D34 | Low | next.config.ts:43-71 | `/blog/:slug` (missing `/f/`) returns 404. `http://lanebelone.com` takes 2 hops | Add `{source:'/blog/:slug((?!f$)[^/]+)', destination:'/blog/f/:slug'}`. Set the apex to redirect straight to https://www in Vercel domains |
| D35 | Low | src/content/blog: 7 posts under 400 words (§3) | Thin archive content | Consolidate or expand. Optionally cross-link them |
| D36 | Low | src/content/blog/the-infinite-game-is-already-in-progress.md (frontmatter) | The only LIVE post missing `author`/`authorUrl` (the fallback hides it) | Add the fields for consistency |
| D37 | Low (docs) | CLAUDE.md:15, 24-25, 29, 40, 50-60, 82, 86, 123, 139-141, 232; AGENTS.md:28-29, 33, 42, 57, 59, 84, 88, 94-95 | Stale counts (31/44/47 vs 55), missing sitemap.xml, Organization schema, HubSpot, Substack nav, "8 AI crawlers", version mismatch | Refresh both files from the current code |

---

## 5. Part B: the question table (60 questions)

Each batch below keeps its own method note and tally. A "Lane property" means lanebelone.com, sidequesthq.co, infinitegameos.io or lanebelone.substack.com. All results read 2026-11-04.

### 5.1 The Infinite Game and its ideas (questions 1 to 15)


Date read: 2026-11-04. Tool: WebSearch (US results). Standard mode unless marked "extended". Each result list is the engine's top 5 in the order returned. "Lane" means lanebelone.com, sidequesthq.co, infinitegameos.io or lanebelone.substack.com. 15 questions, 24 queries (9 questions got a second variant).

| # | Question | Query | Top 5 results (domain: URL) | Lane property present? | What winners have |
|---|---|---|---|---|---|
| 1a | What is the infinite game as a way of living? | what is the infinite game as a way of living | 1. ybrikman.com: https://www.ybrikman.com/blog/2024/10/21/the-infinite-game/ 2. books.apple.com: https://books.apple.com/book/id1341489366 3. prince-books.com: https://www.prince-books.com/book/9780735213500 4. goodreads.com: https://www.goodreads.com/author_blog_posts/25893215-the-infinite-game-simon-sinek 5. auntiesbooks.com: https://auntiesbooks.com/book/9780735213500 | No | Sinek's book owns the phrase. Bookstore listings and book reviews, with Wikipedia lower down. |
| 1b | (variant) | living life as an infinite game | 1. aucklanduniversitypress.co.nz: https://aucklanduniversitypress.co.nz/the-infinite-game-how-to-live-well-together/ 2. paperplus.co.nz: https://www.paperplus.co.nz/shop/books/the-infinite-game-615475 3. scorpiobooks.co.nz: https://scorpiobooks.co.nz/?p=555885 4. cdn.auckland.ac.nz: https://cdn.auckland.ac.nz/assets/press/all-books/pdfs/2018/Infinite-Game_websample.pdf 5. fs.blog: https://fs.blog/finite-and-infinite-games/ | No | A published book (Niki Harre, "How to Live Well Together") whose title matches the query, plus Farnam Street's Carse explainer. |
| 2a | How do I apply infinite game thinking to my personal life? | how to apply infinite game thinking to my personal life | 1. art-of-zen.beehiiv.com: https://art-of-zen.beehiiv.com/p/lifes-infinite-games 2. sketchyideas.substack.com: https://sketchyideas.substack.com/p/finite-vs-infinite-games 3. cs.grinnell.edu: https://cs.grinnell.edu/80655495/wcoverr/ldataa/yariset/The+Infinite+Game.pdf (spam PDF) 4. semissourian.com: https://www.semissourian.com/story/2683107.html 5. cs.grinnell.edu: https://cs.grinnell.edu/91393471/qpromptt/ggotoj/yawards/The+Infinite+Game.pdf (spam PDF) | No | Thin results. Newsletter essays with "list your games" exercises and a book review. Spam PDFs fill the gaps, so a clear how-to page could rank here. |
| 2b | (variant) | infinite mindset in personal life examples | 1. happyhue.substack.com: https://happyhue.substack.com/p/023-anewwiththehue 2. shahzadidevje.com: https://shahzadidevje.com/the-mindset-that-changed-the-way-i-approach-goals/ 3. ted.com: https://www.ted.com/talks/jeet_satish_vijaywargi_what_if_infinity_was_more_than_you_thought 4. happyhue.substack.com: https://happyhue.substack.com/p/mindset-101-thehue 5. govloop.com: https://govloop.com/community/blog/a-new-way-to-think-about-your-mindset | No | Personal essays that use "infinite mindset" (Sinek's term) in titles. Concrete examples from relationships and goals. |
| 3a | What is the difference between finite and infinite games in life? | difference between finite and infinite games in life | 1. fs.blog: https://fs.blog/finite-and-infinite-games/ 2. fs.blog: https://fs.blog/2020/02/finite-and-infinite-games/ 3. fs.blog: https://fs.blog/2020/02/finite-and-infinite-games-two-ways-to-play-the-game-of-life/ 4. sketchyideas.substack.com: https://sketchyideas.substack.com/p/finite-vs-infinite-games 5. brendanaronson.substack.com: https://brendanaronson.substack.com/p/rl104-infinite-games-vs-finite-games | No | Farnam Street holds the top 3: a big domain, Carse quotes, a side-by-side comparison and "vs" in the title. |
| 4a | What is Joyful Sovereignty? | what is Joyful Sovereignty | 1. biblehub.com: https://biblehub.com/topical/j/joy_in_god's_reign.htm 2. sermons.logos.com: https://sermons.logos.com/sermons/879277-joy-in-his-sovereignty 3. drdennislong.substack.com: https://drdennislong.substack.com/p/finding-joy-in-gods-sovereignty 4. resources.hopecc.com: https://resources.hopecc.com/all-resources/category-happiness-or-sovereignty 5. gen.ultralig.ht: https://gen.ultralig.ht/?p=9212 | No (not in top 15 either) | Without quotes, the engine reads it as Christian "joy in God's sovereignty". Christian sites have a lot of content on that and strong authority. |
| 4b | (variant, extended) | "Joyful Sovereignty" meaning | 1. infinitegameos.io: https://www.infinitegameos.io/updates/what-is-joyful-sovereignty 2. lanebelone.com: https://www.lanebelone.com/joyful-sovereignty 3. en.wikipedia.org: https://en.wikipedia.org/wiki/Joy 4. en.wikipedia.org: https://en.wikipedia.org/wiki/Joyous_Life 5. en.wikipedia.org: https://en.wikipedia.org/wiki/Sovereign | Yes. infinitegameos.io #1, lanebelone.com #2 | Lane owns the exact quoted phrase. The engine's summary called it "niche, self-defined" with no independent use. |
| 5a | How do I treat life as a game? | how to treat life as a game | 1. medium.com: https://medium.com/the-mission/how-to-see-and-enjoy-life-as-a-game-96cd6d7d817a 2. 24hourfitness.com: https://24hourfitness.com/24life/focus/2017/play-life-like-a-video-game 3. carnavalderua.prefeitura.sp.gov.br: https://carnavalderua.prefeitura.sp.gov.br/life-is-a-board-game_26088.html (spam) 4. weekly3.substack.com: https://weekly3.substack.com/p/how-to-win-the-game-of-life 5. pueblolibrary.overdrive.com: https://pueblolibrary.overdrive.com/media/9695920 | No | "How to" titles that match the query exactly, numbered steps and the video-game metaphor. |
| 6a | How can I gamify self-mastery? | how can I gamify self-mastery | 1. producthunt.com: https://www.producthunt.com/@barandev 2. superprofile.bio: https://superprofile.bio/vp/the-ultimate-self-mastery-system 3. zhuhry.gumroad.com: https://zhuhry.gumroad.com/l/gamified-habit-tracker 4. alternativeto.net: https://alternativeto.net/software/gamifyroutine/about 5. apps.apple.com: https://apps.apple.com/us/app/narn-habit-tracker-goals/id6447641610 | No | Searchers get products: apps, habit-tracker templates and app directories. No essays in the top 5. |
| 6b | (variant) | gamify self mastery infinite game | 1. weblog.tetradian.com: https://weblog.tetradian.com/2012/12/09/gamification-and-infinite-games 2. buzzsprout.com: https://www.buzzsprout.com/2031091/episodes/16843255-e53-yu-kai-chou-and-mark-diaz-how-to-gamify-your-life-in-six-steps 3. netgalley.co.uk: https://netgalley.co.uk/catalog/book/194309 4. parilbhakta.beehiiv.com: https://parilbhakta.beehiiv.com/p/long-term-playmaker 5. teaforthecurious.substack.com: https://teaforthecurious.substack.com/p/play-the-infinite-game | No | A 2012 blog post, a podcast with Yu-kai Chou (gamification authority) and a book listing ("Infinite Gamification"). |
| 7a | What is micro mastery? | what is micro mastery | 1. mastersportal.com: https://www.mastersportal.com/articles/2853/what-is-a-micromasters-should-i-study-one-in-2021.html 2. scholarshipportal.eu: https://scholarshipportal.eu/articles/2853/what-is-a-micromasters-should-i-study.html 3. abebooks.com: https://www.abebooks.com/Butterfly-Effect-Micro-Mastery-Guide-Building-Better/32091029522/bd 4. centreity.learnworlds.com: https://centreity.learnworlds.com/blog/an-introduction-to-micro-mastery-courses 5. programs.edx.org: https://programs.edx.org/micromasters/about | No | Confused with edX MicroMasters. Robert Twigger's book "Micromastery" and his TEDx talk own the concept. Definition-first pages. |
| 7b | (variant) | micro mastery infinite game life | 1. art-of-zen.beehiiv.com: https://art-of-zen.beehiiv.com/p/lifes-infinite-games 2. bookey.podbean.com: https://bookey.podbean.com/e/playing-for-keeps-navigating-the-world-of-finite-and-infinite-games 3. teaforthecurious.substack.com: https://teaforthecurious.substack.com/p/play-the-infinite-game 4. finderio.dev.500apps.com: https://finderio.dev.500apps.com/post/how-infinite-craft-players-beat-realitys-limits-the-life-hack-no-one-talks-about (spam) 5. fs.blog: https://fs.blog/finite-and-infinite-games/ | No | Nothing joins the two ideas. The engine said no "micro mastery" framework is indexed, so this is open ground. |
| 8a | Is there a playbook for playing the infinite game in life? | playbook for playing the infinite game in life | 1. medium.com: https://medium.com/the-shore-of-my-ignorance/how-to-play-the-infinite-game-part-1-810e2153ab15 2. bookey.podbean.com: https://bookey.podbean.com/e/the-infinite-game-embracing-endless-possibilities-for-lasting-success 3. fs.blog: https://fs.blog/finite-and-infinite-games/ 4. fs.blog: https://fs.blog/2020/02/finite-and-infinite-games-two-ways-to-play-the-game-of-life/ 5. fs.blog: https://fs.blog/2020/02/finite-and-infinite-games/ | No | A "How to Play" series title and podcast book summaries. The engine said no single playbook exists, so a page titled as a playbook could rank. |
| 9a | What does it mean to be an infinite player? | what does it mean to be an infinite player | 1. success.com: https://www.success.com/?p=64772 2. chapter16.org: https://chapter16.org/?p=24478 3. duckduckgo.com: https://duckduckgo.com/a brief practical guide to being an infinite player (a search-page URL that leaked into results) 4. goodreads.com: https://www.goodreads.com/notes/12902053-finite-and-infinite-games/7066370-dave 5. de.bookmate.com: https://de.bookmate.com/books/lj71JU6Q | No | Big media brand (SUCCESS), Carse quotes and Goodreads highlights. Rank 3 points to a "brief practical guide to being an infinite player" title. |
| 10a | What is the game within the game (intrinsic joy)? | what is the game within the game intrinsic joy | 1. chartboost.com: https://www.chartboost.com/resources/blog/reward-loops-intrinsic-and-extrinsic-fun/ 2. core.ac.uk: https://core.ac.uk/download/286343136.pdf 3. machinations.io: https://machinations.io/glossary/intrinsic-motivation 4. reservations.cypressvalleycanopytours.com: https://reservations.cypressvalleycanopytours.com/uploaded-files/6cJzu5/6AD203/FunOfGames.pdf (spam PDF) 5. oreilly.com: https://www.oreilly.com/library/view/the-power-of/9781394228010/c07.xhtml | No | The engine reads it as video-game design. Glossary definitions and academic papers. |
| 10b | (variant) | "game within the game" intrinsic motivation life | 1. buttondown.com: https://buttondown.com/mattpalmer/archive/life-is-a-game-of-catch 2. gamedeveloper.com: https://www.gamedeveloper.com/business/intrinsic-extrinsic-motivation-a-false-dichotomy- 3. commons-os.github.io: https://commons-os.github.io/patterns/game-design-applied-to-life/ 4. pmc.ncbi.nlm.nih.gov: https://pmc.ncbi.nlm.nih.gov/articles/PMC5797321/table/T2 5. de.slideshare.net: https://de.slideshare.net/MARRY7/httppsssagepubcompsychological-science-httppssdocx-253906751 | No | One newsletter essay with life-as-play framing. The rest is self-determination research. Nothing owns the phrase with a life meaning. |
| 11a | How do I find the sweet spot between strategy, flow and play? | how to find the sweet spot between strategy, flow and play | 1. arxiv.org: https://arxiv.org/pdf/2508.19152 2. people.cs.nott.ac.uk: https://people.cs.nott.ac.uk/pszmdf/g54gam/g54gam_lecture07_handouts.pdf 3. active.com: https://www.active.com/basketball/articles/balance-in-team-play-c 4. japaneseclass.jp: https://japaneseclass.jp/notes/open/114685 5. people.cs.nott.ac.uk: https://people.cs.nott.ac.uk/pszmdf/g54gam/g54gam_lecture07.pdf | No | Read as game-design or sports balance. Academic PDFs. Nothing on a personal three-way framework. |
| 11b | (variant) | balance strategy flow and play in life and work | 1. patch.com: https://patch.com/california/venice/how-achieve-balance 2. thebalance.substack.com: https://thebalance.substack.com/p/thebalance-harmony-equals-flow 3. www2.deloitte.com: https://www2.deloitte.com/us/en/pages/about-deloitte/articles/work-life-play.html 4. marlowreview.com: https://www.marlowreview.com/articles/8433/view/healthy-horizons-health-wellness-lifestyle-balancing-work-and-play-finding-your-flow 5. nzbusiness.co.nz: https://nzbusiness.co.nz/opinion/stop-striving-for-balance-why-flow-is-your-new-best-friend | No | Work-life balance content, mostly "flow over balance". Corporate (Deloitte) and local-news authority. "Strategy" is mostly missing. |
| 12a | How do I design my life around curiosity and excitement? | how to design my life around curiosity and excitement | 1. facultyaffairs.ku.edu: https://facultyaffairs.ku.edu/book/designing-your-life-how-build-well-lived-joyful-life 2. goodreads.com: https://www.goodreads.com/notes/62036224-designing-your-life/24358457-shelly-pinnock 3. dantesisofo.com: https://dantesisofo.com/?p=47341 4. ruby-crocodile-dpx5.squarespace.com: https://ruby-crocodile-dpx5.squarespace.com/blog/why-following-your-curiosity-works-better-than-chasing-passion 5. medium.com: https://medium.com/betterism/the-role-of-curiosity-in-an-exciting-life-9c52a2a29a35 | No | The "Designing Your Life" book (Burnett and Evans, Stanford) wins through university pages and Goodreads. Also curiosity-over-passion essays. |
| 13a | How do I design my day as different playgrounds or zones of energy? | how to design my day as different playgrounds or zones of energy | 1. theartofcharm.com: https://theartofcharm.com/art-of-personal-development/life-hacks/how-to-avoid-burnout-by-structuring-your-day-into-these-3-zones 2. pentagonplay.co.uk: https://www.pentagonplay.co.uk/projects/newcastle-under-lyme-school-playground 3. medicalnewstoday.com: https://www.medicalnewstoday.com/releases/312233 4. lifeat.io: https://lifeat.io/blog/what-your-focus-schedule-should-look-like-based-on-your-energy-curve 5. athleticbusiness.com: https://www.athleticbusiness.com/recreation/can-playground-zoning-make-kids-more-active.html | No | A numbered "3 zones" structure and energy-curve scheduling. "Playground" pulls in real playground results. |
| 13b | (variant, Lane term) | "playgrounds of exploration" daily life | 1. archdaily.com: https://www.archdaily.com/985771/placemaking-through-play-designing-for-urban-enjoyment/ 2. cde.nus.edu.sg: https://cde.nus.edu.sg/did/gradshows/2013/low_jue_ming.html 3. web.stanford.edu: https://web.stanford.edu/group/playfulscience/cgi-bin/activities.php 4. hvl.no: https://www.hvl.no/en/project/532456/ 5. kristinafisher.myportfolio.com: https://kristinafisher.myportfolio.com/the-playful-city | No | The engine said the exact phrase was not found. Urban-design and education pages win. Lane's FAQPage term on /joyful-sovereignty does not surface. |
| 14a | How does perception shape reality and how do I change mine? | how does perception shape reality and how do I change mine | 1. medium.com: https://medium.com/new-earth-consciousness/rewiring-your-reality-the-spiritual-path-to-true-perception-39fe8161c757 2. jeffersoncountyclerk.org: https://jeffersoncountyclerk.org/pdfs/vip_newsletter/vip_spring_2019/inc/html/6.html 3. stevenpecksen.substack.com: https://stevenpecksen.substack.com/p/perception-is-reality 4. yourtango.com: https://Yourtango.Com/experts/malka-ahern/how-do-we-perceive-the-world-and-how-does-it-change-our-reality 5. blackbeltleadership.kit.com: https://blackbeltleadership.kit.com/posts/why-what-you-believe-matters-more-than-what-s-actually-happening | No | Titles that match the question ("How To Shape The Reality You Want"), a pages-full-of-steps style and expert-byline media (YourTango). |
| 14b | (variant, Lane term) | "perception upgrade" how to change your perception | 1. hogonext.com: https://hogonext.com/?p=602574 2. oreilly.com: https://oreilly.com/library/view/getting-ahead-three/9781118116777/chapter03.html 3. lifearchitekture.com: https://lifearchitekture.com/blogs/personal-development/changing-perception 4. pressbooks.openeducationalberta.ca: https://pressbooks.openeducationalberta.ca/communications/chapter/2-5-improving-preception/ 5. pressbooks.openeducationalberta.ca: https://pressbooks.openeducationalberta.ca/communications/?p=281 | No | The engine said there is no definition of "perception upgrade". Open textbooks and how-to articles win. Lane's term does not surface. |
| 15a | How is gratitude connected to personal sovereignty? | how is gratitude connected to personal sovereignty | 1. nicoleconnor.substack.com: https://nicoleconnor.substack.com/p/grounded-presence 2. budhagirl.com: https://budhagirl.com/blogs/budhabrief/november-2025-we-thank 3. jankifoundation.org: https://www.jankifoundation.org/podcast/stillness-in-the-stom-audiocast-6-summary/ 4. tishamorris.substack.com: https://tishamorris.substack.com/p/still-life-ahead/comments 5. podcast.ausha.co: https://podcast.ausha.co/le-podcast-de-la-souverainete-personnelle-pour-redevenir-roi-et-reine-en-son-royaume/episode-23-souverainete-et-gratitude-un-regard-qui-transforme | No | Small Substack and spiritual pieces plus a French podcast. Low authority everywhere, so this is an open lane for a page built to answer the question. |

#### Tally (my own count)

24 top-5 lists, 120 result slots. Hosts that appear more than once are listed by host. Everything else appeared once.

| Domain | Appearances |
|---|---|
| fs.blog (Farnam Street) | 8 |
| medium.com | 4 |
| goodreads.com | 3 |
| en.wikipedia.org | 3 (all in 4b) |
| sketchyideas.substack.com | 2 |
| teaforthecurious.substack.com | 2 |
| happyhue.substack.com | 2 |
| art-of-zen.beehiiv.com | 2 |
| bookey.podbean.com | 2 |
| oreilly.com | 2 |
| people.cs.nott.ac.uk | 2 |
| pressbooks.openeducationalberta.ca | 2 |
| cs.grinnell.edu (spam PDFs) | 2 |
| all other hosts | 1 each (84 slots) |

Platform rollup: all *.substack.com subdomains 13. All *.beehiiv.com subdomains 3.

Lane properties: infinitegameos.io 1 (rank 1, query 4b). lanebelone.com 1 (rank 2, query 4b). sidequesthq.co 0. lanebelone.substack.com 0. Lane shows up in 2 of 120 slots. Both are for the exact quoted phrase "Joyful Sovereignty". The unquoted natural query (4a) shows no Lane property.

### 5.2 Self-mastery, rhythm and business (questions 16 to 30)


Date read: 2026-11-04. Tool: WebSearch, mode "standard" for every query. Lane properties checked: lanebelone.com, sidequesthq.co, infinitegameos.io, lanebelone.substack.com.

How I picked the top 5: I took the first five results in the order returned. Where one page showed up again under a mirror subdomain or as a comments/duplicate URL (formstack.com mirrors, coachinnerthought /comments, trainingindustry ?p=, successful-blog ?p=, arxiv abs vs pdf), I counted it once and moved to the next result. Variant queries appear in the Query column and in the notes. Their results are not counted in the tally.

| # | Question | Query | Top 5 results (domain: URL) | Lane property present? | What winners have |
|---|---|---|---|---|---|
| 16 | Redefine rest for optimal living (restoration vs rest) | how to redefine rest for optimal living restoration vs rest | 1. subsomatic.substack.com: https://subsomatic.substack.com/p/redefining-rest 2. coachinnerthought.substack.com: https://coachinnerthought.substack.com/p/rest-vs-restoration 3. mountmadonna.org: https://mountmadonna.org/?p=7747 4. nurturedminds.squarespace.com: https://nurturedminds.squarespace.com/blog/rest-vs-restoration-how-to-find-what-you-need 5. californiainsider.com: https://californiainsider.com/california-news/health/7-types-of-rest-your-brain-craves-5987236 | No (none of 4) | The exact phrases "rest vs restoration" / "redefining rest" in the title and URL slug, plus named frameworks (Dalton-Smith's 7 types of rest) |
| 17 | What breath teaches about the rhythms of life | what can breath teach us about the rhythms of life | 1. ns1.mudfish.net: https://ns1.mudfish.net/default.aspx/Tnly5L/704589/The Law Of Rhythmic Breath.pdf (spam PDF) 2. pattytownsend.substack.com: https://pattytownsend.substack.com/p/reconnecting-with-nature-through 3. blooming-rose.squarespace.com: https://blooming-rose.squarespace.com/blog/2021/5/27/how-breathing-connects-us-to-the-rhythm-of-life 4. murshidsam.org: https://murshidsam.org/papers/breath/pasi-anfas-breath-gatha-with-commentary-series-2 5. elizabethrosswrites.substack.com: https://elizabethrosswrites.substack.com/p/breath-as-a-living-pattern-for-daily | No | "Breath" + "rhythm of life" in the H1/slug. A weak field (a spam PDF ranks #1), so it is easy to break into |
| 18 | Anti-fragile mindset, transmuting pressure | how to build an anti-fragile mindset and transmute pressure | 1. rocketgoals.beehiiv.com: https://rocketgoals.beehiiv.com/p/celebrate-change-5cd5 2. ninety.io: https://www.ninety.io/founders-framework/blog/how-to-build-for-the-storm 3. drwillsamson.substack.com: https://drwillsamson.substack.com/p/how-to-build-an-anti-fragile-mindset 4. medium.com: https://medium.com/the-inner-observer/beyond-unbreakable-f715db68a225 5. elitebusinessmagazine.co.uk: https://elitebusinessmagazine.co.uk/people/item/build-your-antifragility-and-turn-stress-into-strength | No | "Antifragile mindset" exact-match title, numbered practices and a cited authority (Taleb, Ben-Shahar). No result uses "transmute" |
| 19 | Big life transition, deciding powerfully | how to get through a big life transition by deciding powerfully | 1. workandhealth.substack.com: https://workandhealth.substack.com/p/techniques-for-envisioning-where 2. briancollinson.ca: https://briancollinson.ca/?p=33523 3. truist.com: https://www.truist.com/resources/wealth/business-transition/navigating-lifes-biggest-transitions-podcast 4. wealthyhabits.libsyn.com: https://wealthyhabits.libsyn.com/website/ep-120-making-smart-decisions-during-major-life-events 5. goodreads.com: https://www.goodreads.com/author_blog_posts/18986780-how-to-deal-with-major-life-transitions-with-ease-and-grace | No | Therapist or financial-advisor credentials and step-style "how to" structure. Podcast episode pages rank on transcript-style show notes |
| 20 | From overwhelm to realizing potential | how to move from overwhelm to realizing your potential | 1. medium.com: https://medium.com/business-with-impact/how-to-go-from-overwhelmed-to-productive-2f9c65c4792e 2. trainingindustry.com: https://trainingindustry.com/articles/strategy-alignment-and-planning/work-life-balance-detox-how-to-turn-overwhelm-into-productivity-and-purpose/ 3. ladybug-oboe-5ebh.squarespace.com: https://ladybug-oboe-5ebh.squarespace.com/videos/2019/9/13/how-to-get-out-of-overwhelm-and-into-action 4. heartwideopenwellness.com: https://www.heartwideopenwellness.com/blog/is-overwhelm-running-the-show-in-your-life 5. pioneerspost.com: https://www.pioneerspost.com/business-school/20200504/thought-the-week-you-can-transform-overwhelm-brilliance | No | "From X to Y" transformation title, numbered step lists (e.g. "six steps") |
| 21 | Self-mastery as antidote to distraction and regret | is self-mastery the antidote to distraction and regret | 1. oldpodcast.com: https://oldpodcast.com/podcast/optimal-living-daily-personal-development-and-self-improvement/episode/3754-how-to-disarm-internal-triggers-and-improve-focus-by-nir-eyal-of-nirandfar-on-self-mastery 2. experimental-prod.tunein.com: https://experimental-prod.tunein.com/podcasts/Psychology/Discipline-Over-Distraction-p4626263 3. psychologytoday.com: https://psychologytoday.com/za/blog/the-well-being-toolkit/202306/six-ways-to-loosen-the-grip-of-regret 4. music.amazon.in: https://music.amazon.in/podcasts/ba09edbb-1c84-4111-bcf3-f3a12510ff30/episodes/31f6dd3e-1181-4fca-8a8c-bab393e00c0e/new-mindset-who-dis-569---how-to-eliminate-distraction-and-win-life-w-nir-eyal 5. no.player.fm: https://no.player.fm/1BpMaRm | No | A named authority (Nir Eyal, "Indistractable") syndicated across podcast aggregators. Aggregator pages beat essays |
| 22 | Structure and flow in creativity | how do structure and flow work together in creativity | 1. emilyandtheplants.squarespace.com: https://emilyandtheplants.squarespace.com/blog/flow-and-structure-harnessing-their-synergy-for-creativity-productivity-amp-achievement 2. theladders.com: https://www.theladders.com/career-advice/creativity-doesnt-have-to-be-chaotic-and-structure-doesnt-have-to-be-boring 3. livingunscripted.podbean.com: https://livingunscripted.podbean.com/e/building-gentle-structures-that-support-your-creative-flow/ 4. inc.com: https://www.inc.com/nicolas-cole/why-creativity-doesnt-have-to-be-chaotic-and-structure-doesnt-have-to-be-boring.html 5. artbykalan.substack.com: https://artbykalan.substack.com/p/the-balance-between-organization | No | Both nouns ("structure" + "flow") in the title. One essay is syndicated on two high-authority domains (Inc + Ladders) |
| 23 | Decisions by feel instead of overthinking | how to make decisions by feel instead of overthinking | 1. payhip.com: https://payhip.com/EIforyou/blog/self-discovery-and-growth/how-to-make-hard-life-decisions-without-overthinking-everything 2. therapistaid.com: https://therapistaid.com/worksheets/overthinking-decisions 3. nrca.net: https://www.nrca.net/RoofingNews/how-can-you-stop-overthinking-and-start-trusting-your-intuition.3-22-2022.10360/details/story 4. govexec.com: https://www.govexec.com/management/2016/05/how-stop-overthinking-things-and-get-out-your-own-way/128134/?oref=ge-next-story 5. blog.noomii.com: https://blog.noomii.com/blog/how-men-can-stop-overthinking-make-confident-decisions | No | The keyword "overthinking" in the title, plus downloadable worksheets / practical exercises (TherapistAid) |
| 24 | Aliveness as a compass | how to use aliveness as a compass for your life (variant: aliveness as a compass infinite game) | 1. tap-app-api.adeq.arkansas.gov: https://tap-app-api.adeq.arkansas.gov/post/moments-of-aliveness-reflecting-on (spammy) 2. kunnas-com.pages.dev: https://kunnas-com.pages.dev/articles/i-feel-alive-when 3. share.transistor.fm: https://share.transistor.fm/s/f4bc43d6 4. osiander.de: https://www.osiander.de/shop/home/artikeldetails/A1079897923 5. books.apple.com: https://books.apple.com/si/book/aliveness/id6770570272 | No (also absent from the "infinite game" variant, which returned Sinek/Carse PDFs and summaries) | Oliver Burkeman's forthcoming book *Aliveness* takes over the term through retailer listings. Otherwise a weak field, with spam at #1 |
| 25 | Self-organization creating synergy in life | how does self-organization create synergy in life (variant: self-organization synergy personal life flow self-organizing) | 1. arxiv.org: https://arxiv.org/pdf/2503.03950 2. ncbi.nlm.nih.gov: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11908365/ 3. arxiv.org: https://arxiv.org/pdf/1804.01144 4. iopscience.iop.org: https://iopscience.iop.org/article/10.1088/2632-072X/ac7caf 5. cosmosandhistory.org: https://cosmosandhistory.org/index.php/journal/article/view/91/182 | No (also absent from the variant, which returned Art of Manliness on Covey and a Holaspirit Medium post) | Academic papers own the term. Personal-life versions win with a familiar framework (Covey's "Synergize") |
| 26 | What game of business to play | what game of business do you want to play choosing the kind of business you build | 1. dannymallinder.beehiiv.com: https://dannymallinder.beehiiv.com/p/most-people-never-choose-the-game-they-re-playing 2. dannymallinder.beehiiv.com: https://dannymallinder.beehiiv.com/p/dont-waste-2026-picking-wrong-business 3. medium.com: https://medium.com/small-business-handbook/what-kind-of-business-do-you-want-to-build-15d6e0f00fdb 4. bet.com: https://www.bet.com/article/2a4bxi/lifestyle-or-go-big-what-sort-of-business-should-i-build 5. jodiecook.com: https://www.jodiecook.com/4-business-games/ | No | A named taxonomy ("4 business games", lifestyle vs go-big) and a recurring essay series built on one theme. Finite/infinite framing appears in results, but not from Lane |
| 27 | What is an "alive business" | what is an alive business (variant: alive business aliveness entrepreneur build a business that feels alive) | 1. braneshop.github.io: https://braneshop.github.io/posts/Braneshop-A-Living-Business-Part-1 2. successful-blog.com: https://www.successful-blog.com/blog/page/65 3. magazine.wharton.upenn.edu: https://magazine.wharton.upenn.edu/tag/business-plan 4. oreilly.com: https://oreilly.com/library/view/all-services-all/9781631572777/03_McDavid_Chapter_02.xhtml 5. learn2reinvent.com: https://www.learn2reinvent.com/blog/what_makes_something_alive | No (also absent from the variant, which returned aliveness podcasts, Jack Craven's *Aliveness Mindset*, a "Business 3.0" playbook) | No standard definition exists, so a clear definitional page ("An alive business is...") could rank. Winners are "living business" metaphors and book chapters |
| 28 | What to align before starting a new project | what to align before starting a new project | 1. formstack.com: https://formstack.com/blog/successful-project-launch (plus 4 mirror subdomains, collapsed) 2. readtrustissues.substack.com: https://readtrustissues.substack.com/p/resolve-to-ask-better-questions 3. cmcrossroads.com: https://cmcrossroads.com/article/let-s-just-get-started-and-we-can-figure-out-details-later 4. oreilly.com: https://www.oreilly.com/library/view/mastering-microsoft-dynamics/9781119789321/c02.xhtml 5. projectmanagement.com: https://www.projectmanagement.com/discussion-topic/219849/when-starting-a-new-project--what-s-the-first-thing-you-focus-on-and-why-?pageNum=2 | No | Project-management frame (scope, stakeholders, success criteria) as a checklist. The query reads as corporate PM, not personal alignment |
| 29 | Meaning of "build the mill where the water flows" | what does "build the mill where the water flows" mean (variant: "build the mill where the water flows" business advice) | 1. engr.psu.edu: https://www.engr.psu.edu/MTAH/articles/pdf/geography_landscape_mills.pdf 2. bbb-old.lwn.net: https://bbb-old.lwn.net/abcd/8521663 3. openjurist.org: https://openjurist.org/law-dictionary/mill 4. oaa.on.ca: https://oaa.on.ca/Assets/Common/Shared_Documents/Documents/building-the-1810-mill-web.pdf 5. dictionary.wordup.com.tw: https://dictionary.wordup.com.tw/zh-TW/dictionary/watermill | No (also absent from the variant) | Nobody owns this phrase. Results are literal mill history and spam. A single page titled with the exact phrase and a plain definition would probably rank #1 and be the source AI answers cite |
| 30 | Personal sovereignty with leadership and support | how to balance personal sovereignty with leadership and support from others (variant: sovereignty and leadership being supported without losing yourself) | 1. celineleboeuf.substack.com: https://celineleboeuf.substack.com/p/whos-the-boss 2. wiki.p2pfoundation.net: https://wiki.p2pfoundation.net/Personal_Sovereignty 3. payhip.com: https://payhip.com/b/FPnNs 4. goodreads.com: https://www.goodreads.com/notes/29451560-the-power-of-the-other/10427914-susie-dfwsusie/aac3e2ef-5b90-4862-a0ad-5817f86eeaa6 5. nonprofitquarterly.org: https://nonprofitquarterly.org/wp-content/uploads/2021/06/2801_Suarez_Reprint.pdf | No (also absent from the variant, which returned "sovereign leader" coaching pages, podcasts, "sovereign but not separate" Substack) | A wiki-style definition (P2P Foundation) plus coaching brands built on the term "sovereign leadership" |

#### Tally (my own count, primary-query top-5 lists only, 75 slots)

Subdomains are grouped under their registrable domain (for example, every *.substack.com counts as substack.com).

| Domain | Appearances |
|---|---|
| substack.com (third-party writers, not Lane) | 9 |
| squarespace.com | 4 |
| beehiiv.com | 3 |
| medium.com | 3 |
| arxiv.org | 2 |
| goodreads.com | 2 |
| payhip.com | 2 |
| oreilly.com | 2 |
| 48 other domains | 1 each |
| **lanebelone.com** | **0** |
| **sidequesthq.co** | **0** |
| **infinitegameos.io** | **0** |
| **lanebelone.substack.com** | **0** |

Domains with 1 appearance each: mountmadonna.org, californiainsider.com, mudfish.net, murshidsam.org, ninety.io, elitebusinessmagazine.co.uk, briancollinson.ca, truist.com, libsyn.com, trainingindustry.com, heartwideopenwellness.com, pioneerspost.com, oldpodcast.com, tunein.com, psychologytoday.com, amazon.in, player.fm, theladders.com, podbean.com, inc.com, therapistaid.com, nrca.net, govexec.com, noomii.com, arkansas.gov, pages.dev, transistor.fm, osiander.de, apple.com, nih.gov, iop.org, cosmosandhistory.org, bet.com, jodiecook.com, github.io, successful-blog.com, upenn.edu, learn2reinvent.com, formstack.com, cmcrossroads.com, projectmanagement.com, psu.edu, lwn.net, openjurist.org, oaa.on.ca, wordup.com.tw, p2pfoundation.net, nonprofitquarterly.org.

Check: 9+4+3+3+2+2+2+2 = 27, plus 48 singles = 75.

Lane property appearances across all 15 primary queries and 6 variants: 0.

### 5.3 Leadership, AI, speaking and the veteran path (questions 31 to 46)


Date read: 2026-11-04. Tool: WebSearch (standard mode; extended used once for Q45b). Lane properties checked: lanebelone.com, sidequesthq.co, infinitegameos.io, lanebelone.substack.com. "Top 5" = first five links in the order the tool returned them.

| # | Question | Query | Top 5 results (domain: URL) | Lane property present? | What winners have |
|---|---|---|---|---|---|
| 31 | What is Humble Alpha leadership? | `What is Humble Alpha leadership?` | 1. smarthustle.com: https://smarthustle.com/humblealpha/ 2. podbean.com: https://podbean.com/site/EpisodeDownload/PB1116CA86Z7YT 3. podcastrex.com: https://podcastrex.com/shows/leadership-and-success-with-coach-bz/s5e56-video-live-with-sgt-steven-eugene-kuhn-usa-vet 4. podcastrex.com: https://podcastrex.com/shows/leadership-and-success-with-coach-bz/s5e56-live-with-sgt-steven-eugene-kuhn-usa-vet 5. goodreads.com: https://www.goodreads.com/topic/list_book/55202196 | No (none in 20 results). Lane named as co-author in the synthesized answer only. | Podcast episode pages titled with the exact term "Humble Alpha" and Kuhn's name; a term-definition page is missing from Lane's sites. |
| 32 | What is "Unleash Your Humble Alpha" about and who wrote it? | `Unleash Your Humble Alpha book what is it about who wrote it` | 1. goodreads.com: https://www.goodreads.com/work/editions/86061234-unleash-your-humble-alpha-own-your-presence-in-life-and-become-the-epic 2. audible.com.au: https://audible.com.au/pd/Unleash-Your-Humble-Alpha-Audiobook/B08P7Q2ZKQ 3. audible.de: https://apx-security-de.audible.de/pd/Unleash-Your-Humble-Alpha-Audiobook/B08P7R1B8J 4. audible.co.uk: https://www.audible.co.uk/pd/Unleash-Your-Humble-Alpha-Audiobook/B08P7R1B8J 5. audible.com.br: https://apx-security-br.audible.com.br/pd/Unleash-Your-Humble-Alpha-Audiobook/B08P7R5ZSC | No. Lane named in an Audible title (rank 5) and in answer ("Steven Eugene Kuhn with Lane Belone"). | Structured book metadata (author, publisher, year, narrator, ISBN) on retail and catalog pages; no Lane book page with Book schema. |
| 33 | Founders applying the infinite game beyond Simon Sinek | `how can founders apply the infinite game to business beyond Simon Sinek` | 1. smarta.substack.com: https://smarta.substack.com/p/smarta-business-book-review-the-infinite 2. medium.com: https://medium.com/sap-innovation-spotlight/business-mindset-8f2c5469c37a 3. youexec.com: https://youexec.com/book-summaries/the-infinite-game 4. apple.co: https://apple.co/2Mh68D1 5. sites.google.com: https://sites.google.com/view/journeysparkconsulting/what-we-think/book-reviews/the-infinite-game | No | Sinek-anchored book summaries and listicles ("five ways leaders..."); the query space is wide open for a non-Sinek founder playbook, but nothing beyond-Sinek ranks. |
| 34 | Leading a team through AI disruption when roles and identities change | `how to lead a team through AI disruption when roles and identities change` | 1. linkedin.com: https://pl.linkedin.com/in/paulina-tuduj 2. cogentinfo.com: https://cogentinfo.com/resources/leading-through-ai-disruption-how-to-empower-people-in-a-machine-augmented-world 3. primeast.com: https://primeast.com/insights/how-to-lead-through-ai-anxiety-without-losing-your-people/ 4. digiday.com: https://digiday.com/sponsored/managers-are-unprepared-to-lead-a-human-agent-hybrid-workforce 5. sessionize.com: https://sessionize.com/s/StephanieKeldani/the-identity-evolution-using-the-adaptability-form/174603/ | No | Consultancy "how to" pieces with cited stats (Mercer etc.) and explicit "identity" framing; speaker session pages on Sessionize also rank. |
| 35 | Personal AI OS with Claude Code and Obsidian | `how to build a personal AI operating system with Claude Code and Obsidian` | 1. noqta.tn: https://www.noqta.tn/en/blog/ai-second-brain-obsidian-claude-personal-os-2026 2. llm-wiki-6fu.pages.dev: https://llm-wiki-6fu.pages.dev/concepts/obsidian-claude-code-os/ 3. agenticpm.substack.com: https://agenticpm.substack.com/p/claude-code-obsidian-ai-second-brain 4. michaelcrist.substack.com: https://michaelcrist.substack.com/p/personal-ai-assistant?open=false 5. theneuron.ai: https://www.theneuron.ai/explainer-articles/how-to-turn-claude-code-into-your-personal-ai-assistant | No (none in 20) | Step-by-step tutorials: prerequisites, install commands, folder structure, CLAUDE.md examples, slash commands. Exact-match "Claude Code + Obsidian" titles. Substack posts rank well here. |
| 36 | Charter or constitution for a personal AI assistant | `how to write a charter or constitution for my personal AI assistant` | 1. allesgelingt.de: https://www.allesgelingt.de/p/ai-personal-assistant-setup-7wjg5 2. hogonext.com: https://hogonext.com/?p=592396 3. andyuniversity.pages.dev: https://andyuniversity.pages.dev/lessons/1/ 4. insertchat.com: https://insertchat.com/free-tools/personal-manifesto-generator 5. skillsmp.com: https://skillsmp.com/creators/validmind/atryum/agents-skills-populate-charter | No | Templates, generators, and skill files: downloadable/copyable artifacts with named sections. Field is thin and fragmented; no authoritative owner. |
| 37 | What is sovereign worldbuilding? | `what is sovereign worldbuilding` | 1. goodreads.com: https://www.goodreads.com/author_blog_posts/16968022-understanding-sovereignty 2. uvic.ca: https://www.uvic.ca/victoria-colloquium/assets/docs/ajurkevics_ch5_world-building-and-democracy.pdf 3. goonhammer.com: https://www.goonhammer.com/conquest-lore-companion-review 4. artofworldbuilding.podbean.com: https://artofworldbuilding.podbean.com/e/ep-141-how-to-create-sovereign-powers/ 5. audioscrape.com: https://www.audioscrape.com/podcast/the-art-of-world-building-creating-breakout-fantasy-and-science-fiction-worlds-in-stories-and-gaming/episode/ep-141-how-to-create-sovereign-powers-26400 | No | Engine reads it as fiction/game worldbuilding ("sovereign powers"). No page defines the term in Lane's sense; an unclaimed definitional query. |
| 38a | Keynote speaker on the infinite game | `keynote speaker on the infinite game` | 1. hcamag.com: https://www.hcamag.com/ca/news/general/how-can-hr-win-the-infinite-game/130344 2. cagspeakers.com: https://cagspeakers.com/?p=18173 3. csps-efpc.gc.ca: https://csps-efpc.gc.ca/events/leadership-series/embracing-mindset-2020-eng.aspx 4. getabstract.com: https://www.getabstract.com/en/summary/the-infinite-game/36788 5. getabstract.com: https://www.getabstract.com/ar/%D9%85%D9%84%D8%AE%D8%B5/the-infinite-game/36788 | No | Simon Sinek owns it via speaker-bureau listings, event recaps and conference pages. Third-party bureau and event pages, not personal sites. |
| 38b | (variant) | `infinite player keynote speaker purpose play leadership` | 1-5. getabstract.com: https://www.getabstract.com/pt/resumo/the-infinite-game/36788, /ru/..., /ar/..., /de/zusammenfassung/the-infinite-game/36788, https://www.getabstract.com/summary/36788 | No (none in 20). Brandi Heather (play keynote) surfaced in answer via espeakers. | "The Infinite Player" talk title is not indexed anywhere; Sinek summaries flood the term. Speaker-marketplace profiles (eSpeakers) carry play-keynote speakers. |
| 39 | Green Beret keynote speaker on purpose, play and leadership | `Green Beret keynote speaker purpose play and leadership` | 1. bigspeak.com: https://bigspeak.com/?p=36538 (Scott Mann) 2. hachettebookgroup.com: https://www.hachettebookgroup.com/contributor/scott-mann/ 3. bigspeak.com: https://www.bigspeak.com/speakers/jan-rutherford/ 4. bigspeak.com: https://www.bigspeak.com/speakers/larry-broughton/ 5. securitysales.com: https://www.securitysales.com/news/major_general_ret_james_champion_to_keynote_at_esx_2015/16685/ | No (none in 17) | Speaker-bureau profiles (BigSpeak, a-speakers, eSpeakers) and publisher contributor pages. Lane has no bureau listing; "Green Beret" + "keynote" co-occurrence lives on bureaus. |
| 40 | Leadership workshops on aliveness and play | `leadership workshops on aliveness and play` | 1. decitre.fr: https://www.decitre.fr/auteur/25408368/+mette+norgaard 2. changethroughplay.com: https://www.changethroughplay.com/sanfrancisco 3. sites.hampshire.edu: https://sites.hampshire.edu/ecg/?p=507 4. eventbrite.sg: https://www.eventbrite.sg/e/playful-leadership-sparking-a-joyful-learning-environment-tickets-1352169408099 5. psychologytoday.com: https://psychologytoday.com/au/blog/cutting-edge-leadership/201908/can-we-actually-develop-leadership-through-play | No (none in 17; Esalen/Mana retreat pages rank lower) | Dated event listings (Eventbrite, Esalen) and workshop landing pages with location, format, price. SQHQ workshop page does not surface. |
| 41 | Nature-based leadership retreat or activation | `nature-based leadership retreat or activation` | 1. nihi.com: https://nihi.com/?p=8295 2. haskayne.ucalgary.ca: https://haskayne.ucalgary.ca/future-students/executive/programs-individuals/wilderness-retreat 3. forestfix.ca: https://forestfix.ca/banff-retreat/ 4. synergos.org: https://synergos.org/node/1142 5. forestfix.ca: https://www.forestfix.ca/?p=17465 | No (none in 18) | Program pages with dates, duration, location, itinerary phases, price, PDF brochures. University exec-ed and resort brands. |
| 42 | New purpose after leaving Special Forces | `how to find new purpose after leaving Special Forces` | 1. jsou.edu: https://jsou.edu/Press/PublicationDashboard/259 2. taskandpurpose.com: https://taskandpurpose.com/news/i-found-meaning-after-the-military-in-many-places-not-just-one.md 3. taskandpurpose.com: https://taskandpurpose.com/news/i-found-meaning-after-the-military-in-many-places-not-just-one/ 4. news.clearancejobs.com: https://news.clearancejobs.com/?p=1152493 5. academy.echelonfront.com: https://academy.echelonfront.com/?p=138343 | No (none in 19) | Institutional research (JSOU), veteran-media first-person essays by named SOF vets, and known brands (Echelon Front). Personal SOF-veteran essays do rank when on a veteran publication. |
| 43 | Who am I after the military? | `who am I after the military veteran identity transition` | 1. veterans.columbia.edu: https://veterans.columbia.edu/content/transitioning-civilian-life 2. hira.hope.ac.uk: https://hira.hope.ac.uk/id/eprint/1788/ 3. pubmed.gov: https://www.pubmed.gov/38536371/ 4. pmc.ncbi.nlm.nih.gov: https://pmc.ncbi.nlm.nih.gov/articles/PMC10013545 5. citedrive.com: https://www.citedrive.com/en/discovery/moments-of-military-identity-change-a-qualitative-evidence-synthesis/ | No (none in 10) | Academic and university authority (.edu, PubMed, peer-reviewed). Personal essays appear only via thewarhorse.org (rank 8). |
| 44 | Everest Base Camp in September | `what is Everest Base Camp trek like in September` | 1. kimkim.com: https://www.kimkim.com/c/everest-base-camp-in-september-travel-tips-weather-and-more 2-5. ambitionhimalaya.com: /tag/nepal-trekking/, /tag/everest-base-camp-trek/, /?p=6592, /tag/everest-base-camp-trek-2026/ | No (none in 17) | Month-specific trekking-operator guides: weather by half-month, temperatures, crowds, Lukla flight buffers, cost. Commercial SEO saturation; a personal trip essay is unlikely to compete. |
| 45a | Free ebook "Your Infinite RPG" | `"Your Infinite RPG" free ebook design your life` | 1. david.sdm.qc.ca: https://david.sdm.qc.ca/book/60506234/infinity-rpg-quickstart.html 2. abresch.itch.io: https://abresch.itch.io/your-life 3. catalog.santafelibrary.org: https://catalog.santafelibrary.org/Hoopla/15813049 4. bookstore.uu.edu: https://bookstore.uu.edu/ebook/9781101875339 5. bookstore.escc.edu: https://bookstore.escc.edu/ebook/9781101875339 | No. Even the exact quoted title returns nothing of Lane's. | The title is not indexed at all. Winners are catalog/store pages for near-name products (Infinity RPG, Designing Your Life). |
| 45b | (variant, extended) | `Your Infinite RPG free ebook life as a role playing game` | 1. modiphius.us: https://modiphius.us/products/infinity-rpg-free-quickstart 2. tabletopbellhop.com: https://tabletopbellhop.com/tabletop-gaming-deals/free-rpgs-covid/ 3. en.wikipedia.org: https://en.wikipedia.org/wiki/Infinity_(role-playing_game) 4. en.wikipedia.org: https://en.wikipedia.org/wiki/Finite_and_Infinite_Games 5. human-sphere.com: https://www.human-sphere.com/Infinity_RPG | No (none in 9) | Product pages with "FREE" and "PDF" in the title; Wikipedia entity pages. A crawlable landing page for the ebook would likely win this exact-title query outright. |
| 46 | Design my life like an RPG character | `how to design my life like an RPG character` | 1. cosmopolitanmindset.substack.com: https://cosmopolitanmindset.substack.com/p/the-character-architect 2. medium.com: https://medium.com/illumination/why-i-started-treating-real-life-like-a-video-game-c973d053ca09 3. aevumos.substack.com: https://aevumos.substack.com/p/the-inner-game-map-pt-ii 4. yukaichou.com: https://yukaichou.com/lifestyle-gamification/lifestyle-gamification-concept/ 5. yukaichou.com: https://yukaichou.com/lifestyle-gamification/life-as-rpg-convert-life-into-game/ | No (none in 20) | Exact-phrase titles ("Design Your Future Self Like an RPG Character"), concrete stat lists, quest/boss mechanics, templates. Personal Substacks rank #1 and #3, so an essay can win here. |

#### Tally (my own count across 18 top-5 lists = 90 slots)

Lane properties: lanebelone.com 0, sidequesthq.co 0, infinitegameos.io 0, lanebelone.substack.com 0. No Lane property appeared anywhere in any full result list either.

| Domain | Appearances |
|---|---|
| getabstract.com | 7 |
| substack.com (other authors: smarta, agenticpm, michaelcrist, cosmopolitanmindset, aevumos) | 5 |
| ambitionhimalaya.com | 4 |
| audible.* (.com.au, .de, .co.uk, .com.br) | 4 |
| goodreads.com | 3 |
| bigspeak.com | 3 |
| podbean.com (incl. artofworldbuilding subdomain) | 2 |
| podcastrex.com | 2 |
| medium.com | 2 |
| taskandpurpose.com | 2 |
| forestfix.ca | 2 |
| yukaichou.com | 2 |
| en.wikipedia.org | 2 |
| pages.dev (llm-wiki-6fu, andyuniversity) | 2 |
| modiphius (.us 1, .net 0 in top 5) | 1 |
| All others (one each): smarthustle.com, youexec.com, apple.co, sites.google.com, linkedin.com, cogentinfo.com, primeast.com, digiday.com, sessionize.com, noqta.tn, theneuron.ai, allesgelingt.de, hogonext.com, insertchat.com, skillsmp.com, uvic.ca, goonhammer.com, audioscrape.com, hcamag.com, cagspeakers.com, csps-efpc.gc.ca, hachettebookgroup.com, securitysales.com, decitre.fr, changethroughplay.com, hampshire.edu, eventbrite.sg, psychologytoday.com, nihi.com, ucalgary.ca, synergos.org, jsou.edu, clearancejobs.com, echelonfront.com, columbia.edu, hope.ac.uk, pubmed.gov, nih.gov, citedrive.com, kimkim.com, sdm.qc.ca, itch.io, santafelibrary.org, uu.edu, escc.edu, tabletopbellhop.com, human-sphere.com | 1 each (47) |

Check: 7+5+4+4+3+3+2*8+1+47 = 90.

Notes:
- No result page addressed AI readers.
- Lane Belone's name appears only in third-party pages for Q31/Q32 (Audible title at rank 5 on Q32; synthesized answers credit him as co-author).

### 5.4 Life, essays and the offers (questions 47 to 60)


Date read: 2026-11-04. Tool: WebSearch (standard; one extended run on Q59). Ranks are the order the engine returned links. "Lane property" means lanebelone.com, sidequesthq.co, infinitegameos.io or lanebelone.substack.com unless noted. Other Lane-owned hosts found (Hugging Face dataset, SSRN paper, GitHub repo) are flagged separately.

| # | Question | Query | Top 5 results (domain: URL) | Lane property present? | What winners have |
|---|---|---|---|---|---|
| 47 | Is playing it safe in life just another kind of game? | A: `is playing it safe in life just another kind of game` / B: `playing it safe finite game infinite game life` | A: 1 chasejarvis.com: https://chasejarvis.com/blog/why-playing-it-safe-is-riskier-than-you-think · 2 chasejarvis.com: https://chasejarvis.com/?p=37038 · 3 chasejarvis.com: https://chasejarvis.com/wp-content/uploads/2024/08/NeverPlayItSafe_IntroChapter1.pdf · 4 goodreads.com: https://www.goodreads.com/author_blog_posts/7174291-how-playing-it-safe-keeps-you-from-finishing-strong · 5 exploringchatgpt.substack.com: https://exploringchatgpt.substack.com/p/playing-it-safe. B: 1 fs.blog: https://fs.blog/2020/02/finite-and-infinite-games-two-ways-to-play-the-game-of-life/ · 2 fs.blog: https://fs.blog/finite-and-infinite-games/ · 3 fs.blog: https://fs.blog/2020/02/finite-and-infinite-games/ · 4 deanyeong.com: https://deanyeong.com/book-notes/finite-and-infinite-games · 5 nnels.ca: https://nnels.ca/node/62116 | No (neither query) | A book ("Never Play It Safe") plus a blog cluster and free chapter PDF all using the exact phrase; fs.blog owns the Carse explainer with several URLs. |
| 48 | How do I manage several irons in the fire / multiple projects without burning out? | `how to manage multiple projects irons in the fire without burning out` | 1 morningmate.com: https://morningmate.com/blog/wp-json/wp/v2/posts/2094 · 2 usemotion.com: https://www.usemotion.com/blog/managing-multiple-projects · 3 agilitypr.com: https://www.agilitypr.com/?p=105223 · 4 agilitypr.com: https://www.agilitypr.com/pr-news/pr-skills-profession/how-to-keep-multiple-projects-on-track-without-burning-out-your-team/ · 5 oneproductivity.substack.com: https://oneproductivity.substack.com/p/how-to-balance-multiple-projects-3a3 | No | Listicle how-tos ("10 ideas", "9 proven tips") with the exact phrase "without burning out" in the title; SaaS vendors with content teams. |
| 49 | What is the Rainbow Warriors prophecy and the coming golden age? | `Rainbow Warriors prophecy coming golden age` | 1 en.wikipedia.org: https://en.wikipedia.org/wiki/Legend_of_the_Rainbow_Warriors · 2 authorlink.com: https://authorlink.com/bookreview/legend-of-the-rainbow-warriors-by-steve-mcfadden/ · 3 wikipedia.com: https://www.wikipedia.com/wiki/Legend_of_the_Rainbow_Warriors · 4 christianveg.org: https://www.christianveg.org/th-20160314-quotations.htm · 5 pressreader.com: https://www.pressreader.com/new-zealand/boating-nz/20190101/281560881893460 | No | Encyclopedic sourcing (origin in a 1962 tract, "fakelore" critique); a book review. Any Lane page here would need to address provenance or it reads as uncritical. |
| 50 | How can ancient wisdom be combined with modern technology? | `how can ancient wisdom be combined with modern technology` | 1 thinkers360.com: https://www.thinkers360.com/tl/blog/members/traditional-wisdom-meets-modern-tech-a-harmonious-dance-for-sustainable-living · 2 skool.com: https://www.skool.com/ayurveda-ambassador-network-2524/technology-with-wisdom-the-future-of-preventive-healthcare · 3 chat.skool.com: https://chat.skool.com/ayurveda-ambassador-network-2524/technology-with-wisdom-the-future-of-preventive-healthcare · 4 growingupwu.substack.com: https://growingupwu.substack.com/p/first-things-first · 5 youngscientistindia.org: https://youngscientistindia.org/kBase/kbarticles/2026/02-26 Ancient Wisdom to Modern Tech.pdf | No | Titles that restate the question ("Traditional wisdom meets modern tech"); concrete domain examples (Ayurveda + health tech, Wootz steel, ML meditation apps). |
| 51 | What would a joyful, sovereign society look like? | A: `what would a joyful sovereign society look like` / B: `joyful sovereignty society` | A: 1 thirst.sg: https://thirst.sg/?p=102349 · 2 thirst.sg: https://thirst.sg/what-does-the-ideal-society-look-like/ · 3 podcast.show: https://podcast.show/against-the-mountains-of/episode/148835961 · 4 medium.com: https://medium.com/new-destiny-or-technocracy-you-decide/pyramid-consciousness-part-3-the-evolutionary-society-ee467bdf03ce · 5 hi.atlassociety.org: https://hi.atlassociety.org/post/freedom-and-virtue-in-the-good-society. B: 1 pdf.sermonaudio.com: https://pdf.sermonaudio.com/media/101217654530/101217654530.pdf · 2 wol.pr418.com: https://wol.pr418.com/en/wol/dsim/r1/lp-e/1961362 · 3 wol.jw.org: https://wol.jw.org/en/wol/d/r1/lp-e/1961362 · 4 wol.jw.org: https://wol.jw.org/en/wol/d/r1/lp-e/1996041 · 5 docs.google.com: https://docs.google.com/document/d/1y37eb8-Zxbsd5hcKyTcI11g-p9d0cZziR87TJjSb9RU/export?format=pdf | No (even "joyful sovereignty" returns theology about God's sovereignty; Lane's /joyful-sovereignty page absent) | "Sovereignty" is owned by theological content (God's sovereignty) and libertarian "good society" essays. The term collides with religious usage; Lane's coinage has no definitional page ranking for it. |
| 52 | How do I find my life's flow gently instead of forcing it? | `how to find your flow in life gently instead of forcing it` | 1 celinebyford.substack.com: https://celinebyford.substack.com/p/where-are-you-flowing-vs-forcing · 2 buzzsprout.com: https://www.buzzsprout.com/2244292/episodes/18122662-ep-22-flow-not-force-the-psychology-of-creative-energy-deliberate-living · 3 thesundaysoother.substack.com: https://thesundaysoother.substack.com/p/how-to-stop-forcing-your-life · 4 elevatesociety.com: https://elevatesociety.com/master-life-by-flowing-not · 5 vocal.media: https://vocal.media/motivation/the-art-of-not-forcing-embracing-flow-and-ease-in-life | No | "Flow vs force" as an explicit title frame; personal Substacks win here, so the format is reachable for Lane if a post uses that phrasing. |
| 53 | What are side quests for adults and how do I start one? | A: `what are side quests for adults and how do I start one` / B: `side quests for adults workshop find what is alive` | A: 1 theeverygirl.com: https://theeverygirl.com/?p=590628 · 2 theeverygirl.com: https://theeverygirl.com/side-quest-tiktok-trend/ · 3 stealth-edit-watch.timcieplowski.com: https://stealth-edit-watch.timcieplowski.com/articles/5744 · 4 npr.org: https://www.npr.org/transcripts/nx-s1-5914851 · 5 stlpr.org: https://www.stlpr.org/npr/2026-08-19/feeling-restless-level-up-your-life-by-starting-a-side-quest. B: 1 npr.org: https://www.npr.org/transcripts/nx-s1-5914851 · 2 sites.google.com: https://sites.google.com/view/folklandrp/side-quests/class-side-quests/artificer-side-quests · 3 npr.org: https://www.npr.org/transcripts/nx-s1-5910878 · 4 falmouth.ac.uk: https://www.falmouth.ac.uk/arts-centre/whats-on/vote-sonic-circle-july-2026 · 5 dyinglight.wiki.gg: https://dyinglight.wiki.gg/wiki/Category:Dying_Light_2_Stay_Human_Side_Quests | No (sidequesthq.co absent from both) | NPR Life Kit (Aug 2026) syndicated across 8+ public radio sites, with a named expert, numbered steps, an acronym checklist and example lists. TikTok-trend lifestyle coverage. The term "side quest" is now mainstream and crowded. |
| 54 | What is a one-hour exercise to find what is alive in me and make something real? | `one hour exercise to find what is alive in me and make something real` | 1 seal.matrade.gov.my: https://seal.matrade.gov.my/neuaxis-e/Record/EBC6419187/TOC · 2 grandavehousing.calpoly.edu: https://grandavehousing.calpoly.edu/news/found-your-way-a-1 · 3 london.srmd.org: https://london.srmd.org/?p=3224 · 4 srmd.org: https://www.srmd.org/de/wisdom/articles/pujya-gurudevshri/meditation-and-introspection/wake-up-to-life · 5 srmd.org: https://www.srmd.org/?p=3224 | No ("One Alive Thing" not surfaced) | Results are weak and largely spam or off-topic (repurposed .edu/.gov hosts). Thin field: a clearly titled "1-hour exercise" page with steps could win easily. |
| 55 | What does it mean that "the average is out there, you aren't"? | `"the average is out there, you aren't" meaning` | 1 raccoon.bearblog.dev: https://raccoon.bearblog.dev/fear-of-being-average/ · 2 sgsabel.substack.com: https://sgsabel.substack.com/p/average-does-not-exist · 3 legacy.joecoffeecompany.com: https://legacy.joecoffeecompany.com/alert/is-being-average-really-the-same-as-being-mean · 4 reseller.thesagenext.com: https://reseller.thesagenext.com/chapter/what-does-it-really-mean-to-be-average · 5 legacy.joecoffeecompany.com: https://legacy.joecoffeecompany.com/alert/what-average-really-means-a-surprising-reality-check | No (exact phrase not indexed anywhere) | Nothing owns the phrase. Winners are generic "being average" essays and spam. If Lane coined it, a page with the phrase as title would likely own it. |
| 56 | How do I know what is seeking me / follow what is calling me? | A: `how do I know what is seeking me follow what is calling me` / B: `"what is seeking you" calling purpose` | A: 1 tech.medicalmissions.com: https://tech.medicalmissions.com/events/gmhc-2020-25th-anniversary/sessions/finding-gods-will-and-guidance · 2 ourdailybread.org: https://ourdailybread.org/2019/01/28/how-to-hear-gods-calling-on-your-life/ · 3 christianquestions.com: https://christianquestions.com/?p=25604 · 4 angelisivaraman.substack.com: https://angelisivaraman.substack.com/p/how-to-know-its-time-to-follow-a · 5 midsouthchristian.edu: https://www.midsouthchristian.edu/_files/ugd/20f14a_c9cc4db884e34451ba0da0888682542c.pdf. B: 1 jackmoses.substack.com: https://jackmoses.substack.com/p/connect-to-your-calling · 2 greatist.com: https://www.greatist.com/happiness/what-you-seek-is-seeking-you · 3 buzzsprout.com: https://buzzsprout.com/2229611/14461837-episode-2-let-your-calling-find-you · 4 grove.org: https://grove.org/sermons/the-search-for-significance · 5 clover-lobster-krf2.squarespace.com: https://clover-lobster-krf2.squarespace.com/news/findingpurpose | No | "Calling" is dominated by Christian discernment content; the secular angle is won by quote-explainer pages (Rumi attribution "what you seek is seeking you"). |
| 57 | What is the quiet for? (stillness and creative rest) | `what is the quiet for stillness creative rest` | 1 renawillis.substack.com: https://renawillis.substack.com/p/kind-words-mindset-tip-5 · 2 andreamanor.beehiiv.com: https://andreamanor.beehiiv.com/p/rhythms-of-rest-sabbath-rest-inspires-creativity · 3 ontheacre.substack.com: https://ontheacre.substack.com/p/being-still · 4 tikvah.org: https://tikvah.org/?p=10359 · 5 heartleap.substack.com: https://heartleap.substack.com/p/the-trouble-with-rest | No | Personal newsletters (Substack, beehiiv) win, with a concrete practice (five-minute sit) and a science hook (default mode network). Format well within Lane's reach. |
| 58 | How do I play the infinite game with my partner or relationships ("the dance we're all in")? | A: `how to play the infinite game in relationships with your partner` / B: `infinite game relationships "the dance we're all in"` | A: 1 goodmenproject.com: https://goodmenproject.com/?p=1003782 · 2 fynn.substack.com: https://fynn.substack.com/p/high-stakes-collaboration · 3 hsdinstitute.org: https://hsdinstitute.org/resources/relationships-finite-or-infinite-games-blog.html · 4 realtrends.com: https://www.realtrends.com/relationships-vs-transactions-what-game-are-you-in/ · 5 cs.grinnell.edu: https://cs.grinnell.edu/91393471/qpromptt/ggotoj/yawards/The+Infinite+Game.pdf. B: 1 dadigerolamo.substack.com: https://dadigerolamo.substack.com/p/the-infinite-game-of-human-relations · 2 realtrends.com: https://www.realtrends.com/relationships-vs-transactions-what-game-are-you-in/ · 3 justsovague.substack.com: https://justsovague.substack.com/p/all-human-relationships-explained · 4 alearningaday.blog: https://alearningaday.blog/2013/02/24/on-the-infinite-game/ · 5 the-letters.beehiiv.com: https://the-letters.beehiiv.com/p/life-is-a-game-you-re-probably-just-playing-it-wrong | No (exact phrase not indexed) | Titles pairing "relationships" with "finite or infinite games"; Carse/Sinek citations. Few results offer couples-level practice, so a practical Lane page has an opening. |
| 59 | Where can I learn the infinite game as an operating system for life (infinite game OS)? | A: `infinite game operating system for life infinite game OS` (standard) / B: `where can I learn the infinite game as an operating system for life` (extended) / C: `Infinite Game OS course learn` | A: 1 huggingface.co: https://huggingface.co/datasets/lanebelone/infinite-game-os · 2 dev.to: https://dev.to/max_f2ab6697eb4060d4bc660/infinity-os-the-future-in-your-browser-a-complete-guide-for-beginners-9pj · 3 microsoft.com: https://www.microsoft.com/en-us/research/wp-json/wp/v2/msr-research-item/360200 · 4 cdn.auckland.ac.nz: https://cdn.auckland.ac.nz/assets/press/all-books/pdfs/2018/Infinite-Game_websample.pdf · 5 medium.com: https://medium.com/the-shore-of-my-ignorance/how-to-play-the-infinite-game-part-1-810e2153ab15. B: 1 papers.ssrn.com: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6810541 · 2 github.com: https://github.com/infinitegameplayer/infinitegameos · 3 lanebelone.substack.com: https://lanebelone.substack.com/p/the-infinite-game-is-already-in-progress · 4 erickgodsey.substack.com: https://erickgodsey.substack.com/p/the-infinite-game-os · 5 infinitegameos.io: https://www.infinitegameos.io/infinite-game (also #6 sidequesthq.co: https://www.sidequesthq.co/ and #8 lanebelone.com: https://www.lanebelone.com/blog/f/the-infinite-game-is-already-in-progress). C: 1 en.wikipedia.org: https://en.wikipedia.org/wiki/The_Infinite_Game · 2 drexel.edu: https://drexel.edu/pennoni/academics/the-symposium/theme-23-24 · 3 cs.grinnell.edu: https://cs.grinnell.edu/91393471/qpromptt/ggotoj/yawards/The+Infinite+Game.pdf · 4 autry.cs.grinnell.edu: https://autry.cs.grinnell.edu/@55795676/seditw/kroundz/uurle/The+Infinite+Game.pdf · 5 autry.cs.grinnell.edu: https://autry.cs.grinnell.edu/_63462524/vsmashi/eresembleu/ldlm/The+Infinite+Game.pdf | A: no core domain; Lane's Hugging Face dataset at #1. B (extended): YES. lanebelone.substack.com #3, infinitegameos.io #5; sidequesthq.co #6, lanebelone.com #8 (outside top 5); Lane SSRN paper #1 and Lane GitHub repo #2. C: No. | Lane wins when the query is near-branded and the search is extended, mostly through third-party hosts (SSRN, GitHub, Hugging Face) and not his own domains. Competitor Erick Godsey uses the same "Infinite Game OS" label on Substack and his site. A "course"-intent query returns Carse/Sinek and Wikipedia, with no Lane page. |
| 60 | Who teaches gamifying life for leaders and founders? | A: `who teaches gamifying life for leaders and founders` / B: `gamify your life coach for founders and executives infinite game` | A: 1 jasongoldberg.teachable.com: https://jasongoldberg.teachable.com/courses/809973 · 2 execed.fct.unl.pt: https://execed.fct.unl.pt/en/?p=5499 · 3 aventislearning.com: https://aventislearning.com/?p=679456 · 4 theleadershipeducator.podbean.com: https://theleadershipeducator.podbean.com/e/unlocking-leadership-through-gamification-with-dr-joe-lassley · 5 buzzsprout.com: https://www.buzzsprout.com/126971/episodes/17495833. B: 1 entrepreneur.com: https://www.entrepreneur.com/growing-a-business/gamify-your-life-and-become-massively-successful/329405 · 2 remindermedia.com: https://remindermedia.com/podcast/ep-225-eric-siu-how-to-constantly-level-up · 3 netgalley.co.uk: https://netgalley.co.uk/catalog/book/194309 · 4 buzzsprout.com: https://www.buzzsprout.com/2031091/episodes/16843255-e53-yu-kai-chou-and-mark-diaz-how-to-gamify-your-life-in-six-steps · 5 dolphin-cornet-62mz.squarespace.com: https://dolphin-cornet-62mz.squarespace.com/blog/client-gamification-strategies-the-ultimate-2025-guide-for-coaches | No | Named offers with a person attached (course pages, exec-ed programs), podcast guest appearances (Yu-Kai Chou, Eric Siu), books. Winners are people found through course pages and podcast show notes. |

#### Tally (my own count)

Basis: 22 top-5 lists (14 primary queries plus 8 variants: 47B, 51B, 53B, 56B, 58B, 59B, 59C, 60B), so 110 result slots. Each URL slot counts once; duplicate URLs within a list each count.

**Lane properties (core four domains), top-5 appearances:**
- lanebelone.com: 0 (one appearance at rank 8, Q59B)
- sidequesthq.co: 0 (one appearance at rank 6, Q59B)
- infinitegameos.io: 1 (Q59B, rank 5)
- lanebelone.substack.com: 1 (Q59B, rank 3)
- **Total core-four in top 5: 2 of 110 slots, both from one extended near-branded query (Q59B).**

**Other Lane-owned hosts, top-5 appearances:**
- huggingface.co/datasets/lanebelone: 1 (Q59A, rank 1)
- papers.ssrn.com (Lane paper): 1 (Q59B, rank 1)
- github.com/infinitegameplayer: 1 (Q59B, rank 2)

**Most frequent other domains (top-5 slots):**
- *.substack.com (all non-Lane subdomains combined): 15 (plus 1 Lane = 16 substack.com total)
- grinnell.edu (cs. + autry. + johnsonba. spam PDFs): 4
- buzzsprout.com: 4
- chasejarvis.com: 3
- fs.blog: 3
- npr.org: 3 (plus stlpr.org 1, a syndicated copy of the same NPR piece)
- srmd.org (incl. london.): 3
- wol.jw.org + wol.pr418.com (Watchtower mirror): 3
- thirst.sg: 2; theeverygirl.com: 2; agilitypr.com: 2; legacy.joecoffeecompany.com: 2; realtrends.com: 2; medium.com: 2; skool.com (incl. chat.): 2; wikipedia (en.wikipedia.org 2, wikipedia.com 1): 3
- Every other domain: 1

Questions where any core Lane domain made the top 5: 1 of 14 (Q59, extended variant only).

---

## 6. Part B: name searches, entity footprint and assistant evidence


Date read: 2026-11-04. Tools: WebSearch (standard, then extended where thin), WebFetch (GET). Raw `<head>` tags and link/sameAs lists for the four home pages were read with a plain `curl` GET, because WebFetch's markdown conversion removes `<title>` and `<meta>`. I made no contact, submitted no forms and logged in nowhere.

**Method caveat.** The WebSearch tool is its own index. It is not Google. "Top 10" means the first 10 links the tool returned, in order. Bing and DuckDuckGo were fetched directly (Part 3). Perplexity blocked the fetch.

---

### Part 1: Name searches (standard mode)

Key: **Y** = about this Lane Belone. **N** = a different person or thing.

#### Q1 "Lane Belone": 0 of 10 about him
| # | URL | Domain | What it is | About him? |
|---|---|---|---|---|
| 1 | kfda.be/en/venues/la-bellone | kfda.be | La Bellone arts centre, Brussels | N |
| 2 | fishes-fnam.linnaeus.naturalis.nl/...term.php?id=35546 | naturalis.nl | Garfish glossary (*Belone*) | N |
| 3 | fishipedia.fr/.../belone-belone | fishipedia.fr | Garfish *Belone belone* | N |
| 4 | livetheworld.com/.../la-bellone | livetheworld.com | La Bellone, Brussels | N |
| 5 | fishes-fnam.linnaeus.naturalis.nl/...id=36380 | naturalis.nl | Fish species | N |
| 6 | agrovoc.fao.org/.../c_41359 | fao.org | FAO thesaurus entry (garfish) | N |
| 7 | researcharchive.calacademy.org/...spid=31505 | calacademy.org | Fish catalog | N |
| 8 | agrovoc.fao.org/.../c_41359 (es) | fao.org | FAO thesaurus | N |
| 9 | researcharchive.calacademy.org/...spid=31385 | calacademy.org | Fish catalog | N |
| 10 | acikerisim.balikesir.edu.tr/... | balikesir.edu.tr | Copepod parasite paper | N |

Tool summary: "returned no information about a person by that name". It suggested La Bellone and Leone Lane as near-matches. This is a spelling-suggestion effect: the index treats "Belone" as the fish genus.

#### Q2 "who is Lane Belone": 0 of 10
The same 10 results as Q1, in the same order (kfda.be, naturalis.nl x2, fishipedia.fr, livetheworld.com, fao.org x2, calacademy.org x2, balikesir.edu.tr). Tool: "Lane Belone may be a private individual."

#### Q3 "Lane Belone Green Beret": 4 of 10
| # | URL | Domain | What it says | About him? |
|---|---|---|---|---|
| 1 | audible.com/author/Lane-Belone/B08GJB5FFJ | audible.com | Author bio: SF (Green Beret) veteran, 40 countries, co-author with Steven Kuhn | Y |
| 2 | audible.ca/author/Lane-Belone/B08GJB5FFJ | audible.ca | Same bio | Y |
| 3 | apx-security-ca.audible.ca/author/... | audible.ca | Same bio (staging mirror) | Y |
| 4 | apx-security-es.audible.es/author/... | audible.es | Same bio (mirror) | Y |
| 5 | cavac.at/cavacopedia/United_States_Army_Special_Forces | cavac.at | Generic SF article | N |
| 6 | ipfs.aleph.im/.../Green_beret.html | aleph.im | Wikipedia mirror | N |
| 7 | my-test.valpo.edu/whats-a-green-beret | valpo.edu | Generic | N |
| 8 | rallypoint.com/answers/... | rallypoint.com | Generic | N |
| 9 | wwwprod.nelson-atkins.org/.../green-beret.html | nelson-atkins.org | Spam/generic | N |
| 10 | ipfs.ssi.eecc.de/.../Green_beret | eecc.de | Wikipedia mirror | N |

#### Q4 "Lane Belone Humble Alpha": 0 of 10
redfin.com x5 (Humble, TX rentals), furnishedfinder.com, communityimpact.com (Humble TX retail), mountainproject.com ("Humble Pi"), vainglorygame.com x2. None about him. The engine read "Humble" as Humble, Texas.

#### Q5 "Lane Belone speaker": 0 of 10
en.wikipedia.org/wiki/Lane_Sutton (a different speaker), en.wikipedia.org/wiki/Belon_(disambiguation), laney.co.uk, en.wikipedia.com (Loudspeaker sandbox), desertcart.lk, androidauthority.com, betterlivingthroughdesign.com, bespokepost.com, werd.com, allamericanspeakers.com (Lane 8). All are loudspeakers or other people named Lane.

#### Q6 "Lane Belone author": 0 of 10
librarything.fr (Belden C. Lane), librarything.es and librarything.fr (Lane Stone), abebooks.co.uk (L. Lane Bailey), goodreads.com (L. Lane Bailey), fantasticfiction.com (Joel Lane), mcsweeneys.net (Laura Lane), revistasdeideias.net, abebooks.com (Lane Thomas), lecturalia.com. These are all other authors named Lane. His Goodreads author page (ID 20651883) did not surface.

#### Q7 "Lane Belone Infinite Game": 1 of 10
| # | URL | Domain | About him? |
|---|---|---|---|
| 1 | en.wikipedia.org/wiki/The_Infinite_Game | wikipedia.org | N (Sinek book) |
| 2 | lanebelone.substack.com | substack.com | **Y**. Snippet: "Exploring sovereignty, thought leadership, and the infinite game" (an older tagline) |
| 3 to 10 | alibri.es, randomhousebooks.com, cs.grinnell.edu x2, deslegte.com, autry.cs.grinnell.edu x3 | various | N (Sinek book and spam PDFs) |

Simon Sinek's *The Infinite Game* takes almost all of this query.

#### Q8 "Steven Kuhn Lane Belone": 0 of 10
patentleaderboard.com x3 (Steven L. Kuhn, inventor; Steven Lane, Belkin), marketscreener.com x2 (Steve Kuhn, CIO), wiki.riteme.site (*Belone* genus), european-marine-life.org, wiki.krisyotam.com, village.ai (Stephen Kuhn), naturalis.nl. These are name collisions for Steve/Steven/Stephen Kuhn.

#### Q9 "Unleash Your Humble Alpha": 2 of 10
| # | URL | Domain | About him? |
|---|---|---|---|
| 1 | goodreads.com/topic/list_book/55202196 | goodreads.com | Y (book discussion page; the tool summary credited only Kuhn) |
| 2 | smarthustle.com/humblealpha/ | smarthustle.com | Y-adjacent: Steven Kuhn interview about Humble Alpha. Belone is not named in the snippet |
| 3 to 10 | services.flexco.com x2, salt-django.crmcloud.infor.com, goodreads.com (*Unleash Your Alpha*, a different book), uk.ereaderiq.com, vc-classroom.dbuniversity.ac.in, podiumentertainment.com, brinewave.gumroad.com | various | N |

The tool's summary named Kuhn alone as the author. This attribution gap matters (see Part 3).

#### Q10 to Q15: misspellings, 0 relevant in every list
| Query | Top-10 domains | Collisions or suggestions | Relevant? |
|---|---|---|---|
| "Lane Bellone" | wikipedia.org x2 (Lane given name, Bellony), liuathletics.com (Lauren Bellone), cavac.at, eecc.de, wiki.gg (Bernardo Bellone, Arknights), rockit.it x2 (Manuel Bellone), 4everland.io (Leone Lane), discard.no (Lake Bell) | Bellone surname: Lauren, Bruno, Manuel, Francesco Bellone. No "Lane Bellone" exists | None |
| "Lane Balone" | wikipedia.org x2, laneboots.com ("Lane Balm"), weblio.jp, riteme.site, britannica.com, merriam-webster.com x2, cavac.at, malonepioneers.com | Corrected toward "Lane Balm" and "Lane" | None |
| "Lane Belloni" | bnf.fr (Lanfranco Belloni), wikipedia.org x2, milanofinanza.it x2, electrive.com, encycloreader.org, finanzaonline.com, soldionline.it, lespresso.it | Arnaud, Elisabetta, Alessandra and Matthew Belloni | None |
| "Lane Belonie" | wikipedia.org x2, bnf.fr (Lucas Belonie, filmmaker), rtbf.be, tlcmap.org, cavac.at x2, dbpedia.org, highresaudio.com, yorkshireeveningpost.co.uk | Lucas Belonie | None |
| "Lane Beloney" | wikipedia.org x2, wikipedia.com, cavac.at x2, tlcmap.org, allmusic.com (Lane Brody), dbpedia.org, eecc.de, freedombox.rocks | Lane Brody, Lani Belcher | None |
| "Lane Bologna" | trip.com x2, eventworld.co (Matteo Lane in Bologna), wikipedia.org x2, busbud.com x2, emirates.com, expedia.com, 4everland.io | Matteo Lane, David Bologna | None (unrelated) |

#### Q16 "Lane Belone Substack": 0 of 10
reletter.com x2 ("Lane's Substack"), eden.so, en.wikipedia.org/wiki/Substack, lanewelch.substack.com, robertlane.substack.com, porchtn.org, bloggingguide.com, theconversation.edu.au, t2online.in. The tool pointed to Lane Filler, Lane Scott Jones and Lane Riordan instead. **His own Substack did not rank for "Lane Belone Substack"** (it did rank #2 for Q7).

#### Q17 "Side Quest HQ Lane": 0 of 10
consolegameswiki.com x5 (FFXIV side quests), gamebanshee.com, gamerguides.com, silenthillmemories.net, maxroll.gg, memory-alpha.fandom.com. "Side Quest" is fully taken by gaming content. sidequesthq.co did not appear.

#### Contrast: extended mode, "Lane Belone": 9 of 9 about him
| # | URL | What it says |
|---|---|---|
| 1 | straightouttacombat.podbean.com/e/socrs069-lane-belone-ignite-your-authentic-alpha/ | 2019-02-28 podcast. Served 2005 to 2017, mostly Green Beret. Iraq twice, N. Africa, Europe. Grew up in Oklahoma |
| 2 | imdb.com/name/nm12689887/ | IMDb name page (fetch got 403) |
| 3 | linkedin.com/in/lanebelone/ | "Colorado Springs, Colorado, United States" (fetch got 999) |
| 4 | facebook.com/increasefreedom/ | "Lane Belone" page, Increase Freedom brand |
| 5 | **lanebelone.vercel.app/** | Vercel preview host indexed as a separate result (canonical tag points to www.lanebelone.com) |
| 6 | lanebelone.com/about | About page |
| 7 | lanebelone.com/ | Home |
| 8 | iffassociation.org/podcast/34-from-green-beret-to-building-the-future-of-the-internet-lane-belone | Ep. #34 "Mar 6" (no year). "Systems architect and strategic advisor, co-founder of AsrayaOS" |
| 9 | sidequesthq.co/about | About |

Standard-mode searching (the cheap default, comparable to a quick assistant lookup) almost never finds him. Extended mode finds him well, and his own properties lead.

#### Spelling-suggestion behavior
- The tool never shows a literal "did you mean". In practice the standard index rewrites or loosens "Belone" toward *Belone belone* (garfish), "La Bellone" (Brussels) and "Leone Lane".
- Bing (fetched directly) with `q=Lane Belone` and with `q="Lane Belone"` returned only "Lane" brands and dictionaries (Lane Bryant, Merriam-Webster, Lane Boots, Lane Furniture). It showed no suggestion and no knowledge panel. This may be a degraded bot-served result.
- Name collisions found: Belone Moreira (Portuguese handball player, Wikipedia), Lucas Belonie (filmmaker, BnF), and the Bellone and Belloni surname families. **No other person named "Lane Belone" was found.** He is the only one in every source seen.

---

### Domain tally (own count)

Scope: the 17 standard-mode name searches x 10 = **170 result slots**. Domains are counted at registrable level, so www and subdomains are folded in. wikipedia.com is counted separately from wikipedia.org.

| Rank | Domain | Count | Any about him? |
|---|---|---|---|
| 1 | wikipedia.org | 16 | 0 |
| 2 | cavac.at | 7 | 0 |
| 3 | redfin.com | 5 | 0 |
| 3 | naturalis.nl | 5 | 0 |
| 3 | grinnell.edu | 5 | 0 |
| 3 | consolegameswiki.com | 5 | 0 |
| 7 | fao.org | 4 | 0 |
| 7 | calacademy.org | 4 | 0 |
| 7 | audible (.com 1 + .ca 2 + .es 1) | 4 | **4** |
| 10 | substack.com | 3 | **1** (lanebelone.substack.com) |
| 10 | goodreads.com | 3 | **1** (book discussion) |
| 10 | patentleaderboard.com | 3 | 0 |
| 10 | eecc.de | 3 | 0 |
| 14 | 2 each: wikipedia.com, vainglorygame.com, trip.com, tlcmap.org, rockit.it, riteme.site, reletter.com, milanofinanza.it, merriam-webster.com, marketscreener.com, livetheworld.com, librarything.fr, kfda.be, flexco.com, fishipedia.fr, dbpedia.org, busbud.com, bnf.fr, balikesir.edu.tr, 4everland.io | 2 | 0 |
| n/a | 63 further domains with 1 each (smarthustle.com counts as Kuhn-adjacent) | 63 | 1 adjacent |

**Totals.** 170 slots. 6 slots are about him or his book (4 Audible, 1 Substack, 1 Goodreads), which is 3.5%. With smarthustle.com it is 7 (4.1%). **His own domains (lanebelone.com, sidequesthq.co, infinitegameos.io) appear in 0 of 170 standard slots.** lanebelone.substack.com appears once. In the single extended "Lane Belone" search, 9 of 9 results are about him: 3 on lanebelone.com or its vercel.app copy, 1 on sidequesthq.co and 5 third-party.

---

### Part 2: Entity footprint

| Asset | Status | Details | Source |
|---|---|---|---|
| Wikipedia | **None** | en.wikipedia.org/wiki/Lane_Belone returns 404 | WebFetch |
| Wikidata | **Exists: Q139889543** | "American author, speaker and US Army Special Forces veteran". Occupation: writer (ref: Goodreads), entrepreneur (ref: SDVoyager 2020-05-25). Educated at FSU-Panama, FSU and Fayetteville Tech CC, **all with 0 references**. Military branch US Army SF (refs: AP 2024-12-31 "by Brittany Peterson", Screw the Commute ep. 183, 2019-09-23). Notable works: Unleash Your Humble Alpha (Q139889598), Infinite Game OS (Q139936059), "The Infinite Game OS. A Framework for Sovereign Creator Practice in the AI Era" (Q140235934). IDs: GitHub, Goodreads 20651883, IMDb nm12689887, LinkedIn, ORCID. Last edited 2026-06-24. Also Q141592738 (sameAs on sidequesthq.co) | https://www.wikidata.org/wiki/Q139889543 |
| Amazon book | Exists | Paperback ISBN-10 173525472X, ISBN-13 9781735254722. **Amazon lists the authors as "Kuhn, Steven Eugene; Belone, Lane; Lynch, Ron"**. Kindle B08G38HK3Z. Series page B08P2CF56K. Audible edition B08P7PYY74 | https://www.amazon.com/Unleash-Your-Humble-Alpha-Presence/dp/173525472X |
| Book metadata | Consistent | Publisher QOL Enterprises, LLC. Paperback 2020-08-23 (Amazon, World of Books, eBay). 204 pages. Foreword by Ron Lynch | https://books.google.com/books/about/Unleash_Your_Humble_Alpha.html?id=5fOyzQEACAAJ ; search snippets from amazon.co.uk and worldofbooks.com |
| Google Books | Exists | Lists the authors as **"Lane Belone, Steven Kuhn"** (Belone first). Contributor Ron Lynch. Qol Enterprises, 2020, 204 pp. | same as above |
| Audiobook | Exists | Narrator James Olivas. 5 h 43 m. Audible release 2020-11-30. Apple Books lists Nov 10, 2020 | https://www.audible.com/author/Lane-Belone/B08GJB5FFJ ; https://books.apple.com/us/audiobook/.../id1546687430 |
| Goodreads | Exists | Author 20651883, member since Aug 2020. No bio. 1 book, 20 ratings, 4.40 avg, 3 editions | https://www.goodreads.com/author/show/20651883 |
| Other retail | Exists | Powell's (403 on fetch; snippet credits "Lane Belone and Steven Eugene Kuhn"), AbeBooks, ThriftBooks, eBay | search results |
| LinkedIn | Exists (not readable) | linkedin.com/in/lanebelone. Snippet: Colorado Springs, CO. Fetch returned HTTP 999 | search |
| YouTube | No own channel found | Guest videos: HuV4VgEoiQM (Screw the Commute 183), Iol3n8W4Dm0 and TV-vcL-VGl0 ("Managing Overwhelm", 2023), pTDsqLAytpE ("167. Top Tip"), 1AQvH115S_w (EP-238) | search |
| Instagram | Exists | @increasefreedom (snippet: about 9.8k followers, about 1.8k posts). Also @side.quest.hq (linked from sidequesthq.co) | search; own-site sameAs |
| X | Exists | @IncreaseFreedom (snippet: about 1k followers, joined June 2014) | search |
| Facebook | Exists | facebook.com/increasefreedom, facebook.com/lane.belone | search; sameAs |
| IMDb | Exists (403 on fetch) | nm12689887. Credits unknown | search; Wikidata |
| GitHub | Exists | InfiniteGamePlayer. 6 public repos (sovereign-ecosystem, infinitegameos, lanebelone, umami fork, smallweb fork, your-ais-charter). Links to sidequesthq.co | https://github.com/InfiniteGamePlayer |
| ORCID / SSRN | Listed in sameAs | ORCID page did not render through the fetcher. SSRN not fetched | lanebelone.com JSON-LD |
| Crunchbase | **None found** | n/a | extended search |
| Speaker bureaus | **None found** | Only his own lanebelone.com/speaking. allamericanspeakers.com surfaced other people named Lane | extended search |
| Press | Some | **AP, 2025-01-01, byline Jesse Bedayn**, syndicated by PBS NewsHour, Army Times, ADN, Yahoo and others: "special forces veteran" speaking at the Colorado Springs City Council about psilocybin therapy. Also SDVoyager (2020) interview on The Inn Spot Community Acupuncture, San Diego. Also an openPR press release on a Kuhn/Belone NFT coin set | https://www.pbs.org/newshour/health/colorado-veterans-and-conservatives-clash-over-psychedelic-therapy ; https://sdvoyager.com/interview/meet-lane-belone-inn-spot-community-acupuncture-mission-valley/ ; https://www.openpr.com/news/2553787/... |

#### Podcast guest appearances found
| Show / episode | URL | Date | Framing |
|---|---|---|---|
| Straight Outta Combat, SOCRS069 "Ignite Your Authentic Alpha" | https://straightouttacombat.podbean.com/e/socrs069-lane-belone-ignite-your-authentic-alpha/ | 2019-02-28 | Served 2005 to 2017. Travel-based high performance |
| Screw The Commute 183 "He's a Special Forces Green Beret" | https://screwthecommute.com/episodes/183-hes-a-special-forces-green-beret-tom-interviews-lane-belone/ | 2019-09-23 (per Wikidata) | Enlisted at 17. About 8 years total. QOL Enterprises. Vetrepreneur tribe (about 13k) |
| Screw The Commute 254 "Humble Alpha co-author" | https://screwthecommute.com/episodes/254-humble-alpha-co-author-tom-interviews-lane-belone/ | not read | Book promotion. Kuhn as Bronze Star recipient |
| Screw The Commute 342 "He's a Humble Alpha Green Beret" | https://screwthecommute.com/episodes/342-hes-a-humble-alpha-green-beret-tom-interviews-lane-belone/ | not read | Vetpreneur Tribe 14,000+ |
| Nonprofit Architect "Unleash Your Humble Alpha" | https://nonprofitarchitect.org/unleash-your-humble-alpha-with-lane-belone/ | not read | Book |
| All-Around Adventure "Increase Your Freedom" | https://allaroundadventure.com/increase-your-freedom-with-lane-belone/ | not read | Army years, Germany, Increase Freedom brand |
| Developing the Leader Within, Ep. 44 "Leadership and Humility" | https://babyboomer.org/shows/developing-the-leader-within-podcast/episode-44-leadership-and-humility-with-lane-belone/ | not read | Book |
| "Managing Overwhelm" (YouTube) | https://www.youtube.com/watch?v=Iol3n8W4Dm0 | 2023 | "Green Beret turned entrepreneur, healer, spiritual seeker" |
| IFFA Podcast #34 "From Green Beret to Building the Future of the Internet" | https://iffassociation.org/podcast/34-from-green-beret-to-building-the-future-of-the-internet-lane-belone | "Mar 6", no year | Co-founder AsrayaOS (asraya.io). Systems architect |
| Plant Frequencies Podcast | https://podpitch.com/podcasts/plant-frequencies-podcast | unknown | AsrayaOS co-founder |
| Be A Tactical Leader | https://beatacticalleader.com/lane-belone/ | unknown | not read |
| Aggregators | https://www.owltail.com/people/MDJLk-lane-belone/appearances ("28 podcast interviews", fetch returned 500) ; https://vurbl.com/playlists/lane-belone-audio-podcast/ | n/a | Also lists Vetpreneur Tribe, Mentors for Military, Founders TIME |

#### Own-property home pages
| Property | `<title>` | Meta description | Links out to |
|---|---|---|---|
| https://www.lanebelone.com | "Lane Belone \| Writer on the Infinite Game" | "Lane Belone is a writer on the Infinite Game, a former Green Beret and co-author of Unleash Your Humble Alpha. His work centers on the Infinite Player. Start free with One Alive Thing." | sidequesthq.co (many), infinitegameos.io, lanebelone.substack.com, LinkedIn, Instagram, Facebook, X. JSON-LD sameAs: Wikidata Q139889543, all 3 domains, Substack, GitHub, SSRN, ORCID, Goodreads, IMDb, 2 Facebook pages. Person `@id` is `https://infinitegameos.io/#person` (no www) |
| https://www.sidequesthq.co | "Side Quest HQ \| The Alive Business, Playbooks and Advisory" | "Side Quest HQ, the Infinite Game practice of Lane Belone. The Alive Business, a $197 operating system ... Start free with One Alive Thing." | lanebelone.com (+ /speaking), infinitegameos.io, Substack, LinkedIn, Instagram (both handles), Facebook, X. Organization sameAs Wikidata Q141592738 |
| https://www.infinitegameos.io | "Infinite Game OS \| Play a longer game." | "A practitioner-first knowledge base and library for the Infinite Game, built for entrepreneurs, solopreneurs and creators on a long arc. Concepts, installable skills and avatar bundles." | lanebelone.com, sidequesthq.co, GitHub, LinkedIn, Instagram, X. **No Substack link in the HTML.** Wikidata Q139936059 |
| https://lanebelone.substack.com/ | "Lane Belone \| Substack" | "Writing at the intersection of poetic truth, visionary strategy and embodied power. Sovereignty and the Infinite Game for founders and leaders navigating real transitions ..." | lanebelone.com/links, LinkedIn, Facebook, Twitter/Instagram (IncreaseFreedom). **No direct link to sidequesthq.co, infinitegameos.io or GitHub** |
| lanebelone.vercel.app (indexed) | same as lanebelone.com | same | canonical tag points to https://www.lanebelone.com (correct), but the host still appears as its own search result |

Cross-linking: the three own domains link to each other both ways. Substack links only to lanebelone.com/links.
AI-reader text: no page addressed AI readers directly. Facts worth noting: infinitegameos.io offers Claude Code install commands and "Your AI's Charter", and one of its dispatches mentions "the visiting agent". Per repo docs, lanebelone.com also serves /llms.txt and /AGENTS.md (not fetched here).

---

### Part 3: How an AI assistant would describe him

#### Engine fetches
| Engine | Result |
|---|---|
| Perplexity (perplexity.ai/search?q=Lane+Belone) | **Blocked**: HTTP 403 |
| DuckDuckGo (html) | 302 to html.duckduckgo.com, then a **bot-check CAPTCHA**. No results |
| Bing (`Lane Belone` and `"Lane Belone"`) | Fetched. Top 10 are all generic "Lane" (Lane Bryant, Merriam-Webster, Wikipedia "Lane", Lane Boots, Lane Furniture, Cambridge, Lane Libraries, Lane 201, The Free Dictionary). **0 of 10 about him.** No panel, no suggestion. Possibly a degraded bot response |
| WebSearch "Lane Belone bio" (standard) | 0 relevant. Top hit Belone Moreira (handball player) |
| WebSearch "Lane Belone Joyful Sovereignty" (standard) | 0 relevant (Nietzsche, Basque politics, etc.) |

#### Likely assistant description
**With a shallow search** (standard index, Bing-like): the assistant would probably say it **cannot find a notable person named Lane Belone**. It might drift to the garfish, La Bellone or Belone Moreira. Or, from the "Unleash Your Humble Alpha" query, it might credit the book to **Steven Kuhn alone**.

**With a deeper search** (extended, or a Perplexity-style crawl), the likely description runs like this:
> Lane Belone is an American writer and speaker on the Infinite Game, a former U.S. Army Special Forces (Green Beret) soldier, and co-author with Steven Kuhn of *Unleash Your Humble Alpha* (QOL Enterprises, 2020). He founded Side Quest HQ (workshops, playbooks, advisory, small-group trips such as Peru) and builds Infinite Game OS, an open library and AI skill set. He was earlier known through the "Increase Freedom" travel/high-performance brand and the Vetpreneur Tribe co-run with Kuhn. He is based in or connected to Colorado Springs, and he appeared in a 2025 AP story on psilocybin therapy for veterans.

Sources: lanebelone.com (title/meta, /about), sidequesthq.co (meta, /about), infinitegameos.io, Wikidata Q139889543, Google Books, Audible, AP via PBS, LinkedIn snippet, and the podcast pages above.

#### Consistent across sources
| Fact | Sources agreeing |
|---|---|
| Former US Army Special Forces / Green Beret | lanebelone.com, sidequesthq.co, infinitegameos.io, Audible, Amazon, Wikidata, AP/PBS, every podcast |
| Co-author of *Unleash Your Humble Alpha* with Steven Kuhn | lanebelone.com, sidequesthq.co, infinitegameos.io, Audible, Google Books, Goodreads, Powell's, Amazon |
| Book: QOL Enterprises LLC, 2020, ISBN 9781735254722, 204 pp, foreword by Ron Lynch | Google Books, Amazon, AbeBooks, World of Books |
| "Writer on the Infinite Game" | all 3 own domains, Substack, Wikidata (Infinite Game OS) |
| Oklahoma upbringing; Germany as first duty station | Straight Outta Combat, Screw the Commute 183, lanebelone.com/about (Germany) |

#### Conflicts
| Topic | Version A | Version B | Version C |
|---|---|---|---|
| **Length of service** | 2005 to 2017, about 12 years, "most of which as a Green Beret" (Straight Outta Combat, 2019) | "about eight years total" (Screw the Commute 183 page) | "over a decade" (lanebelone.com/about) |
| **Deployments** | "deployed to Iraq twice, Northern Africa and all over Europe" (Straight Outta Combat) | Iraq base mentioned (AP/PBS) | No count or locations given (lanebelone.com/about, Screw the Commute 183) |
| **Book author order** | Belone first (Google Books, Powell's, ThriftBooks, World of Books) | **Kuhn first, Belone second, Lynch third** (Amazon, AbeBooks, Audible edition, Apple) | Kuhn alone (standard WebSearch summary of Smart Hustle / Goodreads) |
| **Book date** | Paperback 2020-08-23 (Amazon, World of Books) | Audible 2020-11-30 | Apple Books 2020-11-10 (audio) |
| **Current title** | Writer on the Infinite Game; founder of Side Quest HQ (own sites) | Systems architect, strategic advisor, **co-founder of AsrayaOS** (IFFA #34, Plant Frequencies). AsrayaOS does not appear on any own property | High-performance / travel coach, Increase Freedom (2019 podcasts); "entrepreneur, healer, spiritual seeker" (2023); "personal coach"; acupuncture-clinic partner (SDVoyager 2020) |
| **Substack tagline** | Search index: "Exploring sovereignty, thought leadership, and the infinite game" (older) | Live meta: "Writing at the intersection of poetic truth ... Sovereignty and the Infinite Game for founders and leaders" | n/a |
| **AP citation in Wikidata** | Wikidata: AP 2024-12-31 "by Brittany Peterson" | PBS-hosted AP: byline **Jesse Bedayn**, 2025-01-01 | (Peterson may be the photographer. Unverified) |
| **Education** | Wikidata: FSU-Panama, FSU, Fayetteville Tech CC | Not mentioned on any own page or in any press found; 0 references | n/a |
| **Location** | Colorado Springs (LinkedIn snippet, AP council testimony) | Panama, after service (Straight Outta Combat, /about) | San Diego clinic involvement (SDVoyager 2020) |
| **Vetpreneur Tribe size** | about 13,000 (STC 183) | 14,000+ (STC 342) | n/a |

#### Dominant sources
1. **His own properties**: lanebelone.com plus its indexed lanebelone.vercel.app copy, sidequesthq.co, Substack. These lead any deep search and supply the current framing (Infinite Game, Side Quest HQ). They are invisible in standard-mode searches.
2. **Amazon/Audible author bio** (2020). This is the most widely mirrored third-party text, with 4 slots in Q3 alone. It fixes the older framing: "Green Beret veteran who helps entrepreneurs... 40 countries... A-Teams".
3. **Podcast show notes, 2019 to 2021** (Screw the Commute, Straight Outta Combat). These are the only sources for service dates, Oklahoma and Iraq, and they disagree with each other.
4. **Wikidata Q139889543**. It is structured and therefore likely to feed knowledge graphs, but several statements lack references and one citation's byline looks wrong.
5. **AP (2025)**: the only mainstream-press mention. It is used as a reference for his military service.

Not present: Wikipedia, Crunchbase, speaker bureaus, Google Knowledge Panel (not observable), and any book review press.
