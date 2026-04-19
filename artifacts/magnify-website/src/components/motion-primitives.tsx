import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;

export function SplitWords({
  text,
  className,
  delay = 0,
  testId,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  testId?: string;
  immediate?: boolean;
}) {
  const words = text.split(" ");
  const animProps = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.1 } as const };
  return (
    <span className={className} data-testid={testId}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.25em" }}
        >
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

export function CountUp({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
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

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function MagneticCursor() {
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

export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const sy = useMotionValue(0);
  const scaled = useSpring(sy, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      sy.set(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sy]);

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/80 z-40 origin-left"
      style={{ scaleX: scaled }}
      aria-hidden="true"
    />
  );
}
