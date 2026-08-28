import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const items = Array.from({ length: 12 });

const ProjectHead = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useGSAP(
    () => {
      // Row 1 moves leftward (0% to -50%)
      const row1Tween = gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: 'none',
        duration: 22,
        repeat: -1,
      });

      // Row 2 moves rightward (-50% to 0%)
      gsap.set(row2Ref.current, { xPercent: -50 });
      const row2Tween = gsap.to(row2Ref.current, {
        xPercent: 0,
        ease: 'none',
        duration: 22,
        repeat: -1,
      });

      // Scroll velocity acceleration boost
      let lastScrollY = window.scrollY;
      let scrollTimeout = null;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        const boost = Math.min(delta * 0.12, 6);
        const targetMultiplier = 1 + boost;

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
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black py-4 flex flex-col justify-center gap-1 select-none pointer-events-none z-10"
    >
      {/* Row 1 Banner */}
      <div className="w-full overflow-hidden bg-white text-black py-2.5 phone:py-3.5 transform -rotate-2 scale-105 shadow-md">
        <div
          ref={row1Ref}
          className="flex w-max flex-nowrap whitespace-nowrap items-center font-bold republica text-3xl phone:text-5xl tablet:text-7xl tracking-wider"
        >
          {items.map((_, i) => (
            <span key={`r1-${i}`} className="mx-3 phone:mx-5">
              PROJECTS <span className="text-gray-400 font-normal">|</span>
            </span>
          ))}
          {items.map((_, i) => (
            <span key={`r1-dup-${i}`} className="mx-3 phone:mx-5">
              PROJECTS <span className="text-gray-400 font-normal">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 Banner (Opposite direction & angle) */}
      <div className="w-full overflow-hidden bg-white text-black py-2.5 phone:py-3.5 transform rotate-2 scale-105 shadow-md -mt-2">
        <div
          ref={row2Ref}
          className="flex w-max flex-nowrap whitespace-nowrap items-center font-bold republica text-3xl phone:text-5xl tablet:text-7xl tracking-wider"
        >
          {items.map((_, i) => (
            <span key={`r2-${i}`} className="mx-3 phone:mx-5">
              PROJECTS <span className="text-gray-400 font-normal">|</span>
            </span>
          ))}
          {items.map((_, i) => (
            <span key={`r2-dup-${i}`} className="mx-3 phone:mx-5">
              PROJECTS <span className="text-gray-400 font-normal">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHead;