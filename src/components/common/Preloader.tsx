'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const nameLetters = 'Ubed'.split('');

const letterVariants = {
  initial: { color: '#d1d1d1', WebkitTextStroke: '0px black' },
  animate: {
    color: 'transparent',
    WebkitTextStroke: '1.5px black',
    transition: {
      duration: 0.6,
    },
  },
};

export default function Preloader() {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <motion.div
        className="w-60 h-auto mr-10 relative aspect-square"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/images/elements/bitmoji.webp"
          alt="Ubed Khan"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Animated Name */}
      <div className="flex relative z-50 text-5xl font-bold republica text-gray-200 space-x-2">
        {nameLetters.map((letter, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.6,
            }}
            className="uppercase text-white"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
