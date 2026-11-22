import React from 'react';
import Hero from '@/components/sections/Hero';
import ScrollSlider from '@/components/sections/ScrollSlider';
import AboutMe from '@/components/sections/AboutMe';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="bg-transparent w-screen max-tablet:overflow-x-hidden relative z-10">
      <Hero />
      <ScrollSlider />
      <AboutMe />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
