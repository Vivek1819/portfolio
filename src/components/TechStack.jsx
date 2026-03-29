import React from "react";
import { motion } from "framer-motion";

const TechItem = ({ name, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col items-center justify-center p-6 aspect-square rounded-full cosmic-glass hover-lens cursor-pointer"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <span className="micro-text text-[9px] text-starlight/40 group-hover:text-supernova transition-colors font-bold tracking-[0.2em]">{name}</span>
      
      {/* Orbital Aura */}
      <div className="absolute inset-0 rounded-full border border-starlight/5 group-hover:border-supernova/40 group-hover:animate-ping -z-10"></div>
    </motion.div>
  );
};

const TechStack = () => {
  const tech = [
    { name: "REACT", icon: "⚛️" },
    { name: "NEXT.JS", icon: "▲" },
    { name: "TS", icon: "📘" },
    { name: "NODE.JS", icon: "🟢" },
    { name: "PRISMA", icon: "◭" },
    { name: "TAILWIND", icon: "🌊" },
    { name: "FRAMER", icon: "🪄" },
    { name: "MYSQL", icon: "🐬" },
    { name: "POSTGRES", icon: "🐘" },
    { name: "DOCKER", icon: "🐳" },
  ];

  return (
    <section className="relative w-full py-40 overflow-hidden" id="tech">
      <div className="px-4 md:px-16 mb-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="micro-text text-neon-purple mb-8 flex items-center gap-4"
        >
          04 <span className="w-12 h-px bg-neon-purple/30"></span> CONSTELLATION MAPPING
        </motion.div>
        
        <h2 className="celestial-heading text-6xl md:text-8xl text-starlight max-w-3xl">
          THE ENGINE<br />
          OF <span className="text-supernova">CREATION</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* The Grid / Cluster */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {tech.map((item, index) => (
            <TechItem key={item.name} {...item} index={index} />
          ))}
        </div>

        {/* Decorative Orbital Paths */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-starlight/5 rounded-full scale-125 -z-10 pointer-events-none opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-starlight/5 rounded-full scale-150 -z-10 pointer-events-none opacity-10"></div>
      </div>

      <div className="mt-40 text-center max-w-2xl mx-auto px-4">
         <p className="font-sans text-starlight/40 text-sm leading-relaxed tracking-wider">
           EACH COMPONENT REPRESENTS A NODE IN THE LARGER ARCHITECTURAL GALAXY. 
           ENGINEERED FOR STABILITY, SCALABILITY, AND VISUAL ELEGANCE ACROSS THE DIGITAL VOID.
         </p>
      </div>
    </section>
  );
};

export default TechStack;
