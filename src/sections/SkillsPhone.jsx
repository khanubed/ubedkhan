import React from 'react'
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

const SkillsPhone = () => {
  return (
    <div>
        <section  className='w-screen h-[100vh] tablet:hidden pt-[0px] relative flex flex-col justify-start  text-white  bg-black'>
      {/* <span className='absolute ' >section start</span> */}
      <div className='w-full absolute -top-[15%] flex justify-between'>
      <div className=''>
      <motion.img
                      
                      src={laptop}
                      alt="laptop"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute opacity-100 w-[200px] h-[200px]  max-phone:w-[150px] max-phone:h-[150px] pointer-events-none select-none"
                    
                  /></div>
      <div className=''>
                  <motion.img
                      
                      src={bulb}
                      alt="bulb"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute top-0 right-0 w-[200px] h-[200px]  max-phone:w-[150px] max-phone:h-[150px] pointer-events-none select-none"
                      
                  /></div></div>
    <div className='w-full absolute bottom-[45%] flex justify-between'>              
      <div className='-px-[80px]'>           
                  <motion.img
                      
                      src={hand}
                      alt="hand"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute  left-[1%] w-[200px] h-[200px]  max-phone:w-[150px] max-phone:h-[150px]  m-4 pointer-events-none select-none"
                      
                  /></div> 
      <div className=''>              
                  <motion.img
                      
                      src={brain}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute -right-[3%] w-[200px] h-auto  max-phone:w-[150px] max-phone:h-auto  m-4 pointer-events-none select-none"
                      
                  /></div>
    </div>
        <div className=' w-full flex relative top-[0px] justify-center '>
            <motion.h1
          className="text-[64px] absolute md:text-[120px] republica font-bold mx-auto text-center tracking-wider
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
        
        <div className=' w-full absolute top-10 flex h-[70vh] bg-transparent '>
        <div className='flex flex-col w-full  justify-center items-center'>
            <div className='flex flex-col justify-evenly items-center max-phone:flex-row'>
                <div className='flex justify-evenly items-center max-phone:flex-col'>
                    <div className=''>              
                        <motion.img                    
                            src={javascript}
                            alt="brain"
                            transition={{ duration: 0.6, ease: "easeIn" }}
                            className=" w-[120px] max-phone:w-[90px] h-auto m-4   pointer-events-none select-none"
                        /></div>
                    <div className=''>              
                        <motion.img                      
                            src={tailwind}
                            alt="brain"
                            transition={{ duration: 0.6, ease: "easeIn" }}
                            className="w-[120px] max-phone:w-[90px] h-auto  m-4   pointer-events-none      select-none"                      
                        /></div>
                    <div className=''>              
                          <motion.img                      
                              src={photoshop}
                              alt="brain"
                              transition={{ duration: 0.6, ease: "easeIn" }}
                              className=" w-[120px] max-phone:w-[90px] h-auto m-4        pointer-events-none    select-none"                      
                          /></div>
                </div>
                <div className='flex justify-evenly items-center max-phone:flex-col'>
                    <div className=''>              
                  <motion.img
                      src={mongo}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className="w-[120px] max-phone:w-[90px] h-auto m-4 pointer-events-none select-none"
                  /></div>
          <div className=''>              
                  <motion.img
                      src={express}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className=" w-[120px] max-phone:w-[90px] h-auto  m-4 pointer-events-none select-none"
                  /></div> 
          <div className=''>              
                  <motion.img
                      src={react}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className="  w-[120px] max-phone:w-[90px] h-auto m-4 pointer-events-none select-none"
                  /></div>  
                </div>
            </div>
            <div className='justify-evenly items-center flex'>
                <div className='justify-evenly items-center flex'>
                    <div className=''>              
                  <motion.img
                      src={nodejs}
                      alt="brain"
                      transition={{ duration: 0.6, ease: "easeIn" }}
                      className="w-[120px] max-phone:w-[90px] h-auto  m-4 pointer-events-none select-none"
                  /></div>
                </div>
            </div>
        </div>        
          
          
          
        </div>
    </section>
    </div>
  )
}

export default SkillsPhone