import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink, PlayCircle, Globe } from "lucide-react";
import {
  ease,
  SplitWords,
  CountUp,
  MagneticCursor,
  ScrollProgressBar,
} from "@/components/motion-primitives";
import { getAdjacentProjects, getProjectBySlug, type Project } from "@/data/projects";
import NotFound from "@/pages/not-found";

export default function PortfolioDetail() {
  const [, params] = useRoute<{ slug: string }>("/portfolio/:slug");
  const slug = params?.slug ?? "";
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <NotFound />;

  const { prev, next } = getAdjacentProjects(project.slug);

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
        <DetailHero project={project} />
        <ProjectMeta project={project} />
        <DetailSection eyebrow="01 / Summary" title="Overview">
          <p
            className="text-2xl md:text-3xl font-display font-light leading-[1.3] text-white/85"
            data-testid="project-summary"
          >
            {project.summary}
          </p>
        </DetailSection>

        <DetailVisual project={project} />

        {project.video && <VideoSection project={project} />}

        {project.liveUrl && <LiveLinkSection url={project.liveUrl} />}

        <DetailSection eyebrow="02 / The challenge" title="What we set out to solve">
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-3xl">
            {project.challenge}
          </p>
        </DetailSection>

        <DetailSection eyebrow="03 / Approach" title="How we built it">
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-3xl">
            {project.approach}
          </p>
        </DetailSection>

        <OutcomesSection project={project} />

        <StackSection project={project} />

        {project.link && <ExternalLinkSection project={project} />}

        <ProjectNav prev={prev} next={next} />
      </main>

      <Footer />
    </div>
  );
}

function DetailHero({ project }: { project: Project }) {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-end px-6 pt-32 pb-16 md:pb-24 overflow-hidden">
      <motion.div
        className="absolute top-28 left-6 right-6 flex justify-between text-[10px] font-mono tracking-[0.25em] uppercase opacity-60"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 hover:opacity-100 hover:text-white transition-colors"
          data-testid="back-to-portfolio"
        >
          <ArrowLeft className="w-3 h-3" />
          Index
        </Link>
        <span>
          {project.industry} · {project.year}
        </span>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute right-[6%] top-[28%] text-[12rem] md:text-[20rem] font-serif italic font-light text-white/[0.03] select-none leading-none"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease, delay: 0.5 }}
      >
        {project.year}
      </motion.span>

      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="text-xs font-mono tracking-[0.3em] uppercase text-white/50 mb-10"
        >
          — Case study · {project.industry}
        </motion.div>

        <h1
          className="text-5xl md:text-[7rem] lg:text-[9rem] font-display font-medium leading-[0.85] tracking-tighter mb-10"
          data-testid="project-title"
        >
          <SplitWords text={project.title} immediate />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
          className="text-xl md:text-3xl text-white/60 max-w-3xl leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span className="italic">{project.tagline}</span>
        </motion.p>
      </div>
    </section>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  const items = [
    { k: "Client", v: project.client },
    { k: "Role", v: project.role },
    { k: "Duration", v: project.duration },
    { k: "Scope", v: project.scope.join(" · ") },
  ];

  return (
    <section className="relative border-y border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              data-testid={`meta-${item.k.toLowerCase()}`}
            >
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-3">
                {item.k}
              </div>
              <div className="text-sm md:text-base text-white/85 leading-snug">
                {item.v}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative py-24 md:py-36 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-6 lg:sticky lg:top-32"
            >
              <div>[ {eyebrow} ]</div>
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white/90 mt-6 normal-case tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                {title}
              </h2>
            </motion.div>
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

function DetailVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04]);
  const radius = useTransform(scrollYProgress, [0, 0.4], ["32px", "8px"]);

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-20 px-6 overflow-hidden"
      data-testid="project-visual"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a] border border-white/5"
        >
          {/* Stylized placeholder visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at center, rgba(235,235,227,0.08) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, transparent 48%, rgba(235,235,227,0.04) 49%, rgba(235,235,227,0.04) 51%, transparent 52%)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10 text-center">
              <div
                className="text-7xl md:text-9xl font-serif italic font-light text-white/20 leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {project.title}
              </div>
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mt-6">
                Visual placeholder · {project.year}
              </div>
            </div>
          </div>

          {/* Editorial corner brackets */}
          <div className="absolute inset-6 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/40" />
          </div>
          <div className="absolute top-4 left-4 md:top-6 md:left-6 text-[10px] font-mono tracking-[0.25em] uppercase text-white/60">
            ◆ {project.slug}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VideoSection({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.02]);
  const radius = useTransform(scrollYProgress, [0, 0.4], ["28px", "8px"]);

  if (!project.video) return null;

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-6 overflow-hidden bg-black"
      data-testid="project-video"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-3">
              [ Reel ]
            </div>
            <h3
              className="text-3xl md:text-5xl font-display font-medium tracking-tighter text-white/90"
              style={{ letterSpacing: "-0.02em" }}
            >
              The film
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
            REC · {project.year}
          </div>
        </div>

        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative aspect-video w-full overflow-hidden bg-[#0a0a0a] border border-white/5"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={project.video.src}
            poster={project.video.poster}
            controls
            playsInline
            preload="metadata"
            data-testid="video-player"
          />
          {/* Editorial corner brackets */}
          <div className="absolute inset-4 pointer-events-none">
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/40" />
          </div>
          <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-white/60 pointer-events-none">
            <PlayCircle className="w-3 h-3" />
            {project.slug}.mp4
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LiveLinkSection({ url }: { url: string }) {
  let host = url;
  try {
    host = new URL(url).host.replace(/^www\./, "");
  } catch {
    /* keep raw url as host */
  }

  return (
    <section
      className="relative py-12 md:py-16 px-6 bg-black border-t border-white/10"
      data-testid="project-live-link"
    >
      <div className="container mx-auto max-w-7xl">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10 py-8 md:py-10 border-y border-white/10 hover:border-white/30 transition-colors"
          data-testid="live-link-anchor"
        >
          <div className="flex items-start md:items-center gap-5 md:gap-7">
            <div className="hidden md:flex w-14 h-14 rounded-full border border-white/15 items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-colors">
              <Globe className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-2">
                [ Live ]
              </div>
              <div
                className="text-2xl md:text-4xl font-display font-light text-white/90 group-hover:text-white transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span className="italic">Visit the live project</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-white/40 mt-2 truncate max-w-[60vw]">
                {host}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 text-xs font-mono tracking-[0.25em] uppercase text-white/80 group-hover:bg-white group-hover:text-black transition-colors self-start md:self-auto">
            Open
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  );
}

function OutcomesSection({ project }: { project: Project }) {
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
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.7, 0.95],
    [0, 0.5, 0.5, 0]
  );
  const glowScale = useTransform(scrollYProgress, [0.1, 0.6], [0.6, 1.4]);

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: bg, color: text }}
      className="relative overflow-hidden"
      data-testid="project-outcomes"
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

      <div className="container mx-auto max-w-7xl px-6 py-24 md:py-36 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-4">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50 mb-6">
              [ 04 / Outcomes ]
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-[1] tracking-tighter">
              <SplitWords text="What" />
              <br />
              <span
                className="font-serif italic font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <SplitWords text="shipped." delay={0.2} />
              </span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-16">
              {project.outcomes.map((o, i) => {
                const numericMatch = o.metric.match(/(-?\d+\.?\d*)/);
                const numeric = numericMatch ? parseFloat(numericMatch[1]) : null;
                const suffix = numeric !== null ? o.metric.replace(numericMatch![0], "") : "";

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                    className="border-t border-current/15 pt-6"
                    data-testid={`outcome-${i}`}
                  >
                    <div className="text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tighter mb-3">
                      {numeric !== null ? (
                        <CountUp to={numeric} suffix={suffix} duration={2} />
                      ) : (
                        o.metric
                      )}
                    </div>
                    <div className="text-xs md:text-sm font-mono tracking-wider uppercase opacity-60 leading-relaxed">
                      {o.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function StackSection({ project }: { project: Project }) {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#050505]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-6"
            >
              [ 05 / Built with ]
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white/90">
              The stack
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-wrap gap-2 md:gap-3">
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                className="inline-flex items-center justify-center px-5 py-2.5 border border-white/15 text-sm leading-none font-mono tracking-wide text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-default rounded-full whitespace-nowrap"
                data-testid={`stack-${i}`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExternalLinkSection({ project }: { project: Project }) {
  if (!project.link) return null;
  return (
    <section className="relative py-16 md:py-20 px-6 bg-black border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 text-xl md:text-3xl font-display font-light text-white/70 hover:text-white transition-colors"
          data-testid="project-external-link"
        >
          <span
            className="font-serif italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {project.link.label}
          </span>
          <ExternalLink className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  return (
    <section className="relative bg-black border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <Link
          href={`/portfolio/${prev.slug}`}
          className="group block p-10 md:p-16 hover:bg-white/[0.03] transition-colors"
          data-testid="nav-prev"
        >
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-6 group-hover:text-white/70 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Previous case
          </div>
          <div className="text-xs font-mono tracking-wider uppercase text-white/40 mb-3">
            {prev.industry} · {prev.year}
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-3 group-hover:text-white transition-colors">
            {prev.title}
          </h3>
          <p
            className="text-base md:text-lg text-white/50 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {prev.tagline}
          </p>
        </Link>
        <Link
          href={`/portfolio/${next.slug}`}
          className="group block p-10 md:p-16 hover:bg-white/[0.03] transition-colors text-right"
          data-testid="nav-next"
        >
          <div className="flex items-center justify-end gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-6 group-hover:text-white/70 transition-colors">
            Next case
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-xs font-mono tracking-wider uppercase text-white/40 mb-3">
            {next.industry} · {next.year}
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-3 group-hover:text-white transition-colors">
            {next.title}
          </h3>
          <p
            className="text-base md:text-lg text-white/50 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {next.tagline}
          </p>
        </Link>
      </div>

      <div className="border-t border-white/10 py-12 md:py-16 px-6 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors"
          data-testid="nav-back-index"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to all work
        </Link>
      </div>
    </section>
  );
}
