import React from 'react';
import AboutMe from '../sections/AboutMe';
import Skills from '../sections/Skills';

const AboutSkillCrossFade = () => {
  return (
    <div className="relative w-full bg-black">
      <AboutMe />
      <Skills />
    </div>
  );
};

export default AboutSkillCrossFade;