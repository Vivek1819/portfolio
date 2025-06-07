import React from "react";
import Card from "./Card";
import TechStack from "./TechStack";

const About = () => {
  return (
    <div className="px-28 pt-10 relative z-10" id="about">
      <div className="text-center mb-16">
        <h2 className="text-lg text-white tracking-widest mb-2">
          INTRODUCTION
        </h2>
        <h1 className="text-4xl text-white tracking-tighter relative inline-block font-extrabold drop-shadow-[0_2px_24px_rgba(34,211,238,0.25)]">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x">
            About Me
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 rounded-full blur-sm opacity-30" />
        </h1>{" "}
      </div>
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <div className="text-xl text-gray-300 leading-relaxed mb-12 px-8">
          <p className="mb-6">
            Hey there! I'm{" "}
            <span className="text-white font-medium">Vivek Hipparkar</span>, a
            software engineer currently pursuing my B.Tech in Computer Science
            from <span className="text-blue-300">IIIT, Gwalior '26</span>.
          </p>
          <p className="mb-6">
            I'm an avid problem solver, delving into{" "}
            <span className="text-cyan-300">
              Data Structures and Algorithms
            </span>{" "}
            and
            <span className="text-cyan-300"> Competitive Programming</span>. As
            a passionate developer, my expertise spans various frameworks like
            React and Next.js in creating intuitive and dynamic GUIs.
          </p>
          <p className="mb-8">
            Additionally, I'm well-versed in backend development using Node.js,
            Express.js, integrating databases like MySQL, MongoDB and
            PostgreSQL. With a drive for continuous learning, I'm willing to
            take on any challenges that come my way. Beyond coding, I'm an
            enthusiastic sportsperson and reader.
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <div className="relative flex flex-col items-center text-center rounded-3xl p-8 overflow-hidden group hover:scale-105 hover:shadow-cyan-300/30 transition-transform duration-300">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-cyan-300/15 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-300" />
            <div className="text-6xl mb-3 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_6px_32px_rgba(34,211,238,0.7)]">
              🎓
            </div>
            <div className="text-cyan-100 font-extrabold text-xl mb-1 z-10 tracking-wide transition-colors duration-300 group-hover:text-cyan-300 group-hover:drop-shadow-[0_2px_16px_rgba(34,211,238,0.7)]">
              Student
            </div>
            <div className="text-gray-200 text-base z-10 transition-colors duration-300 group-hover:text-cyan-100">
              IIIT Gwalior '26
            </div>
          </div>
          {/* Developer Card */}
          <div className="relative flex flex-col items-center text-center rounded-3xl p-8 overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-pink-300/15 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-300" />
            <div className="text-6xl mb-3 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_6px_32px_rgba(244,114,182,0.7)]">
              💻
            </div>
            <div className="text-pink-100 font-extrabold text-xl mb-1 z-10 tracking-wide transition-colors duration-300 group-hover:text-pink-300 group-hover:drop-shadow-[0_2px_16px_rgba(244,114,182,0.7)]">
              Developer
            </div>
            <div className="text-gray-200 text-base z-10 transition-colors duration-300 group-hover:text-pink-100">
              Full Stack
            </div>
          </div>
          {/* Problem Solver Card */}
          <div className="relative flex flex-col items-center text-center rounded-3xl p-8 overflow-hidden group hover:scale-105 hover:shadow-blue-400/30 transition-transform duration-300">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue-300/15 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-300" />
            <div className="text-6xl mb-3 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_6px_32px_rgba(96,165,250,0.7)]">
              🏆
            </div>
            <div className="text-blue-100 font-extrabold text-xl mb-1 z-10 tracking-wide transition-colors duration-500 group-hover:text-blue-300 group-hover:drop-shadow-[0_2px_16px_rgba(96,165,250,0.7)]">
              Problem Solver
            </div>
            <div className="text-gray-200 text-base z-10 transition-colors duration-300 group-hover:text-blue-200">
              DSA & CP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
