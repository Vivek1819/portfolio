import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HUD = ({ activeSector }) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sectors = ["01", "02", "03", "04", "05"];

  return (
    <>
      {/* Top HUD Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-accent-purple/30 z-[60] shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
      
      {/* Left Sidebar HUD */}
      <div className="fixed left-0 top-0 h-full w-12 md:w-16 border-r border-white/5 flex flex-col items-center py-20 z-50 pointer-events-none">
        <div className="flex flex-col gap-12 pointer-events-auto">
          {["GH", "LI", "IN"].map((label, i) => (
            <motion.a
              key={label}
              whileHover={{ scale: 1.2, color: "#fff" }}
              className="text-xs font-mono text-zinc-500 hover:text-accent-cyan cursor-pointer tracking-tighter"
              href="#" // Links will be mapped later
            >
              {label}
            </motion.a>
          ))}
        </div>
        
        <div className="mt-auto mb-10 flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-accent-purple/50 to-transparent" />
          <div className="[writing-mode:vertical-lr] text-[8px] font-mono text-accent-purple/40 uppercase tracking-[0.3em]">
            System Status: Active
          </div>
        </div>
      </div>

      {/* Right Sidebar HUD */}
      <div className="fixed right-0 top-0 h-full w-12 md:w-20 border-l border-white/5 flex flex-col items-center justify-center z-50 pointer-events-none">
        <div className="flex flex-col gap-8 pointer-events-auto">
          {sectors.map((s, i) => (
            <div key={s} className="flex items-center gap-2 group cursor-pointer">
              <div 
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  activeSector === i + 1 ? "bg-accent-cyan scale-150 shadow-[0_0_8px_#22d3ee]" : "bg-zinc-700"
                }`} 
              />
              <span className={`text-[10px] font-mono transition-opacity duration-300 ${
                activeSector === i + 1 ? "text-accent-cyan opacity-100" : "text-zinc-600 opacity-0 group-hover:opacity-100"
              }`}>
                SEC-{s}
              </span>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-10 right-4 md:right-8 text-right font-mono">
          <div className="text-[10px] text-zinc-500 uppercase">Mission Time</div>
          <div className="text-xs text-accent-purple">
            {time.toLocaleTimeString([], { hour12: false })}
          </div>
        </div>
      </div>

      {/* Bottom Scanning Line */}
      <div className="fixed bottom-0 left-0 w-full h-px bg-accent-cyan/10 z-[60] animate-scan" />

      {/* Background Holographic Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[-5] opacity-[0.03]" 
           style={{ 
             backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", 
             backgroundSize: "40px 40px" 
           }} 
      />
    </>
  );
};

export default HUD;
