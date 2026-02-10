import React, { useState, useEffect } from "react";
import StarBackground from "./StarBackground";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "DEVELOPER",
    "PROGRAMMER",
    "SPACE ENTHUSIAST",
    "PROBLEM SOLVER",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden bg-black/10">
      <StarBackground />

      {/* Subtle Radial Gradient for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      <div className="w-full h-full px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-around relative z-30 pt-16 md:pt-0">
        <div className="ml-0 md:ml-10 lg:ml-20 text-center md:text-left mb-6 md:mb-0 flex flex-col justify-center order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm md:text-lg tracking-[0.2em] text-cyan-200/70 uppercase mb-2 font-medium">Hello, I am</h2>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-italiana mb-6 text-white tracking-tight"
              style={{ fontWeight: 400 }}
            >
              Vivek Hipparkar
            </h1>
          </motion.div>

          <div className="min-h-10 md:min-h-16 mb-8 flex items-center justify-center md:justify-start gap-4">
            <div className="h-[1px] w-12 bg-cyan-500/30 hidden md:block" />
            <div className="relative h-8 md:h-12 w-full flex items-center justify-center md:justify-start">
              <AnimatePresence mode='wait'>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 tracking-[0.1em] uppercase font-light absolute whitespace-nowrap"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="ml-0 md:ml-2 flex justify-center md:justify-start"
          >
            <div className="relative group">
              <a
                href="https://drive.google.com/file/d/1ylepuk7ZBF4Zu_NTL3K5D6yqhQB_auVE/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-cyan-500/20 hover:border-cyan-400/50 cursor-pointer">
                  <div className="absolute inset-0 w-0 bg-cyan-500/5 transition-all duration-[350ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-cyan-200/90 group-hover:text-cyan-100 tracking-[0.25em] text-xs sm:text-sm uppercase font-medium"> RESUME </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-30 hidden md:flex items-center justify-center h-full animate-float order-1 md:order-2"
        >
          <img
            src="/ghibli-1.png"
            className="w-[280px] lg:w-[320px] xl:w-[480px] max-h-[60vh] object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.15)] opacity-90 hover:opacity-100 transition-opacity duration-500"
            alt="Hero Avatar"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-50 group opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <div className="w-[20px] h-[32px] rounded-full border border-white/20 flex justify-center p-1 group-hover:border-cyan-400/30 transition-colors">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-1 bg-white/50 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};
export default Hero;
