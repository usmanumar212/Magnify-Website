import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location] = useLocation();
  const isHome = location === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between",
          isHome ? "mix-blend-difference pointer-events-none" : "bg-black/80 backdrop-blur-md border-b border-white/5"
        )}
      >
        <Link href="/" className={cn(isHome ? "pointer-events-auto" : "")}>
          <span
            className="font-display font-bold text-2xl tracking-tighter text-white cursor-pointer"
            data-testid="nav-logo"
          >
            Magnify
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className={cn("hidden md:flex items-center gap-8", isHome ? "pointer-events-auto" : "")}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/contact">
            <span
              className="text-sm font-medium px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors cursor-pointer"
              data-testid="nav-contact"
            >
              Start a project
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("md:hidden text-white", isHome ? "pointer-events-auto" : "")}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          data-testid="mobile-menu-open"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col px-6 py-6"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display font-bold text-2xl tracking-tighter text-white">
                Magnify
              </span>
              <button
                className="text-white"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                data-testid="mobile-menu-close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-display tracking-tight">
              <Link href="/">
                <span className="text-white hover:text-white/70 transition-colors cursor-pointer" data-testid="mobile-nav-home">Home</span>
              </Link>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-white hover:text-white/70 transition-colors cursor-pointer" data-testid={`mobile-nav-${link.label.toLowerCase()}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <span className="text-white hover:text-white/70 transition-colors cursor-pointer" data-testid="mobile-nav-contact">
                  Contact
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}