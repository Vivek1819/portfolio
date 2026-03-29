import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative h-[80vh] min-h-[500px] w-full flex flex-col justify-center px-4 md:px-16 border-b border-starlight/5"
    >
      <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-1000 -z-10 bg-void-800">
         <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale mix-blend-overlay group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-start gap-8 max-w-4xl">
        <div className="micro-text flex items-center gap-4 text-supernova/60">
           <span className="w-8 h-px bg-supernova/30"></span>
           EXPEDITION MISSION {String(index + 1).padStart(2, '0')}
        </div>

        <h3 className="celestial-heading text-6xl md:text-8xl xl:text-[8rem] group-hover:text-glow-starlight transition-all duration-700">
           {project.title}
        </h3>

        <div className="flex flex-col md:flex-row gap-12 md:items-end">
           <p className="font-sans text-starlight/60 text-lg max-w-xl leading-relaxed">
             {project.description}
           </p>

           <div className="flex flex-col gap-4">
              <span className="micro-text text-starlight/30">ENGINE SPECS</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-4 py-1.5 border border-starlight/10 rounded-full micro-text text-[9px] bg-starlight/5 text-starlight/70">
                    {tech}
                  </span>
                ))}
              </div>
           </div>
        </div>

        <a 
          href={project.link} 
          target="_blank" 
          rel="noreferrer" 
          className="mt-8 relative group/btn overflow-hidden px-10 py-4 border border-starlight/20 hover:border-supernova transition-all duration-500 rounded-full bg-void-800/50 backdrop-blur-md"
        >
          <span className="relative z-10 micro-text text-starlight/80 group-hover/btn:text-supernova transition-colors">INITIATE CONNECTION <span className="inline-block translate-x-1 group-hover/btn:translate-x-3 transition-transform">→</span></span>
          <div className="absolute inset-0 bg-supernova opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
        </a>
      </div>

      {/* Atmospheric Glow on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
           style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, rgba(30, 27, 75, 0) 70%)'}}></div>

    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "BI-SYNC",
      description: "Synchronization engine keeping Google Sheets & MySQL in absolute harmony. 2-way sync, live schema updates.",
      image: "/bisync.png",
      technologies: ["Node.js", "MySQL", "Google APIs", "TS"],
      link: "https://github.com/Vivek1819/Bi-Sync",
      year: "2026",
    },
    {
      id: 2,
      title: "FINBOARD",
      description: "Real-time finance instrumentation. Dynamic widget configuration and multi-API persistent state management.",
      image: "/finboard.png",
      technologies: ["Next.js", "Zustand", "Recharts", "TS"],
      link: "https://github.com/Vivek1819/FinBoard",
      year: "2026",
    },
    {
      id: 3,
      title: "DRONE-OPS",
      description: "Drone survey management. Mission planning, fleet coordination, and real-time deterministic monitoring.",
      image: "/drone-ops.png",
      technologies: ["Next.js", "Prisma", "Maplibre", "PGSQL"],
      link: "https://github.com/Vivek1819/Drone-ops",
      year: "2026",
    },
    {
      id: 4,
      title: "C-BRIDGE",
      description: "VS Code extension bridging browser-based LLMs and local dev environments with deep context sync.",
      image: "/contextbridge.png",
      technologies: ["VS Code API", "React", "Node.js"],
      link: "https://github.com/Vivek1819/ContextBridge",
      year: "2026",
    }
  ];

  return (
    <div className="w-full relative z-10" id="projects">
      <div className="px-4 md:px-16 pt-32 pb-40">
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="micro-text text-supernova mb-8 flex items-center gap-4"
         >
           03 <span className="w-12 h-px bg-supernova/30"></span> MAPPING THE UNIVERSE
         </motion.div>
         <h2 className="celestial-heading text-8xl md:text-[12rem] text-starlight">
           SELECTED<br />MISSIONS
         </h2>
      </div>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
