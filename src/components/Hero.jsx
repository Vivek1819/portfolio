import React, { useState, useEffect } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

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
    <div className="min-h-screen w-full flex justify-center items-start pt-20 z-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-5 items-center px-14">
          <div className="text-center md:text-left px-4 md:col-span-4">
            <h2 className="text-2xl py-5 tracking-wide">Hello, I am</h2>
            <h1
              className="sm:text-6xl font-italiana mb-6 font-extrabold text-custom-10xl lg:text-custom-12xl"
              style={{ fontSize: "clamp(3rem, 10vw, 10rem)", fontWeight: 800 }}
            >
              Vivek Hipparkar
            </h1>
            <div className="min-h-16 mb-4">
              <span className="text-xl sm:text-4xl md:text-xl lg:text-3xl text-gray-400 font-semibold">
                {text}
              </span>
              <span className="text-xl sm:text-4xl md:text-xl lg:text-3xl cursor">
                |
              </span>{" "}
            </div>{" "}
          </div>

          <div className="text-xl mt-8 md:mt-0 md:col-span-4 bg-black/20 backdrop-blur-sm p-8 rounded-lg shadow-lg tracking-wide">
            Heyy there, I am Vivek Hipparkar a software Engineer currently
            pursuing my B.Tech in Computer Science from IIIT, Gwalior '26. I am
            an avid problem solver indulging deep into Data Structures and
            Algorithms and Competitive Programming. As a passionate developer,
            my expertise spans in various frameworks like React and Next.js in
            creating intuitive and dynamic GUIs. Additionally, I am also well
            versed in backend development using Node.js, Express.js, integrating
            databases like MySQL, MongoDB and PostgreSQL.With a drive for continuous learning, I am willing to take
            on any challenges that come my way. To get to know more about me,
            keep scrolling or download the resume from the link below
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
