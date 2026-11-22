"use client";

import React from "react";
import Link from "next/link";
import { FluidContainer, FluidPassive, FluidActive } from "./FluidContainer";
import { FLUID_PRESETS } from "./presets";

export interface FluidFooterProps {
  heading?: React.ReactNode;
  email?: string;
  brandName?: string;
  links?: Array<{ label: string; href: string }>;
  className?: string;
}

/**
 * Drop-in Editorial Fluid Footer component.
 * Demonstrates the interactive WebGL fluid background with proper pointer-events layering.
 */
export function FluidFooter({
  heading = (
    <>
      Let’s make something
      <br />
      great together
    </>
  ),
  email = "hello@biqmark.com",
  brandName = "Technical Partner NAVIGOTECH INNOVATION",
  links = [
    { label: "INSTAGRAM", href: "https://instagram.com" },
    { label: "X / TWITTER", href: "https://twitter.com" },
    { label: "LINKEDIN", href: "https://linkedin.com" },
    { label: "PRIVACY", href: "/privacy" },
  ],
  className = "",
}: FluidFooterProps) {
  return (
    <FluidContainer
      as="footer"
      preset="editorial"
      className={`min-h-screen bg-white text-black flex flex-col justify-between p-8 sm:p-14 md:p-18 lg:p-24 ${className}`}
    >
      {/* Top Heading: Passive layer so fluid paints through it seamlessly */}
      <FluidPassive className="pt-6 md:pt-12">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal tracking-[-0.03em] leading-[1.05] text-neutral-950 max-w-3xl">
          {heading}
        </h2>
      </FluidPassive>

      {/* Mid Large Interactive Link: Active layer for hover & click */}
      <FluidActive className="flex justify-end items-center my-auto py-12 md:py-20">
        <a
          href={`mailto:${email}`}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-normal tracking-[-0.03em] text-neutral-950 hover:opacity-50 transition-opacity cursor-pointer"
        >
          {email}
        </a>
      </FluidActive>

      {/* Bottom Directory & Copyright: Active layer */}
      <FluidActive className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 text-[11px] sm:text-xs font-mono tracking-widest text-neutral-500 uppercase">
        <div>© {new Date().getFullYear()} {brandName}</div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-10 md:gap-12 text-neutral-800">
          {links.map((link) => {
            const isExternal = link.href.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </FluidActive>
    </FluidContainer>
  );
}

export { FLUID_PRESETS };
export default FluidFooter;
