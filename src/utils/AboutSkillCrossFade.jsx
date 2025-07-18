import React from 'react'
import AboutMe from '../sections/AboutMe'
import Skills from '../sections/Skills'
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SkillsPhone from '../sections/SkillsPhone';


const AboutSkillCrossFade = () => {
   const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"], // scroll progress from 0 to 1 for this container
  });

  // First section opacity: 1 to 0 (fade out)
  const firstOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);

  // Second section opacity: 0 to 1 (fade in)
  const secondOpacity = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);

  return (
    <div ref={containerRef} className="h-[445vh] max-tablet:h-[220vh] flex flex-col max-tablet:justify-between relative">
      
      <motion.div
      style={{ opacity: firstOpacity }} className='sticky  top-[-75px]' >
        <AboutMe></AboutMe>
        <div className='h-100px w-full bg-black'></div>
      </motion.div>
      <motion.div style={{opacity: secondOpacity}} className='sticky top-[0%] h-[350vh] max-tablet:hidden ' >
        <Skills></Skills>
      </motion.div>
      <SkillsPhone className = 'tablet:hidden'></SkillsPhone>
    </div>
  );
};

export default AboutSkillCrossFade