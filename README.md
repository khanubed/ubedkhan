# ubed-web

Personal portfolio and technical blog of **Ubed Khan** (Full-Stack Developer & UI/UX Designer).  
Live at **https://ubed.in**.

Built with **Next.js 16 (App Router)**, **React 19**, **Strict TypeScript**, **Tailwind CSS**, **GSAP 3.15 ScrollTrigger**, **Lenis Smooth Scroll**, and **Framer Motion 12**.  
Blog is static MDX in-repo. No database. No admin panel.

---

## 1. The Ecosystem (Two Repositories)

| Repository | Responsibility | Target / Outputs |
| :-- | :-- | :-- |
| **`ubed-web`** (this repo) | Portfolio + technical blog | `https://ubed.in` |
| **`ubed-ui`** (sibling repo) | Animated UI component library + documentation + registry | `@ubed/ui` (npm) + `https://ui.ubed.in` |

This repo **consumes** `@ubed/ui` from npm for reusable components (velocity marquee, stickers, buttons). Reusable component engineering and tests live in `ubed-ui`. Portfolio-only compositions (Hero, Projects deck, About me timeline) stay here.

```mermaid
graph TD
    V[Visitor / Crawler] --> W[ubed.in Next.js 16 on Vercel]
    W --> C[(MDX Blog Posts in Git)]
    W --> U[@ubed/ui from npm]
    W --> F[/api/contact]
    F --> T[Cloudflare Turnstile]
    F --> R[Upstash Rate Limit]
    F --> M[Web3Forms / Resend]
    W -. cross-links .-> D[ui.ubed.in Docs & Registry]
```

---

## 2. Quick Start

```bash
# Install dependencies
pnpm install

# Setup local environment variables
cp .env.example .env.local

# Run development server (Turbopack)
pnpm dev

# Verification checks
pnpm typecheck
pnpm lint
pnpm build
```

---

## 3. Directory Layout

```
ubed-web/
├── docs/                                  # Project Documentation Suite
│   ├── ARCHITECTURE.md                    # System architecture & rendering specs
│   ├── PRD.md                             # Product requirements & KPIs
│   ├── DESIGN.md                          # Typography, tokens & animation specs
│   ├── RULES.md                           # Strict coding rules for humans & agents
│   ├── MAINTENANCE.md                     # DNS, runbooks & troubleshooting
│   ├── SEO_PLAN.md                        # Structured JSON-LD & Core Web Vitals
│   ├── CONTENT_GUIDE.md                   # Blog writing, SEO & publishing guide
│   ├── DECISIONS.md                       # Architectural decisions log
│   └── PHASES.md                          # Execution phases & milestones
├── public/                                # Static Public Assets
│   ├── fonts/Republica-Minor-2.0.woff     # Display font (zero CLS)
│   ├── images/                            # Optimized WebP assets
│   │   ├── elements/                      # Bitmoji, stickers
│   │   ├── projects/                      # Project screenshots
│   │   ├── skills/                        # Skill icons
│   │   └── transition-blocks/             # Slider background blocks
│   └── bitmoji.webp
├── src/
│   ├── app/                               # Next.js 16 App Router
│   │   ├── page.tsx                       # Main portfolio landing page (Server Component)
│   │   ├── layout.tsx                     # Root layout (fonts, metadata, JSON-LD)
│   │   ├── not-found.tsx                  # Custom 404 page
│   │   ├── globals.css                    # Tailwind + Republica font + tokens
│   │   ├── sitemap.ts                     # Dynamic sitemap.xml
│   │   ├── robots.ts                      # Dynamic robots.txt
│   │   ├── blog/                          # Public blog reader (/blog and /blog/[slug])
│   │   └── api/                           # Backend route handlers (/api/contact)
│   ├── components/
│   │   ├── common/                        # MouseFollower, Preloader
│   │   ├── layout/                        # NavBar, Footer, FooterBlinker
│   │   ├── sections/                      # Hero, ScrollSlider, AboutMe, Skills, Projects, Contact
│   │   ├── ui/                            # ContactForm, HeroCtaButton, PassionText, ProjectHead
│   │   └── providers/                     # SmoothScrollProvider (Lenis)
│   ├── data/                              # Typed datasets: about.ts, blogs.ts, projects.ts, skills.ts
│   ├── lib/                               # Utilities: utils.ts (cn, repel), seo.ts, fonts.ts
│   └── types/                             # Type definitions: project, skill, blog, about, contact
├── .env.example                           # Environment variable schema
├── .gitignore                             # Ignore rules
├── AGENTS.md                              # AI agent operational guide
├── LICENSES.md                            # Asset and dependency licenses
├── memory.md                              # Persistent project memory bank
├── next.config.ts                         # Next.js 16 configuration
├── package.json                           # Scripts and dependencies
├── tailwind.config.ts                     # Tailwind config
└── tsconfig.json                          # Strict TypeScript config
```

---

## 4. Key Architectural Standards

1. **Server-First by Default**: Every section delivers semantic HTML (`<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<figure>`, `<h1>`-`<h6>`) directly in the initial HTTP response for instant crawler indexation.
2. **Client Island Isolation**: GSAP, Framer Motion, and Lenis are strictly scoped within `"use client"` components and never withhold textual content.
3. **Zero CLS Typography**: Display font `Republica Minor 2.0` is self-hosted with `@font-face` in `public/fonts/` with zero layout shifting.
4. **Clean Animations**: All GSAP timelines run inside `useGSAP` with scoped DOM references, automatic cleanup on unmount, and a `prefers-reduced-motion` fallback.
5. **Component Sourcing**: Reusable UI primitives belong in `ubed-ui` and are imported via `@ubed/ui`.

---

## 5. Documentation Hub

| Document | Purpose |
| :-- | :-- |
| [AGENTS.md](./AGENTS.md) | Entry point for AI agents & contributors |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Architecture specification & rendering topology |
| [docs/PRD.md](./docs/PRD.md) | Product vision, target audience & KPIs |
| [docs/DESIGN.md](./docs/DESIGN.md) | Visual language, token systems & motion tokens |
| [docs/RULES.md](./docs/RULES.md) | Coding guidelines & engineering standards |
| [docs/MAINTENANCE.md](./docs/MAINTENANCE.md) | Custom domain DNS records, environment config & runbook |
| [docs/SEO_PLAN.md](./docs/SEO_PLAN.md) | Structured data schemas & Core Web Vitals optimization |
| [docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md) | Blog writing guide, voice, formatting & checklist |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Architectural decision record (ADR) |
| [docs/PHASES.md](./docs/PHASES.md) | Phased roadmap and delivery tasks |
| [LICENSES.md](./LICENSES.md) | Asset licenses & open source attribution |
| [memory.md](./memory.md) | Persistent memory bank & session tracking |

---

## 6. License

Code: MIT. Blog content and personal branding assets: All Rights Reserved. See [LICENSES.md](./LICENSES.md).
