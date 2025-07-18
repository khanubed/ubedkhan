import React, { useRef } from 'react'
import ProjectHead from '../components/ProjectHead'
import { color, useScroll , useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import chatify from '../assets/projectImages/login.webp'
import weather from '../assets/projectImages/weather.webp'

const Projects = () => {
  const parentRef =  useRef(null);
  
      const { scrollYProgress: card1ScrollY } = useScroll({
          target: parentRef,
          offset: ["0% end", "0% start"]
      });
      const card1Scale = useTransform(card1ScrollY, [0, 1], [1.2, 1]);
      const card1Y = useTransform(card1ScrollY, [0, 1], [700, 20]);

      const { scrollYProgress: card2ScrollY } = useScroll({
          target: parentRef,
          offset: ["50% end", "50% 10%"]
      });
      const card2Scale = useTransform(card2ScrollY, [0, 1], [1.22, 1.02]);
      const card2Y = useTransform(card2ScrollY, [0, 1], [700, 20]);
      
       const getRandomRepel = () => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 15 + Math.random() * 15; // 15px to 30px (less movement)
      return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      };
      };


  return (
    <>
    <div className=''>   
    <section id='projects' className='z-20 mt-[-25px] max-tablet:mt-0 text-white bg-black w-full h-[210vh] max-tablet:h-[120vh]  rounded-b-[4%] relative'>
        <div className='rotate-12  sticky z-20 top-[20px] mb-60'>
        <ProjectHead className='sticky top-16'></ProjectHead>
        </div>
    
        <div ref={parentRef} className='bg-black absolute  flex flex-col  items-center w-full top-16 h-[180vh] max-tablet:h-[100vh]'>
          
          
          <motion.div
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='h-[65vh] top-[16vh]  bg-black z-30 sticky w-[75vw] mb-16 border-2  rounded-3xl max-tablet:hidden'
            style={{ scale: card1Scale , y: card1Y }}>
              <div className='h-full w-full'>
              <div className="flex p-6 pb-0  items-end">
                <div className='flex h-15dvh justify-between px-7 w-full items-end '> {/*TOP*/}
                  <div className='flex gap-5 items-end  max-tablet:flex-col max-tablet:items-start max-tablet:gap-0 '>
                    <span className='republica text-3xl max-tablet:text-2xl'>Weather App</span>
                    <span className='text-lg max-tablet:text-sm'>(⚠️ Filler project, not featured.)</span>
                  </div>
                  <div className='flex gap-4'>
                  <a href="https://github.com/khanubed/Weather-App" className='px-5 py-1 align-middle rounded-full  border-2 font-thin text-xs text-white shadow-lg hover:shadow-2xl focus:outline-none  transition-all flex flex-row items-center gap-2'>
                            <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png" className=' h-6' alt="" /> Github
                          </a>
                  <motion.a
                          href="https://khanubed.github.io/Weather-App/"
                          className="px-5 py-1 flex items-center justify-center rounded-full  border-2 font-thin text-xs text-white shadow-lg hover:shadow-2xl focus:outline-none   transition-all"
                          style={{
                          background: "linear-gradient(30deg, #000000 , #ec4899, #6366f1, #f59e42)",
                          }}
                          whileHover={() => {
                          const { x, y } = getRandomRepel();
                          const rotate = (Math.random() - 0.5) * 25; // -8deg to 8deg
                          const scale = 1.04 + Math.random() * 0.03; // 1.04 to 1.07
                          return {x,y,rotate,scale,
                          transition: {
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          duration: 0.25,},};}}
                          transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          duration: 0.05,
                          }}>LIVE VERSION</motion.a>                          
                  </div>
                </div>
              </div>
              {/* <hr  className='w-full' /> */}
              <div className='h-[50dvh] my-4 justify-between flex flex-row px-8  w-full'> 
                <div className='w-[60%] text-wrap  flex text-md flex-col justify-evenly'>
                  <span className='align-middle text-wrap '>
                  A responsive weather application that automatically detects the user's location using the browser's built-in Geolocation API and displays real-time weather information using the OpenWeatherMap API. Built with HTML, CSS, and JavaScript, it also supports manual city search.
                   <br/></span>
                   <span className=''>
                  Key Features : 
                  <ul className='list-disc px-4'>
                    <li>📍 Auto-fetches user location via navigator.geolocation</li>
                    <li>🔍 Allows weather search by city name</li>
                    <li>🌡 Displays temperature, weather condition, and weather icon</li>
                    <li>📱 Fully responsive, mobile-friendly UI</li>
                    <li>⚙️ Live weather data using OpenWeather API</li>
                    </ul>  </span>             
                </div> 
                          

                <div className='w-[35%] flex flex-col justify-evenly  h-full'>
                  <div className='h-[48%] w-[100%] aspect-square rounded-lg overflow-hidden border-2 border-gray-400 flex items-center justify-center' ><img src={weather}  className='-mt-7' alt="" /></div>
                  <div className='h-auto w-[100%]  border-2 bg-slate-500 bg-opacity-10 border-gray-400 border-opacity-50 rounded-lg '>
                    <span className='p-2 flex flex-wrap gap-2 text-[10px] items-center h-full'>
                      <span className='px-2 rounded-xs gap-2   bg-gray-200 bg-opacity-20'>HTML</span>
                      <span className='px-2 rounded-xs gap-2   bg-gray-200 bg-opacity-20'>CSS</span>
                      <span className='px-2 rounded-xs gap-2   bg-gray-200 bg-opacity-20'>JavaScript</span>
                      <span className='px-2 rounded-xs gap-2   bg-gray-200 bg-opacity-20'>Browser Geolocation API</span>
                      <span className='px-2 rounded-xs gap-2   bg-gray-200 bg-opacity-20'>OpenWeatherMap API</span>
                    </span>
                     </div>
                </div>

              </div>
            </div>
          </motion.div>
          <motion.div
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ scale: card2Scale , y: card2Y }}
           className='h-[65vh] top-[24vh] bg-black z-50 sticky w-[75vw] border-2 rounded-3xl  max-tablet:hidden'>
            <div className='h-full w-full'>
              <div className="flex p-6 pb-0">
                <div className='flex h-15dvh justify-between px-7 w-full  '>
                  <div className='flex gap-5 items-end max-tablet:flex-col max-tablet:items-start max-tablet:gap-0'>
                    <span className='republica text-3xl'>Chatify</span>
                    <span className='text-lg'>Real-Time Chat App</span>
                  </div>
                  <div className='flex gap-4'>
                  <a href="https://github.com/khanubed/Chatify" className='px-5 py-1 align-middle rounded-full  border-2 font-thin text-xs text-white shadow-lg hover:shadow-2xl focus:outline-none  transition-all flex flex-row items-center gap-2'>
                            <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png" className=' h-6' alt="" /> Github
                          </a>
                  <motion.a
                          href="https://chatify-three.vercel.app/"
                          className="px-5 py-1 flex items-center justify-center rounded-full  border-2 font-thin text-xs text-white shadow-lg hover:shadow-2xl focus:outline-none  transition-all"
                          style={{
                          background: "linear-gradient(30deg, #000000 , #ec4899, #6366f1, #f59e42)",
                          }}
                          whileHover={() => {
                          const { x, y } = getRandomRepel();
                          const rotate = (Math.random() - 0.5) * 25; // -8deg to 8deg
                          const scale = 1.04 + Math.random() * 0.03; // 1.04 to 1.07
                          return {x,y,rotate,scale,
                          transition: {
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          duration: 0.25,},};}}
                          transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          duration: 0.05,
                          }}>LIVE VERSION</motion.a>                          
                  </div>
                </div>
              </div>
              <div className='h-[50dvh] my-4 justify-between flex flex-row px-8  w-full'> 
                <div className='w-[60%] text-wrap  flex text-md flex-col justify-evenly'>
                  <span className='align-middle text-wrap '>
                  Chatify is a full-stack real-time chat application built with the MERN stack and Socket.io. It features secure JWT-based user authentication, real-time one-on-one messaging, profile editing, and image sharing via Cloudinary. The frontend is developed using React.js and styled with Tailwind CSS, while the backend is powered by Node.js, Express.js, and MongoDB.
                   <br/></span>
                   <span className=''>
                  Key Features : 
                  <ul className='list-disc px-4'>
                    <li>Real-time messaging with Socket.io</li>
                    <li>User login/signup with JWT authentication</li>
                    <li>Edit profile (username & profile picture)</li>
                    <li>Image upload in chat via Cloudinary</li>
                    <li>Responsive UI with Tailwind CSS</li>
                    </ul>  </span>             
                </div> 
                          

                <div className='w-[35%] flex flex-col justify-evenly  h-full'>
                  <div className='h-[48%] w-[100%] rounded-lg overflow-hidden border-2 aspect-square border-gray-500' ><img src={chatify}  className='' alt="" /></div>
                  <div className='h-auto w-[100%]  border-2 bg-slate-500 bg-opacity-10 border-gray-400 border-opacity- bg-gray-900-90 rounded-lg '>
                    <span className='p-2 flex flex-wrap gap-2  items-center h-full text-[10px]'>
                      <span className='px-2  rounded-sm gap-2   bg-gray-200 bg-opacity-20'>React</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Tailwind CSS</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Node.js</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Express.js</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>MongoDB</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Socket.io</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Cloudinary</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>JWT</span>
                    </span>
                     </div>
                </div>

              </div>
            </div>
          </motion.div>
          <div
          transition={{ duration: 0.6, ease: "easeOut" }}
           className='h-[90vh] relative top-[10vh] bg-black z-50  w-[90vw] border-2 rounded-3xl tablet:hidden'>
            <div className='h-full w-full'>
              <div className="flex pt-4 pb-0">
                <div className='flex h-15dvh justify-between px-5 w-full  '>
                  <div className='flex gap-5 h-full items-end justify-evenly max-tablet:flex-col max-tablet:items-start max-tablet:gap-0'>
                    <span className='republica text-3xl'>Chatify</span>
                    <span className='text-lg'>Real-Time Chat App</span>
                  </div>
                  <div className='flex flex-col gap-1'>
                  <a href="https://github.com/khanubed/Chatify" className='px-5 py-1 align-middle rounded-full  border-2 font-thin text-xs text-white shadow-lg hover:shadow-2xl focus:outline-none  transition-all flex flex-row items-center gap-2'>
                            <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png" className=' h-6' alt="" /> Github
                          </a>
                  <motion.a
                          href="https://chatify-three.vercel.app/"
                          className="px-5 py-2 flex items-center justify-center rounded-full  border-2 font-thin text-xs text-white shadow-lg hover:shadow-2xl focus:outline-none  transition-all"
                          style={{
                          background: "linear-gradient(30deg, #000000 , #ec4899, #6366f1, #f59e42)",
                          }}
                          whileHover={() => {
                          const { x, y } = getRandomRepel();
                          const rotate = (Math.random() - 0.5) * 25; // -8deg to 8deg
                          const scale = 1.04 + Math.random() * 0.03; // 1.04 to 1.07
                          return {x,y,rotate,scale,
                          transition: {
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          duration: 0.25,},};}}
                          transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          duration: 0.05,
                          }}>LIVE VERSION</motion.a>                          
                  </div>
                </div>
              </div>
              <div className='h-[70dvh] mt-8 justify-between gap-2 flex flex-col-reverse px-8  w-full'> 
                <div className='w-full text-wrap text-sm flex text-md flex-col justify-evenly'>
                  <span className='align-middle text-wrap '>
                  Chatify is a full-stack real-time chat application built with the MERN stack and Socket.io. It features secure JWT-based user authentication, real-time one-on-one messaging, profile editing, and image sharing via Cloudinary. The frontend is developed using React.js and styled with Tailwind CSS, while the backend is powered by Node.js, Express.js, and MongoDB.
                   <br/></span>
                   <span className=''>
                  Key Features : 
                  <ul className='list-disc px-4'>
                    <li>Real-time messaging with Socket.io</li>
                    <li>User login/signup with JWT authentication</li>
                    <li>Edit profile (username & profile picture)</li>
                    <li>Image upload in chat via Cloudinary</li>
                    <li>Responsive UI with Tailwind CSS</li>
                    </ul>  </span>             
                </div> 
                          

                <div className='w-full flex flex-col gap-2 justify-evenly  h-full'>
                  <div className='h-auto w-[100%] rounded-lg overflow-hidden border-2  border-gray-500' ><img src={chatify}  className='h-full w-auto aspect-auto' alt="" /></div>
                  <div className='h-auto w-[100%]  border-2 bg-slate-500 bg-opacity-10 border-gray-400 border-opacity-50 text-sm bg-gray-900-90 rounded-lg '>
                    <span className='p-2 flex flex-wrap gap-2  items-center h-full text-[10px]'>
                      <span className='px-2  rounded-sm gap-2   bg-gray-200 bg-opacity-20'>React</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Tailwind CSS</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Node.js</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Express.js</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>MongoDB</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Socket.io</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>Cloudinary</span>
                      <span className='px-2 rounded-sm gap-2   bg-gray-200 bg-opacity-20'>JWT</span>
                    </span>
                     </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    </section>
    </div> 
    </>

  )
}

export default Projects