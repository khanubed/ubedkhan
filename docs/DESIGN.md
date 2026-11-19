# DESIGN: ubed-web

Visual identity: **monumental brutalist typography + futuristic neon minimalism + playful physics + meme-sticker personality**.  
**Token source of truth:** the `ubed-ui` repo (`@ubed/ui/styles.css`, documented in its `DESIGN.md`). This file defines how the portfolio *uses* them and its site-specific rules.

## 1. Tenets
1. Typographic primacy: type is the architecture.
2. Dynamic inversion: alternate black (`#000`) and white (`#fff`) sections.
3. Tactile physics: buttons repel the cursor, avatars spring, marquees accelerate.
4. Retro-cyber neon accents (SVG blinker) on black.
5. Purposeful motion: nothing animates only for decoration; all motion has a reduced-motion path.

## 2. Typography
| Role | Font | Source | Use |
| :-- | :-- | :-- | :-- |
| Display | Republica Minor 2.0 | Local `.woff` via `next/font/local` | Titles, brand, footer; uppercase, wide tracking |
| Accent | Archivo Black | `next/font/google` | Sub-headers, ribbons, badges |
| Body | Comic Relief / sans-serif | `next/font/google` | Paragraphs, descriptions |
| Mono | Geist Mono / JetBrains Mono | Google/system | Blog code |

| Element | <480 | 770 | 1024 | 1280+ | Line height | Tracking |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Hero title | 80 | 100 | 140 | 170 | 0.9 | 0.05em |
| Section title | 40 | 60 | 90 | 110 | 1.0 | 0.08em |
| Project / post title | 24 | 28 | 32 | 40 | 1.1 | 0.04em |
| Body | 14 | 16 | 18 | 18 | 1.6 | normal |
| Badge / tag | 10 | 11 | 12 | 12 | 1.0 | 0.05em |

Blog body max width about 70ch.

## 3. Color
Foundations: black `#000000`, zinc card `#09090b`, white `#ffffff`, muted `#9ca3af` / `#d1d5db`. Accents: electric gradient `linear-gradient(30deg,#000,#ec4899,#6366f1,#f59e42)`, neon palette cyan/magenta/yellow/lime. Contrast: 4.5:1 body, 3:1 large/UI. Map site classes onto `--ubed-*` variables in `globals.css` so a theme change happens in one place.

## 4. Spacing, radius, breakpoints
- Spacing 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Radius: 8, 16, 24, 40, full.
- Breakpoints: phone 480, tablet 770, laptop 1024, desktop 1280, 3xl 1600.

## 5. Surfaces
- Navbar island: `bg-black/85 backdrop-blur-md border border-white/40 shadow-xl shadow-white/5`; `rounded-full` collapsed, `rounded-3xl` mobile drawer.
- About glass card: `bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-sm rounded-[2.5rem] border border-white/10`.
- Project card: `bg-zinc-950 border border-white/15 rounded-3xl`.

## 6. Section animation spec
| Animation | Purpose | Trigger | Duration/ease | Reduced motion | Performance |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Hero entrance | Identity | Load | 600 to 1000 ms, power3.out | Instant | Transform/opacity only; text already in HTML |
| Marquee velocity | Energy | Scroll velocity | up to 8x, ease back with power2.out | Constant slow/static | One RAF loop; pause offscreen |
| About word reveal | Reading pace | Scroll scrub | Scrubbed | All words visible | Split once; no layout reads |
| Skills pin | Sequence | Scroll pin +350% | Scrubbed | Static grid | `useGSAP` scope cleanup |
| Projects 3D deck | Depth | Scroll pin +(cards*220)% | scale `1 - i*0.04` | Vertical list | Lazy-load screenshots |
| Button repel / spring | Playful feedback | Hover/tap | spring 180/12 | No repel; keep focus ring | Framer Motion, no layout thrash |
| Sticker float | Personality | Idle | 3 to 6 s yoyo | Static | CSS transform; pause offscreen |
| Contact unmask | Reveal CTA | Scroll | Scrubbed | Fully visible | Single trigger |
| Cursor follower | Brand | Pointer (fine only) | lerp 0.15 | Disabled | Skip on touch |

Motion tokens: spring `{ stiffness: 180, damping: 12 }`; durations 150/300/600/1000 ms.

## 7. Blog design
- Post: header (category, title, date, reading time), cover, article (max 70ch), sticky TOC on desktop (disclosure on smaller), code blocks with copy button, share row, related posts.
- Index: featured card, 3/2/1 column grid, tag chips (horizontal scroll on mobile).
- Empty state: sticker + one line.

## 8. Accessibility
Skip link; visible 2px focus ring; one `h1` per page; landmarks; `aria-live="polite"` for copy/success; neon blinkers pause under reduced motion; no flashing above 3/s; axe in CI.

## 9. Stickers
Original or licensed only. Max one per section. SVG/WebP, at most 40 KB. Alt text, or `alt=""` + `aria-hidden` when decorative. Reserve dimensions to avoid CLS. Prefer the `Sticker` component from `@ubed/ui` once released.
