import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { Rocket } from "lucide-react";
import { useWarpDrive } from "../hooks/useWarpDrive";

const R = 26;

/* "Return to base": glass launch button with a scroll-progress fuel ring.
   Click → the rocket lifts off, the page warps to the top, the rocket re-docks. */
const ScrollToTop = () => {
  const { initiateJump } = useWarpDrive();
  const { scrollY, scrollYProgress } = useScroll();
  const fuel = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const [visible, setVisible] = useState(false);
  const [full, setFull] = useState(false);
  const [launching, setLaunching] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 500));
  useMotionValueEvent(scrollYProgress, "change", (p) => setFull(p > 0.98));

  useEffect(() => {
    if (!launching) return;
    const id = setTimeout(() => setLaunching(false), 1100);
    return () => clearTimeout(id);
  }, [launching]);

  const launch = () => {
    if (launching) return;
    setLaunching(true);
    setTimeout(() => initiateJump("hero"), 250);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={launch}
          aria-label="Return to top"
          className="group fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center cursor-pointer"
        >
          {/* fuel ring = scroll progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <motion.circle
              cx="32" cy="32" r={R} fill="none"
              stroke={full ? "#fbbf24" : "#06b6d4"}
              strokeWidth="1.5" strokeLinecap="round"
              style={{ pathLength: fuel, filter: `drop-shadow(0 0 4px ${full ? "#fbbf24" : "#06b6d4"})`, transition: "stroke 0.4s" }}
            />
          </svg>

          {/* glass core */}
          <span className="absolute inset-[9px] rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-supernova/40 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]" />

          {/* rocket (lifts off on click, re-docks from below) */}
          <span className="relative w-5 h-5 overflow-visible">
            <AnimatePresence mode="popLayout" initial={false}>
              {!launching ? (
                <motion.span
                  key="docked"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -46, opacity: 0, transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] } }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Rocket size={20} className="-rotate-45 text-starlight/80 group-hover:text-supernova group-hover:-translate-y-0.5 transition-all duration-300" />
                </motion.span>
              ) : (
                <motion.span
                  key="trail"
                  initial={{ scaleY: 0, opacity: 0.9 }}
                  animate={{ scaleY: 1, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute left-1/2 bottom-1/2 -translate-x-1/2 w-[2px] h-10 origin-bottom bg-gradient-to-t from-transparent via-neon-cyan to-supernova rounded-full"
                />
              )}
            </AnimatePresence>
          </span>

          {/* label */}
          <span className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 border border-starlight/10 bg-void-900/75 backdrop-blur-md font-mono text-[11px] tracking-[0.25em] text-starlight/85 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            {full ? <span className="text-supernova">MISSION COMPLETE · </span> : null}RETURN TO BASE ↑
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
