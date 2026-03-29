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

function App() {
  const [showGreeting, setShowGreeting] = useState(true);

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
