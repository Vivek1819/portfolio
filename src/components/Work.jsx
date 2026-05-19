import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DecipherText from "./common/DecipherText";

const Waypoint = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex justify-end md:justify-center w-full min-h-[300px] md:min-h-[400px] group">
      
      {/* Node Marker on Path (Target Lock) */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-10 flex items-center justify-center z-20">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="w-4 h-4 md:w-6 md:h-6 group-hover:w-8 group-hover:h-8 md:group-hover:w-12 md:group-hover:h-12 rounded-full border border-neon-cyan/30 bg-void-900 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 cursor-crosshair flex items-center justify-center relative group-hover:border-supernova group-hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] z-20"
        >
          {/* Inner core */}
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neon-cyan group-hover:bg-supernova animate-pulse-aura-slow relative z-10 transition-colors"></div>
          
          {/* Rotating Target Lock Ring */}
          <div className="absolute w-[140%] h-[140%] border border-dashed border-starlight/20 rounded-full animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute w-[180%] h-[180%] border-t border-b border-neon-cyan/40 rounded-full animate-[spin_4s_linear_infinite_reverse] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Scanning radar outline */}
          <div className="absolute w-full h-full rounded-full border border-neon-cyan opacity-0 group-hover:animate-ping z-0"></div>
        </motion.div>
      </div>

      {/* Holographic Projection Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -40 : 40, filter: "blur(8px)", skewX: -5 }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)", skewX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className={`w-[calc(100%-4rem)] md:w-[42%] flex flex-col pt-4 md:pt-0 ${
          isEven ? 'md:mr-auto md:pr-12 text-left md:text-right' : 'md:ml-auto md:pl-12 text-left'
        } relative z-30`}
      >
        <div className="cosmic-glass border border-starlight/5 p-6 md:p-8 rounded-lg relative overflow-hidden transition-all duration-500 hover:border-neon-cyan/20 hover:bg-starlight-dim/5 group/card">
          
          <div className={`micro-text text-supernova flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
            <span className="w-1.5 h-1.5 bg-supernova rounded-full blur-[1px] group-hover:animate-ping"></span>
            {exp.period}
          </div>

          <h3 className={`celestial-heading text-2xl md:text-4xl text-starlight mb-4 tracking-wider leading-tight group-hover:text-glow-starlight transition-all duration-300 relative inline-block`}>
            {exp.title}
          </h3>

          <div className={`font-mono text-[10px] md:text-xs text-starlight/60 tracking-[0.2em] lg:tracking-[0.3em] uppercase flex items-center gap-3 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
            COORDINATE // <span className="text-neon-cyan font-bold group-hover:text-starlight transition-colors">{exp.company}</span>
          </div>

          <div className={`mt-6 flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
            {exp.tech.map((t, i) => (
              <span key={i} className="px-2 py-1 text-[9px] font-mono border border-starlight/10 bg-white/5 text-starlight/60">
                {t}
              </span>
            ))}
          </div>

          <div className={`mt-6 flex gap-1.5 opacity-40 group-hover:opacity-80 transition-opacity ${isEven ? 'md:justify-end' : 'justify-start'}`}>
            <div className="h-px w-8 bg-starlight"></div>
            <div className="h-px w-2 bg-starlight"></div>
            <div className="h-px w-1 bg-starlight"></div>
          </div>
        </div>
        
        {/* Animated Connector Beam from Node -> Card (desktop only) */}
        <div className={`hidden md:block absolute top-[60px] w-12 h-[2px] bg-starlight/10 ${isEven ? 'right-0' : 'left-0'} z-10 pointer-events-none overflow-hidden`}>
           <div className={`absolute top-0 h-full w-[200%] bg-gradient-to-r from-transparent via-supernova to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isEven ? 'animate-[slideLeft_1s_ease-in-out_infinite]' : 'animate-[slideRight_1s_ease-in-out_infinite]'}`}></div>
        </div>
      </motion.div>
    </div>
  );
};

const Work = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      period: "APR 2026 — PRESENT",
      title: "SOFTWARE ENGINEER INTERN",
      company: "FLAGRIGHT",
      tech: ["NEXT", "TYPESCRIPT", "LAMBDA"]
    },
    {
      period: "JAN 2026 — APR 2026",
      title: "FOUNDING ENGINEER INTERN",
      company: "COVERTIGER",
      tech: ["PYTHON", "NEXT.JS", "TYPESCRIPT"]
    },
    {
      period: "MAY 2025 — JUL 2025",
      title: "FULL STACK DEVELOPER",
      company: "CAREASA HEALTHCARE",
      tech: ["REACT", "NODE.JS", "GOOGLE WORKSPACE API", "POSTGRESQL"]
    },
    {
      period: "JUN 2024 — NOV 2024",
      title: "CAMPUS AMBASSADOR",
      company: "EAZEPLACE",
      tech: ["NODE.JS", "EXPRESS", "REACT.JS"]
    }
  ];

  /* Generate random space dust particles for parallax depth */
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section className="relative w-full py-40 overflow-hidden" id="work" ref={containerRef}>
      
      {/* Deep Space Parallax Dust */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {particles.map(p => (
           <div 
             key={p.id}
             className="absolute bg-starlight rounded-full animate-float opacity-20"
             style={{
               width: `${p.size}px`,
               height: `${p.size}px`,
               left: `${p.left}%`,
               top: `${p.top}%`,
               animationDuration: `${p.animationDuration}s`,
               animationDelay: `${p.delay}s`,
             }}
           />
         ))}
      </div>

      <div className="px-4 md:px-16 max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <style>
          {`
            @keyframes slideRight {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes slideLeft {
              0% { transform: translateX(50%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
        {/* Section Heading */}
        <div className="w-full text-center mb-32 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="micro-text text-neon-cyan mb-8 flex items-center gap-4 justify-center"
          >
            <span className="w-12 h-px bg-neon-cyan/30"></span>
            02 // NAVIGATIONAL LOG
            <span className="w-12 h-px bg-neon-cyan/30"></span>
          </motion.div>
          <h2 className="celestial-heading text-6xl md:text-8xl text-starlight">
            <DecipherText text="MISSION" delay={0.5} /><br />
            <span className="aurora-text"><DecipherText text="HISTORY" delay={0.8} /></span>
          </h2>
        </div>

        {/* The Interstellar Timeline */}
        <div className="relative w-full max-w-5xl mx-auto pt-10">
           
           {/* Structural Background Track */}
           <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-starlight/5 pointer-events-none"></div>

           {/* The Ship / Energy Pulse chasing scroll */}
           <motion.div 
             className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 w-[4px] blur-[1px] bg-gradient-to-b from-transparent via-supernova to-neon-cyan shadow-[0_0_20px_#06b6d4,0_0_40px_#fbbf24] pointer-events-none mix-blend-screen"
             style={{ height: pathHeight }}
           />

           {/* Timeline Waypoints */}
           <div className="flex flex-col gap-12 md:gap-4 lg:gap-0">
             {experiences.map((exp, index) => (
                <Waypoint key={index} exp={exp} index={index} />
             ))}
           </div>
           
           {/* Destination Target Marker */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "0px" }}
             transition={{ delay: 0.5, duration: 1 }}
             className="absolute left-8 md:left-1/2 -translate-x-1/2 bottom-0 w-6 h-6 border-2 border-starlight/30 rotate-45 flex items-center justify-center bg-void-900 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
           >
             <div className="w-1.5 h-1.5 bg-starlight/50 rounded-full animate-ping"></div>
           </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Work;
