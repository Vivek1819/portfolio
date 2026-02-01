import React, { useState, useEffect } from "react";
import StarBackground from "./StarBackground";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const roles = [
    "Developer",
    "Programmer",
    "Space Enthusiast",
    "Problem Solver",
  ];
  const period = 2000;

  useEffect(() => {
    const currentWord = roles[loopNum % roles.length];

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setText((current) => current.slice(0, -1));

          if (text.length === 1) {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
          }
        } else {
          const nextChar = currentWord.charAt(text.length);
          setText((current) => current + nextChar);

          if (text.length === currentWord.length - 1) {
            setTimeout(() => {
              setIsDeleting(true);
            }, period);
          }
        }
      },
      isDeleting ? 75 : 150
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, period]);
  return (
    <div className="min-h-screen w-full flex justify-center items-center z-20 relative pt-32 sm:pt-36 md:pt-48 lg:pt-64 pb-8 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <StarBackground />
      </div>
      <div className="w-full px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-around relative z-30">
        <div className="ml-0 md:ml-10 lg:ml-20 text-center md:text-left mb-8 md:mb-20 flex flex-col justify-center">
          <h2 className="text-base sm:text-lg md:text-2xl tracking-wide text-white">Hello, I am</h2>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-italiana mb-4 text-white"
            style={{ fontWeight: 800 }}
          >
            Vivek Hipparkar
          </h1>
          <div className="min-h-8 md:min-h-16 mb-2">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-semibold">{text}</span>
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl cursor text-white">|</span>
          </div>
          <div className="ml-0 md:ml-2 mt-4 md:mt-8 flex justify-center md:justify-start">
            <div className="relative group tracking-widest">
              <a
                href="https://drive.google.com/file/d/1ylepuk7ZBF4Zu_NTL3K5D6yqhQB_auVE/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="resume-button px-6 sm:px-8 md:px-10 py-2 md:py-3 !text-white hover:!text-black text-xs sm:text-sm font-medium tracking-widest transition-all duration-300 ease-out">
                  RESUME
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-30 hidden md:flex items-end justify-center">
          <img src="/ghibli-1.png" className="w-64 lg:w-80 xl:w-96 pb-10 md:pb-20 lg:pb-40" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
