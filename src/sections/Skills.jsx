import { useRef } from 'react';

import hand from '../assets/skillElements/hand.webp'
import laptop from '../assets/skillElements/laptop.webp'
import bulb from '../assets/skillElements/bulb.webp'
import brain from '../assets/skillElements/brain.webp'

import { motion, useAnimation } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

import react from '../assets/skillElements/react.webp'
import tailwind from '../assets/skillElements/tailwind-css.webp'
import photoshop from '../assets/skillElements/photoshop.webp'
import express from '../assets/skillElements/express.webp'
import javascript from '../assets/skillElements/javascript.webp'
import nodejs from '../assets/skillElements/nodejs.webp'
import mongo from '../assets/skillElements/mongo-db.webp'



const Skills = () => {
  const parentRef = useRef(null);

  // Use correct offset to start when section enters viewport
  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start end", "start start"], // Trigger when section comes into view from bottom
  });

  const headingRef = useRef(null);
      const { scrollYProgress: headingScrollY } = useScroll({
          target: headingRef,
          offset: ["start end", "center start"]
      });
    const headingOpacity = useTransform(headingScrollY, [0.2, 0.8], [0, 1]);
  // console.log(parentRef)

  // Drop from -200px to 0px
  // const y = useTransform(scrollYProgress, [0.5, 1], [-200, 20]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]); // fade in early

//   const parallaxRef = useRef(null);

    const { scrollYProgress: parallaxScroll } = useScroll({
        target: parentRef ,
        offset: ['start end', 'end start'],
    });

  const parallaxY = useTransform(parallaxScroll, [0, 1], [0, -100 * (0.5)]);

  //Side-Elements 
  
  
      const laptopRef = useRef(null);
      const { scrollYProgress: laptopScrollY } = useScroll({
          target: parentRef,
          offset: ["start center", "start start"]
      });
      const laptopX = useTransform(laptopScrollY, [0, 1], [-200, 75]);
      
      const bulbRef = useRef(null);
      const { scrollYProgress: bulbScrollY } = useScroll({
          target: bulbRef,
          offset: ["start 75%", "start start"]
      });
      const bulbX = useTransform(bulbScrollY, [0, 1], [200, -25]);
      const bulbRotate = useTransform(bulbScrollY, [0, 1], [-45, 0]);
  
      const brainRef = useRef(null);
      const { scrollYProgress: brainScrollY } = useScroll({
          target: parentRef,
          offset: ["start 25%", "start 0%"]
      });
      const brainX = useTransform(brainScrollY, [0, 1], [300, -20]);
      const brainRotate = useTransform(brainScrollY, [0, 1], [90,0   ]);
  
      const handRef = useRef(null);
      const { scrollYProgress: handScrollY } = useScroll({
          target: parentRef,
          offset: ["start 25%", "start 0%"] 
      });
      const handX = useTransform(handScrollY, [0, 1], [-300, 20]);
      const handRotate = useTransform(handScrollY, [0, 1], [45 , 0]);

      //Centre Element Animation
      const javascriptRef = useRef(null);
      const { scrollYProgress: javascriptScrollY } = useScroll({
          target: parentRef,
          offset: ["23% end", "23% center"]
      });
      const javascriptX = useTransform(javascriptScrollY, [0, 1], [1300, 0]);
      const javascriptRotate = useTransform(javascriptScrollY, [0, 1], [-35,0]);
      const javascriptOpacity = useTransform(javascriptScrollY, [0, 1], [0, 1]);

      const tailwindRef = useRef(null);
      const { scrollYProgress: tailwindScrollY } = useScroll({
          target: parentRef,
          offset: ["28% end", "28% center"]
      });
      const tailwindX = useTransform(tailwindScrollY, [0, 1], [1300, 0]);
      const tailwindRotate = useTransform(tailwindScrollY, [0, 1], [-35,15]);
      const tailwindOpacity = useTransform(tailwindScrollY, [0, 1], [0, 1]);

      const photoshopRef = useRef(null);
      const { scrollYProgress: photoshopScrollY } = useScroll({
          target: parentRef,
          offset: ["33% end", "33% center"]
      });
      const photoshopX = useTransform(photoshopScrollY, [0, 1], [1300, 0]);
      const photoshopRotate = useTransform(photoshopScrollY, [0, 1], [-35,0]);
      const photoshopOpacity = useTransform(photoshopScrollY, [0, 1], [0, 1]);

      const mongoRef = useRef(null);
      const { scrollYProgress: mongoScrollY } = useScroll({
          target: parentRef,
          offset: ["38% end", "38% center"]
      });
      const mongoX = useTransform(mongoScrollY, [0, 1], [1300, 0]);
      const mongoRotate = useTransform(mongoScrollY, [0, 1], [-35,0]);
      const mongoOpacity = useTransform(mongoScrollY, [0, 1], [0, 1]);

      const expressRef = useRef(null);
      const { scrollYProgress: expressScrollY } = useScroll({
          target: parentRef,
          offset: ["43% end", "43% center"]
      });
      const expressX = useTransform(expressScrollY, [0, 1], [1300, 0]);
      const expressRotate = useTransform(expressScrollY, [0, 1], [-35,0]);
      const expressOpacity = useTransform(expressScrollY, [0, 1], [0, 1]);

      const reactRef = useRef(null);
      const { scrollYProgress: reactScrollY } = useScroll({
          target: parentRef,
          offset: ["48% end", "48% center"]
      });
      const reactX = useTransform(reactScrollY, [0, 1], [1300, 0]);
      const reactRotate = useTransform(reactScrollY, [0, 1], [-35,0]);
      const reactOpacity = useTransform(reactScrollY, [0, 1], [0, 1]);

      const nodejsRef = useRef(null);
      const { scrollYProgress: nodejsScrollY } = useScroll({
          target: parentRef,
          offset: ["53% end", "53% center"]
      });
      const nodejsX = useTransform(nodejsScrollY, [0, 1], [1300, 0]);
      const nodejsRotate = useTransform(nodejsScrollY, [0, 1], [-35,0]);
      const nodejsOpacity = useTransform(nodejsScrollY, [0, 1], [0, 1]);

      

      

  return (<>
    <section ref={parentRef }    className='w-screen h-[350vh] max-tablet:hidden pt-[0px] relative flex flex-col justify-start  text-white  overflow-x-clip bg-black'>
      {/* <span className='absolute ' >section start</span> */}
      
      <div className='sticky top-5'>
      <motion.img
                      ref={laptopRef}
                      src={laptop}
                      alt="laptop"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute opacity-100 top-[3] left-0 w-[200px] h-[200px] md:w-[250px] md:h-[250px] m-4 pointer-events-none select-none"
                      style={{ x: laptopX , y: parallaxY }}
                  /></div>
      <div className='sticky top-5'>
                  <motion.img
                      ref={bulbRef}
                      src={bulb}
                      alt="bulb"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute top-0 right-10 w-[200px] h-[170px] md:w-[230px] md:h-[230px] m-4 pointer-events-none select-none"
                      style={{ x: bulbX, rotate: bulbRotate , y: parallaxY}}
                  /></div>
      <div className='sticky w-auto top-[62%]'>           
                  <motion.img
                      ref={handRef}
                      src={hand}
                      alt="hand"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute  left-16 w-auto h-[180px] md:w-auto md:h-[250px] m-4 pointer-events-none select-none"
                      style={{ x: handX, rotate: handRotate , y: parallaxY }}
                  /></div> 
      <div className='sticky top-[65%]'>              
                  <motion.img
                      ref={brainRef}
                      src={brain}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute  top-[30%] right-10 w-[180px] h-auto md:w-[250px] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: brainX, rotate: brainRotate , y: parallaxY }}
                  /></div>

        <div className=' w-full flex sticky top-[0px] justify-center '>
            <motion.h1
            ref={headingRef}
          style={{  opacity: headingOpacity}}
          className="text-[64px] absolute top-[20px] md:text-[120px] republica font-bold mx-auto text-center tracking-wider
            bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent transition-colors"
            whileHover={{
                color: "#000",
                WebkitTextStroke: "2px #e5e7eb",
                background: "none",
                WebkitBackgroundClip: "unset",
                WebkitTextFillColor: "unset"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          SKILLS
        </motion.h1></div>
        
        <div className=' w-full sticky top-0 h-[300vh] bg-transparent '>
        {/* <div className='flex flex-row h-24 top-[180vh] w-full justify-between sticky'> */}
          <div className='sticky  top-[42%]'>              
                  <motion.img
                      ref={javascriptRef}
                      src={javascript}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" absolute    left-[12%] w-[1/5] h-auto md:w-[10%] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: javascriptX, rotate: javascriptRotate , y: parallaxY , opacity:javascriptOpacity}}
                  /></div>
          <div className='sticky  top-[42%]'>              
                  <motion.img
                      ref={tailwindRef}
                      src={tailwind}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" absolute    left-[23%] w-[180px] h-auto md:w-[10%] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: tailwindX, rotate: tailwindRotate , y: parallaxY ,opacity:tailwindOpacity  }}
                  /></div>
          <div className='sticky  top-[42%]'>              
                  <motion.img
                      ref={photoshopRef}
                      src={photoshop}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" absolute    left-[33%] w-[180px] h-auto md:w-[10%] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: photoshopX, rotate: photoshopRotate , y: parallaxY ,opacity:photoshopOpacity  }}
                  /></div>
          <div className='sticky  top-[42%]'>              
                  <motion.img
                      ref={mongoRef}
                      src={mongo}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" absolute    left-[44%] w-[180px] h-auto md:w-[10%] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: mongoX, rotate: mongoRotate , y: parallaxY ,opacity:mongoOpacity  }}
                  /></div>

          <div className='sticky  top-[42%]'>              
                  <motion.img
                      ref={expressRef}
                      src={express}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" absolute    right-[33%] w-[180px] h-auto md:w-[10%] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: expressX, rotate: expressRotate , y: parallaxY ,opacity:expressOpacity  }}
                  /></div> 

          <div className='sticky  top-[42%]'>              
                  <motion.img
                      ref={reactRef}
                      src={react}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" absolute    right-[23%] w-[180px] h-auto md:w-[10%] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: reactX, rotate: reactRotate , y: parallaxY ,opacity:reactOpacity  }}
                  /></div>  

          <div className='sticky  top-[42%]'>              
                  <motion.img
                      ref={nodejsRef}
                      src={nodejs}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" absolute    right-[12%] w-[180px]  h-auto md:w-[10%] md:h-auto m-4 pointer-events-none select-none"
                      style={{ x: nodejsX, rotate: nodejsRotate , y: parallaxY ,opacity:nodejsOpacity  }
                        
                    }
                  /></div>.  
        </div>  
        {/* </div> */}
        
      
      
      
    </section>
    
    </>
  );
};

export default Skills;
