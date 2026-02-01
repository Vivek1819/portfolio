import React from "react";
import { motion } from "framer-motion";

const Work = () => {
  return (
    <div className="px-6 sm:px-10 md:px-28 pt-8 md:pt-16 relative z-10 mt-12 md:mt-26" id="work">
      <div className="flex flex-col items-center mb-8 md:mb-14">
        <h2 className="text-base sm:text-lg md:text-xl text-white tracking-widest mb-2">
          WORK
        </h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white tracking-tight relative inline-block font-extrabold drop-shadow-[0_2px_24px_rgba(34,211,238,0.25)]">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x">
            Experience
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 rounded-full blur-sm opacity-30" />
        </h1>
      </div>

      <div className="relative flex flex-col items-center w-full py-6 md:py-10">
        {/* Center line - hidden on mobile */}
        <div
          className="absolute left-1/2 top-0 h-full w-1 bg-white shadow-[0_0_32px_8px_rgba(255,255,255,0.18)] opacity-90 z-0 hidden md:block"
          style={{ transform: "translateX(-50%)" }}
        />
        {/* First Experience - Careasa */}
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-start mb-8 md:mb-16 relative z-10">
          {/* Mobile: Show date above card */}
          <div className="md:hidden text-center mb-4">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-50 font-mono text-sm">
              June 2024 - July 2024
            </div>
          </div>
          
          {/* Card Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-18 items-center group"
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative bg-white/10 backdrop-blur-lg border-2 border-cyan-400/30 rounded-2xl md:rounded-3xl shadow-[0_8px_40px_0_rgba(34,211,238,0.18)] p-4 sm:p-6 md:p-8 w-full max-w-[440px] text-white flex flex-col justify-center cursor-pointer transition-all duration-300 group hover:scale-105 hover:shadow-[0_12px_48px_0_rgba(34,211,238,0.35)] hover:border-cyan-300/80 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-cyan-400/20 via-white/5 to-fuchsia-400/20 opacity-80 pointer-events-none z-0" />
              <div className="absolute -inset-1 rounded-[1.5rem] md:rounded-[2rem] border-2 border-cyan-400/40 opacity-0 group-hover:opacity-80 group-hover:blur-md transition-all duration-300 z-0" />
              <div className="relative z-10">
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2 transition-transform duration-300 origin-left group-hover:scale-x-110 group-hover:scale-y-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-300 group-hover:drop-shadow-[0_2px_24px_rgba(34,211,238,0.5)]">
                  Full Stack Developer
                </div>
                <div className="text-cyan-300 font-bold mb-2 md:mb-3 tracking-wide text-sm sm:text-base">
                  Careasa Healthcare
                </div>
                <ul className="list-disc ml-4 md:ml-6 text-sm md:text-base text-blue-100/90 space-y-1 md:space-y-2">
                  <li>
                    Built and deployed a clinical CRM platform with intuitive
                    workflows, improving coordination and easing adoption across
                    clinical teams.
                  </li>
                  <li>
                    Integrated automated Google Meet scheduling, enhancing
                    virtual consultation workflows and reducing operational
                    overhead.
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Center Icon - hidden on mobile */}
          <motion.div
            className="hidden md:flex flex-col items-center w-0 justify-center group:"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 bg-black transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_32px_0_rgba(34,211,238,0.25)]">
              <img
                src="/careasa.png"
                alt="Careasa"
                className="w-10 h-8 md:w-14 md:h-12 object-contain transition-transform duration-300"
              />
            </div>
          </motion.div>
          
          {/* Date - only on desktop */}
          <motion.div
            className="hidden md:flex w-1/2 items-center pl-22 min-h-[128px] group"
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="date-transition text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-50 font-mono text-lg md:text-xl whitespace-nowrap flex items-center h-full transition-transform duration-300 group-hover:scale-110 hover:from-cyan-400 hover:to-fuchsia-300 hover:drop-shadow-[0_50px_38px_rgba(34,211,238,0.5)]">
              June 2024 - July 2024
            </div>
          </motion.div>
        </div>
        {/* Second Experience - Eazeplace */}
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-end mb-8 md:mb-16 relative z-10">
          {/* Mobile: Show date above card */}
          <div className="md:hidden text-center mb-4">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-50 font-mono text-sm">
              May 2024 - Nov 2024
            </div>
          </div>
          
          {/* Date - only on desktop (left side) */}
          <motion.div
            className="hidden md:flex w-1/2 items-center justify-end pr-22 min-h-[128px] group"
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="date-transition text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-50 font-mono text-lg md:text-xl whitespace-nowrap flex items-center h-full transition-transform duration-300 group-hover:scale-110 hover:from-fuchsia-400 hover:to-cyan-300 hover:drop-shadow-[0_2px_24px_rgba(236,72,153,0.5)]">
              May 2024 - Nov 2024
            </div>
          </motion.div>
          
          {/* Center Icon - hidden on mobile */}
          <motion.div
            className="hidden md:flex flex-col items-center w-0 justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 bg-black transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_32px_0_rgba(236,72,153,0.25)]">
              <img
                src="/eazeplace.png"
                alt="Eazeplace"
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300"
              />
            </div>
          </motion.div>
          
          {/* Card Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-18 items-center"
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative bg-white/10 backdrop-blur-lg border-2 border-fuchsia-400/30 rounded-2xl md:rounded-3xl shadow-[0_8px_40px_0_rgba(236,72,153,0.18)] p-4 sm:p-6 md:p-8 w-full max-w-[440px] text-white flex flex-col justify-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_0_rgba(236,72,153,0.35)] hover:border-fuchsia-300/80 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-fuchsia-400/20 via-white/5 to-cyan-400/20 opacity-80 pointer-events-none z-0" />
              <div className="absolute -inset-1 rounded-[1.5rem] md:rounded-[2rem] border-2 border-fuchsia-400/40 opacity-0 group-hover:opacity-80 group-hover:blur-md transition-all duration-300 z-0" />
              <div className="relative z-10">
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2 transition-transform duration-300 origin-left group-hover:scale-x-110 group-hover:scale-y-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 group-hover:drop-shadow-[0_2px_24px_rgba(236,72,153,0.5)]">
                  Campus Ambassador
                </div>
                <div className="text-fuchsia-300 font-bold mb-2 md:mb-3 tracking-wide text-sm sm:text-base">
                  Eazeplace
                </div>
                <ul className="list-disc ml-4 md:ml-6 text-sm md:text-base text-pink-100/90 space-y-1 md:space-y-2">
                  <li>
                    Contributed to platform improvement through UI refinement,
                    bug resolution, and testing, helping enhance both design and
                    functionality.
                  </li>
                  <li>
                    Collaborated with the product team to expand hiring platform
                    reach, contributing to strategic promotion and
                    diversification initiatives.
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>
        {`
.bg-[#18192b].group:hover ~ .date-transition,
.bg-[#18192b].group:focus ~ .date-transition {
  background: linear-gradient(90deg, var(--tw-gradient-from, #06b6d4), var(--tw-gradient-to, #ec4899));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.7;
  transition: all 0.3s;
}
`}
      </style>
    </div>
  );
};

export default Work;
