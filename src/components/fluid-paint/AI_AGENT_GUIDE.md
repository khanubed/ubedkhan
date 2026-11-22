# 🤖 AI Agent Integration Guide: Interactive WebGL Fluid Paint

> **Notice for AI Coding Agents (Cursor, Claude, Copilot, ChatGPT, Antigravity, etc.):**  
> Read this file carefully before implementing or modifying the fluid effect in any project. This guide gives you the exact rules, copy-paste patterns, and architectural requirements to successfully integrate this fluid background without errors.

---

## ⚡ 1. Critical Rules for AI Agents

### ❌ Rule 1: DO NOT install external WebGL / Three.js libraries
- **DO NOT** run `npm install three`, `@react-three/fiber`, `@react-three/drei`, or `webgl-fluid`.
- This module is **100% self-contained** in native WebGL 1 & WebGL 2 shaders.
- Its only peer dependencies are `react` (>=18) and `react-dom` (>=18), which already exist in any modern React/Next.js project.

### ⚠️ Rule 2: The Pointer-Events Golden Rule (Crucial!)
A common bug when creating fluid backgrounds is that HTML text or container elements block mouse/touch events from reaching the canvas.
Follow this layering pattern without exception:

```
┌────────────────────────────────────────────────────────┐
│ Outer Container (relative, overflow-hidden)            │
│                                                        │
│  ├── Canvas: absolute inset-0 z-0 pointer-events-auto   │ (Paints fluid on hover/drag)
│  │                                                     │
│  ├── Passive Content: relative z-10 pointer-events-none │ (Text, titles, decor pass through)
│  │                                                     │
│  └── Active Content: relative z-10 pointer-events-auto  │ (Buttons, links, inputs remain clickable)
└────────────────────────────────────────────────────────┘
```

**Convenience Solution:** Use the provided `<FluidContainer>`, `<FluidContainer.Passive>`, and `<FluidContainer.Active>` components. They manage these classes automatically.

### 🛡️ Rule 3: Client Component & SSR Safety
Because WebGL needs the `window` and `HTMLCanvasElement`, this component must run on the client:
- In **Next.js App Router**: Always place `"use client";` at the very top of any file that renders this component.
- In **Next.js Pages Router** or if SSR hydration issues occur:
  ```tsx
  import dynamic from "next/dynamic";
  const WebGLFluidPaint = dynamic(
    () => import("./components/fluid-paint").then((mod) => mod.WebGLFluidPaint),
    { ssr: false }
  );
  ```
- In **Vite / Astro / Remix / SPA**: Import directly as a standard React component.

---

## 📦 2. How to Add This Module to Another Project

### Step 1: Copy the folder
Copy the entire `fluid-paint/` folder into your destination project:
```
your-project/
├── src/
│   ├── components/
│   │   └── fluid-paint/
│   │       ├── WebGLFluidPaint.tsx
│   │       ├── FluidContainer.tsx
│   │       ├── FluidFooter.tsx
│   │       ├── presets.ts
│   │       ├── types.ts
│   │       ├── index.ts
│   │       ├── README.md
│   │       └── AI_AGENT_GUIDE.md
```

### Step 2: Import into your target component or page
```tsx
import { FluidContainer, FluidPassive, FluidActive } from "@/components/fluid-paint";
// OR for the canvas directly:
import { WebGLFluidPaint } from "@/components/fluid-paint";
```

---

## 🎨 3. Presets & Aesthetic Profiles

Instead of manually guessing 10+ physics numbers, pass the `preset` prop:

| Preset Name | Best For | Visual Description |
| :--- | :--- | :--- |
| `"editorial"` *(default)* | White luxury / editorial footers, hero sections | Clean white canvas, thick glossy 3D oil paint strokes, high bloom, multi-splat on click |
| `"darkNeon"` | Dark mode, tech, cyberpunk landing pages | Deep black canvas (`#06070c`), glowing neon streaks, high HDR bloom intensity |
| `"vividOil"` | Art portfolios, creative agencies | Heavy viscous paint that moves slowly and lingers on screen for a long time |
| `"subtleMist"` | Minimalist SaaS, subtle interactive aura | Soft, faint pastel wisps that evaporate quickly (`dissipation: 1.8`) |
| `"inkWater"` | Zen, organic, documentary styles | High turbulence swirl (`curl: 48`) mimicking colored ink swirling in clear water |
| `"highEnergy"` | Interactive games, promotions, loud banners | High splat impulse (`9500`), 10 bursts on click, intense vortex curls |

You can use a preset **AND** override specific props:
```tsx
<WebGLFluidPaint preset="editorial" brushAmount={0.5} bloomIntensity={1.0} />
```

---

## 📋 4. Ready-to-Use Code Recipes

### Recipe A: Turnkey Footer (Exact match from the original project)
```tsx
"use client";

import React from "react";
import { FluidFooter } from "@/components/fluid-paint";

export default function PageFooter() {
  return (
    <FluidFooter
      heading={
        <>
          Let’s make something
          <br />
          great together
        </>
      }
      email="hello@yourcompany.com"
      brandName="YOUR BRAND NAME"
      links={[
        { label: "INSTAGRAM", href: "https://instagram.com" },
        { label: "TWITTER", href: "https://x.com" },
        { label: "LINKEDIN", href: "https://linkedin.com" },
        { label: "PRIVACY", href: "/privacy" },
      ]}
    />
  );
}
```

### Recipe B: High-Level Hero Section using `FluidContainer`
```tsx
"use client";

import React from "react";
import { FluidContainer } from "@/components/fluid-paint";

export default function HeroSection() {
  return (
    <FluidContainer
      as="section"
      preset="editorial"
      className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-6 text-center"
    >
      {/* Passive title: Cursor paints fluid directly underneath without being blocked! */}
      <FluidContainer.Passive className="max-w-4xl">
        <span className="text-sm uppercase font-mono tracking-widest text-neutral-500">
          Digital Craft & Innovation
        </span>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-950 mt-4">
          Fluid Interaction at Scale
        </h1>
        <p className="text-lg sm:text-xl text-neutral-600 mt-6 max-w-2xl mx-auto">
          Hover anywhere or drag to paint with liquid specular gloss.
        </p>
      </FluidContainer.Passive>

      {/* Active button: Pointer events work cleanly for clicking */}
      <FluidContainer.Active className="mt-10 flex gap-4">
        <a
          href="#explore"
          className="px-8 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Explore Work
        </a>
      </FluidContainer.Active>
    </FluidContainer>
  );
}
```

### Recipe C: Dark Mode / Cyberpunk Hero
```tsx
"use client";

import React from "react";
import { FluidContainer } from "@/components/fluid-paint";

export default function DarkHero() {
  return (
    <FluidContainer
      as="section"
      preset="darkNeon"
      className="min-h-screen bg-[#06070c] text-white flex flex-col justify-center items-center px-6"
    >
      <FluidContainer.Passive className="text-center max-w-3xl">
        <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white">
          FUTURE OF AI
        </h1>
      </FluidContainer.Passive>

      <FluidContainer.Active className="mt-8">
        <button
          onClick={() => alert("Action triggered!")}
          className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition"
        >
          Get Started
        </button>
      </FluidContainer.Active>
    </FluidContainer>
  );
}
```

### Recipe D: Raw Canvas Drop-in into Existing Markup
If you want to place the canvas inside your own custom HTML structure without `FluidContainer`:
```tsx
"use client";

import React from "react";
import { WebGLFluidPaint } from "@/components/fluid-paint";

export default function CustomSection() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-white">
      {/* 1. Fluid Canvas */}
      <WebGLFluidPaint
        preset="editorial"
        className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
      />

      {/* 2. Text Content (Passive) */}
      <div className="relative z-10 p-12 pointer-events-none">
        <h2 className="text-4xl font-bold text-black">Interactive Canvas Card</h2>
      </div>

      {/* 3. Button (Active) */}
      <div className="relative z-10 p-12 pointer-events-auto">
        <button className="px-5 py-2.5 bg-black text-white rounded-lg">
          Click Me
        </button>
      </div>
    </div>
  );
}
```

---

## 🔧 5. Full Prop Reference & Physics Tuning

| Prop | Type | Default (Editorial) | Explanation |
| :--- | :--- | :--- | :--- |
| `preset` | `FluidPresetName` | `"editorial"` | Preset selection (`editorial`, `darkNeon`, `vividOil`, `subtleMist`, `inkWater`, `highEnergy`) |
| `brushAmount` | `number` | `0.36` | Stroke radius/thickness (`0.05` = hairline, `0.36` = bold brush, `0.8` = giant flood) |
| `splatForce` | `number` | `6200` | Velocity impulse on drag/hover. Higher = faster fluid glide across the screen |
| `dissipation` | `number` | `0.88` | How quickly paint fades (`0.2` = stays minutes like thick wet oil, `2.0` = fades in 1 second) |
| `velocityDissipation` | `number` | `0.2` | Fluid momentum resistance (`0.05` = frictionless glide, `0.5` = heavy syrup) |
| `curl` | `number` | `32` | Vorticity / swirl eddies (`5` = laminar straight flow, `50` = turbulent whirlpools) |
| `pressure` | `number` | `0.8` | Poisson pressure solver elasticity |
| `shading` | `boolean` | `true` | Calculates 3D normal vectors for specular gloss / wet liquid look |
| `bloom` | `boolean` | `true` | Enables HDR bloom glow passes |
| `bloomIntensity` | `number` | `0.75` | Intensity multiplier for the bloom glow |
| `bloomThreshold` | `number` | `0.6` | Luminance threshold where glow begins |
| `clickSplatAmount` | `number` | `6` | Number of radial splashes that blast outward on mouse click or screen tap |
| `triggerOnHover` | `boolean` | `true` | If `true`, moving the mouse leaves paint. If `false`, requires click & drag |
| `transparent` | `boolean` | `true` | If `true`, the canvas alpha is clear so parent container background color shows through |
| `backgroundColor` | `{ r, g, b }` | `{ r: 5, g: 5, b: 7 }` | Base canvas background when `transparent: false` (RGB 0-255) |
| `colorUpdateSpeed`| `number` | `10` | Speed of hue cycling through paint strokes |
| `className` | `string` | `"absolute inset-0 w-full h-full"` | Standard CSS class string |

---

## 🛠️ 6. Troubleshooting Checklist for AI Agents

1. **"The fluid doesn't react when hovering over text"**:
   - Cause: Text container is missing `pointer-events-none`.
   - Fix: Wrap headings and text in `<FluidPassive>` or add `pointer-events-none` to their parent container.
2. **"My buttons or links cannot be clicked"**:
   - Cause: The button is inside a `pointer-events-none` container without `pointer-events-auto`.
   - Fix: Wrap interactive elements in `<FluidActive>` or add `pointer-events-auto` to the button/link.
3. **"Window is not defined" or SSR build errors**:
   - Cause: Server-side rendering tried to initialize WebGL canvas.
   - Fix: Add `"use client";` to the file, or import with Next.js dynamic import `{ ssr: false }`.
4. **"Canvas covers my navigation bar or header"**:
   - Cause: Z-index stacking collision.
   - Fix: Ensure the container has `relative overflow-hidden`, the canvas has `z-0`, and your page header has a higher z-index (e.g., `z-50`).
