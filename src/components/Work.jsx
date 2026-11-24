import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DecipherText from "./common/DecipherText";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/* "MAY 2025 — JUL 2025" -> "3 mos" ; handles PRESENT */
const getDuration = (period) => {
  const [start, end] = period.split("—").map((s) => s.trim());
  const parse = (s) => {
    if (/PRESENT/i.test(s)) { const d = new Date(); return d.getFullYear() * 12 + d.getMonth(); }
    const [m, y] = s.split(" ");
    const mi = MONTHS.indexOf(m?.toUpperCase());
    return mi < 0 || !y ? null : +y * 12 + mi;
  };
  const a = parse(start), b = parse(end ?? "");
  if (a == null || b == null) return null;
  const months = Math.max(1, b - a + 1);
  if (months < 12) return `${months} mo${months > 1 ? "s" : ""}`;
  const y = Math.floor(months / 12), r = months % 12;
  return `${y} yr${y > 1 ? "s" : ""}${r ? ` ${r} mo${r > 1 ? "s" : ""}` : ""}`;
};

/* Company emblem: original-colour logo inside a glass circle with a faint orbit.
   Missing logo files fall back to initials. */
const PlanetEmblem = ({ exp, isCurrent }) => {
  const [failed, setFailed] = useState(false);
  const initials = exp.company.split(/\s+/).map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="relative shrink-0 w-[76px] h-[76px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-dashed border-starlight/10 animate-[spin_30s_linear_infinite]">
        <span className={`absolute -top-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isCurrent ? "bg-neon-cyan" : "bg-starlight/50"}`} />
      </div>
      <div className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10">
        {exp.logo && !failed ? (
          <img
            src={exp.logo}
            alt={`${exp.company} logo`}
            onError={() => setFailed(true)}
            className="w-9 h-9 object-contain"
          />
        ) : (
          <span className="font-cinematic font-bold text-lg text-starlight/80">{initials}</span>
        )}
      </div>
    </div>
  );
};

const Telemetry = ({ label, value, highlight }) => (
  <div className="flex flex-col gap-1.5 px-4 first:pl-0">
    <span className="font-mono text-[9px] tracking-[0.3em] text-starlight/40">{label}</span>
    <span className={`font-mono text-xs tracking-wider ${highlight ? "text-neon-cyan" : "text-starlight/75"}`}>{value}</span>
  </div>
);

const Waypoint = ({ exp, index, total }) => {
  const isEven = index % 2 === 0;
  const isCurrent = /PRESENT/i.test(exp.period);
  const duration = getDuration(exp.period);
  const [launch, ret] = exp.period.split("—").map((s) => s.trim());
  const missionNo = String(total - index).padStart(2, "0");

  return (
    <div className="relative flex justify-end md:justify-center w-full min-h-[260px] md:min-h-[340px] group">
      
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
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neon-cyan group-hover:bg-supernova animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.9)] relative z-10 transition-colors"></div>
          
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
        className={`w-[calc(100%-4rem)] md:w-[44%] flex flex-col pt-4 md:pt-0 text-left ${
          isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
        } relative z-30`}
      >
        {/* Mission log card: same glass + HUD-corner language as the About cards */}
        <div className="stellar-glass relative transition-all duration-500 group-hover:-translate-y-1 group-hover:border-starlight/15">
          <div className="absolute hud-corner hud-corner-tl group-hover:w-4 group-hover:h-4 transition-all" />
          <div className="absolute hud-corner hud-corner-tr group-hover:w-4 group-hover:h-4 transition-all" />
          <div className="absolute hud-corner hud-corner-bl group-hover:w-4 group-hover:h-4 transition-all" />
          <div className="absolute hud-corner hud-corner-br group-hover:w-4 group-hover:h-4 transition-all" />

          {/* Header strip */}
          <div className="relative flex items-center justify-between gap-4 px-6 md:px-8 py-3 border-b border-void-line">
            <span className="font-mono text-[10px] tracking-[0.3em] text-starlight/40">
              MSN-{missionNo}
            </span>
            {isCurrent ? (
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-neon-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                IN FLIGHT
              </span>
            ) : (
              <span className="font-mono text-[10px] tracking-[0.3em] text-starlight/30">COMPLETE</span>
            )}
          </div>

          {/* Body */}
          <div className="relative px-6 md:px-8 pt-6 pb-7">
            <div className="flex items-center gap-4">
              <PlanetEmblem exp={exp} isCurrent={isCurrent} />
              <div className="min-w-0">
                <div className="micro-text !text-[10px] !tracking-[0.35em] mb-1">DESTINATION</div>
                <div className="font-cinematic text-sm md:text-base font-bold tracking-[0.2em] text-neon-cyan uppercase leading-tight">
                  {exp.companyName ?? exp.company}
                </div>
              </div>
            </div>

            <h3 className="celestial-heading text-2xl md:text-3xl text-starlight mt-6">
              {exp.title}
            </h3>

            {exp.summary && (
              <p className="mt-4 text-sm text-starlight/60 leading-relaxed">{exp.summary}</p>
            )}

            {/* Telemetry */}
            <div className="mt-6 py-3 border-y border-void-line grid grid-cols-3 divide-x divide-white/5">
              <Telemetry label="LAUNCH" value={launch} />
              <Telemetry label="RETURN" value={isCurrent ? "ONGOING" : ret} highlight={isCurrent} />
              <Telemetry label="DURATION" value={duration?.toUpperCase() ?? "—"} />
            </div>

            {exp.tech.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="trapezoid-badge !py-1 !px-4 text-[10px] font-bold tracking-widest text-starlight/75">
                    {t}
                  </span>
                ))}
              </div>
            )}
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
      period: "NOV 2026 — PRESENT",
      title: "SOFTWARE ENGINEER",
      company: "AIPRISE",
      companyName: "AiPrise",
      logo: "/aiprise.png",
      tech: ["PYTHON", "TYPESCRIPT", "REACT"]
    },
    {
      period: "APR 2026 — OCT 2026",
      title: "SOFTWARE ENGINEER INTERN",
      company: "FLAGRIGHT",
      companyName: "Flagright",
      logo: "/flagright.png",
      tech: ["NEXT", "TYPESCRIPT", "AWS"]
    },
    {
      period: "JAN 2026 — APR 2026",
      title: "FOUNDING ENGINEER INTERN",
      company: "COVERTIGER",
      companyName: "CoverTiger",
      logo: "/covertiger.png",
      tech: ["PYTHON", "NEXT.JS", "TYPESCRIPT"]
    },
    {
      period: "MAY 2025 — JUL 2025",
      title: "FULL STACK DEVELOPER",
      company: "CAREASA HEALTHCARE",
      companyName: "Careasa Healthcare",
      logo: "/careasa.png",
      tech: ["REACT", "NODE.JS", "GOOGLE WORKSPACE API", "POSTGRESQL"]
    },
    {
      period: "JUN 2024 — NOV 2024",
      title: "CAMPUS AMBASSADOR",
      company: "EAZEPLACE",
      companyName: "Eazeplace",
      logo: "/eazeplace.png",
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
                <Waypoint key={index} exp={exp} index={index} total={experiences.length} />
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
