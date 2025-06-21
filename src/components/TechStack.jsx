import React from "react";

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
  },
  {
    name: "TailwindCSS",
    icon: "/tailwind_css.png",
  },
  {
    name: "MaterialUI",
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
  },
  {
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
  },
  {
    name: "VSCode",
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
  },
  {
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

const TechStack = () => (
  <div className="mt-16 pt-8">
    <div className="mb-12 text-center">
      <span className="block text-lg text-white uppercase tracking-widest font-medium mb-2">
        Tech Stack
      </span>
      <h2 className="text-5xl text-white mt-2 font-extrabold tracking-tighter relative inline-block drop-shadow-[0_2px_24px_rgba(34,211,238,0.25)]">
        <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x">
          Technologies I Work With
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 rounded-full blur-sm opacity-30" />
      </h2>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
      {techStack.map((tech, index) => (
        <div
          key={index}
          className="icon-container relative flex-shrink-0 group"
          style={{ flexBasis: "calc(12.5% - 1rem)" }}
        >
          <div className="rounded-2xl p-6 cursor-pointer bg-white/0 backdrop-blur-sm shadow-lg card-shake transition-all duration-300 flex flex-col items-center">
            <img className="w-16 h-16" src={tech.icon} alt={tech.name} />
            <span
              className={`
                absolute left-1/2 -translate-x-1/2 mt-6 px-3 py-1 rounded-xl text-xs font-bold pointer-events-none
                opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-20
                ${
                  index % 3 === 0
                    ? "bg-cyan-900/90 text-cyan-200 shadow-cyan-400/20"
                    : ""
                }
                ${
                  index % 3 === 1
                    ? "bg-fuchsia-900/90 text-fuchsia-200 shadow-fuchsia-400/20"
                    : ""
                }
                ${
                  index % 3 === 2
                    ? "bg-blue-900/90 text-blue-200 shadow-blue-400/20"
                    : ""
                }
              `}
              style={{ top: "4.5rem" }}
            >
              {tech.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TechStack;
