import React from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
const ScrollSlider = () => {
  const { scrollYProgress } = useScroll();
  const a = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const b = useTransform(scrollYProgress, [0, 1], ['-100%', '-20%']);
  const items = Array.from({ length: 10 });
  return (<>
    <div className="h-[75vh] p-4 w-full bg-black overflow-x-hidden whitespace-nowrap scrollbar-hide
                    max-laptop:hidden">
      <div className="h-[33vh] w-full">
        <motion.div
          className="h-full w-auto gap-2 flex-nowrap flex"
          style={{ x: a }}
        >
          <div  className='h-full block1 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block2 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block3 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block4 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block5 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block6 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block7 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block8 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block9 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div  className='h-full block10 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
        </motion.div>
      </div>
      <div className="h-[33vh] w-full">
        <motion.div
          className="h-full mt-3 w-auto gap-2 flex-nowrap flex"
          style={{ x: b }}
        >
          <div className='h-full block1 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block2 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block3 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block4 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block5 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block6 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block7 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block8 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block9 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
          <div className='h-full block10 rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0'></div>
        </motion.div>
      </div>            
    </div>
    <div className="h-[40vh] p-4 w-full tablet:hidden bg-black overflow-x-hidden whitespace-nowrap scrollbar-hide">
      {/* Row 1 */} 
      <div className="h-[18vh] relative  w-full overflow-hidden">
        <motion.div
          className="flex h-full absolute gap-2 w-full"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((_, i) => (
            <div
              key={`row2-${i}`}
              className={`h-full rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0 ${'block'+(i+1)}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Row 2 (opposite direction) */}
      <div className="h-[18vh] relative w-full mt-3 overflow-hidden">
        <motion.div
          className="flex gap-2 absolute h-full w-full"
          animate={{ x: ['-100%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((_, i) => (
            <div
              key={`row2-${i}`}
              className={`h-full rounded-xl bg-slate-100 w-[350px] flex-grow-0 flex-shrink-0 ${'block'+(i+1)}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default ScrollSlider