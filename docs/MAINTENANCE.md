# Operations, Maintenance & Runbook (MAINTENANCE.md)

## 1. Custom Domain & DNS Configuration

Follow this setup to connect your purchased domain (`ubed.in`) to the main portfolio, blog reader, CMS, and UI library on Vercel.

### 1.1 DNS Records Table

| Type | Name / Host | Value / Target | Description |
| :--- | :--- | :--- | :--- |
| **A** | `@` (root) | `76.76.21.21` | Points `ubed.in` to Vercel Edge Network |
| **CNAME** | `www` | `cname.vercel-dns.com` | Redirects `www.ubed.in` to apex domain |
| **CNAME** | `admin` | `cname.vercel-dns.com` | Routes `admin.ubed.in` to the Admin CMS deployment |
| **CNAME** | `ui` | `cname.vercel-dns.com` | Routes `ui.ubed.in` to the UI Library deployment |

### 1.2 SSL Certificates
- Vercel automatically provisions and renews free Let's Encrypt Wildcard SSL certificates for apex domains and subdomains once DNS propagation completes (typically 5 to 30 minutes).

---

## 2. Environment Variables Reference

Create a `.env.local` file in your root directory based on `.env.example`:

```bash
# Public Domain Settings
NEXT_PUBLIC_SITE_URL=https://ubed.in

# Contact Form Integration (Server-only secret)
WEB3_API_KEY=your_web3forms_access_key_here

# Central Database (Option B - PostgreSQL / MongoDB)
DATABASE_URL="postgresql://user:password@host:5432/portfolio_db?sslmode=require"

# Admin CMS Auth Secret (for admin.ubed.in)
NEXTAUTH_SECRET=your_nextauth_generated_secret_key
ADMIN_API_KEY=your_secure_internal_api_key
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
3. Commit and push. Vercel will rebuild and deploy the update automatically in under 60 seconds.

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
3. The skills grid dynamically rebalances its two rows automatically!

### 3.3 Adding a Blog Post
1. Under `src/data/blogs.ts` (or via the future `admin.ubed.in` CMS):
   ```typescript
   {
     id: "building-zero-cls-portfolio",
     slug: "building-zero-cls-portfolio",
     title: "How I Built a 0-CLS Typography Portfolio with Next.js 16",
     summary: "A deep dive into local font optimization, GSAP client islands, and server rendering.",
     category: "Architecture",
     tags: ["Next.js", "Performance", "GSAP"],
     published: true,
     publishedAt: "2026-11-20",
     author: {
       name: "Ubed Khan",
       avatar: "/images/elements/bitmoji.webp",
     },
   }
   ```

---

## 4. Troubleshooting Common Issues

### Issue 1: GSAP ScrollTrigger Pinned Spacer Glitch
- **Symptom**: Section has extra whitespace or jumps abruptly during scrolling.
- **Cause**: DOM measurements changed after images or fonts loaded, desynchronizing GSAP trigger coordinates.
- **Resolution**:
  - Verify images have explicit dimensions.
  - Call `ScrollTrigger.refresh()` after dynamic content mounts.
  - Ensure all GSAP code is wrapped in `useGSAP(..., { scope: containerRef })`.

### Issue 2: Hydration Warning (`Text content does not match server-rendered HTML`)
- **Symptom**: Console warning on page load.
- **Cause**: Random numbers or client-only APIs (like `Math.random()` or `window.innerWidth`) called during initial render.
- **Resolution**:
  - Move random calculations into `useEffect`, event handlers (`whileHover`, `onClick`), or pass a deterministic seed from the server.

### Issue 3: Contact Form Fails to Deliver
- **Symptom**: Status returns network error.
- **Cause**: Missing `WEB3_API_KEY` in environment variables.
- **Resolution**:
  - Verify `.env.local` contains `WEB3_API_KEY`.
  - In Vercel Project Settings -> Environment Variables, ensure `WEB3_API_KEY` is added to Production and Preview environments.
