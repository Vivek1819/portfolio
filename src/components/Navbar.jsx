import React from "react";
import { motion } from "framer-motion";
import { useWarpDrive } from "../hooks/useWarpDrive";
import { useActiveSection } from "../hooks/useActiveSection";

const Navbar = () => {
  const { initiateJump } = useWarpDrive();
  const { active, scrolled } = useActiveSection();

  const navLinks = [
    { id: "about", label: "ABOUT" },
    { id: "work", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "tech", label: "TECH" }
  ];

  return (
    <nav
      style={{ "--d": "0.5s" }}
      className={`enter-down fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 z-50 pointer-events-none transition-all duration-500 ${
        scrolled
          ? "py-4 bg-void-900/50 backdrop-blur-xl border-b border-starlight/[0.06] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
          : "py-8 border-b border-transparent"
      }`}
    >
      <div className="pointer-events-auto">
        <button 
          onClick={() => initiateJump("hero")}
          className="celestial-heading text-4xl text-glow-starlight hover:text-supernova transition-all cursor-pointer"
        >
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        </button>
      </div>
      
      <div className="hidden md:flex gap-16 micro-text font-bold pointer-events-auto items-center">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => initiateJump(link.id)}
            className={`hover:text-supernova transition-all relative group cursor-pointer ${
              active === link.id ? "!text-supernova" : "text-starlight/40"
            }`}
            aria-current={active === link.id ? "true" : undefined}
          >
            {link.label}
            {active === link.id ? (
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-px bg-supernova shadow-[0_0_8px_#fbbf24]"
                layoutId="nav-underline"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : (
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-supernova/50 group-hover:w-full transition-all" />
            )}
          </button>
        ))}
        
        <button 
          onClick={() => initiateJump("contact")}
          className="px-8 py-3 cosmic-glass rounded-full text-[10px] tracking-[0.3em] hover:bg-supernova hover:text-void-900 transition-all group pointer-events-auto cursor-pointer"
        >
          INITIATE CONNECTION <span className="inline-block translate-x-1 group-hover:translate-x-3 transition-transform">→</span>
        </button>
      </div>

      <div className="md:hidden pointer-events-auto">
        <button 
          onClick={() => initiateJump("contact")}
          className="px-6 py-2 cosmic-glass rounded-full micro-text cursor-pointer"
        >
          CONNECTION
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
