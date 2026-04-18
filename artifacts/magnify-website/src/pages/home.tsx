import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MoveRight } from "lucide-react";

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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 py-6 flex items-center justify-between pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <span className="font-display font-bold text-2xl tracking-tighter text-white" data-testid="nav-logo">
            Magnify
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
          <a href="#services" className="text-sm font-medium text-white/80 hover:text-white transition-colors" data-testid="nav-services">Services</a>
          <a href="#work" className="text-sm font-medium text-white/80 hover:text-white transition-colors" data-testid="nav-work">Work</a>
          <a href="#contact" className="text-sm font-medium px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors" data-testid="nav-contact">
            Start a project
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col justify-end pb-24 md:pb-32 px-6 overflow-hidden bg-black">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-b from-[#202020] to-black z-0"
        />
        <div className="container mx-auto z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-5xl"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter mb-8"
              data-testid="hero-heading"
            >
              Digital<br/>
              products,<br/>
              built to last.
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-3xl text-foreground/80 max-w-2xl font-light mb-12"
              data-testid="hero-subheading"
            >
              We build software that means something. A world-class studio operating out of Birmingham and Abuja.
            </motion.p>
            <motion.div variants={fadeIn}>
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-4 text-lg md:text-xl font-display font-bold tracking-tight border-b-2 border-primary pb-1 hover:text-primary/80 hover:border-primary/80 transition-all"
                data-testid="hero-cta"
              >
                Engage us <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro / Philosophy */}
      <section className="py-32 md:py-48 px-6 bg-[#202020]">
        <div className="container mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-4xl"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display leading-tight tracking-tight text-foreground" data-testid="philosophy-text">
              We work with ambitious brands who take their digital presence seriously. Disciplined, confident, and precise execution across the entire stack.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 md:py-48 px-6 bg-black border-t border-white/5">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter" data-testid="services-heading">Expertise</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {[
              { num: "01", title: "Websites & Web Apps", desc: "High-performance marketing sites and complex single-page applications built with modern frameworks." },
              { num: "02", title: "Mobile Apps", desc: "Native-feeling iOS and Android experiences that people actually want to use." },
              { num: "03", title: "Shopify Development", desc: "Authorized Shopify Partners and Experts. Custom themes, deep integrations, and headless builds." },
              { num: "04", title: "Software Services", desc: "Bespoke internal tools, API development, and technical architecture for scale." }
            ].map((service) => (
              <motion.div 
                key={service.num}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeIn}
                className="group border-t border-white/10 pt-8"
                data-testid={`service-${service.num}`}
              >
                <div className="text-sm font-mono text-white/40 mb-6">{service.num}</div>
                <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">{service.title}</h3>
                <p className="text-lg text-white/60 leading-relaxed max-w-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section id="work" className="py-32 md:py-48 px-6 bg-[#202020]">
        <div className="container mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center"
          >
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="text-sm font-mono text-white/40 mb-6 uppercase tracking-wider">Notable Product</div>
              <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6" data-testid="product-heading">Section Pro</h2>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                We don't just build for clients; we build for ourselves. Section Pro is our proprietary Shopify sections product, empowering thousands of merchants to upgrade their storefronts without writing code.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors"
                data-testid="product-link"
              >
                View Section Pro <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2 bg-[#0a0a0a] aspect-[4/3] md:aspect-[16/9] flex items-center justify-center p-8 relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
              {/* Abstract Representation of UI */}
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
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 px-6 bg-black border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-sm font-mono text-white/40 mb-2" data-testid="location-uk-label">United Kingdom</h3>
              <p className="text-2xl md:text-3xl font-display tracking-tight" data-testid="location-uk-value">Birmingham</p>
            </motion.div>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-sm font-mono text-white/40 mb-2" data-testid="location-ng-label">Nigeria</h3>
              <p className="text-2xl md:text-3xl font-display tracking-tight" data-testid="location-ng-value">Abuja</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section id="contact" className="py-32 md:py-48 px-6 bg-white text-black flex flex-col items-center text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-6xl md:text-[8rem] font-display font-bold leading-none tracking-tighter mb-12"
            data-testid="footer-heading"
          >
            Start a<br/>project.
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <a 
              href="mailto:hello@magnify.studio" 
              className="text-2xl md:text-4xl font-display font-medium border-b-4 border-black pb-2 hover:text-black/70 hover:border-black/70 transition-colors"
              data-testid="footer-email"
            >
              hello@magnify.studio
            </a>
          </motion.div>
        </div>
      </section>

      {/* Deep Footer */}
      <footer className="py-8 px-6 bg-black border-t border-white/10 text-white/50 flex flex-col md:flex-row justify-between items-center text-sm font-mono gap-4">
        <div data-testid="footer-copyright">&copy; {new Date().getFullYear()} Magnify Studio.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
        <div data-testid="footer-closing">Discipline in design.</div>
      </footer>
    </div>
  );
}
