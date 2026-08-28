import React from "react";
import NavBar from "../components/NavBar"; // Assuming you have a CSS file for styles
import { motion } from "framer-motion"; // Adjust the path as necessary
import Passion from "../utils/Passion"; // Adjust the path as necessary
import bitmoji from "../assets/elements/bitmoji.webp"; // Adjust the path as necessary

const Hero = () => {
  // Helper to generate a random angle and distance for repelling effect
  const getRandomRepel = () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = 15 + Math.random() * 15; // 15px to 30px (less movement)
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  return (
    <div
      id="hero"
      className="bg-black  text-white relative min-h-screen flex flex-col items-center"
    >
      {/* ----------------HEADING ---------------------*/}
      <div className="absolute max-tablet:top-[10%]  top-16 w-full flex justify-center select-none max-phone:top-[10%]">
        <h1
          className="text-[140px] flex md:gap-8 leading-none
                     max-tablet:flex-col max-tablet:gap-6 max-tablet:text-[100px] 2xl:text-[170px] max-phone:text-[80px] republica mt-5 tracking-wide font-bold text-center bg-gradient-to-b  from-gray-500 to-white bg-clip-text text-transparent"
        >
          UBED KHAN
        </h1>
      </div>
      {/* ----------------CENTER CONTENT--------------- */}
      <div
        className=" flex gap-4 justify-between px-[160px] absolute z-40 w-full mt-[200px] top-[15%]
                      max-tablet:bottom-[18%] max-tablet:flex-col max-tablet:justify-end 
                      max-phone:px-[60px]"
      >
        <div className="flex justify-center items-center">
          <Passion></Passion>
        </div>
        <div
          className="flex justify-end relative right-0 z-50 pr-5 0 items-start
                      max-tablet:justify-center max-tablet:items-end
                      max-tablet:pr-0"
        >
          <motion.a
            href="#contact"
            className="px-8 flex-1 py-4 rounded-full  border-2 font-thin text-lg text-white text-center max-w-[200px] shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-all
        max-phone:text-xs max-phone:px-2"
            style={{
              background:
                "linear-gradient(30deg, #000000 , #ec4899, #6366f1, #f59e42)",
              display: "inline-block",
            }}
            whileHover={() => {
              const { x, y } = getRandomRepel();
              const rotate = (Math.random() - 0.5) * 25; // -8deg to 8deg
              const scale = 1.04 + Math.random() * 0.03; // 1.04 to 1.07
              return {
                x,
                y,
                rotate,
                scale,
                transition: {
                  type: "spring",
                  stiffness: 180,
                  damping: 12,
                  duration: 0.25,
                },
              };
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
              duration: 0.05,
            }}
          >
            CONTACT ME
          </motion.a>
        </div>
      </div>

      {/* BITMOJI CENTER */}
      <div
        className="absolute w-full flex justify-center top-[18%] transform 
                      max-tablet:top-[28%] max-tablet:z-50 
                      max-phone:rotate-2 max-phone:top-[29%]"
      >
        <motion.img
          src={bitmoji}
          alt="Bitmoji"
          className="w-auto z-50 h-[240px] phone:h-[300px] tablet:h-[380px] laptop:h-[440px] desktop:h-[480px] 2xl:h-[520px] 3xl:h-[580px] max-h-[55vh] max-w-[85vw] mt-8 phone:mt-12 tablet:mt-16 desktop:mt-20 aspect-auto rounded-full shadow-lg object-contain"
          style={{ pointerEvents: "auto" }}
          whileTap={() => {
            const { x, y } = getRandomRepel();
            const rotate = (Math.random() - 0.5) * 25; // -8deg to 8deg
            const scale = 1.04 + Math.random() * 0.03; // 1.04 to 1.07
            return {
              x,
              y,
              rotate,
              scale,
              transition: {
                type: "spring",
                stiffness: 180,
                damping: 12,
                duration: 0.25,
              },
            };
          }}
          whileHover={() => {
            const { x, y } = getRandomRepel();
            const rotate = (Math.random() - 0.5) * 8; // -4deg to 4deg
            const scale = 1.02 + Math.random() * 0.03; // 1.02 to 1.05
            return {
              x,
              y,
              rotate,
              scale,
              transition: {
                type: "spring",
                stiffness: 160,
                damping: 14,
                duration: 0.35,
              },
            };
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 14,
            duration: 0.35,
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
