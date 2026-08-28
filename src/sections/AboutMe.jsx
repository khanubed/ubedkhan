import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutParagraphs, resumeUrl } from "../data/aboutData";

import Bubble from "../assets/elements/bubble.webp";
import Diamond from "../assets/elements/diamond.webp";
import Heart from "../assets/elements/heart.webp";
import Dice from "../assets/elements/dice.webp";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const [isHovered, setIsHovered] = useState(false);
  const parentRef = useRef(null);

  // Parallax elements refs (outer containers)
  const bubbleParallaxRef = useRef(null);
  const diceParallaxRef = useRef(null);
  const heartParallaxRef = useRef(null);
  const diamondParallaxRef = useRef(null);

  // Floating elements refs (inner wrappers)
  const bubbleFloatRef = useRef(null);
  const diceFloatRef = useRef(null);
  const heartFloatRef = useRef(null);
  const diamondFloatRef = useRef(null);

  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // 1. Gentle continuous floating animations (yoyo bobbing)
    gsap.to(bubbleFloatRef.current, {
      y: 12,
      x: 6,
      rotate: 8,
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    gsap.to(diceFloatRef.current, {
      y: -15,
      x: -8,
      rotate: -12,
      duration: 4.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    gsap.to(heartFloatRef.current, {
      y: 18,
      x: -5,
      rotate: 6,
      duration: 3.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    gsap.to(diamondFloatRef.current, {
      y: -14,
      x: 10,
      rotate: -10,
      duration: 4.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // 2. Scroll Parallax Animations
    gsap.fromTo(bubbleParallaxRef.current,
      { y: 80, x: -50, rotate: -20 },
      {
        y: -80,
        x: 30,
        rotate: 15,
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      }
    );

    gsap.fromTo(diceParallaxRef.current,
      { y: 100, x: 50, rotate: -45 },
      {
        y: -100,
        x: -30,
        rotate: 270,
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      }
    );

    gsap.fromTo(heartParallaxRef.current,
      { y: 140, x: -70, rotate: 45 },
      {
        y: -140,
        x: 50,
        rotate: -10,
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 85%",
          end: "bottom top",
          scrub: 1.8,
        }
      }
    );

    gsap.fromTo(diamondParallaxRef.current,
      { y: 140, x: 70, rotate: -60 },
      {
        y: -140,
        x: -50,
        rotate: 45,
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 85%",
          end: "bottom top",
          scrub: 1.8,
        }
      }
    );

    // 3. Main Card & Text Reveal
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Scroll-triggered word-by-word text reveal per paragraph
    const paras = gsap.utils.toArray(".about-para-p");
    paras.forEach((p) => {
      const words = p.querySelectorAll(".reveal-word");
      gsap.fromTo(words,
        { opacity: 0.15, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.015,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    ScrollTrigger.refresh();
  }, { scope: parentRef });

  return (
    <section
      id="about"
      ref={parentRef}
      className="relative flex flex-col items-center justify-center min-h-[110vh] py-20 px-4 sm:px-8 bg-black text-white overflow-hidden"
    >
      {/* Decorative Corner / Parallax Elements with dual animation layers */}
      
      {/* Bubble (Top-Left) */}
      <div
        ref={bubbleParallaxRef}
        className="absolute left-[1%] phone:left-[3%] tablet:left-8 top-[12%] tablet:top-[22%] w-[80px] phone:w-[120px] tablet:w-[12%] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={bubbleFloatRef} className="w-full h-full">
          <img src={Bubble} alt="Bubble" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
        </div>
      </div>

      {/* Dice (Top-Right) */}
      <div
        ref={diceParallaxRef}
        className="absolute right-[1%] phone:right-[3%] tablet:right-8 top-[12%] tablet:top-[20%] w-[100px] phone:w-[140px] tablet:w-[14%] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={diceFloatRef} className="w-full h-full">
          <img src={Dice} alt="Dice" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
        </div>
      </div>

      {/* Heart (Bottom-Left) */}
      <div
        ref={heartParallaxRef}
        className="absolute left-[1%] phone:left-[3%] tablet:left-6 bottom-[4%] tablet:bottom-8 w-[100px] phone:w-[140px] tablet:w-[15%] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={heartFloatRef} className="w-full h-full">
          <img src={Heart} alt="Heart" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
        </div>
      </div>

      {/* Diamond (Bottom-Right) */}
      <div
        ref={diamondParallaxRef}
        className="absolute right-[1%] phone:right-[3%] tablet:right-4 bottom-[4%] tablet:bottom-8 w-[120px] phone:w-[160px] tablet:w-[18%] aspect-square pointer-events-none select-none z-10"
      >
        <div ref={diamondFloatRef} className="w-full h-full">
          <img src={Diamond} alt="Diamond" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
        </div>
      </div>

      {/* Main Glassmorphic Content Card */}
      <div
        ref={contentRef}
        className="w-full max-w-3xl mx-auto text-center bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-sm rounded-[2.5rem] px-6 sm:px-12 py-14 sm:py-16 shadow-[0_0_80px_rgba(255,255,255,0.01)] hover:shadow-[0_0_100px_rgba(255,255,255,0.03)] transition-all duration-700 z-20"
      >
        <h2
          ref={headingRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={isHovered ? {
            color: "black",
            WebkitTextStroke: "2px #e5e7eb",
            background: "none",
            WebkitTextFillColor: "black"
          } : {}}
          className="text-[40px] phone:text-[54px] tablet:text-[90px] laptop:text-[105px] republica font-bold bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent mx-auto tracking-wider cursor-default transition-all duration-300 select-none mb-8 leading-none"
        >
          ABOUT ME
        </h2>

        <div className="text-sm phone:text-base tablet:text-lg laptop:text-xl font-light text-gray-300 leading-relaxed space-y-6 whitespace-pre-wrap">
          {aboutParagraphs.map((text, idx) => {
            const words = text.split(" ");
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
        <div className="mt-10 flex justify-center">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-sm phone:text-base font-medium text-white shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View Resume</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Bottom spacer */}
      <div className="w-full h-[60px] bg-black"></div>
    </section>
  );
};

export default AboutMe;
