'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const blockIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const duplicatedBlocks = [...blockIndexes, ...blockIndexes];

export default function ScrollSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!row1Ref.current || !row2Ref.current) return;

      // Row 1 loops leftwards (0% to -50%)
      const row1Tween = gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: 'none',
        duration: 25,
        repeat: -1,
      });

      // Row 2 loops rightwards (starts at -50% and goes to 0%)
      gsap.set(row2Ref.current, { xPercent: -50 });
      const row2Tween = gsap.to(row2Ref.current, {
        xPercent: 0,
        ease: 'none',
        duration: 25,
        repeat: -1,
      });

      // Track scroll velocity to accelerate marquee
      let lastScrollY = window.scrollY;
      let scrollTimeout: NodeJS.Timeout | null = null;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        const baseMultiplier = 1;
        const boost = Math.min(delta * 0.15, 8);
        const targetMultiplier = baseMultiplier + boost;

        gsap.to([row1Tween, row2Tween], {
          timeScale: targetMultiplier,
          duration: 0.1,
          overwrite: 'auto',
        });

        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          gsap.to([row1Tween, row2Tween], {
            timeScale: 1,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }, 100);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Image Gallery Marquee"
      className="h-[45vh] tablet:h-[75vh] py-6 w-full bg-transparent overflow-hidden flex flex-col justify-center gap-4 select-none"
    >
      {/* Row 1 */}
      <div className="h-[18vh] tablet:h-[32vh] relative w-full overflow-hidden" role="list" aria-label="First marquee row">
        <div ref={row1Ref} className="flex absolute top-0 left-0 h-full w-max flex-nowrap">
          {duplicatedBlocks.map((index, i) => (
            <figure
              key={`row1-${index}-${i}`}
              className={`h-full w-[200px] phone:w-[280px] tablet:w-[350px] rounded-xl bg-slate-900 flex-grow-0 flex-shrink-0 mr-3 block${index}`}
              role="listitem"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="h-[18vh] tablet:h-[32vh] relative w-full overflow-hidden" role="list" aria-label="Second marquee row">
        <div ref={row2Ref} className="flex absolute top-0 left-0 h-full w-max flex-nowrap">
          {duplicatedBlocks.map((index, i) => (
            <figure
              key={`row2-${index}-${i}`}
              className={`h-full w-[200px] phone:w-[280px] tablet:w-[350px] rounded-xl bg-slate-900 flex-grow-0 flex-shrink-0 mr-3 block${index}`}
              role="listitem"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
