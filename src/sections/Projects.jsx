import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projectsData';
import ProjectHead from '../components/ProjectHead';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const parentRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.project-card');
      const totalCards = cards.length;

      if (totalCards === 0) return;

      // Force 3D transform hardware acceleration to prevent repainting flicker
      gsap.set(cards, { force3D: true, transformOrigin: 'center center' });

      // Extended scroll distance (220% per card) for comfortable reading pace
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: 'top top',
          end: `+=${totalCards * 220}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) {
          // First base card stays visible initially, then holds
          tl.to({}, { duration: 1.5 }, 'card-0-hold');
          return;
        }

        const prevCards = cards.slice(0, index);

        // Previous cards scale down & fade smoothly without heavy brightness filter repaints
        tl.to(
          prevCards,
          {
            scale: (i) => 1 - (index - i) * 0.04,
            y: (i) => -(index - i) * 16,
            opacity: (i) => Math.max(0.35, 1 - (index - i) * 0.25),
            duration: 1,
            ease: 'power2.out',
            force3D: true,
          },
          `card-${index}`
        );

        // Incoming card slides up smoothly
        tl.fromTo(
          card,
          {
            y: '100vh',
            opacity: 0,
            scale: 1.02,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            force3D: true,
          },
          `card-${index}`
        );

        // Dedicated HOLD phase for each slide so user has time to view/read
        tl.to({}, { duration: 1.5 }, `card-${index}-hold`);
      });
    },
    { scope: parentRef }
  );

  return (
    <section
      id="projects"
      ref={parentRef}
      className="relative w-screen min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between pt-14 pb-8"
    >
      {/* Header Marquee Banner */}
      <div className="w-full relative z-10 -mt-2">
        <ProjectHead />
      </div>

      {/* Cards Deck Container - Clean relative layout */}
      <div
        ref={containerRef}
        className="relative -top-32 w-full max-w-6xl mx-auto h-[78vh] phone:h-[80vh] tablet:h-[76vh] flex items-center justify-center px-4 z-20"
      >
        {projectsData.map((project, index) => (
          <div
            key={project.id || index}
            className="project-card absolute inset-x-4 phone:inset-x-6 mx-auto top-2 bottom-2 flex flex-col justify-between bg-zinc-950 border border-white/15 rounded-3xl p-5 phone:p-7 tablet:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden will-change-transform"
            style={{ zIndex: index + 1 }}
          >
            {/* Header: Title, Subtitle & Action Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-3">
                  <h3 className="republica text-2xl phone:text-3xl tablet:text-4xl text-white tracking-wide">
                    {project.title}
                  </h3>
                  <span className="text-xs phone:text-sm text-gray-400 font-light">
                    {project.subtitle}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
                {project.github && project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 flex items-center gap-2 rounded-full border border-white/30 text-xs font-light text-white hover:bg-white/10 transition-colors"
                  >
                    <img
                      src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"
                      className="h-4 w-4"
                      alt="GitHub"
                    />
                    GitHub
                  </a>
                )}
                {project.live && project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-1.5 flex items-center justify-center rounded-full text-xs font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, #ec4899, #6366f1, #f59e42)',
                    }}
                  >
                    LIVE VERSION
                  </a>
                )}
              </div>
            </div>

            {/* Body: Responsive Grid for Content & Image Preview */}
            <div className="grid grid-cols-1 tablet:grid-cols-12 gap-6 items-center my-auto overflow-y-auto no-scrollbar py-2">
              {/* Left Column: Description & Features */}
              <div className="tablet:col-span-7 flex flex-col justify-center space-y-4">
                <p className="text-xs phone:text-sm tablet:text-base text-gray-300 leading-relaxed font-light">
                  {project.description}
                </p>

                {project.features && project.features.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs phone:text-sm font-semibold text-gray-200">
                      Key Features:
                    </span>
                    <ul className="grid grid-cols-1 gap-1.5 pl-1 text-xs phone:text-sm text-gray-400 font-light">
                      {project.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Preview Image & Tech Badges */}
              <div className="tablet:col-span-5 flex flex-col justify-center space-y-3">
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-black/60 flex items-center justify-center group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 p-2 bg-white/[0.03] border border-white/10 rounded-xl">
                  {project.tech.map((techItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-[10px] phone:text-xs rounded-md bg-white/10 text-gray-300 font-medium"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;