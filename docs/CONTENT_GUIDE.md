# CONTENT GUIDE: ubed-web (Blog)

How to plan, write, publish and promote posts at `ubed.in/blog`. For humans and AI agents.  
Component documentation copy lives in `ubed-ui/docs/CONTENT_GUIDE.md`.

## 1. Why we write
Show thinking (portfolio shows what, blog shows how and why); get found in search; learn in public; feed the library (every component gets a post, every post links to a component).

## 2. Audience
| Reader | Wants | Works |
| :-- | :-- | :-- |
| Frontend / creative devs | Working code, animation tricks, perf fixes | How-I-built-it with live previews |
| AI-assisted devs | Prompts, drop-in components | Prompt guides, registry usage |
| Recruiters / founders | Proof of depth and taste | Build logs, architecture write-ups |
| Beginners | Plain explanations | Learning-in-public, "what I got wrong" |

## 3. Pillars
| Pillar | Examples | Cadence |
| :-- | :-- | :-- |
| Learning in public | Weekly lessons, mistakes with fixes | Every 1 to 2 weeks |
| How I built it | Pinned scroll, velocity marquee, repel buttons | One per released component |
| Dev opinions and tools | AI agents for UI, Next.js SEO checklist | Monthly |
| Build logs | Publishing the npm package, first 100 installs | At milestones |

A post should come from work you already did. If it needs a week of extra research, shrink it.

## 4. Voice (Gen Z, but readable)
**Split the job:** titles, meta descriptions and H2s carry clear keywords. The body carries the voice.  
Traits: casual, direct, first person; honest ("I got this wrong first"); short paragraphs, real code, no filler; humor is seasoning (one joke or sticker per section at most).

| Do | Don't |
| :-- | :-- |
| "How I Built Scroll Animations in Next.js (GSAP ScrollTrigger)" | "bro this scroll thing is lowkey crazy" |
| Open with the real problem in plain words, then the fix | Stack slang in every sentence |
| Define terms on first use | Assume every acronym is known |
| Show what failed and why | Pretend it worked first try |
| Be specific: numbers, code, screenshots | Corporate filler ("In today's fast-paced digital landscape...") |

Light slang bank (sparingly, never in titles): "lowkey", "cooked", "ship it", "no cap". If a line needs explaining, use plain English. Keep it friendly and beginner-safe: no insults, stereotypes or profanity.

## 5. Templates
**How I built it (default):** Hook (problem, 2 sentences) → TL;DR → What I tried first → Working solution (code + live preview) → Gotchas (performance, a11y, reduced motion) → Try it (component page, install, AI prompt) → What I'd do differently.  
**Learning in public (short):** What I was doing → What broke → What I learned (3 bullets) → Link to code.  
**Build log:** Status and numbers → What shipped → What went wrong → What's next.  
**Opinion:** Claim → Evidence from my work → Fair counterpoint → Recommendation.

## 6. SEO rules per post
| Item | Rule |
| :-- | :-- |
| Target query | One primary query per post |
| Title | < 60 chars, keyword near the start, plain language |
| Summary | 140 to 160 chars, includes keyword, promises the answer |
| Slug | Short, hyphenated, keyword-based; never change after publish (redirect if you must) |
| Headings | One H1; H2s phrase questions or steps |
| First 100 words | Primary keyword, naturally |
| Images | `next/image`, dimensions, descriptive alt, WebP |
| Links | 2+ internal (related post + component page on `ui.ubed.in`); official docs for citations |
| Structured data | `BlogPosting` JSON-LD from frontmatter |
| Updates | Bump `updatedAt` on material changes; refresh instead of duplicating |
| Thin tag pages | noindex until 2+ posts |

## 7. Frontmatter
See `docs/ARCHITECTURE.md` section 6 for the schema. Keep `draft: true` until the checklist passes. `relatedComponent` must match a slug on `ui.ubed.in`.

## 8. Formatting
Paragraphs 1 to 4 sentences. Code blocks always have a language tag, minimal and runnable, first-line comment with file path. Prefer one live preview to three screenshots. Callouts for gotchas (`> **Gotcha:** ...`). Lists for steps; tables for comparisons. Bold only the key term or warning.

## 9. Stickers and memes
Original or properly licensed only. No screenshots/characters from films, anime, games or famous meme photos. Max one per section; always alt text (or `alt=""` if decorative). Never let a sticker carry the explanation.

## 10. Writing with AI agents
1. You supply real experience; the agent must not invent anecdotes, benchmarks or quotes.
2. Run every code sample yourself.
3. Rewrite generic AI phrasing in your voice.
4. Fact-check library behaviour against official docs.

Prompt (draft a post):
```
Act as an editor for my dev blog (Gen Z casual voice, but clear).
Topic: <topic>   Primary keyword: <keyword>
What I did / what broke / what fixed it: <notes and code>
Write a "How I built it" post: Hook, TL;DR, What I tried first, Working
solution (code), Gotchas (performance, accessibility, reduced motion),
Try it, What I'd do differently.
Rules: use ONLY my facts and code; no invented stories or numbers;
title < 60 chars with the keyword; summary 140-160 chars; plain keyword
headings, casual body; output MDX with frontmatter per docs/ARCHITECTURE.md.
```
Prompt (tighten): `Edit this draft for clarity and voice. Keep meaning and code unchanged. Cut filler, keep casual tone, flag anything unverified. Do not add new claims.`

## 11. Publishing workflow
1. Idea in backlog (issue label `content`).
2. Branch `content/<slug>`; draft in `src/content/blog/<slug>.mdx` with `draft: true`.
3. Run code samples; go through the checklist.
4. PR; review the preview on mobile and desktop; check OG image.
5. `draft: false`, set `publishedAt`; squash merge.
6. Verify live: page, sitemap, RSS item, JSON-LD.
7. Optionally request indexing in Search Console; share.

### Pre-publish checklist
- [ ] Keyword in title, H1, first 100 words, one H2
- [ ] Title < 60 chars; summary 140 to 160
- [ ] Cover + alt; images optimised
- [ ] Code runs; paths and versions stated
- [ ] 2+ internal links; `relatedComponent` valid
- [ ] Gotchas include performance + a11y/reduced motion
- [ ] No invented claims; facts verified
- [ ] No copyrighted memes/screenshots
- [ ] Frontmatter passes schema; `draft: false`
- [ ] Lighthouse check on preview; OG image renders

## 12. Promotion
| Channel | What |
| :-- | :-- |
| X / LinkedIn | Short demo clip + problem + link |
| Dev.to / Hashnode / Reddit / Discord | Cross-post with canonical link to `ubed.in`, a day or two after publishing |
| GitHub / npm | README links to posts |
| Newsletter (later) | Monthly roundup |

## 13. Cadence and backlog
Target one post per 1 to 2 weeks (minimum one per month). Keep 10 ideas banked. Pair each new component with one post.

First 10 ideas: (1) Setting up a two-repo ecosystem: portfolio + UI library; (2) Pinned scroll sections with GSAP (and why they jump); (3) A marquee that speeds up with scroll velocity; (4) Buttons that dodge your cursor with Framer Motion; (5) Making GSAP respect `prefers-reduced-motion`; (6) Server-first animated sites in Next.js without losing SEO; (7) Publishing a React library to npm with provenance; (8) A shadcn-style registry for your own components; (9) Prompts that make AI agents use your UI components correctly; (10) A sticker system without copyright headaches.

## 14. Metrics (monthly)
Search Console (impressions, clicks, queries) → what to refresh; Vercel Analytics → what resonates; Speed Insights → regressions; npm/GitHub (from `ubed-ui`) → library traction. Decide monthly: post to refresh, component to build next, channel to drop or double down on.

## 15. Legal and ethics
No client confidential details (anonymise); credit sources; paraphrase and link rather than copy; disclose affiliate/sponsor links; do not imply endorsement by GSAP, Vercel, etc.
