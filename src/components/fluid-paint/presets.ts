import { WebGLFluidPaintConfig, FluidPresetName } from "./types";

export const FLUID_PRESETS: Record<FluidPresetName, WebGLFluidPaintConfig> = {
  /**
   * The exact aesthetic from the Footer:
   * White canvas, thick glossy 3D paint strokes, dynamic click splashes,
   * gentle persistent trail that stays on screen with balanced dissipation.
   */
  editorial: {
    brushAmount: 0.36,
    splatForce: 6200,
    dissipation: 0.88,
    velocityDissipation: 0.2,
    curl: 32,
    pressure: 0.8,
    shading: true,
    bloom: true,
    bloomIntensity: 0.75,
    bloomThreshold: 0.6,
    clickSplatAmount: 6,
    triggerOnHover: true,
    transparent: true,
    colorUpdateSpeed: 10,
  },

  /**
   * Deep dark aesthetic with glowing cyberpunk neon splashes and vivid bloom
   */
  darkNeon: {
    brushAmount: 0.32,
    splatForce: 7000,
    dissipation: 0.95,
    velocityDissipation: 0.15,
    curl: 35,
    pressure: 0.8,
    shading: true,
    bloom: true,
    bloomIntensity: 1.25,
    bloomThreshold: 0.45,
    clickSplatAmount: 7,
    triggerOnHover: true,
    transparent: false,
    backgroundColor: { r: 6, g: 7, b: 12 },
    colorUpdateSpeed: 14,
  },

  /**
   * Heavy viscous oil paint: moves slowly, high gloss, lingers long
   */
  vividOil: {
    brushAmount: 0.48,
    splatForce: 4500,
    dissipation: 0.45, // stays much longer like wet oil paint
    velocityDissipation: 0.3,
    curl: 24,
    pressure: 0.85,
    shading: true,
    bloom: true,
    bloomIntensity: 0.65,
    bloomThreshold: 0.6,
    clickSplatAmount: 5,
    triggerOnHover: true,
    transparent: true,
    colorUpdateSpeed: 8,
  },

  /**
   * Ethereal subtle mist: soft, fades quickly, low glow
   */
  subtleMist: {
    brushAmount: 0.18,
    splatForce: 3500,
    dissipation: 1.8, // evaporates quickly
    velocityDissipation: 0.25,
    curl: 20,
    pressure: 0.75,
    shading: false,
    bloom: true,
    bloomIntensity: 0.4,
    bloomThreshold: 0.7,
    clickSplatAmount: 4,
    triggerOnHover: true,
    transparent: true,
    colorUpdateSpeed: 6,
  },

  /**
   * High turbulence watercolor in fluid suspension
   */
  inkWater: {
    brushAmount: 0.28,
    splatForce: 5500,
    dissipation: 0.72,
    velocityDissipation: 0.12,
    curl: 48,
    pressure: 0.8,
    shading: true,
    bloom: true,
    bloomIntensity: 0.55,
    bloomThreshold: 0.65,
    clickSplatAmount: 6,
    triggerOnHover: true,
    transparent: true,
    colorUpdateSpeed: 12,
  },

  /**
   * Dramatic explosive velocity with intense swirls and large bursts
   */
  highEnergy: {
    brushAmount: 0.42,
    splatForce: 9500,
    dissipation: 1.1,
    velocityDissipation: 0.1,
    curl: 55,
    pressure: 0.9,
    shading: true,
    bloom: true,
    bloomIntensity: 1.1,
    bloomThreshold: 0.5,
    clickSplatAmount: 10,
    triggerOnHover: true,
    transparent: true,
    colorUpdateSpeed: 18,
  },

  /**
   * Subtle full-page background:
   * Ethereal luminescence, gentle dissipation, refined brush stroke,
   * non-distracting colors, optimized so monumental typography and UI cards remain 100% legible.
   */
  subtleBackground: {
    brushAmount: 0.16,
    splatForce: 3200,
    dissipation: 1.8,
    velocityDissipation: 0.25,
    curl: 20,
    pressure: 0.75,
    shading: true,
    bloom: true,
    bloomIntensity: 0.35,
    bloomThreshold: 0.65,
    clickSplatAmount: 3,
    triggerOnHover: true,
    transparent: true,
    colorUpdateSpeed: 5,
    initialSplats: 2,
    globalEvents: true,
  },
};

/**
 * Helper to retrieve preset configurations merged with optional custom overrides
 */
export function getFluidConfig(
  preset: FluidPresetName = "editorial",
  overrides?: Partial<WebGLFluidPaintConfig>
): WebGLFluidPaintConfig {
  const base = FLUID_PRESETS[preset] || FLUID_PRESETS.editorial;
  return { ...base, ...overrides };
}
