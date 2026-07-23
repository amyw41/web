'use client';

import { motion } from 'framer-motion';

interface LayeredFolderGraphicProps {
  title: string;
  itemCount: number;
  isFanned: boolean;
  onClick?: () => void;
}

export default function LayeredFolderGraphic({
  title,
  itemCount,
  isFanned,
  onClick,
}: LayeredFolderGraphicProps) {
  return (
    <motion.div
      onClick={onClick}
      animate={{
        scale: isFanned ? 0.95 : 1,
        rotate: isFanned ? -2 : 0,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="relative flex-shrink-0 cursor-pointer select-none group z-20"
    >
      {/* Prominent White Layered Folder Container */}
      <div className="relative pt-8">
        {/* Layer 3: Backmost paper sheet peeking out top */}
        <motion.div
          animate={{
            y: isFanned ? -28 : -14,
            rotate: isFanned ? 10 : 5,
            x: isFanned ? 20 : 10,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="absolute top-0 left-12 w-44 sm:w-52 h-32 bg-neutral-100 rounded-xl border border-neutral-300 shadow-md p-3 flex flex-col justify-between"
        >
          <div className="space-y-1.5">
            <div className="w-10 h-1.5 bg-neutral-400 rounded" />
            <div className="w-24 h-1.5 bg-neutral-300 rounded" />
          </div>
          <div className="w-4 h-4 rounded-full bg-neutral-400 self-end" />
        </motion.div>

        {/* Layer 2: Middle paper sheet peeking out top */}
        <motion.div
          animate={{
            y: isFanned ? -22 : -10,
            rotate: isFanned ? -7 : -3,
            x: isFanned ? -8 : -4,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="absolute top-1 left-8 w-44 sm:w-52 h-32 bg-neutral-50 rounded-xl border border-neutral-300 shadow-md p-3 flex flex-col justify-between"
        >
          <div className="space-y-1.5">
            <div className="w-16 h-1.5 bg-neutral-800 rounded" />
            <div className="w-28 h-1.5 bg-neutral-300 rounded" />
          </div>
          <div className="text-[8px] font-mono text-neutral-500 font-bold self-start uppercase">CASE SPEC</div>
        </motion.div>

        {/* Layer 1: Frontmost paper sheet peeking out top */}
        <motion.div
          animate={{
            y: isFanned ? -16 : -6,
            rotate: isFanned ? 3 : 1,
            x: isFanned ? 3 : 0,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="absolute top-2 left-10 w-44 sm:w-52 h-32 bg-white rounded-xl border border-neutral-200 shadow-sm p-3 flex flex-col justify-between z-10"
        >
          <div className="flex justify-between items-center">
            <div className="w-14 h-2 bg-neutral-900 rounded" />
            <span className="text-[8px] font-mono text-neutral-500 font-bold">DOCUMENT</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-24 h-1.5 bg-neutral-300 rounded" />
            <div className="w-16 h-1.5 bg-neutral-200 rounded" />
          </div>
        </motion.div>

        {/* Folder Top Tab — Pure White */}
        <div className="w-32 sm:w-36 h-7 bg-white border-t border-x border-neutral-300 rounded-t-xl ml-5 relative z-20 flex items-center px-4 shadow-sm">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-900 uppercase tracking-widest truncate">
            {title}
          </span>
        </div>

        {/* Main Folder Front Flap — Pure White Body with subtle border & shadow */}
        <div className="w-56 sm:w-64 md:w-72 h-44 sm:h-48 md:h-52 bg-white border border-neutral-300 rounded-b-3xl rounded-tr-3xl rounded-tl-sm p-5 sm:p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-30 overflow-hidden text-neutral-900 group-hover:border-neutral-400 transition-all">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-neutral-200" />

          {/* Header inside White Folder */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <svg className="w-6 h-6 text-neutral-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span className="font-extrabold text-base sm:text-lg text-neutral-950 tracking-tight">
                {title}
              </span>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-neutral-950 text-white rounded-full">
              {itemCount}
            </span>
          </div>

          <div className="border-b border-neutral-200 my-2" />

          {/* Footer inside White Folder */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-500 font-semibold">
              {isFanned ? 'REVEALED' : 'CLOSED'}
            </span>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isFanned ? 'text-neutral-950 underline' : 'text-neutral-600 group-hover:text-neutral-950'}`}>
              {isFanned ? 'Fanned Deck' : 'Click to Fan'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
