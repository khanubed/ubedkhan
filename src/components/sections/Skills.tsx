'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '@/data/skills';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Skills() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  const laptopRef = useRef<HTMLDivElement | null>(null);
  const bulbRef = useRef<HTMLDivElement | null>(null);
  const handRef = useRef<HTMLDivElement | null>(null);
  const brainRef = useRef<HTMLDivElement | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Divide skills into 2 balanced rows dynamically
  const midPoint = Math.ceil(skillsData.length / 2);
  const row1 = skillsData.slice(0, midPoint);
  const row2 = skillsData.slice(midPoint);

  useGSAP(
    () => {
      if (!pinRef.current || !containerRef.current) return;

      const skillItems = containerRef.current.querySelectorAll<HTMLElement>('.skill-slide-item');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Heading & Corner decorative elements slide in
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: -40, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
      );

      tl.fromTo(
        laptopRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '<'
      )
        .fromTo(
          bulbRef.current,
          { x: 300, rotate: -45, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          handRef.current,
          { x: -300, rotate: 45, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '<'
        )
        .fromTo(
          brainRef.current,
          { x: 300, rotate: 90, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '<'
        );

      // 2. Sequential Slide-In for skill logos
      skillItems.forEach((item, index) => {
        tl.fromTo(
          item,
          {
            x: '85vw',
            rotate: -35,
            opacity: 0,
          },
          {
            x: 0,
            rotate: index % 2 === 1 ? 15 : 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          index === 0 ? '>+0.1' : '>-0.3'
        );
      });

      // 3. Hold phase
      tl.to({}, { duration: 1.2 });

      // 4. Subtle continuous floating bobbing for side elements
      gsap.to(laptopRef.current, {
        y: 10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to(bulbRef.current, {
        y: -12,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to(handRef.current, {
        y: 12,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to(brainRef.current, {
        y: -10,
        duration: 3.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      aria-label="Technical Skills"
      className="relative w-full bg-transparent"
    >
      <div
        ref={pinRef}
        className="relative w-screen h-screen bg-transparent text-white overflow-hidden flex flex-col items-center justify-between pt-24 phone:pt-28 tablet:pt-32 pb-10 px-4"
      >
        {/* Corner Decorative Elements */}
        <div
          ref={laptopRef}
          className="absolute top-[12%] left-[1%] phone:left-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] aspect-square pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <Image
            src="/images/skills/laptop.webp"
            alt="laptop"
            fill
            sizes="(max-width: 768px) 140px, 230px"
            className="object-contain"
          />
        </div>

        <div
          ref={bulbRef}
          className="absolute top-[12%] right-[1%] phone:right-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] aspect-square pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <Image
            src="/images/skills/bulb.webp"
            alt="bulb"
            fill
            sizes="(max-width: 768px) 140px, 230px"
            className="object-contain"
          />
        </div>

        <div
          ref={handRef}
          className="absolute bottom-[3%] left-[1%] phone:left-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] aspect-square pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <Image
            src="/images/skills/hand.webp"
            alt="hand"
            fill
            sizes="(max-width: 768px) 140px, 230px"
            className="object-contain"
          />
        </div>

        <div
          ref={brainRef}
          className="absolute bottom-[3%] right-[1%] phone:right-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] aspect-square pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
        >
          <Image
            src="/images/skills/brain.webp"
            alt="brain"
            fill
            sizes="(max-width: 768px) 140px, 230px"
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <div className="w-full flex justify-center z-20">
          <h2
            ref={headingRef}
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
            className="text-[44px] phone:text-[60px] tablet:text-[90px] laptop:text-[110px] republica font-bold bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent tracking-wider cursor-default transition-all duration-300 select-none leading-none"
          >
            SKILLS
          </h2>
        </div>

        {/* Dynamic 2-Row Skill Logos Container */}
        <ul className="w-full max-w-6xl mx-auto flex md:flex-col justify-center items-center md:gap-6 phone:gap-10 my-auto z-20 px-4" role="list" aria-label="Technical skills">
          {/* Row 1 */}
          <li className="w-full flex flex-wrap md:flex-row flex-col justify-center items-center gap-6 phone:gap-10 tablet:gap-14">
            {row1.map((skill) => (
              <figure
                key={skill.id}
                className="skill-slide-item relative w-[80px] sm:w-[140px] md:w-[140px] lg:w-[140px] xl:w-[140px] h-[80px] sm:h-[140px] pointer-events-none select-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  sizes="(max-width: 640px) 80px, 140px"
                  className="object-contain"
                />
                <figcaption className="sr-only">{skill.name} - {skill.category}</figcaption>
              </figure>
            ))}
          </li>

          {/* Row 2 */}
          <li className="w-full flex md:flex-row flex-col flex-wrap justify-center items-center gap-6 phone:gap-10 tablet:gap-14">
            {row2.map((skill) => (
              <figure
                key={skill.id}
                className="skill-slide-item relative w-[80px] sm:w-[140px] md:w-[140px] lg:w-[140px] xl:w-[140px] h-[80px] sm:h-[140px] pointer-events-none select-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  sizes="(max-width: 640px) 80px, 140px"
                  className="object-contain"
                />
                <figcaption className="sr-only">{skill.name} - {skill.category}</figcaption>
              </figure>
            ))}
          </li>
        </ul>
      </div>
    </section>
  );
}
