# Project Memory & Context Bank (`memory.md`)

> **CRITICAL AGENT DIRECTIVE**: This file is the single source of persistent memory across sessions. Any AI assistant or developer working on this project must read this file upon initialization and update it before completing any task.

---

## 1. Project Profile & Current Architecture

| Property | Value |
| :--- | :--- |
| **Owner / Creator** | Ubed Khan (Full-Stack Developer & UI/UX Designer) |
| **Framework** | Next.js 16.4.6 (App Router) + React 19.1.0 |
| **Language** | TypeScript 5.8 (Strict mode, zero `any`) |
| **Styling** | Tailwind CSS v3.4 + PostCSS (ESM) |
| **Display Typography** | Self-hosted `Republica Minor 2.0` (`/fonts/Republica-Minor-2.0.woff`, Zero CLS) |
| **Motion & Scroll** | GSAP 3.15 (`@gsap/react`), Framer Motion 12.23, Lenis 1.1 |
| **Target Subdomains** | `ubed.in` (Portfolio & Blog Reader)<br/>`ui.ubed.in` (UI Component Library Showcase via `ubed-ui`) |
| **Ecosystem Topology** | Two Independent Repositories:<br/>1. `ubed-web` (Portfolio & MDX Blog)<br/>2. `ubed-ui` (`@ubed/ui` package + docs site + registry) |
| **Content Strategy** | Git-based MDX (in-repo at `src/content/blog/`), Zod frontmatter validation. No database. No admin panel. |

---

## 2. Completed Milestones & Changelog

### Phase 1: Next.js 16 & TypeScript Migration (Completed: 2026-11-17)
- [x] **Vite Deprecation**: Completely removed Vite, `index.html`, `vite.config.js`, and redundant CDN scripts (Locomotive Scroll, FontAwesome).
- [x] **Next.js 16 Upgrade**: Configured Next.js 16 App Router with React 19 support.
- [x] **TypeScript Strict Typing**: Migrated 100% of `.jsx` and `.js` files to `.tsx` and `.ts` with typed interfaces in `src/types/` (`project.ts`, `skill.ts`, `about.ts`, `contact.ts`, `blog.ts`, `ui-library.ts`).
- [x] **Asset & Font Relocation**:
  - Moved font `Republica-Minor-2.0.woff` to `public/fonts/` with `@font-face` in `globals.css` (Zero CLS, 100% offline).
  - Organized project, skill, element, and transition block images into `public/images/`.
- [x] **Zero-SEO-Loss Server Islands**:
  - Headings, semantic HTML (`<header>`, `<main>`, `<article>`, `<section>`, `<h1>`-`<h6>`), and JSON-LD schema rendered via Server Components.
  - GSAP, ScrollTrigger, Framer Motion, and Lenis isolated in client islands (`"use client"`).
- [x] **Blog Reader Foundation**:
  - Public blog routes created at `/blog` (listing) and `/blog/[slug]` (article reader with dynamic metadata).
  - Sample articles published in `src/data/blogs.ts`.
- [x] **Backend API Routes**:
  - `/api/contact`: Server-side validated contact submission handler using `WEB3_API_KEY`.
- [x] **SEO & Discoverability**:
  - Dynamic `src/app/sitemap.ts` and `src/app/robots.ts`.
  - Structured JSON-LD schema (`Person`, `WebSite`, `BlogPosting`, `CreativeWork`).
  - OpenGraph & Twitter cards configured in `src/app/layout.tsx`.
- [x] **Build Verification**:
  - `npm run typecheck` (`tsc --noEmit`) -> **0 errors**.
  - `npm run build` -> **Exit code 0** (all 8 static/dynamic routes compiled).

### Hotfix: Turbopack Windows File Lock Resolution (2026-11-17)
- [x] **Root Cause**: An active Node dev process held an open file handle on `node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js` during initial package installation.
- [x] **Resolution**: Cleanly reinstalled `next@latest` without conflicting locks.
- [x] **Verification**: Confirmed `next dev` boots with Turbopack in **745ms** with zero missing module errors.

### UI Update: Hero Bitmoji Responsive Positioning (2026-11-17)
- [x] **Phone & Tablet**: Vertically and horizontally centered in the Hero viewport (`top-[52%] -translate-y-1/2 flex justify-center items-center`).
- [x] **Desktop & Ultrawide**: Positioned near the bottom with dedicated breathing space (`laptop:top-auto laptop:translate-y-0 laptop:bottom-8 desktop:bottom-12 2xl:bottom-14 laptop:items-end`).
- [x] **Files Modified**: `src/components/ui/HeroInteractiveBitmoji.tsx`.
- [x] **Verification**: `npm run typecheck` passed (0 errors).

### Semantic HTML Refactor (2026-11-17)
- [x] **Objective**: Replace generic `<div>`/`<span>` wrappers with semantic HTML5 elements across all section components for improved accessibility, SEO, and maintainability.
- [x] **Components Updated**: `Hero.tsx`, `AboutMe.tsx`, `Skills.tsx`, `Projects.tsx`, `Contact.tsx`, `Footer.tsx`, `ScrollSlider.tsx`, `page.tsx`.
- [x] **Hotfix**: Fixed invalid HTML in `Hero.tsx` where `<PassionText>` was nested in `<p>` — changed to `<div aria-live="polite">`.
- [x] **Verification**: `npm run typecheck` -> **0 errors**; `npm run build` -> **Exit code 0**.

### Feature: GSAP ScrollTrigger Pinned Timeline on AboutMe Section (2026-11-17)
- [x] **Timeline Sequence**: `pin: true`, `start: "top top"`, `end: "+=320%"`, `scrub: 1`, `anticipatePin: 1`. Step 1: Heading & corner stickers slide in; Step 2: Main card scales in; Step 3: Paragraph words reveal on scroll; Step 4: Resume button appears; Step 5: Read/hold phase.
- [x] **Verification**: `npm run typecheck` passed (0 errors), `npm run build` passed (Exit code 0).

### Bugfix: GSAP ScrollTrigger React 19 Route Transition & Image Optimization (2026-11-17)
- [x] **GSAP DOM Spacer Reparenting Fix**: Separated root container `<section ref={containerRef}>` from inner pinned `<div ref={pinRef}>` across `AboutMe.tsx`, `Skills.tsx`, `Projects.tsx`. Eliminated DOM insertion errors.
- [x] **GSAP Plugin Registration**: Registered `useGSAP` alongside `ScrollTrigger` via `gsap.registerPlugin(useGSAP, ScrollTrigger)`.
- [x] **Lenis & ScrollTrigger Synchronization**: Bound `lenisInstance.on('scroll', ScrollTrigger.update)` and driven via `gsap.ticker.add`.
- [x] **Next.js Image `sizes` Props**: Added responsive `sizes` props to all fill images.
- [x] **Verification**: `npm run typecheck` -> 0 errors; `npm run build` -> Exit code 0.

### Milestone: Custom Domain `ubed.in` Integration (2026-11-18)
- [x] **Domain Acquisition**: Registered custom domain `ubed.in`.
- [x] **Codebase Base URL Migration**: Updated site URLs to `https://ubed.in` across `layout.tsx`, `sitemap.ts`, `robots.ts`, `seo.ts`.

### Architecture Pivot: Two-Repo Ecosystem & In-Repo MDX Blog (2026-11-19)
- [x] **Architectural Decision**:
  - Abandoned monolithic / centralized database CMS and separate `admin` panel approach.
  - Adopted a clean **Two-Repository Strategy**:
    1. `ubed-web` (Portfolio & MDX Blog at `ubed.in`)
    2. `ubed-ui` (UI Component Library package `@ubed/ui` + docs site + shadcn-style registry at `ui.ubed.in`)
  - Portfolio will consume `@ubed/ui` directly from npm.
  - Blog articles will live as static MDX files in `src/content/blog/` with Zod frontmatter schema validation.
- [x] **Documentation Suite Migration & Alignment**:
  - Updated all documentation in `docs/`: `ARCHITECTURE.md`, `PRD.md`, `DESIGN.md`, `RULES.md`, `MAINTENANCE.md`, `SEO_PLAN.md`.
  - Added new specifications: `CONTENT_GUIDE.md`, `DECISIONS.md`, `PHASES.md`, `DEPLOYMENT.md`.
  - Updated root files: `README.md`, `AGENTS.md`, `LICENSES.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.env.example`.
- [x] **Verification**: Verified zero errors in TypeScript and documentation integrity.

---

## 3. Directory Map & File Inventory

```
ubedkhan/
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
│   ├── fonts/Republica-Minor-2.0.woff
│   ├── images/
│   │   ├── elements/                      # Bitmoji, floating stickers
│   │   ├── projects/                      # Project previews
│   │   ├── skills/                        # Skill icons
│   │   └── transition-blocks/             # Slider background blocks
│   └── bitmoji.webp
├── src/
│   ├── app/                               # Next.js 16 App Router
│   │   ├── page.tsx                       # Main portfolio landing page (Server Component)
│   │   ├── layout.tsx                     # Root layout (fonts, metadata, JSON-LD)
│   │   ├── not-found.tsx                  # Custom 404 page
│   │   ├── global-error.tsx               # Root error boundary
│   │   ├── globals.css                    # Tailwind + Republica font + transition blocks
│   │   ├── sitemap.ts                     # Dynamic sitemap.xml generator
│   │   ├── robots.ts                      # Dynamic robots.txt
│   │   ├── blog/                          # Public blog reader (/blog and /blog/[slug])
│   │   └── api/                           # Backend route handlers (/api/contact)
│   ├── components/
│   │   ├── common/                        # MouseFollower, Preloader
│   │   ├── layout/                        # NavBar, Footer, FooterBlinker
│   │   ├── sections/                      # Hero, ScrollSlider, AboutMe, Skills, Projects, Contact
│   │   ├── ui/                            # ContactForm, HeroCtaButton, PassionText, ProjectHead
│   │   └── providers/                     # SmoothScrollProvider (Lenis)
│   ├── data/                              # Typed data: about.ts, blogs.ts, projects.ts, skills.ts
│   ├── lib/                               # Utilities: utils.ts (cn, repel), seo.ts (schemas), fonts.ts
│   └── types/                             # Type definitions: project, skill, blog, about, contact
├── .env.example                           # Environment variable schema
├── .gitignore                             # Ignore rules
├── AGENTS.md                              # AI agent operational guide
├── LICENSES.md                            # Asset and dependency licenses
├── memory.md                              # Persistent memory bank & context tracking
├── next.config.ts                         # Next.js 16 configuration
├── package.json                           # Scripts and dependencies
├── postcss.config.mjs                     # PostCSS config
├── README.md                              # Master project overview & SOP blueprint
├── tailwind.config.ts                     # Tailwind config
└── tsconfig.json                          # Strict TypeScript config
```

---

## 4. Pending Roadmap & Next Steps

1. **Custom Domain (`ubed.in`) & Vercel Deployment**:
   - [x] Purchased domain `ubed.in`.
   - [ ] Add `ubed.in` and `www.ubed.in` in Vercel project Settings -> Domains.
   - [ ] Add apex `A` and `CNAME` DNS records at domain registrar as documented in [docs/MAINTENANCE.md](file:///d:/CODING/Portfolio%20+%20UI%20Library/ubed-web/docs/MAINTENANCE.md).
   - [ ] Update Vercel environment variable `NEXT_PUBLIC_SITE_URL=https://ubed.in`.
   - [ ] Verify ownership in Google Search Console via DNS TXT record or HTML tag.
2. **MDX Blog Pipeline Setup**:
   - Install MDX content loader and configure Zod frontmatter schema.
   - Author and publish initial technical posts (`content/blog/*.mdx`).
3. **`ubed-ui` Workspace Setup & Package Publishing**:
   - Initialize pnpm monorepo in `ubed-ui/` (`packages/ui` + `apps/docs`).
   - Extract launch components (`velocity-marquee`, `repel-button`, `word-reveal-text`, `card-deck-stack`, `sticker`).
   - Publish `@ubed/ui` to npm and deploy `ui.ubed.in`.
4. **Integrate `@ubed/ui` into `ubed-web`**:
   - Swap local reusable components with package imports from `@ubed/ui`.

---

## 5. Memory Maintenance Protocol (The Rules)

1. **Always Read `memory.md` First**: Before taking action on any user request, read this file to synchronize state.
2. **Record Every Structural Change**: When adding a component, modifying an API route, or updating documentation, immediately log the change under Changelog.
3. **Keep the Directory Map Synchronized**: Update Section 3 whenever files/folders are modified.
4. **Log Verification Results**: Document the outcome of `npm run typecheck` and `npm run build`.
