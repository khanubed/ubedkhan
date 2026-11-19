# Operations, Maintenance & Runbook (MAINTENANCE.md)

## 1. Custom Domain & DNS Configuration

Follow this setup to connect your purchased domain (`ubed.in`) to the portfolio and blog reader on Vercel.

### 1.1 DNS Records Table

| Type | Name / Host | Value / Target | Description |
| :-- | :-- | :-- | :-- |
| **A** | `@` (root) | `76.76.21.21` (or Vercel IP) | Points `ubed.in` to Vercel Edge Network |
| **CNAME** | `www` | `cname.vercel-dns.com` | Redirects `www.ubed.in` to apex domain |
| **CNAME** | `ui` | `cname.vercel-dns.com` | Routes `ui.ubed.in` to the `ubed-ui` docs deployment |

### 1.2 SSL Certificates
- Vercel automatically provisions and renews free Let's Encrypt SSL certificates for apex domains and subdomains once DNS propagation completes (typically 5 to 30 minutes).

---

## 2. Environment Variables Reference

Create a `.env.local` file in your root directory based on `.env.example`:

```bash
# Public Domain Settings
NEXT_PUBLIC_SITE_URL=https://ubed.in
NEXT_PUBLIC_UI_SITE_URL=https://ui.ubed.in

# Contact Form Security & Delivery
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Mailer (Web3Forms or Resend)
WEB3_API_KEY=your_web3forms_access_key
# Or: RESEND_API_KEY=your_resend_api_key
```

---

## 3. Content Management Runbook

### 3.1 Adding a New Project
To feature a new project on the portfolio:
1. Place the project screenshot (`.webp` format, 16:9 ratio, max 300KB) into `public/images/projects/`.
2. Open `src/data/projects.ts` and append a new `Project` object:
   ```typescript
   {
     id: "new-project",
     title: "Project Name",
     subtitle: "Project Tagline",
     description: "In-depth summary of what was engineered...",
     features: [
       "🚀 Key architecture highlight 1",
       "⚡ Performance optimization 2",
     ],
     tech: ["Next.js", "TypeScript", "Tailwind CSS"],
     image: "/images/projects/new-project.webp",
     github: "https://github.com/khanubed/repo",
     live: "https://project.vercel.app/",
   }
   ```
3. Commit and push. Vercel will rebuild and deploy the update automatically.

### 3.2 Adding a New Skill
1. Add the SVG or `.webp` icon to `public/images/skills/`.
2. Add the skill entry to `src/data/skills.ts`:
   ```typescript
   {
     id: 'docker',
     name: 'Docker',
     icon: '/images/skills/docker.webp',
     category: 'DevOps',
   }
   ```
3. The skills grid dynamically rebalances its rows automatically.

### 3.3 Adding a Blog Post
Blog posts are written as MDX files in `src/content/blog/<slug>.mdx` (no database, no admin panel):
```yaml
---
title: "How I Built Pinned Scroll Sections with GSAP"
slug: gsap-pinned-scroll-sections
summary: "Why my pinned section kept jumping and how separating pin spacers resolved it."
category: Web Dev
tags: [gsap, scrolltrigger, nextjs]
cover: /images/blog/gsap-pinned.webp
coverAlt: "Screenshot of the pinned skills section"
publishedAt: "2026-11-20"
updatedAt: "2026-11-20"
draft: false
relatedComponent: velocity-marquee
---
```

---

## 4. Troubleshooting Common Issues

### Issue 1: GSAP ScrollTrigger Pinned Spacer Glitch
- **Symptom**: Section has extra whitespace or jumps abruptly during scrolling.
- **Cause**: Pin spacer reparenting issue or DOM measurements changed after images/fonts loaded.
- **Resolution**:
  - Keep outer `<section ref={containerRef}>` stably rooted; attach `pin: pinRef.current` to inner child.
  - Call `ScrollTrigger.refresh()` after dynamic content mounts.
  - Wrap all GSAP in `useGSAP(..., { scope: containerRef })`.

### Issue 2: Hydration Warning
- **Symptom**: `Text content does not match server-rendered HTML`.
- **Cause**: Random numbers or client-only APIs (`Math.random()`, `window.innerWidth`) called during initial render.
- **Resolution**:
  - Move random calculations into `useEffect`, event handlers (`whileHover`, `onClick`), or pass a deterministic seed from the server.

### Issue 3: Contact Form Fails to Deliver
- **Symptom**: Network error on form submission.
- **Cause**: Missing `WEB3_API_KEY` or `RESEND_API_KEY` in environment variables.
- **Resolution**:
  - Verify `.env.local` contains the key.
  - Ensure the key is added in Vercel Project Settings -> Environment Variables for Production and Preview.
