'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectSquareProps {
  project: Project;
  index: number;
}

export default function ProjectSquare({ project, index }: ProjectSquareProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isTouchedOpen, setIsTouchedOpen] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isTouch) {
      if (!isTouchedOpen) {
        e.preventDefault();
        e.stopPropagation();
        setIsTouchedOpen(true);
        return;
      }
      router.push(`/work/${project.slug}`);
      return;
    }
    router.push(`/work/${project.slug}`);
  };

  const isExpanded = isHovered || isTouchedOpen;

  return (
    <div className="relative flex-shrink-0">
      <motion.div
        onClick={handleCardClick}
        onMouseEnter={() => !isTouch && setIsHovered(true)}
        onMouseLeave={() => !isTouch && setIsHovered(false)}
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: isExpanded ? 1.18 : 1,
          zIndex: isExpanded ? 50 : 10,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 22,
          opacity: { duration: 0.3, delay: index * 0.08 },
        }}
        className={`cursor-pointer rounded-xl border p-4 bg-neutral-900 transition-colors shadow-lg flex flex-col justify-between select-none relative ${
          isExpanded
            ? 'border-neutral-400 bg-neutral-900 shadow-2xl shadow-black/95 w-60 sm:w-64 h-64 sm:h-72'
            : 'border-neutral-800 hover:border-neutral-600 w-32 sm:w-36 h-32 sm:h-36 items-center justify-center text-center'
        }`}
      >
        {/* Default State: Small box showing ONLY Category Tag + Project Title */}
        {!isExpanded && (
          <div className="flex flex-col items-center justify-center space-y-2 p-2 w-full h-full">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              {project.category}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-neutral-100 tracking-tight leading-snug">
              {project.title}
            </h3>
          </div>
        )}

        {/* Hover / Touch Expanded State: Reveals Placeholder Thumbnail Image + Full Info */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between h-full w-full space-y-2.5"
            >
              {/* Visible Placeholder Thumbnail Image */}
              <div
                className={`w-full h-28 sm:h-32 rounded-lg bg-gradient-to-br ${project.thumbnailBg} p-3 flex flex-col justify-between relative overflow-hidden border border-neutral-700/60 shadow-inner`}
              >
                <div className="flex items-center justify-between w-full z-10">
                  <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider bg-neutral-950/80 text-neutral-300 rounded border border-neutral-700/50 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                <div className="self-end z-10 text-neutral-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 leading-snug line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Navigation Link Affordance */}
              <div className="pt-1 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-200 border-t border-neutral-800">
                <span className="underline underline-offset-2 decoration-neutral-500">
                  {isTouch ? 'Tap again to View' : 'View Project'}
                </span>
                <span>&rarr;</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop overlay for mobile to close when tapping outside */}
      {isTouchedOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px]"
          onClick={(e) => {
            e.stopPropagation();
            setIsTouchedOpen(false);
          }}
        />
      )}
    </div>
  );
}
