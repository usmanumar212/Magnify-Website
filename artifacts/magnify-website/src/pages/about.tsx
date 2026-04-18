import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

function SplitWords({ text, className, delay = 0, testId, immediate = false }: { text: string; className?: string; delay?: number; testId?: string; immediate?: boolean }) {
  const words = text.split(" ");
  const animProps = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-15%" } as const };
  return (
    <span className={className} data-testid={testId}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: "0.25em" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...animProps}
            transition={{ duration: 1.0, ease, delay: delay + i * 0.05 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease,
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function MagneticCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 30 });
  const sy = useSpring(y, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference hidden md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      aria-hidden="true"
    >
      <div className="w-3 h-3 rounded-full bg-white/80" />
    </motion.div>
  );
}

function PillarsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth color crossfade keyed to scroll position within the section
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
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.85, 1],
    ["rgba(235,235,227,0.08)", "rgba(235,235,227,0.18)", "rgba(32,32,32,0.15)", "rgba(32,32,32,0.15)", "rgba(235,235,227,0.1)"]
  );
  const eyebrowOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0.4, 0.55]);

  // Subtle parallax on the heading column
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // Glow accent that grows as section enters
  const glowScale = useTransform(scrollYProgress, [0.1, 0.6], [0.6, 1.4]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.95], [0, 0.5, 0.5, 0]);

  const pillars = [
    { k: "Futuristic by default", v: "Modern stacks, motion-led interfaces, AI-augmented workflows. We build what comes next, not what worked last year." },
    { k: "Clean delivery", v: "Tight scopes, transparent timelines, weekly demos. No agency theatre — only signal, only ship." },
    { k: "Engineering excellence", v: "Type-safe systems. 99/100 Lighthouse. Code that other engineers want to read." },
    { k: "Design that earns its weight", v: "Editorial typography, considered motion, brand-defining detail. Every pixel justified." },
    { k: "Owners, not vendors", v: "We treat your product like ours. Long-term partnerships over project-by-project transactions." },
  ];

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: bg, color: text }}
      className="relative overflow-hidden transition-none"
    >
      {/* Soft radial glow accent */}
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
        <motion.div
          style={{ opacity: eyebrowOpacity }}
          className="text-[10px] font-mono tracking-[0.3em] uppercase mb-20"
        >
          [ 03 / What sets us apart ]
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div className="lg:col-span-4" style={{ y: headingY }}>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1] tracking-tighter lg:sticky lg:top-32"
              data-testid="about-positioning"
            >
              <SplitWords text="Built" />
              <br />
              <span
                className="font-serif italic font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <SplitWords text="for what's" delay={0.2} />
              </span>
              <br />
              <SplitWords text="next." delay={0.4} />
            </h2>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col gap-1">
            {pillars.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease, delay: i * 0.05 }}
                whileHover={{ x: 14 }}
                className="group py-8 md:py-10 cursor-default border-t"
                style={{ borderTopColor: borderColor }}
                data-testid={`pillar-${i}`}
              >
                <div className="grid grid-cols-12 gap-6 items-baseline">
                  <div className="col-span-12 md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-display font-medium tracking-tight">
                      {item.k}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <p className="text-base md:text-lg opacity-65 leading-relaxed">
                      {item.v}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-1 text-right text-xs font-mono opacity-30 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ShowreelSection() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Cinematic reveal: scale and unmask the video as section enters
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.04]);
  const radius = useTransform(scrollYProgress, [0, 0.4], ["32px", "8px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.7, 0.15, 0.15, 0.5]);
  const captionY = useTransform(scrollYProgress, [0.2, 0.6], [40, -20]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 px-6 bg-[#050505] overflow-hidden"
      data-testid="showreel-section"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
            [ 05 / In motion ]
          </div>
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase hidden md:block">
            ▶ Showreel · 2026
          </div>
        </motion.div>

        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a] border border-white/5"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/video/showreel-poster.jpg"
            data-testid="showreel-video"
          >
            <source src="/video/showreel.mp4" type="video/mp4" />
            <source src="/video/showreel.webm" type="video/webm" />
          </video>

          {/* Cinematic vignette + dimming overlay */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: overlayOpacity,
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Corner brackets — editorial frame */}
          <div className="absolute inset-6 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/40" />
          </div>

          {/* HUD label */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>REC · MAGNIFY</span>
          </div>
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[10px] font-mono tracking-[0.25em] uppercase text-white/60">
            01:00 / 01:00
          </div>
        </motion.div>

        <motion.div
          style={{ y: captionY }}
          className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
        >
          <div className="md:col-span-1 text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase">
            ◆ 01
          </div>
          <h3
            className="md:col-span-7 text-2xl md:text-4xl font-display font-light leading-snug text-white/85"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="italic">Selected work</span>, in motion. A glance at how we ship —
            from first frame to live build.
          </h3>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors"
              data-testid="showreel-cta"
            >
              View full portfolio
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // floating glyphs in hero
  const float1 = useTransform(scrollYProgress, [0, 0.2], [0, 60]);
  const float2 = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  return (
    <div className="relative min-h-[100dvh] bg-black text-[#ebebe3] selection:bg-white selection:text-black overflow-x-hidden font-sans">
      <Header />
      <MagneticCursor />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/80 z-40 origin-left"
        style={{ scaleX: progressScaleX }}
        aria-hidden="true"
      />

      {/* Ambient grain background */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(235,235,227,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <main className="relative z-10">
        {/* 1. HERO — futuristic statement */}
        <section className="relative min-h-[100vh] flex flex-col justify-center px-6 pt-32 pb-24">
          <motion.div
            className="absolute top-28 left-6 right-6 flex justify-between text-[10px] font-mono tracking-[0.25em] uppercase opacity-60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
          >
            <span data-testid="about-eyebrow-left">[ EST. 2024 — V.04.26 ]</span>
            <span data-testid="about-eyebrow-right">Engineering · Design · Velocity</span>
          </motion.div>

          {/* Floating ornament glyphs */}
          <motion.span
            aria-hidden="true"
            style={{ y: float1 }}
            className="absolute top-[35%] right-[8%] text-[10rem] md:text-[16rem] font-serif italic font-light text-white/[0.04] select-none"
          >
            +
          </motion.span>
          <motion.span
            aria-hidden="true"
            style={{ y: float2 }}
            className="absolute bottom-[18%] left-[6%] text-[8rem] md:text-[12rem] font-serif italic font-light text-white/[0.04] select-none"
          >
            ×
          </motion.span>

          <motion.div
            className="container mx-auto max-w-7xl mt-16 md:mt-24"
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          >
            <motion.div initial="initial" animate="animate" variants={stagger}>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 1, ease }}
                className="text-xs font-mono tracking-[0.3em] uppercase text-white/50 mb-10"
              >
                — About Magnify
              </motion.div>

              <h1
                className="text-5xl md:text-[7.5rem] lg:text-[10rem] font-display font-medium leading-[0.85] tracking-tighter"
                data-testid="about-hero-heading"
              >
                <SplitWords text="We engineer" immediate />
                <br />
                <SplitWords
                  text="futures —"
                  className="text-white/60"
                  delay={0.25}
                  immediate
                />
                <br />
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block font-serif italic font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, ease, delay: 0.65 }}
                  >
                    delivered cleanly.
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 1.2, ease, delay: 0.9 }}
                className="text-lg md:text-2xl text-white/55 mt-12 md:mt-16 max-w-2xl leading-relaxed"
                data-testid="about-hero-subtitle"
              >
                A forward-built engineering and design practice. We turn ambitious ideas into
                production-grade software — fast, considered, and unmistakably modern.
              </motion.p>
            </motion.div>
          </motion.div>

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
              <span>Scroll</span>
            </div>
            <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 hidden md:block">
              [ Manifesto · Practice · Output ]
            </div>
          </motion.div>
        </section>

        {/* 2. MANIFESTO — bold positioning */}
        <section className="relative py-40 md:py-56 px-6 bg-[#0a0a0a]">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease }}
                  className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase lg:sticky lg:top-32"
                >
                  [ 01 / Manifesto ]
                </motion.div>
              </div>
              <div className="lg:col-span-9">
                <h2
                  className="text-3xl md:text-5xl lg:text-6xl font-display font-light leading-[1.15] tracking-tight text-white/90"
                  data-testid="about-manifesto"
                >
                  <SplitWords text="Magnify is a forward-built engineering and design practice." />
                  <br />
                  <span className="text-white/40">
                    <SplitWords
                      text="We don't decorate software — we build the systems that move companies forward."
                      delay={0.4}
                    />
                  </span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1.2, ease, delay: 0.6 }}
                  className="text-lg md:text-xl text-white/50 mt-16 max-w-2xl leading-relaxed"
                >
                  Authorized Shopify Partners and Experts. Makers of Section Pro. Trusted by
                  ambitious teams to ship work that performs in the wild — measured, considered,
                  and unmistakably theirs.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. METRICS — animated counters */}
        <section className="relative py-32 md:py-48 px-6 bg-black border-y border-white/5 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease }}
              className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-20"
            >
              [ 02 / Practice ]
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {[
                { num: 100, suffix: "%", label: "In-house. No outsourcing." },
                { num: 48, suffix: "h", label: "Avg. discovery to first prototype." },
                { num: 99, suffix: "/100", label: "Lighthouse target on every ship." },
                { num: 24, suffix: "·7", label: "Two timezones. Always moving." },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease, delay: i * 0.1 }}
                  className="border-t border-white/10 pt-8"
                  data-testid={`metric-${i}`}
                >
                  <div className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter mb-4">
                    <CountUp to={m.num} suffix={m.suffix} duration={2.2} />
                  </div>
                  <div className="text-xs md:text-sm text-white/50 font-mono tracking-wider uppercase leading-relaxed">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WHAT WE STAND FOR — scroll-morphing background */}
        <PillarsSection />

        {/* 5. PROCESS — horizontal sequence */}
        <section className="relative py-32 md:py-48 px-6 bg-[#050505] overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease }}
              className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-20"
            >
              [ 04 / How we work ]
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.6, ease, delay: 0.3 }}
                className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-white/10 origin-left"
              />
              {[
                { n: "01", t: "Discover", d: "Quick, deep alignment on what matters and what doesn't." },
                { n: "02", t: "Design", d: "Editorial systems and motion language tailored to the brand." },
                { n: "03", t: "Build", d: "Type-safe, performant, accessible. Demoed weekly." },
                { n: "04", t: "Ship & evolve", d: "Live in weeks, not quarters. Iteration as a posture." },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, ease, delay: 0.4 + i * 0.12 }}
                  className="relative pt-12"
                  data-testid={`process-${i}`}
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

        {/* 5.5 SHOWREEL VIDEO */}
        <ShowreelSection />

        {/* 6. CAPABILITIES MARQUEE */}
        <section className="py-10 md:py-14 overflow-hidden bg-black border-y border-white/10">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                {[
                  "Web Engineering", "Mobile Apps", "Shopify Plus", "Headless Commerce",
                  "Design Systems", "API Architecture", "Performance", "Accessibility",
                  "AI Integration", "Motion Design", "Section Pro",
                ].map((tag, j) => (
                  <span key={j} className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/40">
                    {tag} <span className="mx-6 text-white/15">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </section>

        {/* 7. WHERE WE ARE — quiet footer note, not a selling point */}
        <section className="py-24 md:py-32 px-6 bg-black border-b border-white/5">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, ease }}
                className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-6"
              >
                [ Where we work from ]
              </motion.div>
              <h3
                className="text-2xl md:text-3xl font-display font-light text-white/70 max-w-xl leading-snug"
                data-testid="about-locations"
              >
                <SplitWords text="Distributed across" /> <span className="text-white">Birmingham</span>{" "}
                <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic">and</span>{" "}
                <span className="text-white">Abuja</span>
                <SplitWords text=" — two timezones, one operating system." delay={0.3} />
              </h3>
            </div>
            <div className="flex gap-12 text-xs font-mono tracking-widest uppercase text-white/40">
              <div>
                <div className="text-white/70 mb-1">BHM</div>
                <div>GMT</div>
              </div>
              <div>
                <div className="text-white/70 mb-1">ABV</div>
                <div>WAT</div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CTA */}
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
              data-testid="about-outro-heading"
            >
              <SplitWords text="Let's build" />
              <br />
              <span
                className="font-serif italic font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <SplitWords text="something with weight." delay={0.3} />
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
                data-testid="about-cta-button"
              >
                Start a conversation
                <span className="text-base group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
