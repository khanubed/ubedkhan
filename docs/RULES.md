# Engineering Standards & Style Guide (RULES.md)

## 1. Core Principles
1. **Zero Runtime Any**: TypeScript `strict` mode must be enabled at all times. Do not suppress type errors using `any` or `@ts-ignore` without documented justification.
2. **Server-First by Default**: Every component is a Server Component unless it directly handles browser events, state (`useState`, `useEffect`), or interactive animations (`useGSAP`, `framer-motion`).
3. **No Layout Shift (CLS: 0)**: Fonts must be loaded via `next/font`, and images must provide explicit `width`/`height` or `fill` with `sizes`.
4. **Clean Garbage Collection**: Every event listener, animation ticker, or interval must be properly disposed of in cleanup callbacks.

---

## 2. Directory Placement Guidelines

```
src/
├── app/                  # Routing ONLY. Keep page components thin.
│   ├── (site)/page.tsx   # Composes sections.
│   └── api/              # Route handlers for HTTP endpoints.
├── components/
│   ├── common/           # Cross-cutting widgets (MouseFollower, Preloader).
│   ├── layout/           # Global chrome (NavBar, Footer).
│   ├── sections/         # Feature sections (Hero, AboutMe, Skills, Projects, Contact).
│   ├── ui/               # Reusable atomic UI (Buttons, Form controls, Marquees).
│   └── providers/        # Context providers (SmoothScrollProvider).
├── data/                 # Static data contracts and fallback datasets.
├── hooks/                # Reusable React hooks.
├── lib/                  # Pure utility functions, font loaders, SEO schema generators.
└── types/                # Shared TypeScript interfaces and type definitions.
```

---

## 3. TypeScript Rules

### 3.1 Strict Typing
- Define clear interfaces in `src/types/` for all domain entities (`Project`, `Skill`, `BlogPost`, `ContactFormPayload`).
- Never use `React.FC` or `React.FunctionComponent`. Use standard typed function signatures:
  ```typescript
  // CORRECT:
  interface ProjectCardProps {
    project: Project;
    index: number;
  }
  export function ProjectCard({ project, index }: ProjectCardProps) { ... }
  ```

### 3.2 Typing Events & DOM Refs
- Always specify HTML element types on refs:
  ```typescript
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  ```

---

## 4. Animation & Client Component Protocol

### 4.1 Client Island Isolation
- Always place the `"use client";` directive at the very top of files containing interactive hooks.
- Separate semantic text markup from heavy interactive physics. For example:
  - `Hero.tsx` (Server Component) renders the `<h1>` and semantic `<header>`.
  - `HeroInteractiveBitmoji.tsx` (`"use client"`) manages the motion spring tap and hover effects.

### 4.2 GSAP Guidelines
- **Always** wrap GSAP animations in `useGSAP` from `@gsap/react` with `{ scope: ref }`:
  ```typescript
  useGSAP(() => {
    gsap.to('.target', { x: 100 });
  }, { scope: containerRef });
  ```
- Do not import GSAP or initialize ScrollTrigger in Server Components.
- Use `force3D: true` on transforms to prevent repaints and jitter on low-powered mobile devices.

### 4.3 Framer Motion Guidelines
- Avoid heavy layout animations on elements that reflow large portions of the DOM. Prefer transform-based animations (`x`, `y`, `scale`, `rotate`, `opacity`).
- Use `AnimatePresence mode="wait"` when swapping animated elements (e.g. `PassionText`).

---

## 5. Performance & Asset Rules

1. **Images**:
   - Use Next.js `<Image />` for all content images.
   - Always supply a descriptive `alt` attribute (e.g. `alt="Vedic Services web application showcase"`).
   - Use `priority` only on above-the-fold assets (Hero Bitmoji).
2. **Typography**:
   - Never import fonts from external CSS `@import` or `<link>` tags in HTML.
   - Use `next/font/local` and `next/font/google` in `src/lib/fonts.ts`.
3. **Smooth Scroll**:
   - Never run both Lenis and Locomotive Scroll simultaneously. Lenis is the designated smooth scroll engine for this project.

---

## 6. Git & Branching Conventions

### Commit Format (Conventional Commits)
- `feat(scope): ...` — New user-facing feature.
- `fix(scope): ...` — Bug fix.
- `docs(scope): ...` — Documentation updates.
- `refactor(scope): ...` — Code improvement without feature change.
- `perf(scope): ...` — Performance optimizations.
- `chore(scope): ...` — Build, dependency, or config changes.

---

## 7. Context Memory & `memory.md` Maintenance Protocol

The project maintains a persistent context memory file at the project root: `memory.md`. This file guarantees that any developer or AI assistant maintains 100% context across sessions.

### Mandatory Rules for `memory.md`:
1. **First-Turn Context Sync**: At the start of any new session or feature request, `memory.md` must be read first to understand what has been completed, what is pending, and the latest architectural state.
2. **Atomic Changelog Updates**: Any work that modifies routes, introduces new dependencies, alters database contracts, or adjusts design tokens must be logged in `memory.md` under Section 2 (`Completed Milestones & Changelog`).
3. **Directory Map Synchronization**: When new files or directories are created or deleted, Section 3 (`Directory Map & File Inventory`) must be updated to reflect the exact state of the project tree.
4. **Verification Log**: Every time changes are verified, record the status of `npm run typecheck` and `npm run build` with the exit status and route breakdown.
5. **Never Delete Context History**: Historical completed milestones must remain preserved so that design decisions, resolved bugs, and architectural patterns remain permanently accessible.

