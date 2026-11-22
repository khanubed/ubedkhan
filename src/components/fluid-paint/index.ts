/**
 * Fluid Paint Component Module
 * Zero-dependency, GPU-accelerated interactive WebGL fluid simulation for React & Next.js.
 */

export { default as WebGLFluidPaint } from "./WebGLFluidPaint";
export { default as FluidBackground } from "./FluidBackground";
export type { FluidBackgroundProps } from "./FluidBackground";
export {
  default as FluidContainer,
  FluidContainer as FluidSection,
  FluidPassive,
  FluidActive,
} from "./FluidContainer";
export { default as FluidFooter } from "./FluidFooter";
export type { FluidFooterProps } from "./FluidFooter";

export { FLUID_PRESETS, getFluidConfig } from "./presets";
export type {
  FluidPresetName,
  WebGLFluidPaintConfig,
  WebGLFluidPaintProps,
  FluidContainerProps,
} from "./types";

export { default } from "./WebGLFluidPaint";
