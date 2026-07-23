import Link from 'next/link';
import { projectsData } from '@/data/projects';

interface PageProps {
  params: Promise<{
    project: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { project: slugParam } = await params;

  // Match project by slug (case-insensitive)
  const project = projectsData.find(
    (p) => p.slug.toLowerCase() === slugParam.toLowerCase()
  );

  if (!project) {
    return (
      <section className="space-y-6 max-w-3xl py-8 px-4">
        <Link
          href="/work"
          className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <span>&larr; Back to Work</span>
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900">Project Not Found</h1>
        <p className="text-sm text-neutral-600">The project "{slugParam}" could not be found.</p>
      </section>
    );
  }

  return (
    <article className="space-y-10 sm:space-y-14 max-w-4xl py-4 sm:py-6 mx-auto px-1">
      {/* 1. Header Block */}
      <header className="space-y-4 sm:space-y-6 border-b border-neutral-200 pb-6 sm:pb-8">
        {/* Top Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 transition-colors py-1"
        >
          <span>&larr; Back to Work</span>
        </Link>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
            {project.summary}
          </p>
        </div>

        {/* Tags Block (Role, Timeline, Category) */}
        <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 text-[11px] sm:text-xs font-mono">
          <span className="px-2.5 sm:px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-full">
            Role: {project.tags.role}
          </span>
          <span className="px-2.5 sm:px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-full">
            Timeline: {project.tags.timeline}
          </span>
          <span className="px-2.5 sm:px-3 py-1 bg-neutral-900 text-white rounded-full">
            {project.tags.category}
          </span>
        </div>

        {/* Placeholder Hero Image */}
        <div
          className={`w-full h-52 sm:h-72 md:h-96 rounded-xl sm:rounded-2xl bg-gradient-to-br ${project.thumbnailBg} border border-neutral-800 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl text-neutral-300`}
        >
          <div className="flex justify-between items-center z-10 font-mono text-[10px] sm:text-xs text-neutral-400">
            <span>Hero Image Placeholder</span>
            <span className="truncate max-w-[150px] sm:max-w-none">{project.title}</span>
          </div>
          <div className="z-10 self-center text-center space-y-2 py-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-white font-mono text-base sm:text-lg font-bold">
              {project.title.charAt(0)}
            </div>
            <p className="text-[10px] sm:text-xs font-mono text-neutral-400 px-2">
              [{project.title} Interactive Prototype &amp; Design Showcase]
            </p>
          </div>
          <div className="z-10 self-end font-mono text-[9px] sm:text-[10px] text-neutral-500">
            Slug: {project.slug}
          </div>
        </div>
      </header>

      {/* 2. TL;DR / Summary (Above the fold) */}
      <section className="bg-neutral-900 text-neutral-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-neutral-800 shadow-xl space-y-3 sm:space-y-4">
        <h2 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-800 pb-2">
          TL;DR / Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <span className="font-mono text-neutral-400 text-[10px] sm:text-[11px] block">PROBLEM</span>
            <p className="text-neutral-300 leading-relaxed">{project.tldr.problem}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-neutral-400 text-[10px] sm:text-[11px] block">ROLE</span>
            <p className="text-neutral-300 leading-relaxed">{project.tldr.role}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-neutral-400 text-[10px] sm:text-[11px] block">OUTCOME</span>
            <p className="text-neutral-300 leading-relaxed">{project.tldr.outcome}</p>
          </div>
        </div>
      </section>

      {/* 3. Problem / Context */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 border-b border-neutral-200 pb-2">
          Problem &amp; Context
        </h2>
        <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
          {project.problemContext}
        </p>
      </section>

      {/* 4. Process (Flexible, Repeatable Block) */}
      <section className="space-y-6 sm:space-y-8">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
            Design &amp; Engineering Process
          </h2>
          <p className="text-[11px] sm:text-xs font-mono text-neutral-500 mt-0.5">
            Iterative workflow and exploration milestones ({project.processSubsections.length} phases)
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {project.processSubsections.map((sub, idx) => (
            <div key={idx} className="space-y-3 sm:space-y-4 border-l-2 border-neutral-200 pl-3 sm:pl-6">
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900 tracking-tight">
                {sub.title}
              </h3>
              <p className="text-xs sm:text-base text-neutral-700 leading-relaxed">
                {sub.content}
              </p>
              {sub.imagePlaceholder && (
                <div className="p-4 sm:p-8 border border-dashed border-neutral-300 rounded-lg sm:rounded-xl bg-neutral-50 text-neutral-500 font-mono text-[11px] sm:text-xs text-center my-2 sm:my-3">
                  {sub.imagePlaceholder}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Key Decisions (Callout-style section) */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 border-b border-neutral-200 pb-2">
          Key Decisions
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {project.keyDecisions.map((kd, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border-l-4 border-neutral-500 p-3.5 sm:p-5 rounded-r-xl text-neutral-200 space-y-1.5 shadow-sm"
            >
              <h3 className="font-mono text-xs sm:text-sm font-semibold text-white leading-snug">
                {kd.decision}
              </h3>
              <p className="font-mono text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                {kd.reasoning}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Outcome / Reflection */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 border-b border-neutral-200 pb-2">
          Outcome &amp; Reflection
        </h2>
        <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
          {project.outcomeReflection}
        </p>
      </section>

      {/* 7. Bottom Navigation Link */}
      <footer className="pt-6 sm:pt-8 border-t border-neutral-200 flex justify-between items-center">
        <Link
          href="/work"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors py-1"
        >
          <span>&larr;</span>
          <span>Back to Work</span>
        </Link>
        <span className="text-[10px] sm:text-xs font-mono text-neutral-400">
          amy w. portfolio
        </span>
      </footer>
    </article>
  );
}
