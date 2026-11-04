# lanebelone.com move list (2026-11-04)

Synthesis of four research reports written on 2026-11-03. Checks against this repository and the live site ran on 2026-11-04.

**Inputs.** All four branches and files were present and read in full:

| Key | Report | Branch |
|---|---|---|
| D | Discoverability audit (`docs/research/2026-11-03/lanebelone-discoverability-audit.md`) | `research/2026-11-03-lanebelone-discoverability` |
| S | Stages map (`docs/research/2026-11-03/stages-map.md`) | `research/2026-11-03-stages-map` |
| N | Newsletter growth study (`docs/research/2026-11-03/newsletter-growth-study.md`) | `research/2026-11-03-newsletter-growth` |
| C | Conference and CFP map (`docs/research/2026-11-03/conference-cfp-map.md`) | `research/2026-11-03-conference-cfps` |

**Method.** Web fetching worked. This session used the web only to check claims. `master` is still at `79d8e4e`, the commit the audit read, so every code finding in D still applies. Counts below come from my own tally. Anything inferred is marked inference. Nobody was contacted and no form was submitted.

---

## The short version

1. **The Substack mirror has stalled, and that is the biggest finding in this synthesis.** The public Substack archive holds 23 posts. 8 of the site's 25 live essays are among them. Of the 12 site essays published after 2026-07-13, 1 reached Substack. The newest Substack post is dated 2026-10-07. Every growth move in N runs through that mirror. Source: `https://lanebelone.substack.com/api/v1/archive?sort=new&limit=50` and `https://lanebelone.substack.com/feed`, both read 2026-11-04.
2. **One recording of a real talk opens most of the speaking calendar.** SHRM, Workhuman, ATD and SXSW all ask for video of a live room (C). Two of those calls close before New Year.
3. **Two deadlines fall inside the next four weeks.** SXSW London closes 12 November and IPPA closes 30 November. Both are the event's own dates, checked on their pages today.
4. **The site work is small and already mapped.** D found a byline gap, a dropped RSS link, an unused `seoTitle` field and a speaking page that never says "speaking". Each is a short code change.
5. **The site breaks the one-Side-Quest-HQ-link rule on every page I checked.** The homepage `<main>` carries 10 links to sidequesthq.co. No report raised this. It comes from my own check.

---

## Top ten moves

| Rank | Move | Lane | Page or file | Reports | Waits on, then unblocks |
|---|---|---|---|---|---|
| 1 | Restart the Substack mirror: paste each Monday piece with the link-back line, then backfill the strongest unmirrored essays | Newsletter | lanebelone.substack.com | N, D | Waits on nothing. Unblocks 5, 14, 19, 20, 27 |
| 2 | Submit "Play the Player" to SXSW London under an AI subtitle | Speaking | https://sxswlondon.awardsplatform.com/ | C | Waits on nothing. Closes 12 Nov (event's own date) |
| 3 | Record one full talk to a live room. Host the room yourself if needed: an Interintellect salon or a CreativeMornings slot | Speaking | none | C, S | Waits on a room. Unblocks 6, 7, 10, 32 |
| 4 | Submit a 60-minute Innovative Practice Workshop on "The Game Within the Game" to IPPA | Speaking | https://ippaworldcongress.org/abstract | C | Waits on nothing. Closes 30 Nov 2026 (event's own date) |
| 5 | Build a Substack recommendations circle of 10 to 15 writers, then a public List | Newsletter | lanebelone.substack.com/publish/recommendations | N | Waits on 1. Unblocks 20 |
| 6 | Submit "Play the Player" to SHRM HR-X Live! with the video, mapped to SHRM BASK | Speaking | https://www.shrm.org/events-education/events/call-presentations-shrm-events | C | Waits on 3. Closes 15 Dec 2026, 5:00 PM ET (event's own date) |
| 7 | Submit to Workhuman Live Nashville with the same video | Speaking | https://www.workhuman.com/call-for-speakers/ | C | Waits on 3. Closes 31 Dec 2026 (event's own date) |
| 8 | Fix the article template: visible byline, "Keep reading" block, RSS link in the head | Site fix | `src/app/blog/f/[slug]/page.tsx`, `src/app/layout.tsx` | D | Waits on nothing. Unblocks 11 |
| 9 | Set `seoTitle` on the evergreen archive posts, titled as the question each answers | Site fix | `src/content/blog/*.md` frontmatter | D | Waits on nothing |
| 10 | Rebuild `/speaking` around booking: title, H1, past appearances, speaker FAQ, then the video | Site fix and Page copy | `src/app/speaking/page.tsx` | D, C, S | Title and H1 wait on nothing. The video waits on 3. Unblocks 32 |

---

## Already live (marked Done and dropped)

- **Owned-ground-first cadence.** N asks for a fixed send day. The site has published on Mondays since June 2026, per the article frontmatter. Done on the site. The Substack side is move 1.
- **Link-back line on Substack copies.** N and D both ask for it. 6 of the 8 mirrored site essays already open with "Originally published at lanebelone.com." The two without it are `nobodys-good-at-it-yet` and `the-infinite-game-is-already-in-progress`. Source: `https://lanebelone.substack.com/api/v1/posts/<slug>`, read 2026-11-04. Done for most posts. The residue sits in move 1.
- **The vercel.app host redirect.** D move 9 asks for it. The redirect is live at `next.config.ts:45-50`. Done. The Search Console removal is still open (move 22).
- **A free first step.** N move 10 asks for one. One Alive Thing exists and is linked from the footer and the article template. It lives on sidequesthq.co, so it feeds Side Quest HQ and not the lanebelone.com list. Partly done (move 31).

---

## Full ranked list

Effect and effort are my judgment from the evidence named. "Event's own date" means the date published on the event's page.

| # | Move | Lane | Page or file | Reports | Evidence | Waits on | Unblocks |
|---|---|---|---|---|---|---|---|
| 1 | Restart the mirror. Paste each Monday piece to Substack with the link-back line. Backfill the strongest of the 17 unmirrored essays | Newsletter | lanebelone.substack.com | N (move 9), D (move 2) | 8 of 25 live essays are on Substack and the newest is dated 2026-10-07 (archive API, read 2026-11-04) | nothing | 5, 14, 19, 20, 27 |
| 2 | SXSW London submission, "Play the Player" under an AI subtitle, AI as The New Power Structures track | Speaking | https://sxswlondon.awardsplatform.com/ | C | The home page reads "Conference Submissions Close 12th November!" (https://sxswlondon.com/, read 2026-11-04). The year is inferred from the 2027 event dates | nothing | none |
| 3 | Record one unedited talk to a live room. Gather any evaluation scores | Speaking | none | C, S | SHRM takes only a session video or evaluations. Workhuman rejects applications without video. ATD rejects a promo reel (C, Part 4) | a room | 6, 7, 10, 32 |
| 4 | IPPA Innovative Practice Workshop, "The Game Within the Game". Title 20 words, abstract 150 | Speaking | https://ippaworldcongress.org/abstract | C | The page reads "Abstract Submission Deadline 30 November 2026" (read 2026-11-04) | nothing | none |
| 5 | Recommend 10 to 15 writers in meaning, play, adventure and inner leadership. Turn the circle into a List | Newsletter | Substack dashboard | N | 16 of 25 writers credit recommendations. Substack's recommendations endpoint for this publication returned 0 entries (inference: no recommendations are set, read 2026-11-04) | 1 | 20 |
| 6 | SHRM HR-X Live! (27 to 30 Jun 2027, Chicago), "Play the Player" | Speaking | SHRM call page | C | "Deadline to Submit Proposal: December 15, 2026, 5:00pm ET" (read 2026-11-04). SHRM covers airfare and two hotel nights | 3 | none |
| 7 | Workhuman Live (26 to 29 Apr 2027, Nashville), lead with identity under AI | Speaking | Workhuman call page | C | "Workhuman Live Nashville: December 31, 2026" (read 2026-11-04). Registration and hotel covered | 3 | 26 |
| 8 | Article template: "By Lane Belone" linked to /about, a related-posts block, RSS `<link>` in the layout head | Site fix | `src/app/blog/f/[slug]/page.tsx:139-152`, `src/app/layout.tsx:21-25` | D (D1, D4, D5) | 17 of 55 articles have no internal links. Live /about and the newest article carry 0 RSS alternate links (my check, 2026-11-04) | nothing | 11 |
| 9 | `seoTitle` on evergreen archive posts, e.g. "What Is Micro Mastery?" Visible titles stay | Site fix | archive `.md` frontmatter. Field wired at `src/app/blog/f/[slug]/page.tsx:27` | D (move 3) | Set on 0 of 55 posts (my grep). Winners put the query in the title | nothing | 11 |
| 10 | `/speaking`: title naming booking, an H1 naming speaking, dated past appearances, a speaker FAQ, FAQPage schema, then the video | Site fix and Page copy | `src/app/speaking/page.tsx:8-9`, `:89-93` | D (move 6, D11), C, S | Live title is "Speaking \| Lane Belone" and the H1 is "Design. Play. Master." (my check) | 3 for the video | 32 |
| 11 | Answer pages for coined terms: Micro Mastery, The Game Within the Game, Playgrounds of Exploration, Perception Upgrade, Build the Mill Where the Water Flows and The Infinite Player as the speaking framework. Definition first, then links to the articles | New page or article | new routes, following the `/joyful-sovereignty` FAQPage pattern | D (move 4) | "Joyful Sovereignty" is the only term Lane ranks for. The other phrases return spam, PDFs or nothing | 8, 9 | none |
| 12 | Cosmos Institute essay contest, "AI for human judgment", up to 1,000 words. The "Earn the Right to Automate" practice fits | Speaking | https://blog.cosmos-institute.org/p/essay-contest-ai-for-human-judgment | S | "a deadline of EOD Sunday November 8th" (read 2026-11-04). Eligibility is not stated | nothing | none |
| 13 | Replace "Those live at the Substack" and "Active writing: Substack" with /blog as home | Page copy (proposed) | `src/lib/page-data.ts:166`, `public/llms-full.txt:112`, `:166` | D (D3) | The copy contradicts the canonical claim in `public/AGENTS.md:21` | nothing | none |
| 14 | A daily Notes practice of 20 to 30 minutes, seeded by lines from each Monday piece | Newsletter | Substack Notes | N | All 6 writers in the 2023-and-later cohort credit Notes | 1 | 20 |
| 15 | Bring every page down to one Side Quest HQ link. Proposed choice: Peru on the homepage, the workshop on /speaking, the main site on /joyful-sovereignty | Page copy (proposed) | `src/app/page.tsx`, `about`, `speaking`, `joyful-sovereignty`, article template | none (my own check) | Links in `<main>`: home 10, /about 3, /speaking 2, /joyful-sovereignty 2, an article 2 (my count, 2026-11-04) | nothing | none |
| 16 | Pitch three open podcast doors: Veteran On the Move (The Alive Business), The Reboot Podcast (Play the Player) and Zero To Travel (Side Quests) | Outreach | interview inbox, guest application, guest form | S | All three routes were re-checked by hand in S. Each wants a different story | nothing | 27 |
| 17 | A 10-minute screen-share demo of the Obsidian and Claude Code vault and the human-AI charter | Speaking | none | S, C | How I AI asks for a live demo. A 2026 AI Engineer talk on an Obsidian "Life OS" shows the lane | nothing | 18, 21, 25 |
| 18 | Self-nominate for How I AI, then Behind the Craft and AI & I | Outreach | How I AI nomination form | S | The form invites self-nomination | 17 | none |
| 19 | One flagship essay a month (15 to 20 hours), hand-sent to 20 people and 2 or 3 curators | Newsletter | the Monday slot | N | 5 of the 8 fastest growers credit one outsized amplification. Karlsson measured about 403 new subscribers per 20-hour piece against about 92 per 10-hour piece | 1 | none |
| 20 | Three collaborations through Creator Match: a guest post, a co-written piece and a co-hosted Live | Newsletter | Substack | N | 7 of 25 credit collaborations. Caplan saw about 250 readers per early guest post | 1, 5 | none |
| 21 | Email PKM Summit about a "Design the Board" workshop | Speaking | https://pkmsummit.com/contact/ | S, C | No formal call. Event runs 12 to 13 Mar 2027 in Utrecht (pkmsummit.com, read 2026-11-04) | 17 | none |
| 22 | Close duplicate surfaces: `Link: rel="canonical"` on markdown twins, noindex twins of noindex pages, vercel.app removal in Search Console, 404 metadata | Site fix | `src/app/markdown/[[...path]]/route.ts:35-37`, `src/app/not-found.tsx` | D (D7, D8, D14) | An extended name search returned lanebelone.vercel.app as its own result. The 404 emits two conflicting robots metas | nothing | none |
| 23 | One canonical fact block on /about, then matching edits on Wikidata (references for the three education claims, the AP byline), LinkedIn and IMDb | Page copy and Outreach | `src/lib/page-data.ts:36` | D (move 1) | Sources disagree on service length, current role and location (Part 3) | a decision on the facts | Part 3 |
| 24 | Nav "Connect" to `/#connect`. Link /cite from the footer and /about | Site fix | `src/components/Nav.tsx:84`, `:181`, `src/components/Footer.tsx` | D (D9, D10) | `#connect` exists only on the homepage. /cite has no inbound link | nothing | none |
| 25 | Apply to Human+Tech Week's AGENCY summit, "Design the Board" | Speaking | https://luma.com/htw2027 | C | Open application, no published deadline. 10 to 14 May 2027, San Francisco | 17 helps | none |
| 26 | Self-nominate on the ATTA speaker form, which feeds the Adventure Travel World Summit and AdventureELEVATE | Speaking | https://events.adventuretravel.biz/speaker-nomination | C | Rolling form. Peru and Everest are lived proof | nothing | none |
| 27 | A Reflections essay for The War Horse on identity after the uniform | Outreach | https://thewarhorse.org/freelance-pitches/ | S | Its 2026-01-14 piece "Who Am I Without the Uniform?" shows the slot | nothing | none |
| 28 | A one-line share ask in each issue, then Substack referral tiers | Newsletter | issue footer | N | 4 of 25 credit referrals or share asks | 1 | none |
| 29 | A short LinkedIn post per Monday essay, linking to the lanebelone.com URL | Newsletter | LinkedIn | N | Suto and Desir Corbett credit LinkedIn summaries | nothing | none |
| 30 | Bring 36 GoDaddy-hosted archive images home as WebP with alt text. Shrink the 5.0 MB hero | Site fix | 30 archive posts, `public/images/blog/` | D (D2, D13) | The images depend on a dead hosting account and nearly all carry `alt=""` | nothing | none |
| 31 | A free piece for the lanebelone.com list, such as an Infinite Game field guide | New page or article | the articles subscribe form | N (move 10) | 3 of 25 credit lead magnets, all on owned platforms. One Alive Thing feeds Side Quest HQ | 15 (keeps the one-link rule) | none |
| 32 | One speaker-bureau listing | Outreach | none | D | Every speaker query in D went to bureau profiles. No bureau lists Lane | 3, 10 | none |
| 33 | Remove the stale "cohort begins 16 April" promos that link to `/mastery` | Site fix | `an-ancient-path-to-wisdom.md:10`, `:86`, `replay-transitioning-...md:9` | D (D12) | `/mastery` 308s to `/` | nothing | none |
| 34 | Watch these pages for 2027 calls. No published dates yet: Military Influencer Conference, Games for Change, re:publica, ATD OrgDev, AI Engineer World's Fair, Podcast Movement, ICF Converge | Speaking | event pages in C | C, S | Each ran a call last cycle. Their 2027 windows are unpublished | nothing | none |
| 35 | Low-severity site batch: meta descriptions over 155 characters, three pages sharing the H1 "Lane Belone", section labels as h2, BlogPosting `isPartOf`, one timestamp helper, wordCount on stripped text | Site fix | D, section A5, items D15 to D36 | D | Each is a one-line defect with a file and line in D | nothing | none |
| 36 | Esalen workshop proposal, "The Game Within the Game" weekend | Speaking | https://www.esalen.org/visit/teach | C, S | Esalen wants a workshop already attended by 20 or more | 20 past participants | none |
| 37 | Relationship track for invitation stages: Wisdom 2.0, Chautauqua, Aspen Ideas, Mountainfilm, Craft + Commerce. Research the warm paths only | Outreach | none | C, S | None publishes an open call (C, Part 1) | 3, 10 | none |

### Declined

| Move | Source | Rule it breaks |
|---|---|---|
| Distribution through Reddit and forum posting | N tally (Hoel, Karlsson, Fallon) | No Reddit |
| Entering inferred call windows ("likely opens January 2027", "likely mid-February 2027") as deadlines | S move 5, C inferred rows | No invented dates. Move 34 watches the pages instead |
| Pointing the stale `/mastery` promos at a Side Quest HQ page | D (D12, second option) | One Side Quest HQ link per page. Move 33 removes them |

Not ranked, with no rule broken: HubSpot UNBOUND (8 to 10 Sep 2027, third-party dates) overlaps the Peru Side Quest on 1 to 11 September 2027 (C). The Gross Global Happiness Summit charges presenters USD 995 or more (C). D advises against competing for the bare term "infinite game", which Farnam Street and Wikipedia hold.

---

## Part 2. The conflicts

**1. Does Substack link back home?** D says no Substack post links back, citing `nobodys-good-at-it-yet`. N recommends adding a link-back line. My check found the line on 6 of the 8 mirrored essays. D's example is one of the two without it. **Side with the live check.** The link-back is mostly done. The real gap is volume: 17 of 25 essays never reached Substack.

**2. Full mirror or excerpts on Substack?** D offers excerpts as an alternative to the link-back. N shows own-site-first writers such as Simon Willison and Jeff Kaufman mirroring full text. N also shows Substack's discovery runs inside Substack: recommendations, Notes and Lists. **Side with N.** Excerpts would starve the channel that 16 of 25 writers credit. Substack says its network brings "more than half" of new subscribers (https://substack.com/about, read by N 2026-11-04). The link-back line keeps lanebelone.com as the reference home.

**3. Which proof first: a room recording or a screen demo?** C calls a live-room video the highest-leverage asset. S calls a 10-minute demo the key to the AI podcasts. **Record the room first.** Two calls with fixed dates (15 and 31 December) require it. The demo has no deadline and can follow.

**4. Wisdom 2.0's 2027 theme.** S gives "Well-Being, Wisdom, and Human Connection in an Age of AI". C gives "The Great Turning". The live page carries both: "The Great Turning" as the title and the S wording as the subtitle, 29 to 30 April 2027 (https://www.wisdom2summit.com/, read 2026-11-04). No real conflict.

**5. The best angle for Esalen.** S and C pair Esalen with different talks. **Side with C.** "The Game Within the Game" maps to Esalen's play and leadership weekends, and C cites a May 2026 Esalen workshop on change through play.

---

## Part 3. The person

How AI assistants describe Lane Belone today, from D:

1. A quick lookup finds almost nothing. Standard search for "Lane Belone" returned 0 of 10 results about him, led by the garfish *Belone belone* and La Bellone in Brussels (D, read 2026-11-04).
2. Name plus topic does a little better. "Lane Belone Infinite Game" returned his Substack at rank 2, with an older tagline: "Exploring sovereignty, thought leadership, and the infinite game" (https://lanebelone.substack.com/, read by D 2026-11-04). His own domains appeared in 0 of 170 standard name-search slots.
3. A deep crawl gets it right. One extended search returned 9 of 9 results about him, led by his own pages. Inference: it would describe a writer and speaker on the Infinite Game, a former Green Beret, the founder of Side Quest HQ and the builder of Infinite Game OS.
4. Sources disagree on service length: 2005 to 2017, "about eight years" or "over a decade" (https://straightouttacombat.podbean.com/e/socrs069-lane-belone-ignite-your-authentic-alpha/ ; https://screwthecommute.com/episodes/183-hes-a-special-forces-green-beret-tom-interviews-lane-belone/ ; https://www.lanebelone.com/about). They also disagree on current role, with "co-founder of AsrayaOS" on a podcast page that his sites never mention (https://iffassociation.org/podcast/34-from-green-beret-to-building-the-future-of-the-internet-lane-belone).
5. Wikidata holds a record (https://www.wikidata.org/wiki/Q139889543). Three education claims there carry no references. Its AP citation credits a byline that differs from the one PBS shows (https://www.pbs.org/newshour/health/colorado-veterans-and-conservatives-clash-over-psychedelic-therapy). There is no Wikipedia page and no bureau listing.

The three facts on the site that would most change that description:

| Fact | Page | Why |
|---|---|---|
| A dated service line: years served, Special Forces, where he deployed | /about (`src/lib/page-data.ts:36`, now "Over more than a decade of service") | It settles the 12-year, 8-year and "over a decade" versions with one first-party source |
| Current work named plainly above the fold: writer and speaker on the Infinite Game, founder of Side Quest HQ, builder of Infinite Game OS. Name AsrayaOS as current or past, and name the home base | the homepage hero and the /about "Today" chapter | The hero says "Exploring the Infinite Game" and leaves the roles to the meta description (D, A2). The AsrayaOS and location conflicts persist until the site speaks |
| A dated record of appearances: the Ancient Future Summit (2 November 2022) and the podcast episodes D found | /speaking | Speaker queries go to bureau profiles. A first-party record gives assistants a source to cite |

---

## External deadlines, next twelve months

From C unless marked. Every date below is the event's own published date. The five nearest were re-read on the events' pages on 2026-11-04.

| Deadline | Basis | Event | Event dates and city | Link |
|---|---|---|---|---|
| 8 Nov 2026, end of day | Event's own date (from S, not C) | Cosmos Institute essay contest | Winners notified later in November | https://blog.cosmos-institute.org/p/essay-contest-ai-for-human-judgment |
| 12 Nov 2026 | Event's own date. The page gives no year. 2026 is inferred from the 2027 dates on the same page | SXSW London | 24 to 29 May 2027, London | https://sxswlondon.awardsplatform.com/ |
| 30 Nov 2026 | Event's own date | IPPA 10th World Congress | 7 to 10 Jul 2027, Istanbul | https://ippaworldcongress.org/abstract |
| 15 Dec 2026, 5:00 PM ET | Event's own date | SHRM HR-X Live! | 27 to 30 Jun 2027, Chicago | https://www.shrm.org/events-education/events/call-presentations-shrm-events |
| 31 Dec 2026 | Event's own date | Workhuman Live | 26 to 29 Apr 2027, Nashville | https://www.workhuman.com/call-for-speakers/ |
| 31 Jan 2027 | Event's own date (live demos only) | AI for Good Global Summit | 21 to 24 Jun 2027, Geneva | https://aiforgood.itu.int/engage/ |
| 5 Feb 2027 | Event's own date | Workhuman Forum London | dates not published | https://www.workhuman.com/call-for-speakers/ |
| 12 Feb 2027 | Event's own date. A search summary in C said 20 Nov 2026, so confirm. Weak fit | Adventure Safety Conference Asia | 9 to 10 Oct 2027, Bangkok | https://conference.viristar.com/asc-asia/speakers/call-for-proposals/ |

Rolling, with no deadline: Human+Tech Week, the ATTA nomination form, Esalen (reviewed quarterly), Omega, Web Summit Vancouver and Lisbon, UNLEASH, PKM Summit by email, CreativeMornings and TEDx by chapter. Every other 2027 call in C has an unpublished window and sits in move 34.
