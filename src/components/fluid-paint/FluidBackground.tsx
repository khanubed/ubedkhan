'use client';

import React, { useEffect, useState } from 'react';
import WebGLFluidPaint from './WebGLFluidPaint';
import { WebGLFluidPaintConfig } from './types';

export interface FluidBackgroundProps {
  /**
   * Aesthetic intensity level:
   * - "minimal": Extremely faint, evaporates rapidly in ~1.2s, 40% canvas opacity.
   * - "subtle" (default): Refined brush, soft luminescence, 55% canvas opacity.
   * - "medium": Slightly more vivid glow, 70% canvas opacity.
   */
  intensity?: 'minimal' | 'subtle' | 'medium';

  /**
   * Additional CSS classes for the outer wrapper container.
   */
  className?: string;

  /**
   * Granular fluid physics overrides.
   */
  config?: Partial<WebGLFluidPaintConfig>;
}

const INTENSITY_PRESETS = {
  minimal: {
    brushAmount: 0.12,
    splatForce: 2600,
    dissipation: 2.2,
    bloomIntensity: 0.2,
    clickSplatAmount: 2,
    colorUpdateSpeed: 4,
    opacityClass: 'opacity-40',
  },
  subtle: {
    brushAmount: 0.16,
    splatForce: 3200,
    dissipation: 1.8,
    bloomIntensity: 0.35,
    clickSplatAmount: 3,
    colorUpdateSpeed: 5,
    opacityClass: 'opacity-55',
  },
  medium: {
    brushAmount: 0.22,
    splatForce: 4200,
    dissipation: 1.5,
    bloomIntensity: 0.5,
    clickSplatAmount: 4,
    colorUpdateSpeed: 6,
    opacityClass: 'opacity-70',
  },
};

/**
 * Full-page fixed ambient fluid background component.
 * Renders an optimized WebGL fluid simulation at the lowest z-index (-z-10) with
 * pointer-events-none, capturing window movements for gentle, non-distracting trails
 * without ever obstructing text readability, buttons, forms, or navigation.
 */
export default function FluidBackground({
  intensity = 'subtle',
  className = '',
  config,
}: FluidBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user-preferred reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onMediaChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', onMediaChange);

    // Defer WebGL initialization until after initial paint to guarantee optimal FCP/LCP
    const timer = requestAnimationFrame(() => setMounted(true));

    return () => {
      mediaQuery.removeEventListener('change', onMediaChange);
      cancelAnimationFrame(timer);
    };
  }, []);

  if (!mounted || prefersReducedMotion) {
    return null;
  }

  const selected = INTENSITY_PRESETS[intensity] || INTENSITY_PRESETS.subtle;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`fixed inset-0 w-screen h-screen pointer-events-none -z-10 select-none overflow-hidden transition-opacity duration-700 ${selected.opacityClass} ${className}`}
    >
      <WebGLFluidPaint
        preset="subtleBackground"
        globalEvents={true}
        transparent={true}
        brushAmount={selected.brushAmount}
        splatForce={selected.splatForce}
        dissipation={selected.dissipation}
        bloomIntensity={selected.bloomIntensity}
        clickSplatAmount={selected.clickSplatAmount}
        colorUpdateSpeed={selected.colorUpdateSpeed}
        className="w-full h-full pointer-events-none"
        {...config}
      />
    </div>
  );
}
