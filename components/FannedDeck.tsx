'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface FannedDeckProps {
  projects: Project[];
  isFanned: boolean;
}

export default function FannedDeck({ projects, isFanned }: FannedDeckProps) {
  const router = useRouter();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [touchedIdx, setTouchedIdx] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : touchedIdx;

  const handleCardClick = (e: React.MouseEvent, idx: number, slug: string) => {
    if (isTouch) {
      if (touchedIdx !== idx) {
        e.preventDefault();
        e.stopPropagation();
        setTouchedIdx(idx);
        return;
      }
      router.push(`/work/${slug}`);
      return;
    }
    router.push(`/work/${slug}`);
  };

  const handleNavigateDirect = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    router.push(`/work/${slug}`);
  };

  if (!isFanned) return null;

  const total = projects.length;
  // Overlapping step distance for base state
  const stepX = 135;

  return (
    <div className="relative flex items-center h-80 sm:h-96 min-w-[340px] sm:min-w-[560px] md:min-w-[680px] select-none pl-2 sm:pl-6 overflow-visible">
      {projects.map((project, idx) => {
        const isCurrentActive = activeIdx === idx;

        // Base resting layout (overlapping stack laid sideways)
        const baseRot = (idx - (total - 1) / 2) * 5;
        const baseX = idx * stepX;

        // Dynamic symmetric displacement calculation:
        // Hovered card becomes large square, left neighbors push left, right neighbors push right!
        let targetX = baseX;
        let targetRot = baseRot;
        let targetY = 0;
        let targetScale = 1;
        let zIndex = 10 + idx;

        if (activeIdx !== null) {
          if (isCurrentActive) {
            targetScale = 1.22;
            targetRot = 0; // Straightened out
            targetY = -28; // Pulled forward
            targetX = baseX;
            zIndex = 50;
          } else if (idx < activeIdx) {
            // Symmetrically push cards on left further LEFT (creates visible gap A B [C])
            targetX = baseX - 85;
            targetRot = baseRot - 5;
            targetScale = 0.94;
          } else if (idx > activeIdx) {
            // Symmetrically push cards on right further RIGHT (creates visible gap [C] D E)
            targetX = baseX + 105;
            targetRot = baseRot + 5;
            targetScale = 0.94;
          }
        }

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: targetX,
              y: targetY,
              rotate: targetRot,
              scale: targetScale,
              zIndex: zIndex,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
            }}
            onMouseEnter={() => !isTouch && setHoveredIdx(idx)}
            onMouseLeave={() => !isTouch && setHoveredIdx(null)}
            onClick={(e) => handleCardClick(e, idx, project.slug)}
            className={`absolute top-6 left-0 cursor-pointer rounded-2xl border p-4 sm:p-5 bg-neutral-900 shadow-2xl transition-colors ${
              isCurrentActive
                ? 'border-white bg-neutral-900 shadow-black/95 w-60 sm:w-72 h-68 sm:h-80'
                : 'border-neutral-800 hover:border-neutral-500 w-48 sm:w-56 h-56 sm:h-64'
            }`}
          >
            {/* Card Content Header (Thumbnail gradient or mini badge) */}
            <div
              className={`w-full ${
                isCurrentActive ? 'h-32 sm:h-40' : 'h-24 sm:h-28'
              } rounded-xl bg-gradient-to-br ${project.thumbnailBg} p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden border border-neutral-700/60 shadow-inner transition-all`}
            >
              <div className="flex items-center justify-between w-full z-10">
                <span className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider bg-neutral-950/80 text-neutral-200 rounded border border-neutral-700/50 backdrop-blur-sm font-semibold">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 font-bold">
                  0{idx + 1}
                </span>
              </div>
              <div className="self-end z-10 text-white">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            {/* Card Title & Description */}
            <div className="mt-3.5 space-y-1">
              <h3
                className={`font-bold text-white tracking-tight ${
                  isCurrentActive ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                }`}
              >
                {project.title}
              </h3>
              {isCurrentActive && (
                <p className="text-xs text-neutral-400 leading-snug line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>

            {/* Pulled Out Navigation Affordance */}
            {isCurrentActive && (
              <button
                type="button"
                onClick={(e) => handleNavigateDirect(e, project.slug)}
                className="mt-3.5 w-full flex items-center justify-between text-xs font-mono text-neutral-100 hover:text-white border-t border-neutral-800 pt-2.5 transition-colors group"
              >
                <span className="underline underline-offset-2 decoration-neutral-400 group-hover:decoration-white font-semibold">
                  {isTouch ? 'Tap to View Case Study' : 'View Case Study'}
                </span>
                <span>&rarr;</span>
              </button>
            )}
          </motion.div>
        );
      })}

      {/* Backdrop overlay for touch to close active card preview when tapping outside */}
      {touchedIdx !== null && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={(e) => {
            e.stopPropagation();
            setTouchedIdx(null);
          }}
        />
      )}
    </div>
  );
}
