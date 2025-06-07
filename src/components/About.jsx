import React from "react";
import Card from "./Card";

const About = () => {
  const techStack = [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },    {
      name: "Tailwind CSS",
      icon: "/tailwind_css.png",
    },
    {
      name: "Material-UI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "NPM",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      icon: "/github.png",
    },
    {
      name: "Canva",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    },    {
      name: "VS Code",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Express.js",
      icon: "/express.png",
    },    {
      name: "Next.js",
      icon: "/nextjs.png",
    },
    {
      name: "Vercel",
      icon: "/vercel.png",
    },
    {
      name: "Vite",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    },
    {
      name: "Redux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "ShadCN",
      icon: "/shadcn.png",
    },
    {
      name: "JWT",
      icon: "/jwt.svg",
    },
  ];
  return (
    <div className="px-28 pt-10 relative z-10" id="about">
      <div className="text-center mb-16">
        <h2 className="text-lg text-blue-300">INTRODUCTION</h2>
        <h1
          className="text-4xl text-white mb-8 tracking-tight"
          style={{
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
        >
          About Me
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
        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-8 text-center border border-blue-500/30">
              <div className="text-5xl mb-4">🎓</div>
              <div className="text-cyan-300 font-medium text-lg">Student</div>
              <div className="text-gray-400 text-md">IIIT Gwalior '26</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-8 text-center border border-purple-500/30">
              <div className="text-5xl mb-4">💻</div>
              <div className="text-purple-300 font-medium text-lg">
                Developer
              </div>
              <div className="text-gray-400 text-md">Full Stack</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-8 text-center border border-cyan-500/30">
              <div className="text-5xl mb-4">🏆</div>
              <div className="text-blue-300 font-medium text-lg">
                Problem Solver
              </div>
              <div className="text-gray-400 text-md">DSA & CP</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-12 border-t border-gray-700/30">
        <div className="mb-12 text-center">
          <span className="text-md text-blue-300 uppercase tracking-widest font-medium">
            Tech Stack
          </span>
          <h2 className="text-4xl text-white mt-2 font-light">
            Technologies I Work With
          </h2>
        </div>{" "}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="icon-container relative flex-shrink-0"
              style={{ flexBasis: "calc(12.5% - 1rem)" }}
            >
              {" "}
              <div className="rounded-2xl p-4 cursor-pointer bg-white/0 backdrop-blur-sm shadow-lg card-shake transition-all duration-300">
                {" "}
                <img className="w-16 h-16" src={tech.icon} alt={tech.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
