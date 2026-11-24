import React from "react";
import { motion } from "framer-motion";
import PilotIDCard from "./PilotIDCard";
import { CaptainsLog, CurrentOrbit } from "./AboutLog";
import DecipherText from "./common/DecipherText";

const About = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden stellar-mesh" id="about">
      <div className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="micro-text text-neon-cyan mb-8 flex items-center gap-4"
          >
            01 <span className="w-12 h-px bg-neon-cyan/30"></span> PILOT IDENTITY
          </motion.div>
          <h2 className="celestial-heading text-6xl md:text-8xl text-starlight">
            <DecipherText text="MEET THE" delay={0.4} /><br />
            <span className="aurora-text"><DecipherText text="PILOT" delay={0.7} /></span>
          </h2>
        </div>

        {/* Pilot ID card */}
        <PilotIDCard />

        {/* Captain's log + current orbit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-7">
            <CaptainsLog />
          </div>
          <div className="lg:col-span-5">
            <CurrentOrbit />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
