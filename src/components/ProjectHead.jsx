import React from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
const ScrollSlider = () => {
  const { scrollYProgress } = useScroll();
  const a = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const b = useTransform(scrollYProgress, [0, 1], ['-160%', '-40%']);
  const items = Array.from({ length: 16 });
  return (<>
  {/* -------- DESKTOP---------------- */}
    <div className="h-[50vh] w-[200vw] bg-black flex flex-col justify-between max-tablet:hidden whitespace-nowrap scrollbar-hide">
      <div className="h-[15vh]  absolute z-20 -left-20  rotate-0 republica w- z-60  bg-white text-black text-7xl">
        <motion.div
          className="h-full w-auto  gap-2 flex-nowrap items-center flex"
          style={{ x: a }}
        >
          {items.map((_, i) => (
            <span key={`row2-${i}`}>PROJECTS | </span>
          ))}          
        </motion.div>
      </div>
      <div className="h-[15vh] -rotate-12 -top-20 absolute republica -left-12 bg-white text-black text-7xl z-10 w-full">
        <motion.div
          className="h-full  w-auto gap-2 flex-nowrap items-center flex"
          style={{ x: b }}
        >
          {items.map((_, i) => (
            <span key={`row2-${i}`}>PROJECTS | </span>
          ))}       
        </motion.div>
      </div>      
    </div>
  {/* -------- PHONE  ---------------- */}
    <div className="h-[50vh] w-[200vw] bg-black flex flex-col justify-between tablet:hidden whitespace-nowrap scrollbar-hide">
      <div className="h-[15vh]  absolute z-20 -left-20  rotate-0 republica w- z-60  bg-white text-black text-7xl">
        <motion.div
          className="h-full w-auto  gap-2 flex-nowrap items-center flex"
          animate={{ x: ['0%', '-20%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((_, i) => (
            <span key={`row2-${i}`}>PROJECTS | </span>
          ))}          
        </motion.div>
      </div>
      <div className="h-[15vh] -rotate-12 -top-20 absolute republica -left-12 bg-white text-black text-7xl z-10 w-full">
        <motion.div
          className="h-full  w-auto gap-2 flex-nowrap items-center flex"
          animate={{ x: ['-100%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((_, i) => (
            <span key={`row2-${i}`}>PROJECTS | </span>
          ))}       
        </motion.div>
      </div>      
    </div>
    </>
  )
}

export default ScrollSlider