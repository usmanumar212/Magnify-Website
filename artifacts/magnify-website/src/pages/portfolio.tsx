import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Portfolio() {
  return (
    <div className="min-h-[100dvh] bg-black text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Header />
      
      <main className="pt-32 md:pt-48 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h1 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-5xl md:text-7xl lg:text-[8rem] font-display font-bold leading-[0.9] tracking-tighter mb-24"
            data-testid="portfolio-hero-heading"
          >
            Selected work.
          </motion.h1>

          {/* Featured Case Study: Section Pro */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-center bg-[#111] border border-white/10 overflow-hidden"
          >
            <div className="lg:col-span-5 p-12 order-2 lg:order-1">
              <div className="text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">Featured Product</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">SECTION PRO</h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Our proprietary Shopify sections product, empowering thousands of merchants to upgrade their storefronts without writing code. A masterclass in theme architecture and UX design.
              </p>
              <button 
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors"
                data-testid="btn-view-section-pro"
              >
                View Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 bg-[#0a0a0a] min-h-[400px] h-full w-full flex items-center justify-center p-8 relative overflow-hidden border-l border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
              <div className="w-full max-w-md bg-[#202020] border border-white/10 shadow-2xl p-6 relative z-10 flex flex-col gap-4">
                <div className="w-1/3 h-4 bg-white/20" />
                <div className="w-full h-32 bg-white/5 mt-4" />
                <div className="w-2/3 h-4 bg-white/20" />
                <div className="flex gap-2 mt-2">
                  <div className="w-1/2 h-10 bg-white text-black flex items-center justify-center font-mono text-xs">Add Section</div>
                  <div className="w-1/2 h-10 border border-white/20 flex items-center justify-center font-mono text-xs text-white/50">Edit Theme</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Grid */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                title: "Nova Financial",
                industry: "Fintech",
                year: "2024",
                tagline: "Next-generation banking dashboard.",
                size: "md:col-span-2 aspect-[21/9]",
                status: "Confidential — Under NDA"
              },
              {
                title: "Aura Health",
                industry: "Healthcare",
                year: "2024",
                tagline: "Patient management portal.",
                size: "aspect-[4/3]",
                status: ""
              },
              {
                title: "Loom Commerce",
                industry: "Commerce",
                year: "2025",
                tagline: "Headless Shopify storefront.",
                size: "aspect-[4/3]",
                status: "Coming Soon"
              },
              {
                title: "Nexus",
                industry: "SaaS",
                year: "2024",
                tagline: "Developer API platform.",
                size: "aspect-square",
                status: ""
              },
              {
                title: "Osprey",
                industry: "Hospitality",
                year: "2024",
                tagline: "Boutique hotel booking engine.",
                size: "aspect-square",
                status: ""
              },
              {
                title: "Vertex",
                industry: "Education",
                year: "2023",
                tagline: "Learning management system.",
                size: "md:col-span-2 aspect-[21/9]",
                status: ""
              }
            ].map((project, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                className={`group relative bg-[#111] border border-white/10 overflow-hidden flex flex-col justify-end p-8 hover:border-white/30 transition-colors ${project.size}`}
                data-testid={`project-card-${i}`}
              >
                {/* Placeholder Image area */}
                <div className="absolute inset-0 bg-[#0a0a0a] z-0 transition-transform duration-700 group-hover:scale-105" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex gap-3 text-xs font-mono text-white/50">
                      <span>{project.industry}</span>
                      <span>—</span>
                      <span>{project.year}</span>
                    </div>
                    {project.status && (
                      <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 border border-white/10">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-display font-bold tracking-tight mb-2">{project.title}</h3>
                  <p className="text-white/60">{project.tagline}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}