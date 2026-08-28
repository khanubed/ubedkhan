import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '../components/ContactForm';

import spiral from '../assets/elements/spiral.webp';
import hologram from '../assets/elements/hologram.webp';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const parentRef = useRef(null);
  const spiralRef = useRef(null);
  const hologramRef = useRef(null);
  const maskRef = useRef(null);

  useGSAP(
    () => {
      // 1. Scroll-driven mask reveal (unmask text from right to left on scroll)
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

      // Continuous gentle bobbing for side elements
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
      className="relative w-screen min-h-screen bg-white text-black overflow-hidden flex flex-col justify-center items-center py-16 px-4 phone:px-8"
    >
      {/* Graphic Elements */}
      {/* Spiral (Left Side) */}
      <img
        ref={spiralRef}
        src={spiral}
        alt="spiral"
        className="absolute left-[2%] phone:left-[4%] top-[25%] tablet:top-[30%] w-[120px] phone:w-[180px] tablet:w-[240px] pointer-events-none select-none z-10 opacity-90"
      />

      {/* Hologram (Right Side) */}
      <img
        ref={hologramRef}
        src={hologram}
        alt="hologram"
        className="absolute right-[2%] phone:right-[4%] top-[10%] tablet:top-[15%] w-[120px] phone:w-[180px] tablet:w-[240px] pointer-events-none select-none z-10 opacity-90"
      />

      {/* Center Layout Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col tablet:flex-row items-center justify-center gap-8 tablet:gap-14 my-auto z-20">
        {/* Left Side: Scroll-Masked Text Reveal */}
        <div className="relative overflow-hidden flex flex-col justify-center items-center tablet:items-end p-2 min-h-[220px] phone:min-h-[300px] tablet:min-h-[360px] w-full tablet:w-1/2">
          {/* Unmasking White Overlay */}
          <div
            ref={maskRef}
            className="absolute top-0 right-0 bottom-0 bg-white z-20 pointer-events-none"
          />

          <div className="flex flex-col gap-2 phone:gap-4 text-center tablet:text-right items-center tablet:items-end w-full z-10">
            <span className="republica text-3xl phone:text-5xl tablet:text-6xl text-black font-bold tracking-wider leading-tight">
              LET'S BUILD
            </span>
            <span className="republica text-3xl phone:text-5xl tablet:text-6xl text-black font-bold tracking-wider leading-tight">
              SOMETHING
            </span>
            <span className="republica text-3xl phone:text-5xl tablet:text-6xl text-indigo-600 hover:text-indigo-500 xt-black font-bold tracking-wider leading-tight">
              COOL TOGETHER
            </span>
            <a
              href="mailto:ubedkhan7529@gmail.com"
              className="text-lg phone:text-2xl tablet:text-3xl font-medium text-gray-800 hover:text-indigo-600 transition-colors mt-2 underline underline-offset-4"
            >
              ubedkhan7529@gmail.com
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form Container */}
        <div className="w-full tablet:w-1/2 max-w-md">
          <div className="p-6 phone:p-8 ">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;