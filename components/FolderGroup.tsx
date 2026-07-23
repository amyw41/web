'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import FolderGraphic from './FolderGraphic';
import ProjectSquare from './ProjectSquare';

interface FolderGroupProps {
  title: string;
  projects: Project[];
  mode: 'scroll' | 'hover';
}

export default function FolderGroup({ title, projects, mode }: FolderGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Intersection Observer for 'scroll' mode (Projects folder ONLY)
  useEffect(() => {
    if (mode !== 'scroll') return;

    const element = containerRef.current;
    if (!element) return;

    let debounceTimer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (debounceTimer) clearTimeout(debounceTimer);

        // 100ms debounce to prevent flicker at the 50% visibility boundary
        debounceTimer = setTimeout(() => {
          setIsOpen(entry.isIntersecting);
        }, 100);
      },
      {
        threshold: 0.5, // Trigger around 50% visibility in viewport
      }
    );

    observer.observe(element);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, [mode]);

  // Mouse / Touch Event Handlers for 'hover' mode (Misc folder ONLY)
  const handleMouseEnter = () => {
    if (mode === 'hover') setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (mode === 'hover') setIsOpen(false);
  };

  const handleFolderClick = () => {
    if (mode === 'hover') {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative my-8"
    >
      {/* Folder Container with Continuous Slide-Open Motion */}
      <div className="flex items-center space-x-4 sm:space-x-6 overflow-hidden py-4 px-2 min-h-[170px]">
        {/* Manila Folder Graphic (Slides left when open) */}
        <FolderGraphic
          title={title}
          itemCount={projects.length}
          isOpen={isOpen}
          onClick={handleFolderClick}
        />

        {/* Animated Sliding Squares Container (Never unmounted — slides in/out continuously) */}
        <motion.div
          initial={false}
          animate={{
            width: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
            x: isOpen ? 0 : -50,
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 24,
            opacity: { duration: 0.25 },
          }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-6 overflow-x-auto py-6 px-2 snap-x scrollbar-thin scrollbar-thumb-neutral-700">
            {projects.map((project, idx) => (
              <ProjectSquare key={project.id} project={project} index={idx} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Helper text explaining interaction below folder */}
      <div className="mt-1 text-[11px] font-mono text-neutral-500 flex items-center space-x-2">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 inline-block" />
        <span>
          {mode === 'scroll'
            ? 'Projects folder: Scrolls ~50% into view to slide open/close automatically'
            : 'Misc folder: Hover or tap to slide open'}
        </span>
      </div>
    </div>
  );
}
