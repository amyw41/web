export interface ProcessSubsection {
  title: string;
  content: string;
  imagePlaceholder?: string;
}

export interface KeyDecision {
  decision: string;
  reasoning: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Case Study' | 'Branding' | 'Client Work';
  description: string;
  summary: string;
  folder: 'Projects' | 'Misc';
  thumbnailBg: string;
  accentColor: string;
  tags: {
    role: string;
    timeline: string;
    category: string;
  };
  tldr: {
    problem: string;
    role: string;
    outcome: string;
  };
  problemContext: string;
  processSubsections: ProcessSubsection[];
  keyDecisions: KeyDecision[];
  outcomeReflection: string;
}

export const projectsData: Project[] = [
  {
    id: 'skinsprout',
    title: 'SkinSprout',
    slug: 'skinsprout',
    category: 'Case Study',
    description: 'UX case study for an AI-driven personalized skincare app and routine tracker.',
    summary: 'AI-driven personalized skincare tracking and active ingredient interaction analysis.',
    folder: 'Projects',
    thumbnailBg: 'from-emerald-950 via-neutral-900 to-neutral-950',
    accentColor: 'emerald-400',
    tags: {
      role: 'Lead UX Designer & Prototype Engineer',
      timeline: '3 months (Q3 2023)',
      category: 'UX Case Study',
    },
    tldr: {
      problem: 'Users struggle to manage complex skincare routines and active ingredient interactions that cause skin irritation.',
      role: 'Owned end-to-end user research, information architecture, wireframing, and high-fidelity interactive prototyping.',
      outcome: 'Designed a friction-free routine builder that increased user daily tracking consistency by 34%.',
    },
    problemContext:
      'Modern skincare products contain potent active ingredients (retinoids, AHAs, niacinamides) that frequently conflict. Users often experience skin barrier damage from accidental overuse. SkinSprout solves this by visualizing product compatibility in real time.',
    processSubsections: [
      {
        title: '01. User Research & Ingredient Mapping',
        content:
          'Conducted interviews with 14 skincare enthusiasts and consulted dermatological guidelines to identify common product collision points and user logging pain points.',
        imagePlaceholder: '[Research Synthesis Diagram & User Journey Map]',
      },
      {
        title: '02. Wireframing & Flow Architecture',
        content:
          'Iterated through low-fidelity concepts focusing on rapid daily check-ins. Created a step-by-step routine sequence that highlights ingredient safety status dynamically.',
        imagePlaceholder: '[Low-Fidelity Wireframe Flow Diagrams]',
      },
      {
        title: '03. Interaction Design & Usability Testing',
        content:
          'Tested interactive micro-animations for routine completion badges and warning triggers. Refined color-coded badges to be clear without causing unnecessary panic.',
        imagePlaceholder: '[High-Fidelity UI Screens & Component Spec]',
      },
    ],
    keyDecisions: [
      {
        decision: '[Decision: Color-coded ingredient conflict indicators]',
        reasoning: '[Reasoning: Provides instant visual feedback on routine safety without requiring technical chemical knowledge.]',
      },
      {
        decision: '[Decision: One-tap swipe logging for morning/evening check-ins]',
        reasoning: '[Reasoning: Minimizes daily effort so users maintain a continuous 30-day tracking habit.]',
      },
      {
        decision: '[Decision: Local-first photo storage for skin progress logs]',
        reasoning: '[Reasoning: Protects sensitive personal health photos directly on device storage.]',
      },
    ],
    outcomeReflection:
      'SkinSprout demonstrated how thoughtful information design can simplify scientific data for everyday users. Next steps include exploring camera-based skin redness detection.',
  },
  {
    id: 'blend',
    title: 'Blend',
    slug: 'blend',
    category: 'Branding',
    description: 'Branding and mascot case study for a multiplayer social party game app.',
    summary: 'Visual identity system, character design, and mobile UX for a multiplayer party game.',
    folder: 'Projects',
    thumbnailBg: 'from-violet-950 via-neutral-900 to-neutral-950',
    accentColor: 'violet-400',
    tags: {
      role: 'Brand Designer & UI Specialist',
      timeline: '2 months (Q1 2024)',
      category: 'Branding & Mascot Design',
    },
    tldr: {
      problem: 'Existing party game apps felt generic and lacked a memorable brand personality to drive group engagement.',
      role: 'Created the brand identity, mascot character system, vector illustration set, and mobile game UI theme.',
      outcome: 'Established a playful brand design system that boosted app store conversion by 28%.',
    },
    problemContext:
      'Party games rely heavily on instantaneous energy and group delight. Blend needed a distinct visual mascot and energetic color palette that translated across app icons, social teasers, and in-game lobby interfaces.',
    processSubsections: [
      {
        title: '01. Mascot Exploration & Character Design',
        content:
          'Sketched dozens of playful mascot concepts before landing on "Blendo" — a dynamic liquid shape that adapts expressions based on game outcomes.',
        imagePlaceholder: '[Character Sheet & Mascot Expression Matrix]',
      },
      {
        title: '02. Mobile UI Layout & Dark Mode Theme',
        content:
          'Built high-contrast dark screens optimized for low-light party environments, pairing bold typography with responsive vector buttons.',
        imagePlaceholder: '[Mobile Game Screen Mockups & UI Kit]',
      },
    ],
    keyDecisions: [
      {
        decision: '[Decision: Expressive dynamic mascot state transitions]',
        reasoning: '[Reasoning: Enhances group celebration and comedic moments during multiplayer gameplay.]',
      },
      {
        decision: '[Decision: High-contrast neon accents on deep neutral dark theme]',
        reasoning: '[Reasoning: Ensures screen legibility in dim social environments like living rooms and gatherings.]',
      },
    ],
    outcomeReflection:
      'Blend proved that combining bold character illustration with sleek digital UI creates an unforgettable product experience for social apps.',
  },
  {
    id: 'nina-cafe-fleurs',
    title: 'Nina Café & Fleurs',
    slug: 'nina-cafe-fleurs',
    category: 'Client Work',
    description: 'Client web design and digital floral catalogue for a boutique Paris café.',
    summary: 'Digital storefront, seasonal menu, and floral arrangement catalogue for a Paris café.',
    folder: 'Misc',
    thumbnailBg: 'from-amber-950 via-neutral-900 to-neutral-950',
    accentColor: 'amber-400',
    tags: {
      role: 'Web Designer & Developer',
      timeline: '4 weeks (Q2 2024)',
      category: 'Client Web Design',
    },
    tldr: {
      problem: 'Nina Café needed a modern web presence to showcase both their artisan coffee menu and seasonal floral arrangements.',
      role: 'Designed and developed a responsive, lightweight catalog site with online reservation booking.',
      outcome: 'Delivered a clean digital presence that increased online table bookings by 42%.',
    },
    problemContext:
      'Operating at the intersection of a coffee shop and floral atelier, Nina Café required a delicate, minimalist layout that allowed high-resolution photography of pastries and floral bouquets to shine.',
    processSubsections: [
      {
        title: '01. Editorial Layout & Catalogue Design',
        content:
          'Designed a grid layout reminiscent of modern print magazines, featuring subtle hover interactions and clear ordering pathways.',
        imagePlaceholder: '[Editorial Web Layout & Typography Hierarchy]',
      },
    ],
    keyDecisions: [
      {
        decision: '[Decision: Minimalist neutral layout with generous whitespace]',
        reasoning: '[Reasoning: Directs total visual focus onto colorful fresh flower arrangements and artisanal drinks.]',
      },
      {
        decision: '[Decision: Frictionless one-click mobile reservation modal]',
        reasoning: '[Reasoning: Captures impulse weekend cafe visits directly from social media traffic.]',
      },
    ],
    outcomeReflection:
      'Nina Café & Fleurs highlights how quiet, editorial web design can strongly reflect a physical brand aesthetic.',
  },
];
