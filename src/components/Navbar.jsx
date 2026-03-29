import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between py-8 px-4 md:px-16 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <a href="/" className="celestial-heading text-4xl text-glow-starlight hover:text-supernova transition-all">
          V.
        </a>
      </div>
      
      <div className="hidden md:flex gap-16 micro-text font-bold pointer-events-auto items-center">
        <a href="#about" className="hover:text-supernova text-starlight/40 transition-all relative group">
           ABOUT
           <span className="absolute -bottom-2 left-0 w-0 h-px bg-supernova group-hover:w-full transition-all"></span>
        </a>
        <a href="#work" className="hover:text-supernova text-starlight/40 transition-all relative group">
           EXPERIENCE
           <span className="absolute -bottom-2 left-0 w-0 h-px bg-supernova group-hover:w-full transition-all"></span>
        </a>
        <a href="#projects" className="hover:text-supernova text-starlight/40 transition-all relative group">
           PROJECTS
           <span className="absolute -bottom-2 left-0 w-0 h-px bg-supernova group-hover:w-full transition-all"></span>
        </a>
        <a href="#tech" className="hover:text-supernova text-starlight/40 transition-all relative group">
           TECH
           <span className="absolute -bottom-2 left-0 w-0 h-px bg-supernova group-hover:w-full transition-all"></span>
        </a>
        
        <a href="#contact" className="px-8 py-3 cosmic-glass rounded-full text-[10px] tracking-[0.3em] hover:bg-supernova hover:text-void-900 transition-all group">
          INITIATE CONNECTION <span className="inline-block translate-x-1 group-hover:translate-x-3 transition-transform">→</span>
        </a>
      </div>

      <div className="md:hidden pointer-events-auto">
        <a href="#contact" className="px-6 py-2 cosmic-glass rounded-full micro-text">CONNECTION</a>
      </div>
    </nav>
  );
};

export default Navbar;
