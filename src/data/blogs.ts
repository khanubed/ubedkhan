import { BlogPost } from '@/types/blog';

export const blogsData: BlogPost[] = [
  {
    id: 'building-zero-cls-portfolio',
    slug: 'building-zero-cls-portfolio',
    title: 'Building a Zero-CLS Typography Portfolio with Next.js 16',
    summary:
      'How to marry custom brutalist typography, GSAP ScrollTrigger physics, and Next.js 16 Server Components without losing SEO or performance.',
    content: `## The Quest for High-Impact Typography & Zero Layout Shift

When crafting a modern web presence, typography isn't just text—it is the foundational architecture of the experience.

### Why Server Components Matter for Interactive Portfolios
Traditional single-page apps (SPAs) mount animations on client hydration. Crawlers with restricted JavaScript execution budgets frequently miss dynamic headings or suffer from layout shifts (CLS).

By leveraging Next.js 16 Server Component islands:
- The semantic document (\`<h1>\`, \`<article>\`, \`<section>\`) arrives in the initial HTML chunk.
- Web crawlers index the content instantly.
- GSAP and Framer Motion mount cleanly on top via isolated client wrappers.

### Font Optimization with next/font
Using local font configurations allows pre-generating exact font metric overrides, completely preventing the dreaded flash of unstyled text (FOUT).`,
    category: 'Architecture',
    tags: ['Next.js 16', 'TypeScript', 'GSAP', 'Performance', 'SEO'],
    published: true,
    publishedAt: '2026-11-15',
    updatedAt: '2026-11-17',
    readingTime: '5 min read',
    author: {
      name: 'Ubed Khan',
      avatar: '/images/elements/bitmoji.webp',
      bio: 'Full-Stack Developer & UI/UX Designer',
    },
  },
  {
    id: 'mastering-gsap-react-19',
    slug: 'mastering-gsap-react-19',
    title: 'Mastering GSAP ScrollTrigger Timelines in React 19',
    summary:
      'A deep dive into pinning, velocity tracking, and safe teardown using @gsap/react useGSAP hook.',
    content: `## Synchronizing Scroll Physics with Modern React

GSAP provides the gold standard in web motion. However, managing lifecycle hooks and scroll recalculations across page transitions can introduce subtle race conditions.

### The useGSAP Scoping Pattern
Always pass a container ref to the \`useGSAP\` hook. This guarantees all nested tween references and \`ScrollTrigger\` pins are automatically released when components unmount, eliminating memory leaks.`,
    category: 'Motion & UI',
    tags: ['GSAP', 'React 19', 'Animations', 'ScrollTrigger'],
    published: true,
    publishedAt: '2026-11-10',
    updatedAt: '2026-11-10',
    readingTime: '4 min read',
    author: {
      name: 'Ubed Khan',
      avatar: '/images/elements/bitmoji.webp',
      bio: 'Full-Stack Developer & UI/UX Designer',
    },
  },
];
