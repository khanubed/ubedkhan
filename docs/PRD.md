# PRD: ubed-web (Portfolio + Blog)

**Owner:** Ubed Khan | **Version:** 1.0 | **Repo:** `ubed-web` | **Domain:** `ubed.in`  
Sibling project: `ubed-ui` (library + docs, `ui.ubed.in`). See its own PRD.

## 1. Vision
An authoritative, fast, animated personal site that shows craft (portfolio) and thinking (blog), and drives traffic to the UI library.

## 2. Problems and solutions
| Problem | Solution |
| :-- | :-- |
| Portfolio shows output, not thinking; little search traffic | MDX blog with learning-in-public posts, SEO-first |
| Animated components duplicated across projects | Portfolio consumes `@ubed/ui` instead of local copies |
| Heavy animation can hurt SEO/CWV | Server components for content, client islands for motion |

## 3. Personas
1. Recruiters / engineering leads: want proof of depth, clean code, performance.
2. Founders / clients: want an end-to-end builder.
3. Frontend / creative devs: want technical insight and links to the UI library.

## 4. KPIs
| Metric | Target | Measured by |
| :-- | :-- | :-- |
| Lighthouse performance (mobile + desktop) | 95+ | Lighthouse CI |
| Lighthouse a11y / SEO | 100 / 100 | Lighthouse CI + axe |
| CLS / LCP / INP | < 0.05 / < 2.5 s / < 200 ms | Speed Insights |
| `tsc --noEmit` | 0 errors | CI |
| Indexation | `ubed.in` verified, sitemap submitted | Search Console |
| Content cadence | 1 post per 1 to 2 weeks | Calendar |

## 5. Scope
### In scope (v1)
- Portfolio: hero, marquee, about, skills, projects, contact, footer, custom cursor (existing)
- Blog: list, post, tags, RSS, sitemap, OG images, JSON-LD
- Contact form with spam protection (Zod, honeypot, Turnstile, Upstash rate limit)
- Sticker usage via `@ubed/ui` (once released)
- Analytics + monitoring

### Out of scope (v1)
Admin panel / DB CMS, accounts, comments, newsletter backend, i18n, the UI library and its docs (they live in `ubed-ui`).

## 6. Features
### F1 Portfolio
- Server-rendered text for every section; GSAP/Lenis/Framer in client islands only.
- Hero: monumental "UBED KHAN" type, avatar with physics, rotating tagline, spring CTA.
- Marquee: dual-row, accelerates with scroll velocity.
- About: glass card with word reveal, floating stickers, resume button.
- Skills: pinned GSAP timeline.
- Projects: pinned 3D card deck; each project has live URL, GitHub, features, tags, screenshot.
- Contact: text unmask wipe; form to `/api/contact` (Zod, honeypot, Turnstile, rate limit).
- Footer: big type, nav, socials, neon SVG blinker.
- Custom cursor (fine pointers only).

### F2 Blog
- `/blog` list newest first, category/tag links, reading time, cover.
- `/blog/[slug]`: MDX, TOC, code copy, share, related posts, `BlogPosting` JSON-LD, dynamic OG image.
- `/blog/tag/[tag]`: static; noindex if fewer than 2 posts.
- `/rss.xml`, `/sitemap.xml`, `/robots.txt`.
- Posts can embed a live component from `@ubed/ui` and link to its page on `ui.ubed.in`.

### F3 Integration with ubed-ui
- Depends on `@ubed/ui` (semver range). Theme variables imported from `@ubed/ui/styles.css`.
- Blog posts link to component pages via `relatedComponent` frontmatter.

## 7. Non-functional requirements
- SEO: full semantic HTML in the initial response.
- A11y: WCAG 2.1 AA; reduced-motion for every animation.
- Performance: static generation; dynamic import of heavy animation code.
- Cost: near zero (Vercel Hobby, free tiers).

## 8. Assumptions, constraints, dependencies
- One developer, about 10 to 15 hours/week.
- Custom domain `ubed.in` is acquired.
- Vercel Hobby is non-commercial; move to Pro if monetised.
- Depends on domain registrar, Vercel, GitHub, Search Console, Turnstile, Upstash, mail provider, font/GSAP licenses.
- Depends on `@ubed/ui` releases for shared components (portfolio keeps local versions until the package exists).

## 9. Risks
| Risk | Mitigation |
| :-- | :-- |
| Animation hurts CWV/SEO | Server-first, islands, Lighthouse budgets |
| Package release blocks portfolio work | Keep local components until released; test with prerelease/snapshot versions |
| License issues (fonts, avatar, stickers) | `LICENSES.md`; original/licensed assets only |
| Content burnout | Realistic cadence; reuse project work |
| Vercel Hobby terms | Portable Next.js output; move host if needed |

## 10. Success criteria
`ubed.in` live with HTTPS; Lighthouse budgets met on all public routes; 2 posts published; indexed; portfolio importing at least the shared sticker/marquee components from `@ubed/ui`.
