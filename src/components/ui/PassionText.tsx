'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const passions = ['web developer', 'UI/UX designer'];

export default function PassionText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % passions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="uppercase flex flex-col items-center text-sm md:text-sm font-thin text-gray-200 leading-relaxed max-phone:text-xs">
      <span className="font-semibold" style={{ display: 'inline-block', minWidth: 120 }}>
        A passionate{' '}
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="text-red-500 font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'inline-block' }}
          >
            {passions[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span>who loves creating beautiful and</span>
      <span>functional digital experiences</span>
    </div>
  );
}
