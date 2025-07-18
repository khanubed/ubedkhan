import { useRef } from 'react';
import { gsap } from 'gsap';

const LiquidFillDiv = () => {
  const liquidRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(liquidRef.current, {
      y: "-100%", // liquid rises up fully
      duration: 1.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(liquidRef.current, {
      y: "0%", // liquid resets down
      duration: 1.5,
      ease: "power2.inOut"
    });
  };

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div 
        className="relative w-64 h-64 rounded-xl border-4 border-white overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Liquid Layer */}
        <div 
          ref={liquidRef}
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500"
          style={{ transform: 'translateY(0%)' }}
        />

        {/* Content (Optional) */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold z-10">
          Hover Me
        </div>
      </div>
    </div>
  );
};

export default LiquidFillDiv;
