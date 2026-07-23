'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isAboutActive = pathname === '/about';
  const isWorkActive = pathname === '/' || pathname.startsWith('/work');

  return (
    <header className="w-full px-3 sm:px-4 md:px-6 pt-4 select-none">
      {/* Display Name — Negative margin added here to pull text up! */}
      <div className="w-full overflow-visible pb-4 sm:pb-6 md:pb-8 -mt-2 sm:-mt-4 md:-mt-6">
        <h1 className="w-full text-[10vw] font-chillax font-medium tracking-tighter text-neutral-950 leading-[0.8] whitespace-nowrap">
          AMY WANG
        </h1>
      </div>

      {/* Horizontal Table of Contents with Top and Bottom Borders */}
      <nav className="w-full flex items-center space-x-8 border-y-[1px] border-neutral-200 py-2 sm:py-2">
        <Link
          href="/about"
          className={`text-[18px] sm:text-[20px] font-sans tracking-tight transition-colors py-1 ${isAboutActive
            ? 'font-bold text-neutral-950 underline underline-offset-4 decoration-neutral-950'
            : 'text-neutral-500 hover:text-neutral-950'
            }`}
        >
          about
        </Link>
        <Link
          href="/#work"
          className={`text-[18px] sm:text-[20px] font-sans tracking-tight transition-colors py-1 ${isWorkActive
            ? 'font-bold text-neutral-950 underline underline-offset-4 decoration-neutral-950'
            : 'text-neutral-500 hover:text-neutral-950'
            }`}
        >
          work
        </Link>
      </nav>
    </header>
  );
}
