# Comprehensive SEO & Discoverability Strategy (SEO_PLAN.md)

## 1. Executive Summary & Strategy
The primary SEO objective is to rank **#1 for "Ubed Khan"**, establish high visibility for **"Full-Stack Developer", "Next.js Engineer", and "UI/UX Designer"**, and earn Google Discover / organic search traffic through in-depth technical blog posts.

By migrating from a client-side Vite SPA to **Next.js 16 Server Components**, 100% of the site's content is rendered directly into the initial HTTP response, eliminating any crawl budget waste or delayed JavaScript rendering penalties.

---

## 2. Technical SEO Architecture

### 2.1 Server Component Crawlability
```
Initial HTTP GET /
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ Pre-rendered Semantic HTML Document                   │
│                                                        │
│ 1. <title> & Meta tags (OpenGraph, Twitter, Robots)    │
│ 2. <script type="application/ld+json"> (Structured)   │
│ 3. <header><h1>UBED KHAN</h1><p>Full-Stack...</p></header>│
│ 4. <section id="about"><h2>ABOUT ME</h2>...</section>  │
│ 5. <section id="skills"><h2>SKILLS</h2>...</section>   │
│ 6. <section id="projects"><h2>PROJECTS</h2>...</section>│
│ 7. <section id="contact"><h2>CONTACT</h2>...</section> │
└────────────────────────────────────────────────────────┘
```
- **Instant Paint**: Search bots (Googlebot, Bingbot, Yandex, DuckDuckGo) read headings, descriptions, project tech stacks, and live links without needing to execute a single line of JavaScript.
- **Client Islands**: GSAP and Framer Motion enhance the interactive layer without obscuring or modifying the underlying semantic structure.

---

## 3. Metadata & OpenGraph Matrix

### 3.1 Metadata Definition (`src/app/layout.tsx`)
```typescript
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubed.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    template: '%s | Ubed Khan',
  },
  description:
    'Portfolio of Ubed Khan — Full-Stack Developer specializing in Next.js, React, Node.js, and cutting-edge typography and visual interactions.',
  keywords: [
    'Ubed Khan',
    'Full-Stack Developer',
    'Next.js 16 Developer',
    'UI/UX Designer',
    'Frontend Engineer',
    'React Developer India',
    'GSAP Animation Specialist',
    'MERN Stack Developer',
    'Web Development Portfolio',
  ],
  authors: [{ name: 'Ubed Khan', url: siteUrl }],
  creator: 'Ubed Khan',
  publisher: 'Ubed Khan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    description:
      'Explore projects, interactive animations, and technical articles by Ubed Khan.',
    siteName: 'Ubed Khan Portfolio',
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Ubed Khan — Full-Stack Developer & UI/UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    description: 'Explore projects and creative development work by Ubed Khan.',
    images: [`${siteUrl}/images/og-image.png`],
    creator: '@ubedkhan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

---

## 4. Structured Data (JSON-LD) Schemas

Implemented in `src/lib/seo.ts` and injected into the document `<head>`:

### 4.1 Person & ProfilePage Schema
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ubed.in/#person",
      "name": "Ubed Khan",
      "jobTitle": "Full-Stack Developer & UI/UX Designer",
      "url": "https://ubed.in",
      "sameAs": [
        "https://github.com/khanubed",
        "https://www.linkedin.com/in/ubed-khan-93220a22a/",
        "https://www.instagram.com/not.ur_ubed/"
      ],
      "knowsAbout": [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "GSAP",
        "UI/UX Design",
        "Tailwind CSS"
      ],
      "image": "https://ubed.in/images/elements/bitmoji.webp",
      "email": "mailto:ubedkhan7529@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452001",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://ubed.in/#website",
      "url": "https://ubed.in",
      "name": "Ubed Khan Portfolio",
      "publisher": {
        "@id": "https://ubed.in/#person"
      }
    }
  ]
}
```

### 4.2 CreativeWork (Projects) Schema
Each project card outputs schema marking it as a verified software project with source code and live demo references:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vedic Services",
  "operatingSystem": "Web Browser",
  "applicationCategory": "BusinessApplication",
  "description": "A high-performance service business platform built with a crawler-first architecture...",
  "author": {
    "@id": "https://ubed.in/#person"
  },
  "url": "https://vedic-portfolio-two.vercel.app/"
}
```

---

## 5. Dynamic Sitemap & Robots Configuration

### 5.1 Dynamic Sitemap (`src/app/sitemap.ts`)
Generates `/sitemap.xml` automatically at build and request time, dynamically indexing the home page, project routes, and all published blog posts:
```typescript
import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { blogsData } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubed.in';

  const blogUrls = blogsData
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
```

### 5.2 Dynamic Robots (`src/app/robots.ts`)
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubed.in';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## 6. Core Web Vitals Optimization Plan

| Core Web Vital | Goal | Optimization Mechanism in this Architecture |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2s` | Priority loading for Hero Bitmoji image, local font preloading with `next/font/local` (no external network latency). |
| **CLS (Cumulative Layout Shift)** | `0.00` | Font fallback size-adjust and ascent-override metrics automatically injected by Next.js font loader. Explicit image aspect ratios. |
| **INP (Interaction to Next Paint)** | `< 100ms` | Decoupled client islands prevent heavy animation setup from delaying user input handling. Passive scroll event listeners. |

---

## 7. Multi-Subdomain SEO Governance

1. **Root Domain (`ubed.in`)**: Primary authority hub hosting portfolio showcase and blog articles.
2. **Admin Subdomain (`admin.ubed.in`)**: Must be configured with `X-Robots-Tag: noindex, nofollow` and protected behind authentication so search engines do not index private management views.
3. **UI Library Subdomain (`ui.ubed.in`)**: Configured with its own sitemap, cross-linking back to `ubed.in` as the creator/parent authority with canonical attribution.
