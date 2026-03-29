import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Cpu, Laptop, Trophy, Activity, Globe, Briefcase, Mail } from "lucide-react";

const About = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden stellar-mesh" id="about">
      <div className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col gap-20">
        
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="micro-text text-neon-cyan mb-8 flex items-center gap-4"
          >
            01 <span className="w-12 h-px bg-neon-cyan/30"></span> PILOT IDENTITY
          </motion.div>
          <h2 className="celestial-heading text-6xl md:text-8xl text-starlight">
            SYSTEM<br />
            <span className="text-neon-cyan">ARCHITECT</span>
          </h2>
        </div>

        {/* Tier 1: HUD Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full flex flex-wrap justify-between items-end gap-8 pb-12 border-b border-void-line"
        >
          <div className="flex gap-12">
            <div>
              <div className="micro-text mb-2">EXPERIENCE</div>
              <div className="text-3xl md:text-4xl font-cinematic text-starlight">3.5Y+</div>
            </div>
            <div>
              <div className="micro-text mb-2">PROJECTS</div>
              <div className="text-3xl md:text-4xl font-cinematic text-starlight">30+</div>
            </div>
            <div>
              <div className="micro-text mb-2">COMMITS</div>
              <div className="text-3xl md:text-4xl font-cinematic text-starlight">1k+</div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="micro-text mb-2">DEPLOYMENT STATUS</div>
            <div className="px-6 py-2 border border-neon-cyan/30 rounded-sm status-pulse-cyan bg-neon-cyan/5">
              <span className="text-neon-cyan font-mono font-bold tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                STATUS: OPEN
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tier 2: Identity Registry (Pilot Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {[
            { label: "STUDENT REGISTRY", title: "IIIT Gwalior", sub: "Class of 2026", icon: GraduationCap, color: "text-supernova" },
            { label: "PILOT DESIGNATION", title: "Full Stack Engineer", sub: "Digital Architectures", icon: Laptop, color: "text-neon-cyan" },
            { label: "COMBAT STATS", title: "DSA & Problem Solving", sub: "Competitive Programming", icon: Trophy, color: "text-neon-purple" }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ y: -25, scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="stellar-glass p-8 group cursor-pointer"
            >
              <div className="absolute hud-corner hud-corner-tl group-hover:w-4 group-hover:h-4 transition-all" />
              <div className="absolute hud-corner hud-corner-tr group-hover:w-4 group-hover:h-4 transition-all" />
              <div className="absolute hud-corner hud-corner-bl group-hover:w-4 group-hover:h-4 transition-all" />
              <div className="absolute hud-corner hud-corner-br group-hover:w-4 group-hover:h-4 transition-all" />

              <div className={`micro-text ${card.color} mb-6 flex items-center gap-3`}>
                <card.icon size={14} />
                {card.label}
              </div>
              <h3 className="text-xl font-bold text-starlight mb-1">{card.title}</h3>
              <p className="text-starlight/50 text-sm italic">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Tier 3: Data Core (Bio & Skills) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <p className="text-2xl md:text-3xl text-starlight/90 leading-snug font-cinematic tracking-tight">
              I'm a <span className="text-starlight font-bold border-b-2 border-neon-cyan">full-stack developer</span> who obsesses over load times, system design, and building products that feel as good as they perform.
            </p>
            <p className="text-starlight/60 text-lg leading-relaxed">
              Currently engineering at <span className="text-starlight font-medium italic underline decoration-supernova decoration-2 underline-offset-4">IIIT Gwalior</span>. 
              🌱 Diving deep into DevOps, Go & distributed systems. Every detail matters—every millisecond counts.
            </p>
            
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/Vivek1819" target="_blank" rel="noreferrer" title="GitHub" className="p-3 bg-void-line hover:bg-neon-cyan/20 rounded-full transition-colors border border-white/5">
                <Globe size={20} className="text-starlight" />
              </a>
              <a href="https://www.linkedin.com/in/vivekhipparkar/" target="_blank" rel="noreferrer" title="LinkedIn" className="p-3 bg-void-line hover:bg-neon-cyan/20 rounded-full transition-colors border border-white/5">
                <Briefcase size={20} className="text-starlight" />
              </a>
              <a href="mailto:vivekhipparkar@gmail.com" title="Email" className="p-3 bg-void-line hover:bg-neon-cyan/20 rounded-full transition-colors border border-white/5">
                <Mail size={20} className="text-starlight" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="stellar-glass p-1 h-full">
              <div className="p-6 border-b border-void-line flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                  <Cpu size={16} className="text-supernova" />
                  <span className="micro-text text-starlight">SKILLS BREAKDOWN</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-supernova rounded-full animate-ping" />
                  <div className="w-1 h-1 bg-void-line rounded-full" />
                  <div className="w-1 h-1 bg-void-line rounded-full" />
                </div>
              </div>
              
              <div className="divide-y divide-void-line font-mono text-xs">
                {[
                  { cat: "FRONTEND", stack: "React · Next.js · Framer Motion · Tailwind" },
                  { cat: "BACKEND", stack: "Node.js · Express · Go · Prisma · REST · Fastify" },
                  { cat: "DATABASE", stack: "PostgreSQL · MongoDB · Redis · MySQL" },
                  { cat: "DEVOPS", stack: "Docker · Kubernetes · CI/CD · AWS" },
                  { cat: "LANGUAGES", stack: "TypeScript · JavaScript · Python · Go · C++ · Java" }
                ].map((row, i) => (
                  <div key={i} className="flex grid grid-cols-4 p-5 group hover:bg-white/[0.02] transition-colors">
                    <div className="col-span-1 text-starlight/40 font-bold">{row.cat}</div>
                    <div className="col-span-3 text-starlight/80 group-hover:text-neon-cyan transition-colors">{row.stack}</div>
                  </div>
                ))}
              </div>

              {/* Slanted Badges Footer */}
              <div className="p-6 flex flex-wrap gap-4 bg-void-900/40">
                {["REACT", "NODE.JS", "PYTHON", "GO", "DOCKER"].map((t, idx) => (
                  <div key={idx} className="trapezoid-badge text-[10px] font-bold tracking-widest text-starlight/90">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
