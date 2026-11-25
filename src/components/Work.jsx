import { useState } from "react";
import { motion } from "framer-motion";
import DecipherText from "./common/DecipherText";
import MissionArchive from "./MissionArchive";
import { experiences } from "../data/experiences";

const Work = () => {
  /* random space dust for depth (generated once) */
  const [particles] = useState(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <section className="relative w-full py-40 overflow-x-clip" id="work">
      {/* Deep Space Parallax Dust */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p) => (
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
        {/* Section Heading */}
        <div className="w-full text-center mb-24 md:mb-28 flex flex-col items-center">
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
      </div>

      <MissionArchive experiences={experiences} />
    </section>
  );
};

export default Work;
