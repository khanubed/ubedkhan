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
| **Display Typography** | Self-hosted `Republica Minor 2.0` (`/fonts/Republica-Minor-2.0.woff`) |
| **Motion & Scroll** | GSAP 3.15 (`@gsap/react`), Framer Motion 12.23, Lenis 1.1 |
| **Target Subdomains** | `ubed.in` (Portfolio & Blog Reader)<br/>`admin.ubed.in` (Separate CMS App)<br/>`ui.ubed.in` (UI Component Library Showcase) |
| **Database Strategy** | Option B: Central Database CMS (PostgreSQL/MongoDB via Prisma) |

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
  - `/api/blogs`: REST API endpoint ready for the future database CMS.
- [x] **SEO & Discoverability**:
  - Dynamic `src/app/sitemap.ts` and `src/app/robots.ts`.
  - Structured JSON-LD schema (`Person`, `WebSite`, `BlogPosting`, `CreativeWork`).
  - OpenGraph & Twitter cards configured in `src/app/layout.tsx`.
- [x] **Build Verification**:
  - `npm run typecheck` (`tsc --noEmit`) -> **0 errors**.
  - `npm run build` -> **Exit code 0** (all 8 static/dynamic routes compiled).

### Documentation Suite Completed in `docs/`
- [x] `docs/PRD.md`: Product Requirements Document (vision, audience, KPIs, roadmap).
- [x] `docs/ARCHITECTURE.md`: Architecture spec, multi-domain topology, server component islands, Prisma schema.
- [x] `docs/DESIGN.md`: Typography scales, neon palette, micro-interaction physics math, surface tokens.
- [x] `docs/RULES.md`: Development rules, TypeScript standards, GSAP scoping, memory maintenance rules.
- [x] `docs/MAINTENANCE.md`: Operations guide, DNS records (A/CNAME), content publishing guides, runbook.
- [x] `docs/SEO_PLAN.md`: Comprehensive SEO blueprint, structured schemas, Core Web Vitals optimization.

### Hotfix: Turbopack Windows File Lock Resolution (2026-11-17)
- [x] **Root Cause**: An active Node dev process held an open file handle on `node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js` during initial package installation, causing npm on Windows to skip writing the file with `TAR_ENTRY_ERROR ENOENT`.
- [x] **Resolution**: Cleanly reinstalled `next@latest` without conflicting locks, restoring `app-page-turbo.runtime.dev.js`.
- [x] **Verification**: Confirmed `next dev` boots with Turbopack in **745ms** with zero missing module errors.

### UI Update: Hero Bitmoji Responsive Positioning (2026-11-17)
- [x] **Phone & Tablet**: Vertically and horizontally centered in the Hero viewport (`top-[52%] -translate-y-1/2 flex justify-center items-center`) so it sits naturally in the focal point between the headline and the bottom controls.
- [x] **Desktop & Ultrawide**: Positioned near the bottom with dedicated breathing space (`laptop:top-auto laptop:translate-y-0 laptop:bottom-8 desktop:bottom-12 2xl:bottom-14 laptop:items-end`).
- [x] **Files Modified**: `src/components/ui/HeroInteractiveBitmoji.tsx`.
- [x] **Verification**: `npm run typecheck` passed (0 errors).

### Semantic HTML Refactor (2026-11-17)
- [x] **Objective**: Replace generic `<div>`/`<span>` wrappers with semantic HTML5 elements across all section components for improved accessibility, SEO, and maintainability.
- [x] **Components Updated**:
  - `Hero.tsx`: Added `<header>` for heading, `<figure>` for avatar, `<div>` wrapper for animated text (fixing hydration error from `<p>` containing `<div>`).
  - `AboutMe.tsx`: Main card → `<article>` with `<header>`/`<footer>`; heading gets `id="about-heading"`.
  - `Skills.tsx`: Skill rows → `<ul role="list">` with `<li>` → `<figure>` wrapping icons with `<figcaption className="sr-only">`.
  - `Projects.tsx`: Card header → `<header>`, action links → `<nav>`, features → `<section>` + `<h4>` + `<ul>`, preview → `<figure>` + `<figcaption className="sr-only">`, tech stack → `<ul>`.
  - `Contact.tsx`: Graphics → `<figure>`, text block → `<article>` with `<header>` + `<h2>` + `<address>`.
  - `Footer.tsx`: Added `role="contentinfo"`, brand → `<h2>`, socials/contact → `<nav>` with `<ul>` + `<address>`.
  - `ScrollSlider.tsx`: Wrapper → `<section>`, rows → `role="list"`, items → `role="listitem"`.
  - `page.tsx`: Section wrappers → `<section aria-label="...">`.
- [x] **Hotfix**: Fixed invalid HTML in `Hero.tsx` where `<PassionText>` (renders `<div>`) was nested in `<p>` — changed to `<div aria-live="polite">`.
- [x] **Verification**: `npm run typecheck` → **0 errors**; `npm run build` → **Exit code 0** (all 8 routes compiled).

### Feature: GSAP ScrollTrigger Pinned Timeline on AboutMe Section (2026-11-17)
- [x] **Objective**: Mirror the pinned storytelling experience from the Skills section into the About Me section.
- [x] **Timeline Sequence**:
  - `pin: true`, `start: "top top"`, `end: "+=320%"`, `scrub: 1`, `anticipatePin: 1`.
  - Step 1: "ABOUT ME" heading & corner decorative elements (Bubble, Dice, Heart, Diamond) slide in smoothly from off-screen (`x: -280` / `x: 280`, rotate, opacity).
  - Step 2: Main glassmorphic content card scales and fades into the center viewport.
  - Step 3: Paragraph text words reveal sequentially (`stagger: 0.015`) on scroll.
  - Step 4: View Resume button slides up with back ease.
  - Step 5: Dedicated hold/rest phase so the user can comfortably read before unpinning seamlessly into Skills.
- [x] **Files Modified**: `src/components/sections/AboutMe.tsx`.
- [x] **Verification**: `npm run typecheck` passed (0 errors), `npm run build` passed (Exit code 0).

### Documentation: Master README Overhaul & SOP Blueprint (2026-11-17)
- [x] **Objective**: Transform boilerplate `README.md` into an enterprise-grade documentation hub detailing the entire project vision, multi-subdomain ecosystem (`domainname.com`, `admin.domainname.com`, `ui.domainname.com`), tech stack, roadmap, and explicit SOP blueprints ready for Claude.
- [x] **Key Sections Added**:
  - Executive summary and aesthetic philosophy.
  - Mermaid architecture diagram of the multi-domain ecosystem and shared Prisma data layer.
  - Complete technical stack matrix and current feature breakdown.
  - Comprehensive master roadmap across 5 sequential phases.
  - Complete directory tree and file inventory.
  - Persistent memory bank governance guide pointing to `memory.md` and `docs/RULES.md`.
  - 6 dedicated SOP blueprints ready for Claude to generate production Standard Operating Procedures.
- [x] **Files Modified**: `README.md`.
- [x] **Verification**: `npm run typecheck` passed (0 errors), `npm run build` passed (Exit code 0).

### Bugfix: GSAP ScrollTrigger React 19 Route Transition & Image Optimization (2026-11-17)
- [x] **GSAP DOM Spacer Reparenting Fix**:
  - Separated root component wrappers from pinned elements in `AboutMe.tsx`, `Skills.tsx`, and `Projects.tsx`.
  - Pattern: Unpinned outer `<section ref={containerRef}>` remains stably rooted in React's virtual DOM tree; inner `<div ref={pinRef}>` receives `pin: pinRef.current`, ensuring ScrollTrigger's `.pin-spacer` is created strictly inside the component boundary.
  - Eliminated `NotFoundError: Failed to execute 'insertBefore' on 'Node'` and `Invalid scope` during route transitions between `/` and `/blog`.
- [x] **GSAP Plugin Registration**:
  - Explicitly registered `useGSAP` alongside `ScrollTrigger` via `gsap.registerPlugin(useGSAP, ScrollTrigger)` across `AboutMe.tsx`, `Skills.tsx`, `Projects.tsx`, `Contact.tsx`, and `ScrollSlider.tsx`.
- [x] **Lenis & ScrollTrigger Synchronization**:
  - Updated `SmoothScrollProvider.tsx` to bind `lenisInstance.on('scroll', ScrollTrigger.update)` and drive smooth scrolling via `gsap.ticker.add((time) => lenisInstance.raf(time * 1000))`, eliminating scroll position desync and jitter.
- [x] **Next.js Image `sizes` Props**:
  - Added responsive `sizes` props to all `<Image fill />` elements across `Contact.tsx` (spiral, hologram), `Skills.tsx` (laptop, bulb, hand, brain corner icons, plus 2-row skill logos), and author avatar in `blog/[slug]/page.tsx`.
- [x] **Semantic Main Page Simplification**:
  - Removed redundant outer `<section>` tags in `src/app/page.tsx`, rendering direct semantic landmarks inside `<main className="bg-black w-screen max-tablet:overflow-x-hidden">`.
- [x] **Verification**:
  - `npm run typecheck` (`tsc --noEmit`) -> **0 errors**.
  - `npm run build` -> **Exit code 0** (all 8 static/dynamic routes compiled cleanly).

### Milestone: Custom Domain `ubed.in` Integration (2026-11-18)
- [x] **Domain Acquisition**: Registered custom domain `ubed.in`.
- [x] **Codebase Base URL Migration**:
  - Updated fallback site URLs to `https://ubed.in` across `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, and `src/lib/seo.ts`.
  - Updated structured JSON-LD schemas (`Person`, `WebSite`, `CreativeWork`) to resolve to `https://ubed.in`.
- [x] **Subdomain Architecture Alignment**:
  - Replaced generic placeholder `domainname.com` with `ubed.in` (portfolio & blog), `admin.ubed.in` (CMS), and `ui.ubed.in` (UI component library) across `.env.example`, `.env.local`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/MAINTENANCE.md`, `docs/SEO_PLAN.md`, `README.md`, and `memory.md`.
- [x] **DNS Setup Blueprint**:
  - Configured DNS routing table in `docs/MAINTENANCE.md` specifying apex `A` record (`76.76.21.21`) and `CNAME` records for `www`, `admin`, and `ui` targeting `cname.vercel-dns.com`.
- [x] **Verification**:
  - `npm run typecheck` passed (0 errors), `npm run build` passed (Exit code 0).






---

## 3. Directory Map & File Inventory

```
ubedkhan/
├── docs/                                  # Project Documentation Suite
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── RULES.md
│   ├── MAINTENANCE.md
│   └── SEO_PLAN.md
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
│   │   └── api/                           # Backend route handlers (/api/contact, /api/blogs)
│   ├── components/
│   │   ├── common/                        # MouseFollower, Preloader
│   │   ├── layout/                        # NavBar, Footer, FooterBlinker
│   │   ├── sections/                      # Hero, ScrollSlider, AboutMe, Skills, Projects, Contact
│   │   ├── ui/                            # ContactForm, HeroCtaButton, PassionText, ProjectHead
│   │   └── providers/                     # SmoothScrollProvider (Lenis)
│   ├── data/                              # Typed data: about.ts, blogs.ts, projects.ts, skills.ts
│   ├── lib/                               # Utilities: utils.ts (cn, repel), seo.ts (schemas), fonts.ts
│   └── types/                             # Type definitions: project, skill, blog, about, contact, ui-library
├── .env.example                           # Environment variable schema
├── .gitignore                             # Ignore rules (.next, .env*.local, node_modules)
├── memory.md                              # Persistent memory bank & context tracking
├── next.config.ts                         # Next.js 16 configuration
├── package.json                           # Scripts and dependencies
├── postcss.config.mjs                     # PostCSS config
├── README.md                              # Master project overview & SOP blueprint
├── tailwind.config.ts                     # Tailwind config (custom screens & typography)
└── tsconfig.json                          # Strict TypeScript config
```

---

## 4. Pending Roadmap & Next Steps

1. **Custom Domain (`ubed.in`) & Vercel Deployment**:
   - [x] Purchased domain `ubed.in`.
   - [ ] Add `ubed.in` and `www.ubed.in` in Vercel project Settings -> Domains.
   - [ ] Add apex and CNAME DNS records at domain registrar as documented in [docs/MAINTENANCE.md](file:///d:/CODING/PORTFOLIO/ubedkhan/docs/MAINTENANCE.md).
   - [ ] Update Vercel environment variable `NEXT_PUBLIC_SITE_URL=https://ubed.in`.
   - [ ] Verify ownership in Google Search Console via DNS TXT record or HTML tag.
2. **Database CMS Setup (Option B)**:
   - Initialize Prisma ORM with PostgreSQL (Neon / Supabase) or MongoDB Atlas.
   - Connect `/api/blogs` to database queries.
3. **Separate Admin CMS App (`admin.ubed.in`)**:
   - Create standalone Next.js 16 admin panel with authentication (NextAuth/Clerk).
   - Rich Markdown / WYSIWYG editor for drafting and publishing blogs.
   - Management dashboards for featured projects and UI components.
4. **UI Component Library Showcase (`ui.ubed.in`)**:
   - Build component documentation site for Ubed Khan's custom UI primitives.

---

## 5. Memory Maintenance Protocol (The Rules)

To ensure seamless continuity between AI assistants and development turns:
1. **Always Read `memory.md` First**: Before taking action on any user request, read this file to synchronize state, verify current architecture, and check open roadmap items.
2. **Record Every Structural Change**: When adding a component, modifying an API route, updating packages, or adding a documentation file, immediately log the change under the Changelog section.
3. **Keep the Directory Map Synchronized**: If files or folders are added, removed, or reorganized, update Section 3 (`Directory Map & File Inventory`).
4. **Log Verification Results**: Document the outcome of `npm run typecheck` and `npm run build` whenever code changes are executed.
