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
  }, [text, isDeleting, loopNum, roles, period]);  return (
    <div className="h-screen w-full flex justify-around items-center z-20 relative pt-64 overflow-hidden">
      <div className="absolute inset-0 w-screen h-full z-0" style={{ left: "calc(-1 * (100vw - 100%)/2)" }}>
        <StarBackground />
      </div>
      <div className="container mx-auto px-8 flex items-center justify-around relative z-30">
        <div className="ml-20 text-left mb-20 flex flex-col justify-center">
          <h2 className="text-2xl py-3 tracking-wide text-white">
            Hello, I am
          </h2>
          <h1
            className="text-8xl font-italiana mb-4 text-white"
            style={{ fontWeight: 800, fontSize: "5rem" }}
          >
            Vivek Hipparkar
          </h1>
          <div className="min-h-16 mb-2">
            <span className="text-3xl text-gray-400 font-semibold">{text}</span>
            <span className="text-3xl cursor text-white">|</span>          </div>{" "}
        </div>
        <div className="relative z-30 flex items-end justify-center">
          <img src="/ghibli-1.png" className="w-11/20 pb-40" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
