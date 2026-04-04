import React from "react";
import { motion } from "framer-motion";
import DecipherText from "./common/DecipherText";

// Custom Brand Assets (Using 100% Transparent Vector SVGs)
const langchainLogo = "https://www.vectorlogo.zone/logos/langchain/langchain-icon.svg";
const goLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg";
const canvaLogo = "https://www.vectorlogo.zone/logos/canva/canva-icon.svg";

const allTech = [
  { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Material UI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg" },
  { name: "Redux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" },
  { name: "Framer", src: "https://cdn.simpleicons.org/framer/white" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express", src: "https://cdn.simpleicons.org/express/white" },
  { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "GoLang", src: goLogo },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Prisma", src: "https://cdn.simpleicons.org/prisma/white" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/white" },
  { name: "Vite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/white" },
  { name: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Canva", src: canvaLogo },
  { name: "Postman", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "NPM", src: "https://cdn.simpleicons.org/npm/CB3837" },
  { name: "HuggingFace", src: "https://cdn.simpleicons.org/huggingface/FFD21E" },
];

const TechNode = ({ name, src, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, delay: delay, ease: "easeInOut" },
        opacity: { duration: 0.8, delay: delay * 0.3 },
        scale: { duration: 0.6, delay: delay * 0.3 }
      }}
      whileHover={{ y: -5, scale: 1.15, rotate: 5, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
      className="group relative flex flex-col items-center justify-center p-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-starlight/10 backdrop-blur-md hover:border-starlight/30 transition-all duration-500 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
    >
      {/* Interactive Core Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-starlight/0 to-starlight/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Icon - Ensuring it's transparent and fits well */}
      <img 
        src={src} 
        loading="lazy" 
        alt={name} 
        className="w-8 h-8 md:w-11 md:h-11 object-contain filter drop-shadow hover:brightness-110 transition-all duration-500 relative z-10 p-1" 
      />
      
      {/* Outer Orbit Line (Subtle) */}
      <div className="absolute inset-[-6px] md:inset-[-8px] rounded-full border border-starlight/0 group-hover:border-starlight/20 border-dashed group-hover:animate-[spin_4s_linear_infinite] transition-colors duration-500 pointer-events-none -z-10"></div>
      
      {/* Minimal Tooltip */}
      <div className="absolute -bottom-8 px-3 py-1 bg-void-950/90 border border-starlight/10 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none z-20 shadow-lg hidden md:block">
         <span className="micro-text text-[9px] text-starlight uppercase whitespace-nowrap tracking-widest">{name}</span>
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-void-950" id="tech">
       {/* Ambient Subtle Starmap Background */}
       <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)" }}></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] border-t border-b border-starlight/5 opacity-30 rounded-full scale-[2] pointer-events-none -z-10"></div>
       
       <div className="px-4 md:px-16 mb-20 max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="micro-text text-neon-cyan mb-6 flex items-center justify-center gap-4"
        >
          <span className="w-8 h-px bg-neon-cyan/30"></span> 04 / CONSTELLATION <span className="w-8 h-px bg-neon-cyan/30"></span>
        </motion.div>
        
        <h2 className="celestial-heading text-4xl md:text-6xl text-starlight relative z-10 transition-all duration-700 font-light">
          <DecipherText text="THE ENGINE OF" delay={0.3} /> <span className="aurora-text drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]"><DecipherText text="CREATION" delay={0.6} /></span>
        </h2>
       </div>

       {/* Subtly Animated Floating Node Graph */}
       <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 mt-16">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 relative">
             
             {/* Faint Connecting Background Graph Vectors (Subtle) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block" style={{ zIndex: -1 }}>
               <pattern id="constellation" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                 <circle cx="50" cy="50" r="1" fill="#fff" opacity="0.3"/>
                 <line x1="10" y1="10" x2="90" y2="90" stroke="#fff" strokeWidth="0.5" opacity="0.1"/>
                 <line x1="90" y1="10" x2="10" y2="90" stroke="#fff" strokeWidth="0.5" opacity="0.1"/>
               </pattern>
               <rect x="0" y="0" width="100%" height="100%" fill="url(#constellation)" />
             </svg>

             {allTech.map((techItem, index) => (
                <TechNode 
                  key={techItem.name} 
                  {...techItem} 
                  // Math to stagger delays to create a fluid, breathing liquid field of stars
                  delay={(index % 4) * 0.4 + Math.random() * 0.5} 
                />
             ))}
          </div>
       </div>

       <div className="mt-32 text-center max-w-xl mx-auto px-4 relative z-10">
         <p className="font-sans text-starlight/40 text-[10px] sm:text-xs md:text-sm leading-relaxed tracking-widest uppercase">
           EACH COMPONENT REPRESENTS A VITAL NODE IN THE LARGER ARCHITECTURAL GALAXY. 
           ENGINEERED FOR STABILITY, SCALABILITY, AND ENDURANCE ACROSS THE VOID.
         </p>
       </div>
    </section>
  );
};

export default TechStack;
