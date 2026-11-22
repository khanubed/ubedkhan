import React from "react";

export type FluidPresetName =
  | "editorial" // Clean white minimalist editorial look from the Footer (glossy paint, vivid splats)
  | "darkNeon" // Dark background with vivid cyberpunk glowing bloom
  | "vividOil" // Heavy viscous thick oil paint with long lasting trails
  | "subtleMist" // Soft, delicate pastel aura that dissipates quickly
  | "inkWater" // Fluid watercolor dispersion in clear water
  | "highEnergy" // Explosive turbulence, fast velocity, and dramatic burst splats
  | "subtleBackground"; // Ethereal low-intensity background for full-site ambient glow

export interface WebGLFluidPaintConfig {
  /**
   * Brush size / splat radius
   * 0.05 = fine brush stroke
   * 0.36 = bold editorial brush (Footer default)
   * 0.8 = massive splash
   */
  brushAmount?: number;

  /**
   * Splat impulse force when dragging or clicking (default: 6200 for editorial)
   */
  splatForce?: number;

  /**
   * How fast the paint dissipates / fades
   * 0.2 = stays very long like thick oil paint
   * 0.88 = editorial standard
   * 2.0 = evaporates quickly like smoke
   */
  dissipation?: number;

  /**
   * Velocity dissipation / fluid gliding momentum (default: 0.2, lower = glides longer)
   */
  velocityDissipation?: number;

  /**
   * Fluid curl / vorticity swirls (default: 32, higher = more spiral eddies)
   */
  curl?: number;

  /**
   * Fluid pressure solver strength (default: 0.8)
   */
  pressure?: number;

  /**
   * 3D specular shading on fluid for thick glossy paint look (default: true)
   */
  shading?: boolean;

  /**
   * Vivid HDR bloom glow (default: true)
   */
  bloom?: boolean;

  /**
   * Glow intensity multiplier (default: 0.75)
   */
  bloomIntensity?: number;

  /**
   * Brightness cutoff threshold where bloom begins (default: 0.6)
   */
  bloomThreshold?: number;

  /**
   * Number of colorful paint splashes that burst on mouse click / tap (default: 6)
   */
  clickSplatAmount?: number;

  /**
   * Whether mouse hover leaves gentle paint brush strokes (default: true)
   */
  triggerOnHover?: boolean;

  /**
   * Whether canvas background is transparent (true allows parent bg color/theme to show through)
   */
  transparent?: boolean;

  /**
   * Background color when transparent is false (e.g. { r: 5, g: 5, b: 7 })
   */
  backgroundColor?: { r: number; g: number; b: number };

  /**
   * Color transition update speed across continuous strokes (default: 10)
   */
  colorUpdateSpeed?: number;

  /**
   * Whether to capture global window mouse and touch interactions.
   * Useful when canvas has pointer-events-none as a full-page background.
   */
  globalEvents?: boolean;

  /**
   * Number of introductory splats fired when the simulation boots.
   * (default: 3, set to 0 or 1 for subtle background)
   */
  initialSplats?: number;
}

export interface WebGLFluidPaintProps extends WebGLFluidPaintConfig {
  /**
   * Pre-configured physics/aesthetic preset. Any explicit props override preset values.
   * Default: "editorial"
   */
  preset?: FluidPresetName;

  /**
   * CSS classes for the canvas element (e.g., "absolute inset-0 w-full h-full z-0 pointer-events-auto")
   */
  className?: string;

  /**
   * Optional inline styles for the canvas element
   */
  style?: React.CSSProperties;
}

export interface FluidContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The HTML tag to render as the outer container
   * Default: "section"
   */
  as?: "section" | "footer" | "div" | "main" | "header" | "article" | any;

  /**
   * Pre-configured physics/aesthetic preset
   * Default: "editorial"
   */
  preset?: FluidPresetName;

  /**
   * Custom fluid configuration overrides passed down to WebGLFluidPaint
   */
  fluidConfig?: Partial<WebGLFluidPaintConfig>;

  /**
   * Additional className applied to the background canvas
   */
  canvasClassName?: string;

  /**
   * Content inside the container
   */
  children?: React.ReactNode;
}
