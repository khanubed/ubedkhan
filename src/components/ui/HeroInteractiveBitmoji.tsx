'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getRandomRepel } from '@/lib/utils';

export default function HeroInteractiveBitmoji() {
  const [motionProps, setMotionProps] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  const triggerRepel = (isTap = false) => {
    const { x, y } = getRandomRepel(15, 30);
    const rotate = (Math.random() - 0.5) * (isTap ? 25 : 8);
    const scale = (isTap ? 1.04 : 1.02) + Math.random() * 0.03;
    setMotionProps({ x, y, rotate, scale });
  };

  const resetRepel = () => {
    setMotionProps({ x: 0, y: 0, rotate: 0, scale: 1 });
  };

  return (
    <div className="absolute top-[52%] -translate-y-1/2 laptop:top-auto laptop:translate-y-0 laptop:bottom-8 desktop:bottom-12 2xl:bottom-14 left-0 w-full flex justify-center items-center laptop:items-end pointer-events-none z-30">
      <motion.div
        className="pointer-events-auto"
        animate={motionProps}
        onHoverStart={() => triggerRepel(false)}
        onHoverEnd={resetRepel}
        onTap={() => triggerRepel(true)}
        transition={{
          type: 'spring',
          stiffness: 160,
          damping: 14,
          duration: 0.35,
        }}
      >
        <Image
          src="/images/elements/bitmoji.webp"
          alt="Ubed Khan Bitmoji Avatar"
          width={580}
          height={580}
          priority
          className="w-auto h-[240px] phone:h-[300px] tablet:h-[380px] laptop:h-[440px] desktop:h-[480px] 2xl:h-[520px] 3xl:h-[580px] max-h-[54vh] max-w-[85vw] aspect-auto object-contain cursor-pointer select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        />
      </motion.div>
    </div>
  );
}
