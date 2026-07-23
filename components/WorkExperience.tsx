export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

const defaultExperiences: ExperienceItem[] = [
  {
    id: '1',
    role: 'Senior Product Designer',
    company: 'Acme Studio',
    period: '2023 — Present',
    description: 'Leading design systems, product architecture, and end-to-end user experience for enterprise applications.',
  },
  {
    id: '2',
    role: 'UX Engineer',
    company: 'Creative Labs',
    period: '2021 — 2023',
    description: 'Bridged interaction design and frontend engineering, crafting interactive design tokens and motion components.',
  },
  {
    id: '3',
    role: 'Product Designer',
    company: 'Innovate Tech',
    period: '2019 — 2021',
    description: 'Designed core digital interfaces, user research synthesis, and rapid wireframing for emerging web products.',
  },
];

interface WorkExperienceProps {
  items?: ExperienceItem[];
}

export default function WorkExperience({ items = defaultExperiences }: WorkExperienceProps) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <article key={item.id} className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
            <h3 className="text-base font-semibold text-neutral-900">
              {item.role} <span className="font-normal text-neutral-500">at {item.company}</span>
            </h3>
            <span className="text-xs font-mono text-neutral-400 mt-1 sm:mt-0">
              {item.period}
            </span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mt-2">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
