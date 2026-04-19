export type Project = {
  slug: string;
  title: string;
  industry: string;
  year: string;
  tagline: string;
  status?: string;
  size: string;
  featured?: boolean;
  client: string;
  scope: string[];
  duration: string;
  role: string;
  summary: string;
  challenge: string;
  approach: string;
  outcomes: { metric: string; label: string }[];
  stack: string[];
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "section-pro",
    title: "Section Pro",
    industry: "Shopify · Product",
    year: "2024",
    tagline: "A sectional layout system used by thousands of merchants.",
    size: "md:col-span-2 aspect-[21/9]",
    featured: true,
    client: "Magnify (in-house product)",
    scope: ["Product strategy", "Design system", "Shopify app development", "Theme architecture", "Marketing site"],
    duration: "12 months · ongoing",
    role: "Founders, designers, engineers",
    summary:
      "Our flagship Shopify app — a sectional layout system that lets merchants ship editorial storefronts without writing code. Built from the ground up after months of working closely with ambitious Shopify brands.",
    challenge:
      "Most Shopify themes force a tradeoff: lock into a template's aesthetic, or pay an agency for a custom build. Mid-market merchants need editorial flexibility without engineering overhead — and existing page builders weren't fast enough, didn't respect performance budgets, or felt visually generic.",
    approach:
      "We rebuilt section composition from first principles. A type-safe theme architecture, a curated library of editorial sections, and an editing experience tuned for merchandising teams — not developers. We obsessed over performance: every section is server-rendered, lazy-hydrated, and lighthouse-optimized.",
    outcomes: [
      { metric: "1,200+", label: "Active stores" },
      { metric: "4.9★", label: "Shopify app rating" },
      { metric: "99/100", label: "Avg. Lighthouse score" },
      { metric: "18 mo", label: "In production" },
    ],
    stack: ["Liquid", "TypeScript", "React", "Vite", "Cloudflare Workers", "Shopify Hydrogen"],
    link: { label: "Visit Section Pro on the Shopify App Store", href: "https://apps.shopify.com/section-pro" },
  },
  {
    slug: "nova-financial",
    title: "Nova Financial",
    industry: "Fintech",
    year: "2024",
    tagline: "Next-generation banking dashboard.",
    size: "md:col-span-2 aspect-[21/9]",
    status: "Confidential — Under NDA",
    client: "Confidential — European challenger bank",
    scope: ["Product design", "Design system", "Web platform", "API architecture"],
    duration: "16 weeks",
    role: "Lead design and engineering partner",
    summary:
      "A redesigned banking platform for a European challenger bank — replacing a legacy dashboard with a modern, motion-led experience built around clarity and speed.",
    challenge:
      "The legacy product had grown over six years into a sprawling collection of screens with inconsistent patterns and slow load times. Customer support tickets correlated strongly with confusing flows. Leadership needed a top-to-bottom rethink without halting the existing roadmap.",
    approach:
      "We built a new design system in parallel with the existing product, shipping migrations behind feature flags. Every flow was prototyped in code, not Figma — letting product and engineering negotiate against the real thing. We rewrote the dashboard shell with strict performance budgets and instrumented every interaction.",
    outcomes: [
      { metric: "62%", label: "Drop in support tickets" },
      { metric: "3.2×", label: "Faster perceived load" },
      { metric: "98/100", label: "Lighthouse score" },
      { metric: "0", label: "Regressions on launch" },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "tRPC", "Tailwind", "Framer Motion"],
  },
  {
    slug: "aura-health",
    title: "Aura Health",
    industry: "Healthcare",
    year: "2024",
    tagline: "Patient management portal.",
    size: "aspect-[4/3]",
    client: "Aura Health Group",
    scope: ["Product design", "Web app", "EHR integration"],
    duration: "10 weeks",
    role: "End-to-end design and engineering",
    summary:
      "A patient management portal for a private health network, replacing a paper-and-spreadsheet workflow that was costing the team hours every day.",
    challenge:
      "Clinic staff were managing patient intake, appointment notes, and follow-ups across three disconnected systems. Information was being lost between handoffs. Compliance requirements ruled out off-the-shelf SaaS.",
    approach:
      "We embedded with the clinical team for a week, mapping every touchpoint. The result was a single, opinionated workflow surface — fast keyboard navigation, autosave on every field, and audit trails baked into the data layer. Built with offline-first architecture so it works in spotty wifi rooms.",
    outcomes: [
      { metric: "4.5h", label: "Saved per clinician per week" },
      { metric: "0", label: "Lost handoffs since launch" },
      { metric: "100%", label: "Staff adoption in week 1" },
    ],
    stack: ["React", "TypeScript", "Postgres", "Drizzle", "Express", "Tailwind"],
  },
  {
    slug: "loom-commerce",
    title: "Loom Commerce",
    industry: "Commerce",
    year: "2025",
    tagline: "Headless Shopify storefront.",
    size: "aspect-[4/3]",
    status: "Coming Soon",
    client: "Loom Commerce",
    scope: ["Brand system", "Headless storefront", "CMS architecture"],
    duration: "8 weeks",
    role: "Lead design and engineering",
    summary:
      "A headless Shopify storefront for a premium homewares brand. Editorial typography, considered motion, and a CMS workflow the merchandising team actually enjoys.",
    challenge:
      "The brand had outgrown its themed Shopify storefront. Marketing wanted editorial moments — long-form storytelling, full-bleed product photography, considered motion — without the engineering team becoming a bottleneck for every campaign launch.",
    approach:
      "We built a Hydrogen-based storefront with a sectional CMS layer. Marketing composes pages from a curated library of components; engineering ships new sections quarterly. Performance was treated as a brand asset — every page hits 99/100 Lighthouse.",
    outcomes: [
      { metric: "+34%", label: "Conversion rate" },
      { metric: "99/100", label: "Lighthouse score" },
      { metric: "0 eng", label: "Required per campaign" },
    ],
    stack: ["Hydrogen", "Remix", "TypeScript", "Sanity", "Tailwind", "GSAP"],
  },
  {
    slug: "nexus",
    title: "Nexus",
    industry: "SaaS",
    year: "2024",
    tagline: "Developer API platform.",
    size: "aspect-square",
    client: "Nexus",
    scope: ["Marketing site", "Documentation system", "Brand identity"],
    duration: "6 weeks",
    role: "Design and engineering",
    summary:
      "A marketing site and documentation system for a developer-facing API platform. Built for the audience it serves: technical, fast, and beautiful in the dark.",
    challenge:
      "A B2D (business-to-developer) tool with a category-defining product but a website that read as generic SaaS. The team needed positioning and a presence that felt as opinionated as the product.",
    approach:
      "We rebuilt the marketing surface and the docs system as a single codebase — shared design language, shared component library, shared motion vocabulary. Developers land on the marketing site and never feel a context switch when they hit the docs.",
    outcomes: [
      { metric: "+220%", label: "Sign-up conversion" },
      { metric: "1.2s", label: "Median load time" },
      { metric: "Top 5%", label: "Web Vitals percentile" },
    ],
    stack: ["Next.js", "MDX", "TypeScript", "Tailwind", "Vercel", "Algolia"],
  },
  {
    slug: "osprey",
    title: "Osprey",
    industry: "Hospitality",
    year: "2024",
    tagline: "Boutique hotel booking engine.",
    size: "aspect-square",
    client: "Osprey Hotels",
    scope: ["Booking platform", "PMS integration", "Multi-property CMS"],
    duration: "12 weeks",
    role: "Lead design and engineering",
    summary:
      "A bespoke booking engine for a boutique hotel group — replacing a third-party widget that was eroding both conversion and brand.",
    challenge:
      "The third-party booking widget felt like a different product. Guests bounced between marketing site and booking flow with jarring design and slow responses. Direct booking conversion was 40% below industry benchmark.",
    approach:
      "We built a custom booking engine integrated with their property management system, designed as part of the brand — same typography, same motion language, same pace. Multi-step flow tuned for mobile, with availability prefetched as guests browse.",
    outcomes: [
      { metric: "+58%", label: "Direct bookings" },
      { metric: "-35%", label: "Booking abandonment" },
      { metric: "1.8s", label: "Avg. flow completion" },
    ],
    stack: ["React", "Remix", "TypeScript", "Postgres", "Stripe", "Cloudflare"],
  },
  {
    slug: "vertex",
    title: "Vertex",
    industry: "Education",
    year: "2023",
    tagline: "Learning management system.",
    size: "md:col-span-2 aspect-[21/9]",
    client: "Vertex Learning",
    scope: ["Product redesign", "Mobile apps", "Backend modernization"],
    duration: "20 weeks",
    role: "Lead design, engineering, and platform",
    summary:
      "A full redesign and platform modernization of a learning management system serving over 100,000 students across multiple institutions.",
    challenge:
      "An aging LMS that was loved by educators for its capability and hated for its interface. Mobile usage was growing fast and the existing apps were unmaintained. Migration risk was enormous.",
    approach:
      "We rebuilt the front-end as a single codebase serving web and mobile, with a new design system shipped behind feature flags institution by institution. The backend was modernized in parallel — new APIs, same database — letting old and new clients run side by side during the rollout.",
    outcomes: [
      { metric: "100k+", label: "Students served" },
      { metric: "92%", label: "Educator satisfaction" },
      { metric: "0", label: "Outages during rollout" },
    ],
    stack: ["React", "React Native", "TypeScript", "GraphQL", "Postgres", "Redis"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  return { prev, next };
}
