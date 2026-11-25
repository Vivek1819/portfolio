import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import DecipherText from "./common/DecipherText";

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityFade = useTransform(scrollY, [0, 200], [1, 0]);

  // Singularity Pull Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate distance from center (-0.5 to 0.5)
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const pullX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const pullY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  // combine scroll parallax + mouse pull into one y (setting `y` twice made one override the other)
  const titleY = useTransform([yParallax, pullY], ([parallax, pull]) => parallax + pull);

  const roles = ["SOFTWARE ENGINEER", "BACKEND ASTRONAUT", "CAFFEINE → COMMITS", "PROFESSIONAL BUG HUNTER", "STARGAZER · BUILDER"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8" 
      id="hero"
      onMouseMove={handleMouseMove}
    >
      
      {/* The Celestial Singularity (Energy Core) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full animate-pulse-aura z-0 pointer-events-none" 
           style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(30, 27, 75, 0) 70%)'}}></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-starlight shadow-[0_0_80px_20px_rgba(251,191,36,0.3)] z-0"></div>

      {/* Main Title Content */}
      <motion.div
        style={{ y: titleY, opacity: opacityFade, x: pullX }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <div className="micro-text mb-8 !tracking-[0.35em] sm:!tracking-[1em] !text-[10px] sm:!text-[11px] text-starlight/30 enter-up" style={{ "--d": "0.3s" }}>
          TRANSMITTING FROM BANGALORE, EARTH
        </div>

        <div className="enter-focus" style={{ "--d": "0.4s" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="celestial-heading text-[22vw] sm:text-[14vw] md:text-9xl xl:text-[12rem] animate-float animate-color-flash font-bold"
        >
          <DecipherText text="VIVEK" speed={50} delay={1.5} />
        </motion.h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-starlight/60 font-cinematic text-base sm:text-lg md:text-2xl tracking-[0.15em] md:tracking-[0.3em] mt-2 md:mt-0 flex items-center justify-center enter-up"
          style={{ "--d": "0.75s" }}
        >
          <span className="w-8 md:w-12 h-px bg-starlight/20 shrink-0" />
          <div className="relative h-[2em] w-[min(72vw,560px)] flex items-center justify-center overflow-hidden mx-6 md:mx-8">
            <AnimatePresence>
               <motion.div
                 key={roleIndex}
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -40 }}
                 transition={{ duration: 0.6, ease: "anticipate" }}
                 className="absolute inset-x-0 w-full text-center whitespace-nowrap"
               >
                 {roles[roleIndex]}
               </motion.div>
            </AnimatePresence>
          </div>
          <span className="w-8 md:w-12 h-px bg-starlight/20 shrink-0" />
        </motion.div>

        {/* editorial "now" line (replaces the stats, which live in the Captain's Log) */}
        <div className="mt-14 flex items-center gap-5 enter-up" style={{ "--d": "0.95s" }}>
          <span className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-starlight/30" />
          <span className="font-mono text-[11px] tracking-[0.45em] text-starlight/40">NOW</span>
          <span className="font-editorial text-xl md:text-2xl text-starlight/85 tracking-wide">
            Engineering @ <span className="text-starlight">AiPrise</span>
          </span>
          <span className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-starlight/30" />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-4 micro-text text-starlight/20 enter-up"
        style={{ "--d": "1.3s" }}
      >
        <span>DESCEND INTO THE VOID</span>
        <div className="w-px h-16 bg-gradient-to-b from-starlight/20 to-transparent"></div>
      </motion.div>

    </div>
  );
};

export default Hero;
