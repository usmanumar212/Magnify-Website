import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-black text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Header />
      
      <main className="pt-32 md:pt-48 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.h1 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-5xl md:text-7xl lg:text-[7rem] font-display font-bold leading-[0.9] tracking-tighter mb-16"
            data-testid="about-hero-heading"
          >
            A studio with<br/>two homes.
          </motion.h1>

          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl text-white/70 font-light leading-relaxed mb-32"
          >
            <p data-testid="about-story-p1">
              Magnify is a software studio building websites, apps, and software services. We are Authorized Shopify Partners and Experts. Makers of Section Pro.
            </p>
            <p data-testid="about-story-p2">
              Operating from Birmingham, UK and Abuja, Nigeria — we apply disciplined design and engineering across the entire stack. We build the things we believe in, for ambitious brands who take their digital presence seriously.
            </p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-32"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display leading-tight tracking-tight text-white mb-8" data-testid="about-philosophy">
              We work with ambitious brands who take their digital presence seriously. Disciplined, confident, and precise execution across the entire stack.
            </h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16 mb-32"
          >
            <div>
              <div className="text-xs font-mono text-white/40 mb-4 tracking-widest uppercase">Location — 01</div>
              <h3 className="text-4xl font-display font-bold tracking-tight mb-2">Birmingham</h3>
              <p className="text-white/60 font-mono text-sm">United Kingdom (BHM)</p>
              <p className="text-white/40 font-mono text-xs mt-2">52°28'48"N 1°54'0"W</p>
            </div>
            <div>
              <div className="text-xs font-mono text-white/40 mb-4 tracking-widest uppercase">Location — 02</div>
              <h3 className="text-4xl font-display font-bold tracking-tight mb-2">Abuja</h3>
              <p className="text-white/60 font-mono text-sm">Nigeria (ABV)</p>
              <p className="text-white/40 font-mono text-xs mt-2">9°3'28"N 7°29'42"E</p>
            </div>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="border-t border-white/10 pt-16"
          >
            <h2 className="text-3xl font-display font-bold tracking-tight mb-12">Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
              {[
                { title: "Discipline", desc: "Rigorous attention to detail in every line of code and pixel." },
                { title: "Craft", desc: "Building software that feels authored, not just assembled." },
                { title: "Clarity", desc: "Removing the unnecessary. Focusing on what actually matters." },
                { title: "Speed", desc: "Fast to ship, fast to load, fast to iterate. Sluggishness is a failure." }
              ].map((value, i) => (
                <div key={i} data-testid={`value-${i}`}>
                  <h4 className="text-xl font-display font-bold mb-2">{value.title}</h4>
                  <p className="text-white/60">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}