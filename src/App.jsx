import React, { useState, useEffect } from "react";
import Greeting from "./components/Greeting";
import Navbar from "./components/Navbar";
import UniverseBackground from "./components/UniverseBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import { AnimatePresence, motion } from "framer-motion";

const QuantumShift = ({ isWarping }) => (
  <AnimatePresence>
    {isWarping && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] }}
        className="fixed inset-0 z-[60] pointer-events-none mix-blend-screen bg-cyan-500/5"
        style={{
          backdropFilter: "contrast(1.2) saturate(1.5) blur(2px)",
          background: "radial-gradient(circle at center, transparent 0%, rgba(6, 182, 212, 0.1) 100%)",
        }}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-t from-transparent via-white/5 to-transparent h-[2px] w-full top-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(255,255,255,0.5)]"></div>
      </motion.div>
    )}
  </AnimatePresence>
);

function App() {
  const [showGreeting, setShowGreeting] = useState(true);
  const [isWarping, setIsWarping] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsWarping(true);
    const handleEnd = () => setIsWarping(false);
    window.addEventListener("warp-jump-start", handleStart);
    window.addEventListener("warp-jump-end", handleEnd);
    return () => {
      window.removeEventListener("warp-jump-start", handleStart);
      window.removeEventListener("warp-jump-end", handleEnd);
    };
  }, []);

  const handleGreetingComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setShowGreeting(false);
  };

  return (
    <>
      {showGreeting && <Greeting onComplete={handleGreetingComplete} />}

      <div className={`min-h-screen bg-transparent w-full transition-opacity duration-1000 ${!showGreeting ? "opacity-100" : "opacity-0"}`}>
        
        {/* Full Immersion Background */}
        <UniverseBackground />

        {/* Global Atmospheric Effects */}
        <div className="global-vignette"></div>

        <Navbar />
        <ScrollProgress />
        <QuantumShift isWarping={isWarping} />

        <main className="w-full pb-20 pt-24 custom-scroll">
          <Hero />
          <About />
          <Work />
          <Projects />
          <TechStack />
          <Contact />
        </main>

        <footer className="w-full py-20 px-4 md:px-16 border-t border-starlight/5 flex flex-col md:flex-row justify-between items-center gap-12 bg-void-900/80 backdrop-blur-md">
          <div className="flex flex-col gap-4">
             <div className="celestial-heading text-4xl text-glow-starlight">V.</div>
             <div className="micro-text text-starlight/20">ESTABLISHED // SOL-2026 // NEBULA-01</div>
          </div>
          <div className="flex gap-12 micro-text font-bold text-starlight/40">
             <a href="https://github.com/Vivek1819" target="_blank" rel="noreferrer" className="hover:text-supernova transition-colors">GITHUB</a>
             <a href="https://linkedin.com/in/vivek-hipparkar" target="_blank" rel="noreferrer" className="hover:text-supernova transition-colors">LINKEDIN</a>
             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-supernova transition-colors">X / TWITTER</a>
          </div>
        </footer>

        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
