---
title: "Ranking My Own Name — 19 PRs I Shipped Into sandeepp.in in One Sitting"
description: "A dev log of the SEO, performance, and structured-data changes I shipped through sandeepp.in in a single sitting — image compression, JSON-LD, an HTML resume page, E-E-A-T bylines, and the LinkedIn CDN 403 that took a whole PR to fix."
date: "2026-07-17"
tags: ["SEO", "Next.js", "Performance", "Portfolio", "Dev Log", "Vercel"]
published: true
---

If you type my name into Google right now, `sandeepp.in` should be the first thing you see. That's the whole game — and today I ran a single-sitting sprint to actually push it there. Nineteen pull requests, all shipped through the boring but bulletproof branch → PR → merge loop against `main`.

This is the log.

## The Goal

There's a difference between "SEO for keywords" and "SEO for a name." When someone searches for **Sandeep Prajapati**, they're not on a research mission — they've heard the name once and want to see the person. The site's job is to be so unambiguously *me* that Google has no reason to serve anything else.

That means:

- Every page names me in plain HTML, not just metadata.
- Every image ties the screenshot to my name and the project it belongs to.
- The site graph — Person, WebSite, ProfilePage, BlogPosting — resolves to one coherent entity.
- Core Web Vitals stay green so Google's ranking algorithm doesn't downgrade the domain on mobile.

Let's walk through what I actually did.

## Performance

### 1. Compressed every project image to WebP (PR #71)

Baseline: `public/projects/` was **7.1 MB** total. `echoecho.png` alone was 1.4 MB. `stateful.png` was 1.0 MB. That's LCP-killing weight.

I wrote a small `sharp` script that converts every PNG to WebP at quality 82 with a 1600 px width cap, and re-encodes iteratively down to a 200 KB target if the first pass overshoots.

Final: **826 KB total. 88% smaller.** `echoecho` went from 1.4 MB to 62 KB. `stateful` from 1.0 MB to 53 KB.

The auto-resolver in `lib/content.ts` already tried `.webp` before `.png` when looking up project images, so no frontmatter edits — just drop new WebPs in and every card, row, and detail page picks them up.

### 2. Migrated raw `<img>` → `next/image` (PR #72)

Three high-traffic surfaces were still using raw `<img>`: `project-card.tsx`, `project-row.tsx`, and the project detail hero. `next/image` on Vercel edge-optimizes into AVIF or WebP per viewport with zero build config. Alt text also got upgraded to include my name in every alt string — a small but free image-search signal.

### 3. Added @vercel/speed-insights (PR #73)

One line in `app/layout.tsx`, zero backend, real-user Core Web Vitals showing up in the dashboard. LCP and INP are direct Google ranking signals, and synthetic Lighthouse runs miss the regressions that actual users on actual networks experience.

### 4. Preconnect and DNS-prefetch hints (PR #77)

Warmed up sockets to Vercel Analytics + Speed Insights so the first beacon fires without a fresh TLS handshake. Added `dns-prefetch` for the four external origins the site pulls from lazily (GitHub readme stats, LeetCode card, LinkedIn media, Giscus). Also cleaned up the Next 14 metadata split — `viewport` moved to its own export, added per-scheme `themeColor`, and switched off iOS's aggressive `format-detection` so it stops auto-linking numbers.

## Structured data — the boring part that actually wins name searches

Google's entity graph is what turns "Sandeep Prajapati" the query into "Sandeep Prajapati" the person. JSON-LD is how you tell it who I am and what I've made.

### 5. Fixed slug-specific OG images in JSON-LD (PR #74)

Every blog post and project page had its own `opengraph-image.tsx` — Next.js's file-based OG renderer — so each post had a unique share card. But the JSON-LD `image:` field was still pointing at the root `/opengraph-image`, so every rich result carried the generic homepage card.

Two-line fix per template: build the slug URL from `params`, use `${slugUrl}/opengraph-image`. Now every article's rich result shows its own card. I also linked the JSON-LD blocks back to the shared `#person` and `#website` nodes, and added the fields Google's Rich Results checker rewards — `wordCount`, `timeRequired`, `programmingLanguage`, `ImageObject` with dimensions, `inLanguage`, `dateCreated`.

### 6. FAQPage schema for name queries (PR #76)

I wrote out the six questions someone actually types after hearing my name:

- Who is Sandeep Prajapati?
- What does Sandeep Prajapati do?
- Where is Sandeep Prajapati based?
- How can I contact Sandeep Prajapati?
- What technologies does Sandeep Prajapati work with?
- Where can I see Sandeep Prajapati's projects and resume?

Every answer restates the full name so Google's entity extractor keeps mapping the question to the same Person entity.

### 7. Rendered the FAQ visibly on /about (PR #80)

Then I realized I'd made a mistake — Google requires FAQPage schema to be **backed by visible content** on the same URL. Emitting it site-wide from `app/layout.tsx` risked a manual action for schema/DOM mismatch. Moved the schema to `/about` and rendered the six questions as a `<details>` block sourced from the same JSON-LD constant. Schema and DOM now match exactly.

### 8. List-page schema (PR #78)

`/blog` and `/projects` had no structured data of their own — they rendered as generic pages. Added:

- `Blog + BlogPost[]` JSON-LD on `/blog`
- `CollectionPage + ItemList` on `/projects`
- `BreadcrumbList` on both

Intro copy on each also now leads with "Sandeep Prajapati" so the first crawlable sentence reinforces the entity.

### 9. Dual-typed projects as SoftwareSourceCode + SoftwareApplication (PR #84)

For projects with a live URL, the JSON-LD is now dual-typed: it's both a source-code repo pointer *and* an installable web app. Adds `applicationCategory: DeveloperApplication`, `operatingSystem: Web`, `browserRequirements`, `installUrl`, and a free-price Offer — the minimum fields Google needs to render the app-style rich card. Projects without a live URL stay as `SoftwareSourceCode` only.

## Content — the E-E-A-T layer

Google's Helpful Content system reads plain HTML more literally than most people assume. If a post doesn't visibly say who wrote it, JSON-LD alone doesn't fully compensate.

### 10. Blog author byline and About-the-author aside (PR #81)

Every blog post now leads with a visible **"By Sandeep Prajapati"** byline linked to `/about` with `rel="author"` and Person microdata. It closes with an **"About the author"** aside that repeats the name, role, and cross-links `/projects` and `/about`. Header markup upgraded to `<article><header>` so Google's parser reliably identifies the main content block.

### 11. Same treatment on project pages (PR #82)

"Built by Sandeep Prajapati" at the top of each project page, "About the builder" at the bottom. Cross-linking between /about, /projects, and /blog spreads PageRank across the portfolio.

### 12. Tag-scored related content (PR #83)

Every project detail page surfaces 3 "Related projects" scored by tag overlap (recency breaks ties). Every blog post surfaces 3 "Related posts" using the same scoring. Falls back to most-recent items when the current item has no tags.

Two things this does: internal linking spreads PageRank across the portfolio instead of concentrating it on pinned entries, and readers who reach the bottom of a post get an obvious next step — which lowers bounce rate.

### 13. Homepage subhead alignment + /contact polish (PR #85)

The homepage subhead said "AI Software Intern" while every metadata block, title tag, and structured-data block called me "AI Engineer & Full-Stack Developer." Signal inconsistency is one of the fastest ways to confuse Google's confidence in your primary role attribute — a key Knowledge Panel field. Aligned the subhead.

`/contact` also got: ContactPage JSON-LD linked to the shared graph nodes, BreadcrumbList, an h1 that reads "Contact Sandeep Prajapati", and a description enumerating every social channel so those keywords index too.

## The pages nobody talks about — sitemap, robots, RSS, manifest

### 14. Robots and sitemap freshness (PR #79)

`robots.ts` now explicitly welcomes Googlebot-Image (project screenshots → image search — the name query is a huge vector on mobile), Googlebot-News on `/blog/` for Discover eligibility, plus Bingbot and DuckDuckBot. Disallowed `/api` and `/_next` to keep crawl budget on real pages.

Sitemap fix: `/projects` and `/blog` were emitting `new Date()` (build time) as `lastmod`, which trains Google to ignore the field. Now they use the newest child project or post date, so a genuine content update actually shows up as a fresh lastmod.

### 15. Enriched RSS (PR #86)

Added `dc:creator` on every item so feed readers show me as the byline. `<category>` per tag on every item so topic-filtered readers surface them by tech. Channel-level `<copyright>`, `<generator>`, and an `<image>` pointing at the site OG so RSS clients render a logo.

Aggregators are themselves crawled — richer feeds mean more third-party mentions.

### 16. HTML resume at /resume (PR #75)

This one was overdue. The ⌘K palette linked straight to a Google Drive PDF, so the canonical resume URL belonged to Drive, not this site. Google indexes Drive PDFs poorly and no link equity flowed back to `sandeepp.in`.

I built `app/resume/page.tsx` — a full HTML resume assembled from the same content sources `/about` uses (experience, projects, certifications, plus a curated skills grid). Because it's HTML, Google crawls **every keyword** — "Sandeep Prajapati", "AI Engineer", "RAG", "LangGraph", "DrCode" — in full.

Print stylesheet strips nav and footer, so `Cmd+P` on `/resume` produces a clean single-page PDF. `ProfilePage` JSON-LD links back to the shared `#person` node. The ⌘K palette now lists both "Resume" (HTML) and "Resume PDF" (Drive). Sitemap includes `/resume` at priority 0.9.

### 17. Manifest shortcuts (PR #87)

Long-press the homescreen icon on Android Chrome and you get quick jumps to Projects, Writing, Resume, and Contact. Small but reinforces the sandeepp.in habit for returning visitors.

## The cert-logo saga

Halfway through the sprint I noticed the cert logos on `/about` weren't rendering. This turned out to be an entire two-PR detour.

### 18. LinkedIn CDN was blocking hotlinks (PR #88)

Every `logo:` in `content/certifications.md` was a `media.licdn.com` signed URL scraped from LinkedIn. Turns out LinkedIn's CDN returns **HTTP 403** to any request that isn't from linkedin.com — a common anti-hotlink stance. So none of them rendered on `sandeepp.in`.

First attempt: pull the mono-color SVG glyphs from Simple Icons CDN, save them locally, and rewrite `fill="#hex"` → `fill="currentColor"` so they adapt to theme.

### 19. Except those aren't the *real* logos (PR #89)

I shipped it, looked at the About page, and immediately realized the mistake: Simple Icons ships single-color trademark-safe glyphs. Google's real logo is multi-color. IBM's is 8-bar blue. Microsoft's is the four-square Windows mark. Those single-color glyphs looked *wrong* — same shape, wrong essence.

Rewrote the script to pull from a curated map of **Wikipedia Commons SVG URLs** — the actual trademark form — and fall back to Google's favicon service (`google.com/s2/favicons?domain=X&sz=128`) for the two niche brands (Commudle, Forage) that don't have a Wikipedia entry. HackerRank and ISRO came in as PNG and got re-encoded to 128 px WebP.

The About-page chip container also changed: white background always, small padding. Brand logos are designed to sit on white, so this reads correctly in both light and dark mode.

Fifteen unique brands, 108 KB total. Every logo is now hosted on `sandeepp.in`. Zero external CDN references remain.

## What I'm not going to do for you

Some of the biggest name-search levers aren't code:

- **Google People Card** — literally search "add me to Search" from your phone on Google. Fastest visible win, days not weeks. This is you.
- **Every profile bio** — GitHub, LinkedIn, LeetCode, X, YouTube video descriptions, all of them need `sandeepp.in` in the website/URL field. You.
- **Cross-post to Dev.to / Hashnode** with canonical URL pointing back to sandeepp.in. This spreads mentions of the name across domains Google trusts.
- **Search Console** — submit the sitemap, request indexing on new pages. You've already verified the domain.
- **Cadence** — this blog post is one of two dozen. Weekly posting is the biggest long-term lever.

Code can only make the site *deservingly* rank. The remaining work is convincing Google someone besides me thinks that's true.

## Summary of what merged today

| PR   | What it does                                                                    |
| ---- | ------------------------------------------------------------------------------- |
| #71  | Compressed project images to WebP (7.1 MB → 826 KB, 88% smaller)                |
| #72  | Migrated `<img>` → `next/image` on project surfaces                             |
| #73  | Added `@vercel/speed-insights`                                                  |
| #74  | Slug-specific OG images in Blog/Project JSON-LD                                 |
| #75  | Full HTML resume at `/resume` with print stylesheet                             |
| #76  | FAQPage schema for name-query intent                                            |
| #77  | Preconnect / dns-prefetch hints, viewport + format-detection                    |
| #78  | Blog + CollectionPage + BreadcrumbList on list pages                            |
| #79  | Robots.txt image/news bots + honest sitemap `lastmod`                           |
| #80  | Rendered visible FAQ on /about; moved FAQPage schema off site-wide              |
| #81  | Blog author byline + About-the-author aside (E-E-A-T)                           |
| #82  | Same E-E-A-T pattern on project pages                                           |
| #83  | Tag-scored "Related posts" and "Related projects"                               |
| #84  | Multi-type projects as SoftwareSourceCode + SoftwareApplication                 |
| #85  | Homepage subhead alignment + /contact metadata upgrade                          |
| #86  | RSS enriched with dc:creator, categories, feed image                            |
| #87  | Manifest shortcuts + PNG icon fallback                                          |
| #88  | Localized cert logos (LinkedIn CDN was returning 403 to hotlinks)               |
| #89  | Real full-color brand logos from Wikipedia Commons, not monochrome glyphs       |

That's the sprint. Watch this space — the SEO changes take a few crawl cycles to reflect, and I'll write up whether they actually moved the needle.
