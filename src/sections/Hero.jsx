import React from 'react';
import { motion } from 'framer-motion';
import Passion from '../utils/Passion';
import bitmoji from '../assets/elements/bitmoji.webp';

const Hero = () => {
  // Helper to generate a random angle and distance for repelling effect
  const getRandomRepel = () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = 12 + Math.random() * 15;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  return (
    <div
      id="hero"
      className="bg-black text-white relative min-h-screen w-screen overflow-hidden flex flex-col justify-between items-center pt-24 phone:pt-28 pb-10 px-4 phone:px-8 select-none"
    >
      {/* ---------------- HEADING --------------------- */}
      <div className="w-full flex justify-center z-10">
        <h1 className="republica font-bold text-center tracking-wider bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent leading-none text-[48px] phone:text-[72px] tablet:text-[110px] laptop:text-[145px] 2xl:text-[170px] transition-all duration-300">
          UBED KHAN
        </h1>
      </div>

      {/* ---------------- BITMOJI CENTER --------------------- */}
      <div className="relative my-auto flex justify-center items-center z-20">
        <motion.img
          src={bitmoji}
          alt="Bitmoji"
          className="w-auto h-[240px] phone:h-[300px] tablet:h-[380px] laptop:h-[430px] object-contain rounded-full shadow-[0_0_50px_rgba(255,255,255,0.08)] cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          whileTap={() => {
            const { x, y } = getRandomRepel();
            const rotate = (Math.random() - 0.5) * 25;
            const scale = 1.04 + Math.random() * 0.03;
            return {
              x,
              y,
              rotate,
              scale,
              transition: {
                type: 'spring',
                stiffness: 180,
                damping: 12,
                duration: 0.25,
              },
            };
          }}
          whileHover={() => {
            const { x, y } = getRandomRepel();
            const rotate = (Math.random() - 0.5) * 8;
            const scale = 1.02 + Math.random() * 0.03;
            return {
              x,
              y,
              rotate,
              scale,
              transition: {
                type: 'spring',
                stiffness: 160,
                damping: 14,
                duration: 0.35,
              },
            };
          }}
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 14,
            duration: 0.35,
          }}
        />
      </div>

      {/* ---------------- BOTTOM CONTENT (Passion Ticker & Contact Button) --------------------- */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 z-30 px-4">
        {/* Passion text ticker */}
        <div className="flex justify-center sm:justify-start">
          <Passion />
        </div>

        {/* Contact Me Button */}
        <div className="flex justify-center sm:justify-end">
          <motion.a
            href="#contact"
            className="px-7 py-3.5 rounded-full border border-white/20 text-sm phone:text-base font-medium text-white text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            style={{
              background:
                'linear-gradient(30deg, #000000, #ec4899, #6366f1, #f59e42)',
            }}
            whileHover={() => {
              const { x, y } = getRandomRepel();
              const rotate = (Math.random() - 0.5) * 20;
              const scale = 1.04 + Math.random() * 0.03;
              return {
                x,
                y,
                rotate,
                scale,
                transition: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12,
                  duration: 0.25,
                },
              };
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 12,
              duration: 0.05,
            }}
          >
            CONTACT ME
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Hero;