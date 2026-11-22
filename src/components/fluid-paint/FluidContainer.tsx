"use client";

import React from "react";
import WebGLFluidPaint from "./WebGLFluidPaint";
import { FluidContainerProps } from "./types";

/**
 * High-level turnkey wrapper component that encapsulates WebGLFluidPaint.
 * Handles the absolute canvas background, container dimensions, overflow clipping,
 * and z-index stacking context automatically.
 *
 * @example
 * ```tsx
 * <FluidContainer as="footer" preset="editorial" className="min-h-screen bg-white text-black p-12">
 *   <FluidContainer.Passive>
 *     <h1 className="text-6xl font-bold">Fluid Heading</h1>
 *   </FluidContainer.Passive>
 *
 *   <FluidContainer.Active>
 *     <button className="px-6 py-3 bg-black text-white rounded-full">Contact Us</button>
 *   </FluidContainer.Active>
 * </FluidContainer>
 * ```
 */
export function FluidContainer({
  as: Component = "section",
  preset = "editorial",
  fluidConfig,
  className = "",
  canvasClassName = "",
  children,
  ...props
}: FluidContainerProps) {
  const Tag = Component as any;

  return (
    <Tag
      className={`relative w-full overflow-hidden select-none ${className}`}
      {...props}
    >
      {/* 1. Interactive Fluid Background Canvas */}
      <WebGLFluidPaint
        preset={preset}
        {...fluidConfig}
        className={`absolute inset-0 w-full h-full z-0 pointer-events-auto ${canvasClassName}`}
      />

      {/* 2. Container Content */}
      {children}
    </Tag>
  );
}

/**
 * Passive content wrapper (headings, paragraphs, branding text, decorative grids).
 * Applies `pointer-events-none` so mouse hover and drag events pass directly
 * through the text to paint fluid without interruption.
 */
export function FluidPassive({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`relative z-10 pointer-events-none ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Active interactive wrapper (buttons, links, form inputs, interactive cards).
 * Re-enables `pointer-events-auto` so click, focus, and hover interactions
 * operate normally while fluid paints all around them.
 */
export function FluidActive({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`relative z-10 pointer-events-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

// Compound component attachments
FluidContainer.Passive = FluidPassive;
FluidContainer.Active = FluidActive;

export default FluidContainer;
