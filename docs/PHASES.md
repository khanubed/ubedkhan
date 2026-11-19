# PHASES: ubed-web

About 10 to 15 focused hours per week. Each phase = GitHub milestone; each task = issue. The library work happens in `ubed-ui` (see its PHASES.md); only the integration points are listed here.

| Phase | Goal | Duration | Exit criteria |
| :-- | :-- | :-- | :-- |
| 0 Foundations | Repo, domain, deploy | 2 to 4 days | Portfolio live on `ubed.in`; CI runs |
| 1 SEO baseline | Crawlable, fast portfolio | 1 week | Lighthouse 95+; Search Console verified |
| 2 Blog | Start publishing | 1 to 1.5 weeks | `/blog` live with 2 posts; RSS valid |
| 3 Integrate library | Swap local components for `@ubed/ui` | 3 to 5 days (after first release) | No duplicated reusable components in this repo |
| 4 Launch support | Posts and links for the library launch | 1 week | Per-component posts live; cross-links working |
| 5 Operate | Cadence | Ongoing | 3 months of steady posting |

## Phase 0: Foundations
- [x] W0-1 Check and buy `ubed.in` (GoDaddy) (Acquired)
- [x] W0-2 Create `ubed-web` repo; move current app in (Completed)
- [x] W0-3 Strict TS, Next.js 16 App Router, Tailwind setup (Completed)
- [ ] W0-4 Vercel project; add `ubed.in` + `www`; DNS from Vercel dashboard (2 h)
- [ ] W0-5 Branch protection; basic CI (typecheck, lint, build) (2 h)
- [x] W0-6 `.env.example`, `LICENSES.md`, docs folder committed (Completed)

## Phase 1: SEO baseline
- [x] W1-1 Metadata, canonical, OG image, `sitemap.ts`, `robots.ts` (Completed)
- [x] W1-2 JSON-LD Person + WebSite (Completed)
- [x] W1-3 Fix LCP/CLS: `next/font`, image sizes, dynamic-import GSAP/Lenis (Completed)
- [ ] W1-4 Lighthouse CI with budgets (2 h)
- [ ] W1-5 Contact hardening: Zod, honeypot, Turnstile, Upstash (4 h)
- [ ] W1-6 Search Console + Bing; submit sitemap (1 h)
- [ ] W1-7 Reduced-motion pass on all existing animations (3 h)
- [ ] W1-8 Confirm font/avatar license terms; fill `LICENSES.md` (1 h)

## Phase 2: Blog
- [ ] W2-1 MDX pipeline + Zod frontmatter schema (4 h)
- [x] W2-2 Blog index foundation (`/blog`) (Completed)
- [ ] W2-3 Post page: TOC, code highlight + copy, share, related (5 h)
- [ ] W2-4 Tag pages (noindex if < 2 posts) (2 h)
- [x] W2-5 RSS, sitemap entries, `BlogPosting` JSON-LD, post OG image (Initial schema completed)
- [ ] W2-6 Write and publish 2 posts (6 h)

## Phase 3: Integrate `@ubed/ui`
Starts after `@ubed/ui@0.1.0` exists.
- [ ] W3-1 `pnpm add @ubed/ui` + peers; import `styles.css`; map tokens (2 h)
- [ ] W3-2 Replace local marquee/sticker/etc. with package versions one at a time; visual diff each (1 h each)
- [ ] W3-3 Delete replaced local components; update `LICENSES.md`/docs (1 h)
- [ ] W3-4 Dependabot/Renovate for `@ubed/ui` (1 h)
- [ ] W3-5 Lighthouse regression check after swap (1 h)

## Phase 4: Launch support
- [ ] W4-1 Launch post for the library (3 h)
- [ ] W4-2 One post per released component (3 h each); set `relatedComponent`
- [ ] W4-3 Cross-links (footer, nav, posts to component pages) (2 h)
- [ ] W4-4 Share posts per `CONTENT_GUIDE.md` promotion rules (2 h)

## Phase 5: Operate
Weekly: CI/Dependabot, post. Monthly: deps, Lighthouse + axe, Search Console, refresh top posts. Quarterly: license review, rotate secrets, prune. Yearly: domain renewal (auto-renew), hosting terms.
