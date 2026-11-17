# Design System & Typography Specification (DESIGN.md)

## 1. Visual Identity & Aesthetic Philosophy

The visual language of Ubed Khan's portfolio merges **monumental brutalist typography** with **futuristic neon minimalism** and **organic, playful micro-interactions**.

### Core Tenets
1. **Typographic Primacy**: Typography acts not only as text but as the primary architectural structure of the site. Headings demand immediate attention with colossal scale and high contrast.
2. **Dynamic Inversion**: Alternating dark (`#000000`) and pristine light (`#ffffff`) sections to create visceral rhythm and visual reset as the user scrolls.
3. **Tactile Physics**: Elements react organically to user intent. Buttons repel cursor hover, avatars spring and tilt when tapped, and marquees accelerate when scrolled aggressively.
4. **Retro-Cyber Neon Accents**: Geometric animated SVG shapes (`FooterBlinker`) pulsing with 80s neon palettes against pitch black surfaces.

---

## 2. Typography System

### 2.1 Font Hierarchy

| Role | Font Family | Source | Usage & Key Attributes |
| :--- | :--- | :--- | :--- |
| **Display / Headings** | **Republica Minor 2.0** | Local `.woff` via `next/font/local` | All monumental section titles (`UBED KHAN`, `ABOUT ME`, `SKILLS`, `PROJECTS`), nav brand logo, and footer titles. Uppercase, wide tracking (`tracking-wider` / `tracking-widest`). |
| **Accent / Heavy Labels** | **Archivo Black** | Google Fonts via `next/font/google` | High-impact sub-headers, marquee text ribbons, badge accents. Heavyweight geometric sans. |
| **Body / Narrative** | **Comic Relief / Sans-Serif** | Google Fonts via `next/font/google` | Body copy, paragraph narratives, project descriptions, feature bullet points. Clean readability at 14px–18px. |
| **Monospace / Code** | **Geist Mono / JetBrains Mono** | System / Google Font | Code snippets in future blog posts and UI library component samples. |

### 2.2 Scale & Breakpoint Matrix

| Element | Mobile (< 480px) | Tablet (770px) | Laptop (1024px) | Desktop (1280px+) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `80px` | `100px` | `140px` | `170px` | `0.9` (tight) | `0.05em` |
| **Section Title** | `40px` | `60px` | `90px` | `110px` | `1.0` | `0.08em` |
| **Project Title** | `24px` | `28px` | `32px` | `40px` | `1.1` | `0.04em` |
| **Body Text** | `14px` | `16px` | `18px` | `18px` | `1.6` | Normal |
| **Badge / Tag** | `10px` | `11px` | `12px` | `12px` | `1.0` | `0.05em` |

---

## 3. Color Palette & Token System

### 3.1 Primary Foundations
- **Pitch Black (`bg-black`)**: `#000000` — Primary backdrop for Hero, About, Skills, and Footer.
- **Card Zinc (`bg-zinc-950`)**: `#09090b` — Deep surface for stacked project cards.
- **Pristine White (`bg-white`)**: `#ffffff` — Section background for Contact and Projects wrapper.
- **Muted Text (`text-gray-300` / `text-gray-400`)**: `#d1d5db` / `#9ca3af` — High-legibility narrative text.

### 3.2 Accent Gradients

```css
/* Hero & Live Badge Multi-Stop Gradient */
--gradient-electric: linear-gradient(30deg, #000000, #ec4899, #6366f1, #f59e42);

/* Monumental Typography Gradient Fill */
--gradient-title-dark: linear-gradient(to bottom, #9ca3af, #ffffff);
--gradient-hero: linear-gradient(to bottom, #6b7280, #ffffff);
```

### 3.3 Neon SVG Blinker Palette Matrix
```javascript
const neonPalette = [
  ['#00ffff', '#ff00ff', '#ffff00'], // Cyan, Magenta, Yellow
  ['#00ff00', '#ff00ff', '#00ffff'], // Green, Magenta, Cyan
  ['#ffff00', '#ff3300', '#00ff33'], // Yellow, Hot Orange, Lime
];
```

---

## 4. Surfaces & Glassmorphism

- **Navbar Floating Island**:
  - `bg-black/85 backdrop-blur-md border border-white/40 shadow-xl shadow-white/5`
  - Pill shape: `rounded-full` (collapsed) to `rounded-3xl` (mobile expanded drawer).
- **About Me Content Shell**:
  - `bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-sm rounded-[2.5rem] border border-white/10`
  - Shadow: `shadow-[0_0_80px_rgba(255,255,255,0.01)]`
- **Project Stacking Cards**:
  - `bg-zinc-950 border border-white/15 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)]`

---

## 5. Motion & Physics Tokens

### 5.1 Interactive Repel Math (Framer Motion)
```typescript
export const getRandomRepel = (minDist = 12, maxDist = 24) => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = minDist + Math.random() * (maxDist - minDist);
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
  };
};

export const springPhysics = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 12,
  duration: 0.25,
};
```

### 5.2 GSAP Scroll Speeds & Timelines
- **Velocity Acceleration**: Multiplies marquee speed up to `8x` during active scroll, easing back to `1x` with `power2.out` deceleration.
- **Skills Scrub Timeline**: Pin duration `+=350%` of viewport height for comfortable comprehension.
- **Projects Stack Timeline**: Pin duration `+=(cardCount * 220)%` with 3D scale drop (`scale: 1 - index * 0.04`).

---

## 6. Responsive Breakpoint Specification

```typescript
// tailwind.config.ts screens
export const screens = {
  phone: '480px',     // Standard and large mobile phones
  tablet: '770px',    // iPads, tablets, and small foldables
  laptop: '1024px',   // Compact laptops and landscape tablets
  desktop: '1280px',  // Standard desktop monitors
  '3xl': '1600px',    // Ultrawide monitors and high-DPI displays
};
```
