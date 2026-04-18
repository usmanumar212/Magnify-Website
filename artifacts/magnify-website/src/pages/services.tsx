import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

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

export default function Services() {
  return (
    <div className="min-h-[100dvh] bg-black text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Header />
      
      <main className="pt-32 md:pt-48 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.h1 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-5xl md:text-7xl lg:text-[8rem] font-display font-bold leading-[0.9] tracking-tighter mb-24"
            data-testid="services-hero-heading"
          >
            What we build.
          </motion.h1>

          <div className="flex flex-col gap-24 mb-32">
            {[
              {
                num: "01",
                title: "Websites & Web Apps",
                desc: "High-performance marketing sites and complex single-page applications built with modern frameworks. We construct digital homes that convert visitors and web applications that scale effortlessly.",
                bullets: ["React, Next.js, and Vite", "Headless CMS integration", "Advanced animations (GSAP, Framer)", "Performance optimization"],
                deliverable: "A lightning-fast, accessible website with a bespoke CMS."
              },
              {
                num: "02",
                title: "Mobile Apps",
                desc: "Native-feeling iOS and Android experiences that people actually want to use. We build mobile software that focuses on fluid interactions, offline capabilities, and perfect native integrations.",
                bullets: ["React Native & Expo", "iOS and Android deployment", "Offline-first architectures", "Native modules & bridging"],
                deliverable: "A fully published app on the App Store and Google Play."
              },
              {
                num: "03",
                title: "Shopify Development",
                desc: "Custom themes, deep integrations, and headless builds for ambitious merchants. We push Shopify to its limits to create unique commerce experiences that drive revenue.",
                bullets: ["Custom theme development", "Headless Shopify (Hydrogen)", "App extensions & blocks", "Migration & replatforming"],
                deliverable: "A high-converting, deeply customized Shopify storefront."
              },
              {
                num: "04",
                title: "Software Services",
                desc: "Bespoke internal tools, API development, and technical architecture for scale. We build the engine that powers your business, from custom CRMs to high-throughput microservices.",
                bullets: ["Node.js & Go backends", "Database design & optimization", "Internal dashboards", "Third-party API integrations"],
                deliverable: "A robust, documented, and scalable software system."
              }
            ].map((service) => (
              <motion.div 
                key={service.num}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-8"
                data-testid={`service-section-${service.num}`}
              >
                <div className="lg:col-span-4">
                  <div className="text-sm font-mono text-white/40 mb-4">{service.num}</div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{service.title}</h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-xl text-white/70 leading-relaxed mb-8">{service.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <ul className="space-y-3">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/60">
                          <span className="text-white/20 mt-1.5 block w-1.5 h-1.5 bg-white/40 rounded-full shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#111] border border-white/5 p-6 inline-block w-full">
                    <div className="text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">Typical Deliverable</div>
                    <p className="text-white/80 font-medium">{service.deliverable}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-[#202020] border border-white/10 p-12 md:p-24 text-center mb-32"
          >
            <div className="text-sm font-mono text-white/40 mb-6 uppercase tracking-widest">Partnership</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">Authorized Shopify Partners & Experts</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Recognized for our technical excellence and ability to deliver exceptional commerce experiences on the Shopify platform.
            </p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-display font-bold tracking-tight mb-12">How we work</motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discover", desc: "Understanding the problem, defining scope, and aligning on goals." },
                { step: "02", title: "Design", desc: "Creating the visual language and user experience blueprints." },
                { step: "03", title: "Build", desc: "Disciplined engineering and rigorous testing." },
                { step: "04", title: "Launch", desc: "Deployment, monitoring, and ongoing support." }
              ].map((process, i) => (
                <motion.div key={i} variants={fadeIn} className="border-l border-white/20 pl-6" data-testid={`process-step-${i}`}>
                  <div className="text-xs font-mono text-white/40 mb-4">{process.step}</div>
                  <h4 className="text-xl font-display font-bold mb-2">{process.title}</h4>
                  <p className="text-sm text-white/60">{process.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}