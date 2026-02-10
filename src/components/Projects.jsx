import React, { useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Bi-Sync",
      description:
        "A synchronization engine that keeps Google Sheets and MySQL in perfect harmony with 2-way sync, live schema updates, and conflict resolution.",
      image: "/bisync.png",
      category: "Full Stack",
      technologies: ["Node.js", "MySQL", "Google APIs", "TypeScript"],
      link: "https://github.com/Vivek1819/Bi-Sync",
      status: "Completed",
      year: "2026",
    },
    {
      id: 2,
      title: "FinBoard",
      description:
        "A customizable, real-time finance dashboard with dynamic widget configuration, multi-API integration, and persistent state management.",
      image: "/finboard.png",
      category: "Frontend",
      technologies: ["Next.js", "Zustand", "Recharts", "Typescript"],
      link: "https://github.com/Vivek1819/FinBoard",
      liveDemo: "https://fin-board-chi.vercel.app/",
      status: "Deployed",
      year: "2026",
    },
    {
      id: 3,
      title: "Drone Ops",
      description:
        "A comprehensive drone survey management system featuring mission planning, fleet coordination, and real-time monitoring with deterministic execution.",
      image: "/drone-ops.png",
      category: "Full Stack",
      technologies: ["Next.js", "Prisma", "Maplibre", "PostgreSQL"],
      link: "https://github.com/Vivek1819/Drone-ops",
      liveDemo: "https://flytbase-drone-ops.vercel.app/",
      status: "Deployed",
      year: "2026",
    },
    {
      id: 4,
      title: "ContextBridge",
      description:
        "A VS Code extension that bridges the gap between browser-based LLMs and local development environments with deterministic context synchronization.",
      image: "/contextbridge.png",
      category: "Extension",
      technologies: ["VS Code API", "TypeScript", "React", "Node.js"],
      link: "https://github.com/Vivek1819/ContextBridge",
      liveDemo: "https://marketplace.visualstudio.com/items?itemName=vivek-hipparkar.contextbridge",
      status: "Published",
      year: "2026",
    },
    {
      id: 5,
      title: "Leetcode Friends",
      description:
        "A Chrome extension that enhances the LeetCode experience by adding a social and collaborative layer for competitive programmers.",
      image: "/lcfriends.png",
      category: "Extension",
      technologies: ["Javascript", "Node.js", "MongoDB", "Express"],
      link: "https://github.com/Vivek1819/leetcode-friends-extension",
      status: "In Progress",
      year: "2025",
    },
    {
      id: 6,
      title: "Repozy",
      description:
        "Repozy is an AI-powered GitHub insights platform that generates commit summaries and enables semantic codebase queries through vector embeddings.",
      image: "/repozy.png",
      category: "Full Stack",
      technologies: ["Next.js", "TypeScript", "tRPC", "Langchain", "Prisma"],
      link: "https://github.com/Vivek1819/repozy",
      status: "Completed",
      year: "2024",
    },
    {
      id: 7,
      title: "Portfolio Website",
      description:
        "A modern, interactive portfolio website designed to showcase my projects and skills, featuring smooth animations, and an engaging user experience.",
      image: "/portfolio.png",
      category: "Frontend",
      technologies: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Vercel",
      ],
      link: "https://github.com/Vivek1819/portfolio",
      liveDemo: "https://portfolio-swart-chi-20.vercel.app",
      status: "Deployed",
      year: "2025",
    },
    {
      id: 8,
      title: "Siftor",
      description:
        "Siftor is a real-time web scraping application that transforms website URLs into structured, readable content with live visual feedback as it crawls through pages.",
      image: "/siftor.png",
      category: "Full Stack",
      technologies: [
        "React",
        "Websockets",
        "Node.js",
        "Express",
      ],
      link: "https://github.com/Vivek1819/siftor",
      liveDemo: null,
      status: "Completed",
      year: "2024",
    },
    {
      id: 9,
      title: "Ping",
      description:
        "A real-time chat application built with the MERN stack that enables users to send messages and images instantly, featuring user authentication and online status tracking.",
      image: "/ping.png",
      category: "Full Stack",
      technologies: ["React", "Socket.io", "MongoDB", "JWT", "Cloudinary"],
      link: "https://github.com/Vivek1819/ping",
      status: "Completed",
      year: "2024",
    },
    {
      id: 10,
      title: "Lexis",
      description:
        "Lexis is a web application that enables users to upload PDF documents and interact with them through a conversational interface, providing efficient document analysis and information extraction.",
      image: "/lexis.png",
      category: "Full Stack",
      technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "UploadThing"],
      link: "https://github.com/Vivek1819/lexis",
      status: "In Progress",
      year: "2024",
    },
    {
      id: 11,
      title: "Notify",
      description:
        "Notify is a feature-rich note-taking web application with rich text editing capabilities, PDF viewing, authentication system, and AI-powered chatbot assistance for enhanced productivity.",
      image: "/notify.png",
      category: "Frontend",
      technologies: [
        "React",
        "Appwrite",
        "Redux",
        "HuggingFace",
      ],
      link: "https://github.com/Rahull004/Notify",
      status: "Deployed",
      year: "2024",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="px-6 sm:px-10 md:px-28 pt-8 md:pt-14 relative z-10 mt-12 md:mt-18" id="projects">
      <div className="text-center mb-10 md:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mt-2 font-extrabold tracking-tighter relative inline-block drop-shadow-[0_2px_24px_rgba(34,211,238,0.25)]">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x">
            Projects
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 rounded-full blur-sm opacity-30" />
        </h1>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-4 md:mt-6 max-w-2xl mx-auto px-4">
          Here are some of the projects I've worked on.
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
      >
        {" "}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_0_rgba(34,211,238,0.3)] w-full max-w-sm flex-shrink-0 ${project.liveDemo ? "cursor-pointer" : "cursor-default"
              }`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => {
              if (project.liveDemo) {
                window.open(project.liveDemo, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === "Deployed" || project.status === "Published"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                    : project.status === "Completed"
                      ? "bg-green-500/20 text-green-300 border border-green-500/50"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"
                  }`}
              >
                {project.status}
              </span>
            </div>

            <div className="relative h-50 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div
                className={`absolute inset-0 bg-black/70 flex items-center justify-center transition-opacity duration-300 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
              >
                {" "}
                <div className="flex gap-4">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-white text-white rounded-lg font-bold hover:bg-gray-800 hover:border-gray-600 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src="/github.png" className="w-8" />
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-sm text-gray-400 font-mono">
                  {project.year}
                </span>
              </div>{" "}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${project.category === "Full Stack"
                    ? "bg-purple-500/20 text-purple-300"
                    : project.category === "Frontend"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-green-500/20 text-green-300"
                    }`}
                >
                  {project.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-white/10 text-gray-300 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/30 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
