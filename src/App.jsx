import React from 'react'
import Hero from './sections/Hero'
import MouseFollower from './utils/MouseFollower'
import ScrollSlider  from './components/ScrollSlider'
import AboutMe from './sections/AboutMe'
import Skills from './sections/Skills'
import  Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import NavBar from './components/NavBar'

import AboutSkillCrossFade from './utils/AboutSkillCrossFade'
// Add MouseFollower to your app
const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy() // clean up on unmount
  }, [])
  return (
    <><div className='bg-black  w-screen max-tablet:overflow-x-hidden '>
      <NavBar></NavBar>
      <MouseFollower />
      <Hero />
      <ScrollSlider />
      {/* <AboutMe />      
       <Skills /> */}
      <AboutSkillCrossFade/>
      <div className='bg-white'>
      <Projects /></div>
      
      
     
      <Contact></Contact>
      <Footer></Footer>
      </div>
    </>
    
  )
}

export default App