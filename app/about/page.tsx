import WorkExperience from "@/components/WorkExperience";

export default function AboutPage() {
  return (
    <section className="space-y-12 max-w-3xl py-4">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
        About
      </h1>

      {/* Bio Section */}
      <div className="space-y-4 text-neutral-700 leading-relaxed text-sm md:text-base">
        <p>
          I am a product designer and frontend engineer passionate about crafting high-clarity user experiences and scalable digital systems. My approach combines analytical problem-solving with refined aesthetic sensibility.
        </p>
        <p>
          With experience across complex web applications and design systems, I focus on bridging the gap between interaction design and technical execution, ensuring every interface is intuitive, accessible, and performant.
        </p>
        <p>
          Currently exploring interactive media, motion interface patterns, and minimal web architectures that elevate everyday digital tools.
        </p>
      </div>

      {/* Design Philosophy Section */}
      <div className="border-l-2 border-neutral-300 pl-4 py-1 space-y-2">
        <h2 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
          Design Philosophy
        </h2>
        <p className="text-sm font-mono text-neutral-600 italic">
          [design philosophy statement goes here]
        </p>
      </div>

      {/* Work Experience Section */}
      <div className="space-y-6 pt-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 border-b border-neutral-200 pb-2">
          Work Experience
        </h2>
        <WorkExperience />
      </div>
    </section>
  );
}
