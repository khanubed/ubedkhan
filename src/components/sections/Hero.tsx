import React from 'react';
import PassionText from '@/components/ui/PassionText';
import HeroCtaButton from '@/components/ui/HeroCtaButton';
import HeroInteractiveBitmoji from '@/components/ui/HeroInteractiveBitmoji';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="bg-transparent text-white relative min-h-screen flex flex-col items-center justify-between overflow-hidden"
    >
      {/* ---------------- HEADING (Server Rendered for SEO) ---------------- */}
      <header className="absolute max-tablet:top-[10%] top-16 w-full flex justify-center select-none max-phone:top-[10%] z-20">
        <h1
          id="hero-title"
          className="text-[140px] flex md:gap-8 leading-none max-tablet:flex-col max-tablet:gap-6 max-tablet:text-[100px] 2xl:text-[170px] max-phone:text-[80px] republica mt-5 tracking-wide font-bold text-center bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent"
        >
          UBED KHAN
        </h1>
      </header>

      {/* ---------------- CENTER CONTENT ---------------- */}
      <div className="flex gap-4 justify-between px-[160px] absolute z-40 w-full mt-[200px] top-[15%] max-tablet:bottom-[18%] max-tablet:flex-col max-tablet:justify-end max-phone:px-[60px]">
        <div aria-live="polite" className="flex justify-center items-center">
          <PassionText />
        </div>
        <HeroCtaButton />
      </div>

      {/* ---------------- BITMOJI CENTER BOTTOM (Interactive Island) ---------------- */}
      <HeroInteractiveBitmoji />
    </section>
  );
}
