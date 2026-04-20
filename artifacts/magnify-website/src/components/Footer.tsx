import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function Footer() {
  return (
    <>
      {/* CTA Footer */}
      <section className="py-32 md:py-48 px-6 bg-white text-black flex flex-col items-center text-center">
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
          <a
            href="https://instagram.com/magnify.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            data-testid="footer-social-instagram"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@magnify.studio"
            className="hover:text-white transition-colors"
            data-testid="footer-social-email"
          >
            Email
          </a>
        </div>
        <div data-testid="footer-closing">Discipline in design.</div>
      </footer>
    </>
  );
}