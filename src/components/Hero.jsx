import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityFade = useTransform(scrollY, [0, 200], [1, 0]);

  const roles = ["CREATIVE ENGINEER", "FULL STACK DEVELOPER", "SYSTEM ARCHITECT", "CODE ARTIST"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
      
      {/* The Celestial Singularity (Energy Core) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full animate-pulse-aura z-0 pointer-events-none" 
           style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(30, 27, 75, 0) 70%)'}}></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-starlight shadow-[0_0_80px_20px_rgba(251,191,36,0.3)] animate-pulse z-0"></div>

      {/* Main Title Content */}
      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <div className="micro-text mb-8 tracking-[1em] text-starlight/30">
          TRANSVERSING THE DIGITAL VACUUM
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="celestial-heading text-[12vw] sm:text-[10vw] md:text-9xl xl:text-[12rem] animate-float animate-color-flash font-bold"
        >
          VIVEK
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-starlight/60 font-cinematic text-lg md:text-2xl tracking-[0.3em] mt-2 md:mt-0 flex items-center justify-center"
        >
          <span className="w-8 md:w-12 h-px bg-starlight/20 shrink-0" />
          <div className="relative h-[2em] w-[280px] md:w-[500px] flex items-center justify-center overflow-hidden mx-6 md:mx-8">
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

        <div className="mt-16 flex flex-col sm:flex-row gap-8 items-center micro-text text-starlight/50">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-supernova font-bold">3.4Y+</span>
            <span>EXPANSION TIME</span>
          </div>
          <div className="w-px h-8 bg-starlight/10 hidden sm:block"></div>
          <div className="flex flex-col gap-2 items-center">
             <span className="text-neon-purple font-bold">20+</span>
             <span>STELLAR PROJECTS</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-4 micro-text text-starlight/20"
      >
        <span>DESCEND INTO THE VOID</span>
        <div className="w-px h-16 bg-gradient-to-b from-starlight/20 to-transparent"></div>
      </motion.div>

    </div>
  );
};

export default Hero;
