'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRandomRepel } from '@/lib/utils';

export default function HeroCtaButton() {
  const [motionProps, setMotionProps] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  const triggerRepel = () => {
    const { x, y } = getRandomRepel(15, 30);
    const rotate = (Math.random() - 0.5) * 25;
    const scale = 1.04 + Math.random() * 0.03;
    setMotionProps({ x, y, rotate, scale });
  };

  const resetRepel = () => {
    setMotionProps({ x: 0, y: 0, rotate: 0, scale: 1 });
  };

  return (
    <div className="flex justify-end relative right-0 z-50 pr-5 items-start max-tablet:justify-center max-tablet:items-end max-tablet:pr-0">
      <motion.a
        href="#contact"
        animate={motionProps}
        onHoverStart={triggerRepel}
        onHoverEnd={resetRepel}
        onTap={triggerRepel}
        className="px-8 flex-1 py-4 rounded-full border-2 font-thin text-lg text-white text-center max-w-[200px] shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-all max-phone:text-xs max-phone:px-2"
        style={{
          background: 'linear-gradient(30deg, #000000, #ec4899, #6366f1, #f59e42)',
          display: 'inline-block',
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 12,
          duration: 0.25,
        }}
      >
        CONTACT ME
      </motion.a>
    </div>
  );
}
