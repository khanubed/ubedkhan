import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useEffect ,useMemo} from "react";
import Bubble from "../assets/elements/bubble.webp";
import Diamond from "../assets/elements/diamond.webp";
import Heart from "../assets/elements/heart.webp";
import Dice from "../assets/elements/dice.webp";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";


const AboutMe = () => {
    // Animated elements refs and scroll transforms
    const controls = useAnimation();

    const parentRef = useRef(null);

    useEffect(() => {
        controls.start("hidden"); // Reset animation when component mounts
    }, []);

    // const parallaxRef = useRef(null);

    const { scrollYProgress: parallaxScroll } = useScroll({
        target: parentRef ,
        offset: ['start end', 'end start'],
    });

    const parallaxY = useTransform(parallaxScroll, [0, 1], [0, -100 * (0.8)]);

    

    

    const bubbleRef = useRef(null);
    const { scrollYProgress: bubbleScrollY } = useScroll({
        target: bubbleRef,
        offset: ["start end", "start start"]
    });
    const bubbleX = useTransform(bubbleScrollY, [0, 1], [-200, 25]);

    const diceRef = useRef(null);
    const { scrollYProgress: diceScrollY } = useScroll({
        target: diceRef,
        offset: ["start end", "start start"]
    });
    const diceX = useTransform(diceScrollY, [0, 1], [200, -25]);
    const diceRotate = useTransform(diceScrollY, [0, 1], [0, 360]);

    const diamondRef = useRef(null);
    const { scrollYProgress: diamondScrollY } = useScroll({
        target: parentRef,
        offset: ["start 75%", "start 0%"]
    });
    const diamondX = useTransform(diamondScrollY, [0, 1], [300, -20]);
    const diamondRotate = useTransform(diamondScrollY, [0, 1], [0, -180]);

    const heartRef = useRef(null);
    const { scrollYProgress: heartScrollY } = useScroll({
        target: parentRef,
        offset: ["start 75%", "start 0%"] 
    });
    const heartX = useTransform(heartScrollY, [0, 1], [-300, 20]);
    const heartRotate = useTransform(heartScrollY, [0, 1], [90 , 0]);

    // Heading scroll animation
    const headingRef = useRef(null);
    const { scrollYProgress: headingScrollY } = useScroll({
        target: headingRef,
        offset: ["start end", "center start"]
    });
    const headingOpacity = useTransform(headingScrollY, [0.2, 0.8], [0, 1]);

    // Content scroll animation
    const contentRef = useRef(null);
    const { scrollYProgress: contentScrollY } = useScroll({
        target: contentRef,
        offset: ["start end", "center start"]
    });
    const contentOpacity = useTransform(contentScrollY, [0.2, 0.8], [0, 1]);
    const contentY = useTransform(contentScrollY, [0, 1], [100, 0]);

    // Paragraphs slide-in animation with useScroll
   

    const paragraphs = [
  "👋 I’m Ubed—your MERN‑stack Full‑Stack Developer, passionate about building responsive web apps end‑to‑end.",
  "On the front‑end, I use React, Tailwind CSS, and Framer Motion to bring engaging and performant UIs to life.",
  "On the backend, I work with Node.js, Express.js, and MongoDB to create scalable and secure APIs.",
  "I merge UI/UX and development to create polished digital experiences that feel intuitive.",
  "Always curious, always evolving—\n\"Always learning, always growing.\""
];


    // Create refs for each paragraph using useMemo to avoid violating hooks rules
    const paraRefs = useMemo(
        () => paragraphs.map(() => React.createRef()),
        [paragraphs.length]
    );

    // Create scroll progress and transforms for each paragraph using useMemo
    const paraScrolls = paraRefs.map(ref =>
        useScroll({
            target: ref,
            offset: ["start 90%", "center 70%"]
        })
    );
    const paraOpacities = paraScrolls.map(({ scrollYProgress }) =>
        useTransform(scrollYProgress, [0, 1], [0, 1])
    );
    const paraXs = paraScrolls.map(({ scrollYProgress }) =>
        useTransform(scrollYProgress, [0, 1], [60, 0])
    );

    return (<>
        <section id="about" ref={parentRef} className="relative max-tablet:hidden flex flex-col items-center justify-center h-[115vh] pt-[0px] py-10 px-4 bg-black text-white overflow-hidden">
            {/* Animated Corner Elements */}
            <motion.img
                ref={bubbleRef}
                src={Bubble}
                alt="Bubble"
                className="absolute left-10 top-[20%]  w-[12%] aspect-square m-4 pointer-events-none select-none
                            "
                style={{ x: bubbleX , y: parallaxY }}
            />
            <motion.img
                ref={diceRef}
                src={Dice}
                alt="Dice"
                className="absolute top-[24%]  w-[14%] aspect-square right-10 m-4 pointer-events-none select-none"
                style={{ x: diceX, rotate: diceRotate , y: parallaxY}}
            />
            <motion.img
                ref={heartRef}
                src={Heart}
                alt="Heart"
                className="absolute bottom-10 left-8 w-[150px] h-[150px] md:w-[210px] md:h-[210px] m-4 pointer-events-none select-none"
                style={{ x: heartX, rotate: heartRotate , y: parallaxY }}
            />
            <motion.img
                ref={diamondRef}
                src={Diamond}
                alt="Diamond"
                className="absolute bottom-5 right-0 w-[180px] h-[180px] md:w-[250px] md:h-[250px] m-4 pointer-events-none select-none"
                style={{ x: diamondX, rotate: diamondRotate , y: parallaxY }}
            />

            <motion.div
                ref={contentRef}
                className="w-full max-w-3xl min-h-screen mx-auto text-center bg-transparent rounded-2xl shadow-lg p-8 space-y-6"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                <motion.h2
                    ref={headingRef}
                    className="text-[64px] mt-[50px] md:text-[110px] republica font-bold bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent mx-auto tracking-wider transition-colors"
                    style={{ opacity: headingOpacity }}
                    whileHover={{
                        color: "#000",
                        WebkitTextStroke: "2px #e5e7eb",
                        background: "none",
                        WebkitBackgroundClip: "unset",
                        WebkitTextFillColor: "unset"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    ABOUT ME
                </motion.h2>
                <div className="text-md  md:text-xl font-light text-white leading-relaxed">
                    {paragraphs.map((text, idx) => (
                        <motion.p
                            key={idx}
                            ref={paraRefs[idx]}
                            className="mb-4"
                            style={{
                                opacity: paraOpacities[idx],
                                x: paraXs[idx]
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>
            </motion.div>
        <div className='w-full h-[100px] bottom-0 bg-black'></div>    
        </section>
        <section id="about" ref={parentRef} className="relative tablet:hidden flex flex-col items-center justify-center h-[100vh] pt-[0px] py-10 px-4 bg-black text-white overflow-hidden">
            {/* Animated Corner Elements */}
            <img
                
                src={Bubble}
                alt="Bubble"
                className="absolute top-5 left-[2%] w-[130px] h-[130px]  m-4 pointer-events-none select-none
                            max-phone:h-[100px] max-phone:w-[100px]"
                
            />
            <img
                
                src={Dice}
                alt="Dice"
                className="absolute top-5 right-[0%]   -rotate-[135] w-[150px] h-[150px] md:w-[200px] md:h-[200px] m-4 pointer-events-none select-none 
                max-phone:h-[120px] max-phone:w-[120px]"
                style={{ x: diceX, rotate: diceRotate , y: parallaxY}}
            />
            <img
                
                src={Heart}
                alt="Heart"
                className="absolute bottom-4 left-2 w-[150px] h-[150px] md:w-[210px] md:h-[210px] m-4 pointer-events-none select-none"
                
            />
            <img
                
                src={Diamond}
                alt="Diamond"
                className="absolute bottom-5 -right-4 w-[180px] h-[180px] md:w-[250px] md:h-[250px] m-4 pointer-events-none select-none"></img>
                
               <div
                className="w-full flex flex-col items-center justify-center relative  min-h-screen mx-auto max-phone:px-5 px-[100px] text-center bg-transparent rounded-2xl shadow-lg p-8 space-y-6"
                
            >   
                <motion.h2
                    
                    className="max-phone:text-[50px]   z-50   text-[70px]  republica font-bold bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent mx-auto tracking-wider transition-colors"
                    
                    whileTap={{
                        color: "#000",
                        WebkitTextStroke: "2px #e5e7eb",
                        background: "none",
                        WebkitBackgroundClip: "unset",
                        WebkitTextFillColor: "unset",
                        dur:'2s'
                    }}
                    
                >
                    ABOUT ME
                </motion.h2>
                <div className="max-phone:text-sm -mt-  text-xl font-light text-white leading-relaxed">
                    {paragraphs.map((text, idx) => (
                        <p
                            key={idx}
                            className="mb-4"
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </div>
        <div className='w-full h-[100px] bottom-0 bg-black'></div>    
        </section>
        </>
    );
}

export default AboutMe