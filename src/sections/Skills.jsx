import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/skillsData';

import hand from '../assets/skillElements/hand.webp';
import laptop from '../assets/skillElements/laptop.webp';
import bulb from '../assets/skillElements/bulb.webp';
import brain from '../assets/skillElements/brain.webp';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const [isHovered, setIsHovered] = useState(false);
  const parentRef = useRef(null);

  const laptopRef = useRef(null);
  const bulbRef = useRef(null);
  const handRef = useRef(null);
  const brainRef = useRef(null);

  const headingRef = useRef(null);

  // Divide skills into 2 balanced rows dynamically
  const midPoint = Math.ceil(skillsData.length / 2);
  const row1 = skillsData.slice(0, midPoint);
  const row2 = skillsData.slice(midPoint);

  useGSAP(
    () => {
      const skillItems = gsap.utils.toArray('.skill-slide-item');

      // Extended scroll distance (350% height) for extra reading time
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
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

      // 2. Sequential Slide-In for skill logos (ends earlier in timeline)
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

      // 3. Hold/Rest phase: All items stay fully assembled on screen while scrolling
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
    { scope: parentRef }
  );

  return (
    <section
      id="skills"
      ref={parentRef}
      className="relative w-screen h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-between pt-24 phone:pt-28 tablet:pt-32 pb-10 px-4"
    >
      {/* Corner Decorative Elements with top padding consideration */}
      <img
        ref={laptopRef}
        src={laptop}
        alt="laptop"
        className="absolute top-[12%] left-[1%] phone:left-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      />

      <img
        ref={bulbRef}
        src={bulb}
        alt="bulb"
        className="absolute top-[12%] right-[1%] phone:right-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      />

      <img
        ref={handRef}
        src={hand}
        alt="hand"
        className="absolute bottom-[3%] left-[1%] phone:left-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      />

      <img
        ref={brainRef}
        src={brain}
        alt="brain"
        className="absolute bottom-[3%] right-[1%] phone:right-[3%] w-[90px] phone:w-[140px] tablet:w-[190px] laptop:w-[230px] pointer-events-none select-none z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      />

      {/* Heading placed comfortably below navbar */}
      <div className="w-full flex justify-center z-20">
        <h1
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
        </h1>
      </div>

      {/* Dynamic 2-Row Direct Skill Logos Container */}
      <div className="w-full max-w-6xl mx-auto flex md:flex-col  justify-center items-center  md:gap-6 phone:gap-10 my-auto z-20 px-4">
        {/* Row 1 */}
        <div className="w-full flex flex-wrap md:flex-row flex-col  justify-center items-center gap-6 phone:gap-10 tablet:gap-14">
          {row1.map((skill) => (
            <img
              key={skill.id}
              src={skill.icon}
              alt={skill.name}
              className="skill-slide-item w-[80px] sm:w-[140px] md:w-[140px] lg:w-[140px] xl:w-[140px] h-auto object-contain pointer-events-none select-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="w-full flex md:flex-row flex-col flex-wrap justify-center items-center gap-6 phone:gap-10 tablet:gap-14">
          {row2.map((skill) => (
            <img
              key={skill.id}
              src={skill.icon}
              alt={skill.name}
              className="skill-slide-item w-[80px] sm:w-[140px] md:w-[140px] lg:w-[140px] xl:w-[140px] h-auto object-contain pointer-events-none select-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
