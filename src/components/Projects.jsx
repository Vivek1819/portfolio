import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, ExternalLink, Activity } from "lucide-react";

const projectsData = [
  {
    id: 1, title: "BI-SYNC", description: "A synchronization engine preserving absolute harmony between Google Sheets & MySQL matrices via 2-way live schemas.",
    image: "/bisync.png", technologies: ["Node.js", "MySQL", "Google APIs", "TypeScript"], 
    demo: "#", github: "https://github.com/Vivek1819/Bi-Sync", year: "2026", type: "Full Stack"
  },
  {
    id: 2, title: "FINBOARD", description: "Real-time finance instrumentation hub featuring dynamic multi-API integrations and rigorous persistent local state management.",
    image: "/finboard.png", technologies: ["Next.js", "Zustand", "Recharts", "Typescript"], 
    demo: "https://fin-board-chi.vercel.app/", github: "https://github.com/Vivek1819/FinBoard", year: "2026", type: "Frontend"
  },
  {
    id: 3, title: "DRONE OPS", description: "A comprehensive drone telemetry management system for fleet coordination, real-time mapping, and deterministic mission execution.",
    image: "/drone-ops.png", technologies: ["Next.js", "Prisma", "Maplibre", "PostgreSQL", "Typescript"], 
    demo: "https://flytbase-drone-ops.vercel.app/dashboard", github: "https://github.com/Vivek1819/Drone-Ops", year: "2026", type: "Full Stack"
  },
  {
    id: 4, title: "CONTEXTBRIDGE", description: "Deterministic VS Code environment bridge for browser-based LLM synchronization across complex local workspaces.",
    image: "/contextbridge.png", technologies: ["VS Code API", "TypeScript", "React", "Node.js"], 
    demo: "https://marketplace.visualstudio.com/items?itemName=vivek-hipparkar.contextbridge", github: "https://github.com/Vivek1819/ContextBridge", year: "2026", type: "Extension"
  },
  {
    id: 5, title: "LEETCODE_FRIENDS", description: "Chromium extension injecting a social collaborative tier directly into competitive programming environment interfaces.",
    image: "/lcfriends.png", technologies: ["Javascript", "Node.js", "MongoDB", "Express"], 
    demo: "#", github: "https://github.com/Vivek1819/LeetCode-Friends", year: "2025", type: "Extension"
  },
  {
    id: 6, title: "REPOZY", description: "AI-powered GitHub reconnaissance platform generating semantic codebase intelligence queries via discrete vector embeddings.",
    image: "/repozy.png", technologies: ["Next.js", "TypeScript", "tRPC", "Langchain","Prisma"], 
    demo: "#", github: "https://github.com/Vivek1819/repozy", year: "2024", type: "Full Stack"
  },
  {
    id: 7, title: "PORTFOLIO", description: "Interactive frontend interface deployed to showcase personal databanks through high-fidelity rendering and deep-space aesthetics.",
    image: "/portfolio.png", technologies: ["React", "Tailwind CSS", "Framer Motion", "Vercel"], 
    demo: "https://vivek-hipparkar.vercel.app/", github: "https://github.com/Vivek1819/portfolio", year: "2025", type: "Frontend"
  },
  {
    id: 8, title: "SIFTOR", description: "A high-velocity real-time web parser transforming raw site topologies into structured arrays with live visual tunneling.",
    image: "/siftor.png", technologies: ["React", "Websockets", "Node.js", "Express"], 
    demo: "#", github: "https://github.com/Vivek1819/siftor", year: "2024", type: "Full Stack"
  },
  {
    id: 9, title: "PING", description: "A real-time socket communication tunnel secured by JWT routing to empower low-latency image and message exchanges.",
    image: "/ping.png", technologies: ["React", "Socket.io", "MongoDB", "Cloudinary"], 
    demo: "#", github: "https://github.com/Vivek1819/ping", year: "2024", type: "Full Stack"
  },
  {
    id: 10, title: "LEXIS", description: "Conversational interface interpreting static PDF documents into queryable databanks through efficient vector analysis.",
    image: "/lexis.png", technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "UploadThing"], 
    demo: "#", github: "https://github.com/Vivek1819/lexis", year: "2024", type: "Full Stack"
  },
  {
    id: 11, title: "NOTIFY", description: "Rich-text documentation application backed by highly integrated authentication matrices and AI parsing assistance.",
    image: "/notify.png", technologies: ["React", "Appwrite", "Redux", "HuggingFace"], 
    demo: "#", github: "https://github.com/Vivek1819/notify", year: "2024", type: "Frontend"
  }
];

const ProjectMonolith = ({ project, index }) => {
  return (
    <div className="w-[85vw] md:w-[80vw] xl:w-[60vw] h-[65vh] md:h-[70vh] flex-shrink-0 group relative p-[1px] rounded-[2.5rem] mt-10 md:mt-0 perspective-1000">
       
       <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-neon-cyan/0 via-starlight/0 to-neon-purple/0 group-hover:from-neon-cyan/40 group-hover:via-supernova/10 group-hover:to-neon-purple/40 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 z-0"></div>
       
       <div className="absolute inset-0 rounded-[2.5rem] border border-starlight/10 group-hover:border-neon-cyan/50 transition-colors duration-700 z-20 pointer-events-none"></div>

       <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-void-950 flex flex-col md:flex-row shadow-2xl z-10 transition-transform duration-700 ease-out group-hover:scale-[1.01] group-hover:-translate-y-2">
          
          <div className="absolute inset-0 z-0 pointer-events-none">
             <img src={project.image} alt="bg" className="w-full h-full object-cover opacity-[0.03] grayscale group-hover:grayscale-0 group-hover:opacity-[0.08] blur-xl saturate-200 transition-all duration-1000 scale-110 group-hover:scale-125" />
             <div className="absolute inset-0 bg-void-950/80 backdrop-blur-[2px]"></div>
             
             <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 mix-blend-overlay" style={{ backgroundImage: "linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
          </div>

          <div className="relative z-20 w-full md:w-[45%] h-full flex flex-col justify-center p-8 md:p-12 bg-gradient-to-r from-void-950/90 to-transparent">
             
             <div className="flex items-center justify-between mb-4 md:mb-8">
                 <div className="flex items-center gap-4">
                    <div className="px-3 md:px-4 py-1.5 bg-neon-cyan/5 border border-neon-cyan/30 rounded-full micro-text text-[9px] md:text-xs text-neon-cyan tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.1)] relative overflow-hidden">
                       <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
                       {project.type.toUpperCase()}
                       <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-cyan/50 animate-scan-vertical"></div>
                    </div>
                 </div>
                 <span className="text-starlight/20 font-mono text-xs md:text-sm tracking-widest bg-void-900 border border-starlight/5 px-3 py-1 rounded shadow-inner">{project.year}</span>
             </div>
             
             <h3 className="celestial-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-starlight leading-tight mb-4 md:mb-6 group-hover:text-glow-starlight transition-all duration-500 relative">
                {project.title}
             </h3>
             
             <p className="text-starlight/60 text-sm md:text-base lg:text-lg font-sans leading-relaxed mb-6 md:mb-10 max-w-xl line-clamp-3 md:line-clamp-4 relative pl-4 border-l-2 border-starlight/10 group-hover:border-neon-cyan/50 transition-colors duration-500">
                {project.description}
             </p>
             
             <div className="flex flex-wrap gap-2 mb-6 md:mb-12">
                {project.technologies.map((t, idx) => (
                   <span key={idx} className="px-3 md:px-4 py-1.5 md:py-2 bg-void-900 border border-starlight/10 text-starlight/70 micro-text text-[9px] md:text-[11px] rounded-lg group-hover:border-neon-cyan/30 group-hover:bg-neon-cyan/5 group-hover:text-neon-cyan transition-colors duration-500 shadow-inner group-hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      {t}
                   </span>
                ))}
             </div>
             
             <div className="mt-auto hidden md:flex items-center gap-4 border-t border-starlight/10 pt-6 group-hover:border-neon-cyan/20 transition-colors">
                 {project.demo && project.demo !== "#" && (
                   <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 px-4 lg:px-6 py-4 bg-void-800 hover:bg-neon-cyan/10 border border-starlight/10 hover:border-neon-cyan/50 text-starlight hover:text-neon-cyan font-mono text-[10px] lg:text-xs tracking-[0.2em] transition-all rounded-xl backdrop-blur-md flex items-center justify-center gap-3 group/btn hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] relative overflow-hidden">
                      <Activity size={16} className="text-neon-cyan opacity-70 group-hover/btn:opacity-100" />
                      <span className="relative z-10">LIVE_SYSTEM</span>
                      <div className="absolute inset-0 w-0 group-hover/btn:w-full bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/10 to-neon-cyan/0 transition-all duration-500 ease-out z-0"></div>
                   </a>
                 )}
                 {project.github && (
                   <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 px-4 lg:px-6 py-4 bg-void-900 hover:bg-starlight/5 border border-starlight/5 hover:border-starlight/30 text-starlight hover:text-white font-mono text-[10px] lg:text-xs tracking-[0.2em] transition-all rounded-xl backdrop-blur-md flex items-center justify-center gap-3 group/btn hover:shadow-lg relative overflow-hidden">
                      <Terminal size={16} className="text-starlight opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="relative z-10">SOURCE_ARCHIVE</span>
                      <div className="absolute inset-0 w-0 group-hover/btn:w-full bg-gradient-to-r from-starlight/0 via-starlight/5 to-starlight/0 transition-all duration-500 ease-out z-0"></div>
                   </a>
                 )}
             </div>
          </div>

          <div className="relative z-20 w-full md:w-[55%] h-[300px] md:h-full flex items-center justify-center p-6 md:p-12 group-hover:bg-starlight/[0.02] transition-colors duration-700">
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-supernova/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-screen"></div>

             <div className="w-full h-full relative border border-starlight/5 group-hover:border-supernova/30 rounded-2xl md:rounded-3xl bg-void-900/40 group-hover:bg-void-900/60 shadow-2xl p-4 md:p-6 lg:p-8 backdrop-blur-md transition-all duration-700 ease-out group-hover:shadow-[0_0_80px_rgba(251,191,36,0.15)] flex flex-col cosmic-glass overflow-hidden group-hover:-translate-y-2 group-hover:rotate-1">
                 
                 <div className="absolute -right-20 -top-20 w-64 h-64 border border-starlight/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 group-hover:animate-spin-slow pointer-events-none mix-blend-screen"></div>

                 <div className="w-full flex items-center justify-between mb-4 border-b border-starlight/10 pb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    <div className="flex gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-void-line group-hover:bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0)] group-hover:shadow-[0_0_10px_rgba(255,95,86,0.5)] transition-all duration-500 delay-100"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-void-line group-hover:bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0)] group-hover:shadow-[0_0_10px_rgba(255,189,46,0.5)] transition-all duration-500 delay-200"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-void-line group-hover:bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0)] group-hover:shadow-[0_0_10px_rgba(39,201,63,0.5)] transition-all duration-500 delay-300"></div>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                      <div className="micro-text text-[9px] text-supernova/80 font-mono tracking-widest hidden sm:flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-supernova/50 rounded-full animate-ping"></span>
                         VISUAL_RENDER
                      </div>
                    </div>
                 </div>

                 <div className="w-full flex-1 relative flex items-center justify-center overflow-hidden mix-blend-screen group-hover:mix-blend-normal rounded-lg bg-black/40 border border-white/5 z-10 group/img">
                     <img src={project.image} alt={project.title} className="max-w-full max-h-full object-contain filter grayscale-[70%] sepia-[20%] hue-rotate-180 opacity-60 group-hover:grayscale-0 group-hover:sepia-0 group-hover:hue-rotate-0 group-hover:opacity-100 transition-all duration-1000 ease-out transform group-hover:scale-105 drop-shadow-2xl" />
                     {project.demo && project.demo !== "#" && (
                         <div className="absolute inset-0 bg-void-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                            <a href={project.demo} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full bg-supernova/20 border border-supernova flex items-center justify-center text-supernova hover:bg-supernova hover:text-void-950 hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                               <ExternalLink size={24} />
                            </a>
                         </div>
                     )}
                 </div>
                 
                 <div className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-b from-transparent via-supernova/10 to-transparent -translate-y-[100%] group-hover:animate-scan-sweep pointer-events-none z-20"></div>
             </div>

             <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 md:hidden z-30">
                 {project.demo && project.demo !== "#" && (
                   <a href={project.demo} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-void-800 border border-neon-cyan/50 text-neon-cyan font-mono text-[10px] tracking-widest rounded-lg shadow-lg flex items-center gap-2">
                      <Activity size={14} /> LIVE
                   </a>
                 )}
                 {project.github && (
                   <a href={project.github} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-void-900 border border-starlight/20 text-starlight font-mono text-[10px] tracking-widest rounded-lg shadow-lg flex items-center gap-2">
                      <Terminal size={14} /> REPO
                   </a>
                 )}
             </div>

          </div>
       </div>
    </div>
  );
};

const Projects = () => {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-void-950 w-full" id="projects">
      
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-void-900/30 backdrop-blur-sm">
         
         <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-starlight/5 pointer-events-none"></div>

         <motion.div style={{ x }} className="flex gap-16 md:gap-24 px-[5vw] xl:px-[10vw] relative z-20 items-center">
             
            <div className="w-[85vw] md:w-[35vw] flex-shrink-0 flex flex-col justify-center h-[70vh] relative pr-4 md:pr-10 lg:border-r border-starlight/10 mb-8 md:mb-0">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="flex flex-col"
               >
                 <div className="micro-text text-neon-cyan mb-6 flex items-center gap-4">
                   03 <span className="w-12 h-px bg-neon-cyan/30"></span> DIRECTORY SCAN
                 </div>
                 <h2 className="celestial-heading text-5xl md:text-7xl text-starlight leading-tight">
                   ORBITAL<br/>
                   <span className="text-neon-cyan">HANGAR</span>
                 </h2>
                 <p className="mt-8 font-sans text-starlight/60 max-w-md text-base md:text-lg leading-relaxed">
                   Accessing the engineering databanks. Glide through this horizontal sector to inspect my deployed web applications, full-stack monoliths, and architectural blueprints.
                 </p>
                 <div className="mt-12 flex items-center gap-4 micro-text text-starlight/30 animate-pulse">
                   SCROLL TO INITIATE TRAVEL <span className="text-xl">→</span>
                 </div>
               </motion.div>
            </div>
             
            {projectsData.map((project, i) => (
                <ProjectMonolith key={project.id} project={project} index={i} />
            ))}

            <div className="w-[10vw] flex-shrink-0"></div>

         </motion.div>
         
      </div>
    </section>
  );
};

export default Projects;
