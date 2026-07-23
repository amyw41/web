'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '@/data/projects';
import LayeredFolderGraphic from './LayeredFolderGraphic';
import FannedDeck from './FannedDeck';

export default function WorkOverlaySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  const projectsGroup = projectsData.filter((p) => p.folder === 'Projects');
  const miscGroup = projectsData.filter((p) => p.folder === 'Misc');

  // Overall curtain overlay sliding up over hero
  const { scrollYProgress: overlayScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const translateY = useTransform(overlayScrollProgress, [0, 1], ['100px', '0px']);

  // Projects folder scroll progress (center to left horizontal slide)
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsSectionRef,
    offset: ['start 80%', 'center 40%'],
  });

  // Map scroll progress directly to folder X translation (Center to Left)
  const folderSlideX = useTransform(projectsScrollProgress, [0, 0.7], ['32vw', '0vw']);
  const deckOpacity = useTransform(projectsScrollProgress, [0.4, 0.8], [0, 1]);
  const deckX = useTransform(projectsScrollProgress, [0.4, 0.8], [60, 0]);

  // State to enable/disable card deck interactions based on scroll threshold
  const [isProjectsFanned, setIsProjectsFanned] = useState(false);
  // Misc folder hover/tap state
  const [isMiscFanned, setIsMiscFanned] = useState(false);

  // Sync scroll progress with fanned state threshold
  projectsScrollProgress.on('change', (latest) => {
    if (latest >= 0.45 && !isProjectsFanned) {
      setIsProjectsFanned(true);
    } else if (latest < 0.35 && isProjectsFanned) {
      setIsProjectsFanned(false);
    }
  });

  return (
    <section id="work" ref={containerRef} className="relative pt-6 pb-16 select-none min-h-screen">
      {/* Scroll-Linked Curtain Overlay Sliding Up — Spans 100% full width to match 'amy wang' name */}
      <motion.div
        style={{
          y: translateY,
        }}
        className="w-full bg-neutral-950 text-neutral-100 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 border border-neutral-800 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95)] space-y-16 min-h-[90vh]"
      >
        {/* Section Header */}
        <div className="border-b border-neutral-800 pb-5 flex flex-col md:flex-row md:items-baseline md:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Work
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
              Folder slides center-to-left on scroll to reveal horizontal card deck
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 mt-2 md:mt-0">
            amy w. portfolio — 2026
          </span>
        </div>

        {/* 1. Projects Folder: Scroll-Linked Center-to-Left Slide & Fan Reveal */}
        <div
          ref={projectsSectionRef}
          className="relative min-h-[400px] sm:min-h-[450px] py-4 flex flex-col justify-center overflow-visible"
        >
          <div className="w-full flex items-center relative min-h-[340px] overflow-visible">
            {/* White Folder Graphic: Centered initially, slides left directly on scroll */}
            <motion.div
              style={{ x: folderSlideX }}
              className="absolute left-0 z-30 flex flex-col items-center sm:items-start"
            >
              <LayeredFolderGraphic
                title="Projects"
                itemCount={projectsGroup.length}
                isFanned={isProjectsFanned}
                onClick={() => setIsProjectsFanned((prev) => !prev)}
              />
              <p className="text-xs font-mono text-neutral-400 mt-4 text-center sm:text-left">
                {isProjectsFanned
                  ? 'Projects (Scroll-Slid Left & Fanned)'
                  : 'Projects (Scroll down to slide left & fan)'}
              </p>
            </motion.div>

            {/* Fanned Card Stack: Fades in and slides in to the right as folder moves left */}
            <motion.div
              style={{
                opacity: deckOpacity,
                x: deckX,
              }}
              className="w-full pl-60 sm:pl-72 md:pl-[320px] flex justify-start items-center overflow-visible"
            >
              <FannedDeck projects={projectsGroup} isFanned={isProjectsFanned} />
            </motion.div>
          </div>
        </div>

        <hr className="border-t border-neutral-850" />

        {/* 2. Misc Folder: Hover / Tap Triggered Only */}
        <div
          onMouseEnter={() => setIsMiscFanned(true)}
          onMouseLeave={() => setIsMiscFanned(false)}
          className="relative min-h-[400px] sm:min-h-[450px] py-4 flex flex-col justify-center overflow-visible"
        >
          <div className="w-full flex items-center relative min-h-[340px] overflow-visible">
            {/* White Folder Graphic for Misc */}
            <div className="absolute left-0 z-30 flex flex-col items-center sm:items-start">
              <LayeredFolderGraphic
                title="Misc"
                itemCount={miscGroup.length}
                isFanned={isMiscFanned}
                onClick={() => setIsMiscFanned((prev) => !prev)}
              />
              <p className="text-xs font-mono text-neutral-400 mt-4 text-center sm:text-left">
                {isMiscFanned ? 'Misc (Hover/Tap Fanned)' : 'Misc (Hover or Tap to Fan)'}
              </p>
            </div>

            {/* Fanned Card Stack for Misc */}
            {isMiscFanned && (
              <div className="w-full pl-60 sm:pl-72 md:pl-[320px] flex justify-start items-center overflow-visible">
                <FannedDeck projects={miscGroup} isFanned={isMiscFanned} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
