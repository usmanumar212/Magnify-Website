import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="relative min-h-[100dvh] bg-black text-[#ebebe3] selection:bg-white selection:text-black overflow-x-hidden font-sans" ref={containerRef}>
      <Header />
      
      <main>
        {/* 1. PAGE HERO */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-32 pb-24 z-10">
          <div className="absolute top-32 left-6 right-6 flex justify-between text-[10px] font-mono tracking-[0.2em] uppercase opacity-50">
            <span>EST. 2024</span>
            <span>Discipline — Craft</span>
          </div>
          
          <div className="container mx-auto max-w-6xl mt-16 md:mt-24">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="flex flex-col gap-6">
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-medium leading-[0.85] tracking-tighter"
                data-testid="about-hero-heading"
              >
                A studio with<br/>two homes.
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-3xl font-serif italic text-white/70 mt-8 md:mt-12"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                data-testid="about-hero-subtitle"
              >
                Software studio. Birmingham. Abuja.
              </motion.p>
            </motion.div>
          </div>

          <div className="absolute bottom-12 left-6">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "60px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="w-[1px] bg-white/30"
            />
          </div>
        </section>

        {/* 2. STUDIO STATEMENT */}
        <section className="py-32 md:py-48 px-6 bg-[#0a0a0a]">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-4">
                <motion.div 
                  initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                  className="text-sm font-mono tracking-widest text-white/40 uppercase"
                >
                  [ The Studio ]
                </motion.div>
              </div>
              <div className="lg:col-span-8">
                <motion.div 
                  initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                  className="text-2xl md:text-4xl lg:text-5xl font-display font-light leading-[1.3] tracking-tight text-white/90"
                >
                  <motion.p variants={fadeInUp} className="mb-12" data-testid="about-statement-1">
                    Magnify is a software studio building websites, apps, and software services. We are Authorized Shopify Partners and Experts, and the makers of Section Pro.
                  </motion.p>
                  <motion.p variants={fadeInUp} className="text-white/60" data-testid="about-statement-2">
                    Operating from Birmingham, UK and Abuja, Nigeria — we apply disciplined design and engineering across the entire stack. We build the things we believe in, for ambitious brands who take their digital presence seriously.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PHILOSOPHY MOMENT */}
        <section className="py-40 md:py-64 px-6 bg-[#ebebe3] text-[#202020]">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.h2 
              initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight"
              data-testid="about-philosophy"
            >
              We work with ambitious brands who take their digital presence seriously. <span className="font-serif italic font-light tracking-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Disciplined, confident,</span> and precise execution across the entire stack.
            </motion.h2>
          </div>
        </section>

        {/* 4. LOCATIONS */}
        <section className="py-32 md:py-48 px-6 bg-black border-t border-white/10">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-24">
              <h2 className="text-sm font-mono tracking-widest text-white/40 uppercase">Locations</h2>
            </motion.div>

            <div className="flex flex-col gap-12 md:gap-0">
              {/* Birmingham */}
              <motion.div 
                initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 md:py-24 md:border-b border-white/10 relative group"
              >
                <div className="md:col-span-3 flex flex-col justify-between">
                  <motion.span variants={fadeInUp} className="text-6xl font-display font-light text-white/20">BHM</motion.span>
                  <motion.span variants={fadeInUp} className="font-mono text-xs text-white/40 uppercase tracking-widest mt-8 md:mt-0">GMT / 52°28'48"N 1°54'0"W</motion.span>
                </div>
                <div className="md:col-span-6">
                  <motion.h3 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[6rem] font-display font-medium tracking-tighter mb-6">Birmingham</motion.h3>
                  <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/60 font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Industrial heritage. Modern craft.</motion.p>
                </div>
                <div className="md:col-span-3 md:text-right flex flex-col justify-end">
                  <motion.span variants={fadeInUp} className="text-sm font-mono text-white/40 uppercase tracking-widest">United Kingdom</motion.span>
                </div>
              </motion.div>

              {/* Abuja */}
              <motion.div 
                initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 md:pt-24 relative group"
              >
                <div className="md:col-span-3 flex flex-col justify-between">
                  <motion.span variants={fadeInUp} className="text-6xl font-display font-light text-white/20">ABV</motion.span>
                  <motion.span variants={fadeInUp} className="font-mono text-xs text-white/40 uppercase tracking-widest mt-8 md:mt-0">WAT / 9°3'28"N 7°29'42"E</motion.span>
                </div>
                <div className="md:col-span-6">
                  <motion.h3 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[6rem] font-display font-medium tracking-tighter mb-6">Abuja</motion.h3>
                  <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/60 font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Continental ambition. Future-built.</motion.p>
                </div>
                <div className="md:col-span-3 md:text-right flex flex-col justify-end">
                  <motion.span variants={fadeInUp} className="text-sm font-mono text-white/40 uppercase tracking-widest">Nigeria</motion.span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. PRINCIPLES */}
        <section className="py-32 md:py-48 px-6 bg-[#050505]">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-32">
              <h2 className="text-sm font-mono tracking-widest text-white/40 uppercase">Core Principles</h2>
            </motion.div>

            <div className="flex flex-col">
              {[
                { num: "01", title: "Discipline", desc: "Rigorous attention to detail in every line of code and every pixel." },
                { num: "02", title: "Craft", desc: "Building software that feels authored, not assembled." },
                { num: "03", title: "Clarity", desc: "Removing the unnecessary. Focusing on what actually matters." },
                { num: "04", title: "Speed", desc: "Fast to ship, fast to load, fast to iterate. Sluggishness is failure." }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-t border-white/5 items-center group hover:bg-white/[0.02] transition-colors duration-500 -mx-6 px-6"
                  data-testid={`value-${i}`}
                >
                  <motion.div variants={fadeInUp} className="md:col-span-2">
                    <span className="text-4xl md:text-5xl font-serif italic text-white/30" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{value.num}</span>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="md:col-span-4">
                    <h4 className="text-3xl md:text-4xl font-display font-medium tracking-tight">{value.title}</h4>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="md:col-span-6">
                    <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">{value.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CAPABILITIES STRIP */}
        <section className="py-12 md:py-16 overflow-hidden bg-black border-y border-white/10 flex items-center">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                {[
                  "Web Development", "Mobile Apps", "Shopify", "Headless Commerce", 
                  "Design Systems", "API Architecture", "Performance", "Accessibility",
                  "Web Development", "Mobile Apps", "Shopify", "Headless Commerce"
                ].map((tag, j) => (
                  <span key={j} className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/40">
                    {tag} <span className="mx-6 text-white/20">·</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </section>

        {/* 7. CTA / OUTRO */}
        <section className="py-40 md:py-64 px-6 bg-black flex flex-col items-center text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.h2 
              initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-[8rem] font-display font-medium leading-[0.9] tracking-tighter mb-16"
              data-testid="about-outro-heading"
            >
              Let's build<br/>something with weight.
            </motion.h2>
            <motion.div
              initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            >
              <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] font-sans text-xs font-medium tracking-[0.18em] uppercase hover:-translate-y-0.5 hover:bg-[#ebebe3] transition-all duration-300 group" data-testid="about-cta-button">
                Start a conversation
                <span className="text-base group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
