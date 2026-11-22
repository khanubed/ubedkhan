# 🎨 Interactive WebGL Fluid Paint

A lightweight, GPU-accelerated, zero-dependency interactive liquid paint canvas component for React and Next.js applications. Features Navier-Stokes fluid physics, 3D glossy liquid specular reflections, HDR bloom, mouse hover trails, and explosive click bursts.

---

## ✨ Features

- **Zero External Dependencies**: Pure React + native WebGL 1 / 2 shaders. No `three.js`, no `@react-three/fiber`, no bulky packages.
- **Ultra High Performance**: GPU fragment shader simulation running at buttery smooth 60+ FPS.
- **Realistic 3D Glossy Liquid**: Normal-vector specular shading makes the paint appear like thick, wet oil paint.
- **Interactive Mouse & Touch**: Gentle trails on cursor hover, high-velocity bursts on click, and multi-touch drag support on mobile.
- **6 Built-in Presets**: Switch aesthetics instantly with `preset="editorial" | "darkNeon" | "vividOil" | "subtleMist" | "inkWater" | "highEnergy"`.
- **Smart Pointer-Events Ergonomics**: `<FluidContainer>`, `<FluidPassive>`, and `<FluidActive>` prevent common pointer-blocking bugs on interactive sections.
- **Transparent Canvas Support**: Renders cleanly on any background color, white themes, dark themes, or brand palettes.

---

## 📁 Package Structure

```
fluid-paint/
├── WebGLFluidPaint.tsx       # Core WebGL fluid simulation canvas
├── FluidContainer.tsx        # High-level section wrapper with pointer-events handling
├── FluidFooter.tsx           # Drop-in editorial footer (recreation of the project footer)
├── presets.ts                # Physics presets and configuration resolver
├── types.ts                  # TypeScript interfaces and preset types
├── index.ts                  # Barrel export
├── AI_AGENT_GUIDE.md         # Dedicated instruction manual for AI coding assistants
└── README.md                 # Documentation and usage guide
```

---

## 🚀 Quick Start in Another Project

### 1. Copy the Folder
Copy the `fluid-paint/` directory into your project's components folder:
```bash
# Example destination:
src/components/fluid-paint/
```

### 2. Drop into Your Component

```tsx
"use client";

import React from "react";
import { FluidContainer, FluidPassive, FluidActive } from "@/components/fluid-paint";

export default function MySection() {
  return (
    <FluidContainer
      as="section"
      preset="editorial"
      className="min-h-screen bg-white text-black p-12 flex flex-col justify-between"
    >
      {/* Passive title: cursor paints fluid under text */}
      <FluidPassive>
        <h1 className="text-7xl font-bold tracking-tight">Interactive Liquid</h1>
      </FluidPassive>

      {/* Active button: clickable */}
      <FluidActive>
        <button className="px-6 py-3 bg-black text-white rounded-full">
          Get in Touch
        </button>
      </FluidActive>
    </FluidContainer>
  );
}
```

---

## 🎨 Presets

You can apply any preset using the `preset` prop on `<FluidContainer>` or `<WebGLFluidPaint>`:

| Preset | Background | Description |
| :--- | :--- | :--- |
| `editorial` *(default)* | White / Transparent | High gloss 3D oil paint strokes with vibrant burst splashes on click. Exact match from the project footer. |
| `darkNeon` | `#06070c` (Dark) | Cyberpunk aesthetic with high HDR bloom glow and vibrant electric hues. |
| `vividOil` | Transparent | Thick, slow-moving viscous paint that persists on screen longer. |
| `subtleMist` | Transparent | Delicate, faint pastel wisps that evaporate quickly. |
| `inkWater` | Transparent | High-curl turbulence mimicking colored ink spreading in water. |
| `highEnergy` | Transparent | Explosive splat force (`9500`) with dramatic multi-splashes on click. |

---

## ⚙️ Custom Configuration

All preset properties can be customized directly via props:

```tsx
<WebGLFluidPaint
  preset="editorial"
  brushAmount={0.4}        // Stroke thickness (0.05 to 0.8)
  splatForce={7000}        // Velocity momentum (1000 to 10000)
  dissipation={0.9}        // Fade rate (0.2 = slow, 2.0 = fast)
  curl={35}                // Swirl and turbulence (0 to 60)
  shading={true}           // 3D glossy specular highlights
  bloom={true}             // HDR glow
  bloomIntensity={0.8}     // Glow brightness
  clickSplatAmount={8}     // Number of splashes on click
  triggerOnHover={true}    // Leave paint trail on mouse move
  transparent={true}       // Transparent canvas
/>
```

---

## 🤖 For AI Coding Assistants

If an AI coding assistant (Cursor, Claude, Copilot, ChatGPT, Antigravity) is implementing or customizing this component, refer directly to [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md). It outlines:
- Safe SSR integration rules (`"use client"`)
- The Pointer-Events Golden Rule
- Code recipes for heroes, footers, full page backgrounds, and card containers
- Troubleshooting checklist
