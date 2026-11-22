'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutParagraphs, resumeUrl } from '@/data/about';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  // Parallax elements refs (outer containers)
  const bubbleParallaxRef = useRef<HTMLDivElement | null>(null);
  const diceParallaxRef = useRef<HTMLDivElement | null>(null);
  const heartParallaxRef = useRef<HTMLDivElement | null>(null);
  const diamondParallaxRef = useRef<HTMLDivElement | null>(null);

  // Floating elements refs (inner wrappers for idle bobbing)
  const bubbleFloatRef = useRef<HTMLDivElement | null>(null);
  const diceFloatRef = useRef<HTMLDivElement | null>(null);
  const heartFloatRef = useRef<HTMLDivElement | null>(null);
  const diamondFloatRef = useRef<HTMLDivElement | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const resumeBtnRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!pinRef.current || !containerRef.current) return;

      // Pinned GSAP ScrollTrigger timeline matching the Skills section architecture
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=320%',
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Heading & Corner decorative elements slide in from offscreen
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: -40, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(
        bubbleParallaxRef.current,
        { x: -280, y: -100, opacity: 0, rotate: -35 },
        { x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.6, ease: 'power2.out' },
        '<'
      )
        .fromTo(
          diceParallaxRef.current,
          { x: 280, y: -100, opacity: 0, rotate: 45 },
          { x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.6, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          heartParallaxRef.current,
          { x: -280, y: 100, opacity: 0, rotate: -45 },
          { x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.6, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          diamondParallaxRef.current,
          { x: 280, y: 100, opacity: 0, rotate: 35 },
          { x: 0, y: 0, opacity: 1, rotate: 0, duration: 0.6, ease: 'power2.out' },
          '<'
        );

      // 2. Main Glassmorphic Card Reveal
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
        '>-0.3'
      );

      // 3. Scroll-scrubbed word-by-word narrative text reveal
      const words = containerRef.current.querySelectorAll<HTMLElement>('.reveal-word');
      if (words && words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0.15, y: 6 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.015,
            duration: 1.2,
            ease: 'power1.out',
          },
          '>-0.2'
        );
      }

      // 4. View Resume button slide-up
      if (resumeBtnRef.current) {
        tl.fromTo(
          resumeBtnRef.current,
          { opacity: 0, y: 20, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
          '>-0.2'
        );
      }

      // 5. Dedicated HOLD phase: Section stays fully assembled on screen for reading
      tl.to({}, { duration: 1.5 });

      // 6. Continuous subtle floating bobbing for corner elements
      gsap.to(bubbleFloatRef.current, {
        y: 12,
        x: 6,
        rotate: 8,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to(diceFloatRef.current, {
        y: -15,
        x: -8,
        rotate: -12,
        duration: 4.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to(heartFloatRef.current, {
        y: 18,
        x: -5,
        rotate: 6,
        duration: 3.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to(diamondFloatRef.current, {
        y: -14,
        x: 10,
        rotate: -10,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      aria-label="About Ubed Khan"
      className="relative w-full bg-transparent"
    >
      <div
        ref={pinRef}
        className="relative w-screen h-screen bg-transparent text-white overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8"
      >
      {/* Decorative Corner Elements */}
      {/* Bubble (Top-Left) */}
      <div
        ref={bubbleParallaxRef}
        className="absolute left-[2%] phone:left-[3%] tablet:left-8 top-[12%] tablet:top-[16%] w-[75px] phone:w-[110px] tablet:w-[130px] laptop:w-[150px] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={bubbleFloatRef} className="w-full h-full relative">
          <Image
            src="/images/elements/bubble.webp"
            alt="Bubble graphic"
            fill
            sizes="150px"
            className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          />
        </div>
      </div>

      {/* Dice (Top-Right) */}
      <div
        ref={diceParallaxRef}
        className="absolute right-[2%] phone:right-[3%] tablet:right-8 top-[12%] tablet:top-[16%] w-[85px] phone:w-[120px] tablet:w-[145px] laptop:w-[165px] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={diceFloatRef} className="w-full h-full relative">
          <Image
            src="/images/elements/dice.webp"
            alt="Dice graphic"
            fill
            sizes="165px"
            className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          />
        </div>
      </div>

      {/* Heart (Bottom-Left) */}
      <div
        ref={heartParallaxRef}
        className="absolute left-[2%] phone:left-[3%] tablet:left-8 bottom-[6%] tablet:bottom-10 w-[85px] phone:w-[120px] tablet:w-[145px] laptop:w-[165px] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={heartFloatRef} className="w-full h-full relative">
          <Image
            src="/images/elements/heart.webp"
            alt="Heart graphic"
            fill
            sizes="165px"
            className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          />
        </div>
      </div>

      {/* Diamond (Bottom-Right) */}
      <div
        ref={diamondParallaxRef}
        className="absolute right-[2%] phone:right-[3%] tablet:right-8 bottom-[6%] tablet:bottom-10 w-[95px] phone:w-[135px] tablet:w-[160px] laptop:w-[185px] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={diamondFloatRef} className="w-full h-full relative">
          <Image
            src="/images/elements/diamond.webp"
            alt="Diamond graphic"
            fill
            sizes="185px"
            className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          />
        </div>
      </div>

      {/* Main Glassmorphic Content Card */}
      <article
        ref={contentRef}
        className="w-full max-w-3xl mx-auto text-center bg-white/[0.015] hover:bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[2.5rem] px-6 sm:px-12 py-10 sm:py-14 shadow-[0_0_80px_rgba(255,255,255,0.02)] transition-all duration-700 z-20 my-auto"
      >
        <header>
          <h2
            ref={headingRef}
            id="about-heading"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={
              isHovered
                ? {
                    color: 'black',
                    WebkitTextStroke: '2px #e5e7eb',
                    background: 'none',
                    WebkitTextFillColor: 'black',
                  }
                : {}
            }
            className="text-[36px] phone:text-[48px] tablet:text-[80px] laptop:text-[95px] republica font-bold bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent mx-auto tracking-wider cursor-default transition-all duration-300 select-none mb-6 leading-none"
          >
            ABOUT ME
          </h2>
        </header>

        <div className="text-xs phone:text-sm tablet:text-base laptop:text-lg font-light text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
          {aboutParagraphs.map((text, idx) => {
            const words = text.split(' ');
            return (
              <p
                key={idx}
                className="about-para-p hover:text-white hover:translate-x-0.5 transition-all duration-300 cursor-default"
              >
                {words.map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="reveal-word inline-block mr-[0.28em] transition-colors duration-150"
                  >
                    {word}
                  </span>
                ))}
              </p>
            );
          })}
        </div>

        {/* View Resume Button */}
        <footer ref={resumeBtnRef} className="mt-8 flex justify-center">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-xs phone:text-sm font-medium text-white shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View Resume</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </footer>
      </article>
      </div>
    </section>
  );
}
