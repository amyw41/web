'use client';

import { motion } from 'framer-motion';

interface FolderGraphicProps {
  title: string;
  itemCount: number;
  isOpen: boolean;
  onClick?: () => void;
}

export default function FolderGraphic({ title, itemCount, isOpen, onClick }: FolderGraphicProps) {
  return (
    <motion.div
      onClick={onClick}
      animate={{
        x: isOpen ? -12 : 0,
        scale: isOpen ? 0.98 : 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="relative flex-shrink-0 cursor-pointer select-none group z-20"
    >
      {/* Folder Top Tab */}
      <div className="w-28 h-6 bg-neutral-800 border-t border-x border-neutral-700 rounded-t-xl flex items-center px-3.5 text-[10px] font-mono text-neutral-300 uppercase tracking-wider shadow-sm">
        <span className="truncate">{title}</span>
      </div>

      {/* Main Closed Manila Folder Face */}
      <div className="w-48 h-36 bg-gradient-to-b from-neutral-850 via-neutral-900 to-neutral-950 border border-neutral-700 rounded-b-2xl rounded-tr-2xl p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group-hover:border-neutral-500 transition-colors">
        {/* Subtle folder paper line accents in top corner */}
        <div className="absolute top-2 right-3 w-8 h-8 opacity-20 border-r border-t border-neutral-400 rounded-tr-lg pointer-events-none" />

        {/* Top Header Row inside Folder Face */}
        <div className="flex items-center justify-between">
          {/* Closed/Open Folder SVG Graphic */}
          <div className="flex items-center space-x-2">
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                isOpen ? 'text-emerald-400' : 'text-neutral-300 group-hover:text-white'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span className="font-bold text-sm text-white tracking-tight">{title}</span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-full">
            {itemCount}
          </span>
        </div>

        {/* Middle Folder Graphic Line */}
        <div className="border-b border-dashed border-neutral-800 my-1" />

        {/* Bottom Folder Metadata */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-neutral-400 text-[10px]">
            {isOpen ? 'REVEALED' : 'CLOSED'}
          </span>
          <span className={`text-[10px] uppercase tracking-wider ${isOpen ? 'text-emerald-400 font-semibold' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
            {isOpen ? 'Open' : 'Slide to Open'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
