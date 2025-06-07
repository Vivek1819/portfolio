import React from "react";
import Card from "./Card";

const About = () => {
  const techStack = [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      bgColor: "bg-orange-600",
      description: "Markup Language",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      bgColor: "bg-blue-600",
      description: "Styling",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      bgColor: "bg-yellow-500",
      description: "Programming Language",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      bgColor: "bg-cyan-500",
      description: "Frontend Framework",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      bgColor: "bg-teal-500",
      description: "CSS Framework",
    },
    {
      name: "Material-UI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
      bgColor: "bg-blue-700",
      description: "UI Library",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      bgColor: "bg-green-600",
      description: "Runtime Environment",
    },
    {
      name: "NPM",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
      bgColor: "bg-red-600",
      description: "Package Manager",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      bgColor: "bg-blue-500",
      description: "Containerization",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      bgColor: "bg-green-500",
      description: "NoSQL Database",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      bgColor: "bg-blue-800",
      description: "SQL Database",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      bgColor: "bg-orange-500",
      description: "Database",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      bgColor: "bg-purple-600",
      description: "Design Tool",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      bgColor: "bg-orange-700",
      description: "Version Control",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      bgColor: "bg-gray-800",
      description: "Code Repository",
    },
    {
      name: "DaVinci Resolve",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg",
      bgColor: "bg-gray-700",
      description: "Video Editing",
    },
    {
      name: "Canva",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
      bgColor: "bg-cyan-400",
      description: "Graphic Design",
    },
    {
      name: "VS Code",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      bgColor: "bg-blue-600",
      description: "Code Editor",
    },
  ];
  return (
    <div className="px-28 pt-10 relative z-10" id="about-section">
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
            I'm an avid problem solver, diving deep into{" "}
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
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-500/30">
              <div className="text-2xl mb-2">🎓</div>
              <div className="text-cyan-300 font-medium text-sm">Student</div>
              <div className="text-gray-400 text-xs">IIIT Gwalior '26</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-500/30">
              <div className="text-2xl mb-2">💻</div>
              <div className="text-purple-300 font-medium text-sm">
                Developer
              </div>
              <div className="text-gray-400 text-xs">Full Stack</div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-4 text-center border border-cyan-500/30">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-blue-300 font-medium text-sm">
                Problem Solver
              </div>
              <div className="text-gray-400 text-xs">DSA & CP</div>
            </div>
          </div>
        </div>
      </div>
      =
      <div className="mt-16 pt-12 border-t border-gray-700/30">
        <div className="mb-12 text-center">
          <span className="text-md text-blue-300 uppercase tracking-widest font-medium">
            Tech Stack
          </span>
          <h2 className="text-4xl text-white mt-2 font-light">
            Technologies I Work With
          </h2>
        </div>{" "}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0.5 max-w-7xl mx-auto">
          {techStack.map((tech, index) => (
            <Card
              key={index}
              name={tech.name}
              icon={tech.icon}
              bgColor={tech.bgColor}
              description={tech.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
