'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '@/components/ui/ContactForm';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
  const parentRef = useRef<HTMLElement | null>(null);
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const hologramRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!parentRef.current) return;

      // 1. Scroll-driven mask reveal
      gsap.fromTo(
        maskRef.current,
        { width: '100%' },
        {
          width: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: parentRef.current,
            start: 'top 70%',
            end: 'top 25%',
            scrub: 0.5,
          },
        }
      );

      // 2. Spiral Parallax
      gsap.fromTo(
        spiralRef.current,
        { x: -200, opacity: 0 },
        {
          x: 15,
          opacity: 1,
          scrollTrigger: {
            trigger: parentRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // 3. Hologram Parallax & Rotation
      gsap.fromTo(
        hologramRef.current,
        { x: 300, rotate: 0, opacity: 0 },
        {
          x: 0,
          rotate: 180,
          opacity: 1,
          scrollTrigger: {
            trigger: parentRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Continuous gentle bobbing
      gsap.to(spiralRef.current, {
        y: 10,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to(hologramRef.current, {
        y: -12,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    },
    { scope: parentRef }
  );

  return (
    <section
      id="contact"
      ref={parentRef}
      aria-labelledby="contact-heading"
      className="relative w-screen min-h-screen bg-white/95 backdrop-blur-md text-black overflow-hidden flex flex-col justify-center items-center py-16 px-4 phone:px-8"
    >
      {/* Graphic Elements */}
      <figure
        ref={spiralRef}
        className="absolute left-[2%] phone:left-[4%] top-[25%] tablet:top-[30%] w-[120px] phone:w-[180px] tablet:w-[240px] aspect-square pointer-events-none select-none z-10 opacity-90"
        aria-label="Spiral decorative graphic"
      >
        <Image
          src="/images/elements/spiral.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 180px, 240px"
          className="object-contain"
        />
      </figure>

      <figure
        ref={hologramRef}
        className="absolute right-[2%] phone:right-[4%] top-[10%] tablet:top-[15%] w-[120px] phone:w-[180px] tablet:w-[240px] aspect-square pointer-events-none select-none z-10 opacity-90"
        aria-label="Hologram decorative graphic"
      >
        <Image
          src="/images/elements/hologram.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 180px, 240px"
          className="object-contain"
        />
      </figure>

      {/* Center Layout Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col tablet:flex-row items-center justify-center gap-8 tablet:gap-14 my-auto z-20">
        {/* Left Side: Scroll-Masked Text Reveal */}
        <article className="relative overflow-hidden flex flex-col justify-center items-center tablet:items-end p-2 min-h-[220px] phone:min-h-[300px] tablet:min-h-[360px] w-full tablet:w-1/2">
          {/* Unmasking White Overlay */}
          <div
            ref={maskRef}
            className="absolute top-0 right-0 bottom-0 bg-white z-20 pointer-events-none"
            aria-hidden="true"
          />

          <header className="flex flex-col gap-2 phone:gap-4 text-center tablet:text-right items-center tablet:items-end w-full z-10">
            <h2
              id="contact-heading"
              className="republica text-3xl phone:text-5xl tablet:text-6xl text-black font-bold tracking-wider leading-tight"
            >
              LET&apos;S BUILD
            </h2>
            <p className="republica text-3xl phone:text-5xl tablet:text-6xl text-black font-bold tracking-wider leading-tight">
              SOMETHING
            </p>
            <p className="republica text-3xl phone:text-5xl tablet:text-6xl text-indigo-600 hover:text-indigo-500 font-bold tracking-wider leading-tight">
              COOL TOGETHER
            </p>
            <address className="not-italic text-lg phone:text-2xl tablet:text-3xl font-medium text-gray-800 hover:text-indigo-600 transition-colors mt-2 underline underline-offset-4">
              <a href="mailto:ubedkhan7529@gmail.com">ubedkhan7529@gmail.com</a>
            </address>
          </header>
        </article>

        {/* Right Side: Contact Form Container */}
        <div className="w-full tablet:w-1/2 max-w-md">
          <div className="p-6 phone:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
