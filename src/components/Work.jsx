import React from "react";

const Work = () => {
  return (
    <div className="px-4 md:px-28 pt-16 relative z-10 mt-26" id="work">
      <div className="flex flex-col items-center mb-14">
        <h1 className="text-4xl text-white tracking-tight relative inline-block font-extrabold drop-shadow-[0_2px_24px_rgba(34,211,238,0.25)]">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x">
            Experience
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 rounded-full blur-sm opacity-30" />
        </h1>
      </div>

      <div className="relative flex flex-col items-center w-full  py-10">
        <div
          className="absolute left-1/2 top-0 h-full w-1 bg-white shadow-[0_0_32px_8px_rgba(255,255,255,0.18)] opacity-90 z-0"
          style={{ transform: "translateX(-50%)" }}
        />
        <div className="flex w-full justify-start mb-16 relative z-10">
          <div className="w-1/2 flex justify-end pr-18 items-center group">
            <div className="bg-[#18192b] border border-cyan-400/30 rounded-2xl shadow-xl p-7 min-w-[350px] max-w-[420px] text-white relative flex flex-col justify-center cursor-pointer">
              <div className="text-2xl font-extrabold mb-1 transition-transform duration-300 origin-left group-hover:scale-x-110 group-hover:scale-y-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-300 group-hover:drop-shadow-[0_2px_24px_rgba(34,211,238,0.5)]">
                Full Stack Developer
              </div>
              <div className="text-cyan-300 font-bold mb-2">
                Careasa Healthcare
              </div>
              <ul className="list-disc ml-5 text-base text-blue-100/90 space-y-1">
                <li>
                  Built and deployed a clinical CRM platform with intuitive
                  workflows, improving coordination and easing adoption across
                  clinical teams.
                </li>
                <li>
                  Integrated automated Google Meet scheduling, enhancing virtual
                  consultation workflows and reducing operational overhead.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center w-0 justify-center group:">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 bg-black transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_32px_0_rgba(34,211,238,0.25)]">
              <img
                src="/careasa.png"
                alt="Careasa"
                className="w-14 h-12 object-contain transition-transform duration-300"
              />
            </div>
          </div>
          <div className="w-1/2 flex items-center pl-16 min-h-[128px]">
            <div className="date-transition text-transparent bg-clip-text bg-gradient-to-r from-white to-white font-mono text-lg whitespace-nowrap flex items-center h-full transition-colors duration-300 hover:from-cyan-400 hover:to-fuchsia-300 hover:drop-shadow-[0_50px_38px_rgba(34,211,238,0.5)]">
              June 2024 - July 2024
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end mb-16 relative z-10">
          <div className="w-1/2 flex items-center justify-end pr-18 min-h-[128px]">
            <div className="date-transition text-transparent bg-clip-text bg-gradient-to-r from-white to-white font-mono text-lg whitespace-nowrap flex items-center h-full transition-colors duration-300 hover:from-fuchsia-400 hover:to-cyan-300 hover:drop-shadow-[0_2px_24px_rgba(236,72,153,0.5)]">
              May 2024 - Nov 2024
            </div>
          </div>
          <div className="flex flex-col items-center w-0 justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 bg-black transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_32px_0_rgba(236,72,153,0.25)]">
              <img
                src="/eazeplace.png"
                alt="Eazeplace"
                className="w-12 h-12 object-contain transition-transform duration-300"
              />
            </div>
          </div>
          <div className="w-1/2 flex justify-start pl-18 items-center">
            <div className="bg-[#18192b] border border-fuchsia-400/30 rounded-2xl shadow-xl p-7 min-w-[350px] max-w-[420px] text-white relative flex flex-col justify-center group cursor-pointer">
              <div className="text-2xl font-extrabold mb-1 transition-transform duration-300 origin-left group-hover:scale-x-110 group-hover:scale-y-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 group-hover:drop-shadow-[0_2px_24px_rgba(236,72,153,0.5)]">
                Campus Ambassador
              </div>
              <div className="text-fuchsia-300 font-bold mb-2">Eazeplace</div>
              <ul className="list-disc ml-5 text-base text-pink-100/90 space-y-1">
                <li>
                  Contributed to platform improvement through UI refinement, bug
                  resolution, and testing, helping enhance both design and
                  functionality.
                </li>
                <li>
                  Collaborated with the product team to expand hiring platform
                  reach, contributing to strategic promotion and diversification
                  initiatives.
                </li>
              </ul>
            </div>
          </div>
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
