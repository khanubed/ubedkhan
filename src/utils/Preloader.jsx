import React from "react";
import { motion } from "framer-motion";
import bitmoji from "../assets/elements/bitmoji.webp"; // replace with your image path

const name = "Ubed".split("");

const letterVariants = {
  initial: { color: "#d1d1d1", WebkitTextStroke: "0px black" },
  animate: {
    color: "transparent",
    WebkitTextStroke: "1.5px black",
    transition: {
      duration: 0.6,
    },
  },
};

const Preloader = () => {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      {/* Motion Image */}
      <motion.img
        src={bitmoji}
        alt="Ubed Khan"
        className="w-60 h-auto  object-cover mr-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Name */}
      <div className="flex relative z-50 text-5xl font-bold republica text-gray-200 space-x-2">
        {name.map((letter, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.6,
            }}
            className="uppercase text-white"
          >
            {letter}
            UBED
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;