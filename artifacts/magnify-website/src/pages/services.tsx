import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  ease,
  SplitWords,
  CountUp,
  MagneticCursor,
  ScrollProgressBar,
} from "@/components/motion-primitives";

type Service = {
  num: string;
  tag: string;
  title: string;
  italic?: string;
  desc: string;
  bullets: string[];
  deliverable: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    tag: "Web",
    title: "Websites &",
    italic: "web platforms",
    desc:
      "Editorial marketing sites and complex single-page applications. Performance, accessibility, and motion treated as features — not afterthoughts.",
    bullets: [
      "React · Next.js · Vite · Astro",
      "Headless CMS (Sanity, Contentful, Payload)",
      "GSAP, Framer Motion, OGL/Three for cinematic UI",
      "99/100 Lighthouse target on every ship",
    ],
    deliverable:
      "A bespoke, production-grade website with a CMS your team actually wants to use.",
  },
  {
    num: "02",
    tag: "Mobile",
    title: "Mobile",
    italic: "applications",
    desc:
      "Cross-platform iOS and Android apps that feel native. Built with Expo and React Native — shipped with proper analytics, crash reporting, and OTA pipelines.",
    bullets: [
      "Expo & React Native",
      "Native modules and platform integrations",
      "Offline-first architecture",
      "App Store and Play submission handled end-to-end",
    ],
    deliverable: "A live app on both stores, with ongoing release tooling.",
  },
  {
    num: "03",
    tag: "Commerce",
    title: "Shopify &",
    italic: "headless commerce",
    desc:
      "Authorized Shopify Partners and Experts. Custom themes, app extensions, and full headless builds with Hydrogen — for merchants who refuse to look like a template.",
    bullets: [
      "Custom Shopify themes (Liquid + modern tooling)",
      "Headless storefronts on Hydrogen / Next.js",
      "App extensions, blocks, and metaobjects",
      "Replatforming and migration",
    ],
    deliverable:
      "A high-converting storefront with the design fidelity to match the brand.",
  },
  {
    num: "04",
    tag: "Software",
    title: "Software",
    italic: "services",
    desc:
      "Internal tools, dashboards, APIs, automation. The systems that quietly run your business — designed and engineered with the same care as the products customers see.",
    bullets: [
      "Type-safe Node, Go, and Python backends",
      "Postgres / SQLite design and tuning",
      "Internal admin dashboards",
      "Third-party API and integration work",
    ],
    deliverable: "A documented, observable system you can grow into.",
  },
  {
    num: "05",
    tag: "AI",
    title: "AI &",
    italic: "automation",
    desc:
      "LLM-powered features, retrieval pipelines, and workflow automation that actually ship — not demos. Pragmatic, evaluated, and instrumented.",
    bullets: [
      "RAG pipelines and structured generation",
      "Agentic workflows and tool-use systems",
      "Evaluation harnesses and guardrails",
      "Cost and latency tuning",
    ],
    deliverable:
      "An AI feature in production with measurable impact and sane operating costs.",
  },
  {
    num: "06",
    tag: "Studio",
    title: "Design &",
    italic: "brand systems",
    desc:
      "Editorial type, considered motion, and design systems with the discipline to scale. Built in code from day one, not handed off as static frames.",
    bullets: [
      "Identity and brand systems",
      "Design tokens and component libraries",
      "Motion language and interaction design",
      "Live prototyping in React",
    ],
    deliverable:
      "A coherent visual system, documented and ready for the team to extend.",
  },
];

function ServicesHero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 pt-32 pb-24 overflow-hidden">
      <motion.div
        className="absolute top-28 left-6 right-6 flex justify-between text-[10px] font-mono tracking-[0.25em] uppercase opacity-60"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      >
        <span data-testid="services-eyebrow-left">[ Services · Index ]</span>
        <span data-testid="services-eyebrow-right">06 disciplines · 1 practice</span>
      </motion.div>

      {/* Decorative numerals floating in hero */}
      <motion.span
        aria-hidden="true"
        className="absolute right-[6%] top-[28%] text-[14rem] md:text-[24rem] font-serif italic font-light text-white/[0.03] select-none leading-none"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease, delay: 0.5 }}
      >
        06
      </motion.span>

      <div className="container mx-auto max-w-7xl mt-16 md:mt-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="text-xs font-mono tracking-[0.3em] uppercase text-white/50 mb-10"
        >
          — What we build
        </motion.div>

        <h1
          className="text-5xl md:text-[7.5rem] lg:text-[10rem] font-display font-medium leading-[0.85] tracking-tighter"
          data-testid="services-hero-heading"
        >
          <SplitWords text="Software" immediate />
          <br />
          <SplitWords text="that earns" className="text-white/60" delay={0.25} immediate />
          <br />
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block font-serif italic font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease, delay: 0.65 }}
            >
              its weight.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.9 }}
          className="text-lg md:text-2xl text-white/55 mt-12 md:mt-16 max-w-2xl leading-relaxed"
          data-testid="services-hero-subtitle"
        >
          Six disciplines, one practice. We design and engineer the things our
          partners stake their reputation on — websites, commerce, mobile,
          platforms, AI.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-6 right-6 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 1.4 }}
      >
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "60px" }}
            transition={{ duration: 1.5, ease, delay: 1.5 }}
            className="w-[1px] bg-white/30"
          />
          <span>Index</span>
        </div>
        <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 hidden md:block">
          [ Disciplines · Process · Engagements ]
        </div>
      </motion.div>
    </section>
  );
}

function ServiceRow({ service, i }: { service: Service; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Service number reveal — slides up as the row enters
  const numY = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const numOpacity = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-20 md:py-28"
      data-testid={`service-${service.num}`}
    >
      {/* Animated top line */}
      <motion.div
        style={{ scaleX: lineScale }}
        className="absolute top-0 left-0 right-0 h-px bg-white/15 origin-left"
      />

      {/* Number column */}
      <div className="lg:col-span-2 flex lg:block items-baseline gap-6 overflow-hidden">
        <motion.div
          style={{ y: numY, opacity: numOpacity }}
          className="text-7xl md:text-8xl lg:text-9xl font-display font-light text-white/90 leading-none tracking-tighter"
        >
          {service.num}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 mt-4"
        >
          [ {service.tag} ]
        </motion.div>
      </div>

      {/* Title column */}
      <div className="lg:col-span-5">
        <h3
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-[1] tracking-tighter"
          data-testid={`service-title-${service.num}`}
        >
          <SplitWords text={service.title} delay={i * 0.05} />
          {service.italic && (
            <>
              <br />
              <span
                className="font-serif italic font-light text-white/70"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <SplitWords text={service.italic} delay={0.25 + i * 0.05} />
              </span>
            </>
          )}
        </h3>
      </div>

      {/* Body column */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="text-lg md:text-xl text-white/65 leading-relaxed"
        >
          {service.desc}
        </motion.p>

        <ul className="flex flex-col gap-3">
          {service.bullets.map((b, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease, delay: 0.3 + idx * 0.06 }}
              className="flex items-start gap-4 text-sm md:text-base text-white/55"
            >
              <span className="mt-2 block w-1 h-1 bg-white/40 shrink-0" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="mt-2 border-l-2 border-white/30 pl-5 py-2"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-2">
            Typical deliverable
          </div>
          <p className="text-base md:text-lg text-white/85 font-light leading-snug">
            {service.deliverable}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function SectionProSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bg = useTransform(
    scrollYProgress,
    [0, 0.18, 0.55, 0.85, 1],
    ["#050505", "#3a3a35", "#ebebe3", "#ebebe3", "#1a1a17"]
  );
  const text = useTransform(
    scrollYProgress,
    [0, 0.18, 0.45, 0.85, 1],
    ["#ebebe3", "#bdbdb4", "#202020", "#202020", "#bdbdb4"]
  );
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.95], [0, 0.5, 0.5, 0]);
  const glowScale = useTransform(scrollYProgress, [0.1, 0.6], [0.6, 1.4]);
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: bg, color: text }}
      className="relative overflow-hidden"
      data-testid="section-pro-spotlight"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(235,235,227,0.6) 0%, transparent 60%)",
          scale: glowScale,
          opacity: glowOpacity,
          mixBlendMode: "overlay",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 py-32 md:py-56 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div className="lg:col-span-5" style={{ y: headingY }}>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50 mb-10">
              [ Our product · Section Pro ]
            </div>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.95] tracking-tighter"
              data-testid="section-pro-heading"
            >
              <SplitWords text="Section" />
              <br />
              <span
                className="font-serif italic font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <SplitWords text="Pro." delay={0.2} />
              </span>
            </h2>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-10 lg:pt-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, ease }}
              className="text-2xl md:text-3xl font-display font-light leading-[1.25]"
            >
              Our flagship Shopify app — a sectional layout system used by
              thousands of merchants to ship editorial storefronts without
              touching code.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, ease, delay: 0.15 }}
              className="text-base md:text-lg opacity-65 max-w-xl leading-relaxed"
            >
              We don't just consult on commerce — we build the tools that ship
              it. Section Pro is what twelve months of working closely with
              ambitious Shopify merchants taught us, packaged.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 md:gap-12 mt-4"
            >
              {[
                { n: 1200, suffix: "+", l: "Active stores" },
                { n: 4, suffix: ".9★", l: "Shopify rating" },
                { n: 18, suffix: " mo", l: "In production" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-5xl font-display font-medium tracking-tight">
                    <CountUp to={s.n} suffix={s.suffix} duration={2.2} />
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase opacity-50 mt-2">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease, delay: 0.5 }}
              className="mt-4"
            >
              <a
                href="https://apps.shopify.com/section-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.25em] uppercase opacity-70 hover:opacity-100 transition-opacity"
                data-testid="section-pro-cta"
              >
                Explore Section Pro
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProcessSection() {
  const steps = [
    { n: "01", t: "Discover", d: "Quick, deep alignment on what matters and what doesn't. Scope, success metrics, constraints." },
    { n: "02", t: "Design", d: "Editorial systems and motion language tailored to the brand — prototyped live, not in static frames." },
    { n: "03", t: "Build", d: "Type-safe, performant, accessible. Demoed weekly. Shipped to staging continuously." },
    { n: "04", t: "Ship", d: "Live in weeks, not quarters. Monitoring, post-launch support, and iteration baked in." },
  ];

  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#050505] overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease }}
          className="flex items-end justify-between mb-20"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
            [ How we work ]
          </div>
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase hidden md:block">
            04 phases
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.6, ease, delay: 0.3 }}
            className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-white/10 origin-left"
          />
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease, delay: 0.4 + i * 0.12 }}
              className="relative pt-12"
              data-testid={`services-process-${i}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.12 }}
                className="absolute top-10 left-0 w-2 h-2 rounded-full bg-white/80"
              />
              <div
                className="text-2xl font-serif italic font-light text-white/40 mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {s.n}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-4">
                {s.t}
              </h3>
              <p className="text-sm md:text-base text-white/55 leading-relaxed">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EngagementsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = [
    {
      k: "Sprint",
      sub: "1 — 2 weeks",
      d: "Targeted scope. Prototype, pilot, or fast turnaround. Fixed-price, fixed-outcome.",
      best: "Best for proof-of-concept, design exploration, audits.",
    },
    {
      k: "Build",
      sub: "4 — 16 weeks",
      d: "Full project engagement. Discovery through launch. Weekly demos, transparent timeline.",
      best: "Best for new websites, apps, headless commerce builds.",
    },
    {
      k: "Partner",
      sub: "Ongoing",
      d: "Embedded with your team. Continuous design and engineering capacity, scaled to need.",
      best: "Best for product teams, sustained growth, evolving roadmaps.",
    },
  ];

  return (
    <section className="relative py-32 md:py-48 px-6 bg-black border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease }}
          className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-12"
        >
          [ Engagements ]
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1] tracking-tighter mb-20 max-w-3xl"
        >
          <SplitWords text="Three ways" />
          <br />
          <span
            className="font-serif italic font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <SplitWords text="to work together." delay={0.2} />
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative bg-black p-8 md:p-12 overflow-hidden cursor-default min-h-[340px] flex flex-col justify-between"
              data-testid={`engagement-${i}`}
            >
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    layoutId="engagement-bg"
                    className="absolute inset-0 bg-[#ebebe3]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={{ color: hovered === i ? "#202020" : "#ebebe3" }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50 mb-6">
                  0{i + 1} · {it.sub}
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
                  {it.k}
                </h3>
                <p className="text-base md:text-lg opacity-70 leading-relaxed mb-6">
                  {it.d}
                </p>
              </motion.div>

              <motion.div
                animate={{ color: hovered === i ? "#202020" : "#ebebe3" }}
                transition={{ duration: 0.3 }}
                className="relative z-10 text-xs font-mono tracking-wider uppercase opacity-60"
              >
                {it.best}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackMarquee() {
  return (
    <section className="py-10 md:py-14 overflow-hidden bg-black border-y border-white/10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {[
              "TypeScript", "React", "Next.js", "Vite", "Astro", "Expo",
              "Shopify Hydrogen", "Liquid", "Sanity", "Payload", "Postgres",
              "Drizzle", "Tailwind", "Framer Motion", "GSAP", "Three.js",
              "OpenAI", "Anthropic", "Pinecone", "Cloudflare", "Vercel",
            ].map((tag, j) => (
              <span
                key={j}
                className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/40"
              >
                {tag}{" "}
                <span className="mx-6 text-white/15">◆</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-40 md:py-64 px-6 bg-black flex flex-col items-center text-center overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(235,235,227,0.4) 0%, transparent 60%)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.06 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 2, ease }}
      />
      <div className="container mx-auto max-w-5xl relative">
        <h2
          className="text-5xl md:text-7xl lg:text-[8.5rem] font-display font-medium leading-[0.9] tracking-tighter mb-16"
          data-testid="services-outro-heading"
        >
          <SplitWords text="Have a brief?" />
          <br />
          <span
            className="font-serif italic font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <SplitWords text="Let's talk." delay={0.3} />
          </span>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease, delay: 0.7 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-9 py-5 bg-white text-[#0a0a0a] font-sans text-xs font-medium tracking-[0.18em] uppercase hover:-translate-y-0.5 hover:bg-[#ebebe3] transition-all duration-300 group rounded-full"
            data-testid="services-cta-button"
          >
            Start a conversation
            <span className="text-base group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <div className="relative min-h-[100dvh] bg-black text-[#ebebe3] selection:bg-white selection:text-black overflow-x-hidden font-sans">
      <Header />
      <MagneticCursor />
      <ScrollProgressBar />

      {/* Ambient grain background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(235,235,227,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <main className="relative z-10">
        <ServicesHero />

        {/* Disciplines list */}
        <section className="relative py-24 md:py-32 px-6 bg-black">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease }}
              className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-20"
            >
              [ 01 / Disciplines ]
            </motion.div>

            <div className="flex flex-col">
              {SERVICES.map((s, i) => (
                <ServiceRow key={s.num} service={s} i={i} />
              ))}
            </div>
          </div>
        </section>

        <SectionProSpotlight />
        <ProcessSection />
        <EngagementsSection />
        <StackMarquee />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
