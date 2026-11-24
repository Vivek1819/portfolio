import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, CodeXml } from "lucide-react";
import DecipherText from "./common/DecipherText";

const projectsData = [
  {
    id: 1, title: "BI-SYNC", description: "Two-way sync between Google Sheets and a MySQL database: edit either side and the other updates in real time.",
    image: "/bisync.png", technologies: ["Node.js", "MySQL", "Google APIs", "TypeScript"], 
    demo: "#", github: "https://github.com/Vivek1819/Bi-Sync", year: "2026", type: "Full Stack"
  },
  {
    id: 2, title: "FINBOARD", description: "A customisable finance dashboard that pulls live data from multiple market APIs, with widgets and charts that persist between sessions.",
    image: "/finboard.png", technologies: ["Next.js", "Zustand", "Recharts", "Typescript"], 
    demo: "https://fin-board-chi.vercel.app/", github: "https://github.com/Vivek1819/FinBoard", year: "2026", type: "Frontend"
  },
  {
    id: 3, title: "DRONE OPS", description: "A fleet management dashboard for drones: plan missions, track the fleet on a live map and monitor telemetry.",
    image: "/drone-ops.png", technologies: ["Next.js", "Prisma", "Maplibre", "PostgreSQL", "Typescript"], 
    demo: "https://flytbase-drone-ops.vercel.app/dashboard", github: "https://github.com/Vivek1819/Drone-Ops", year: "2026", type: "Full Stack"
  },
  {
    id: 4, title: "CONTEXTBRIDGE", description: "A VS Code extension that syncs your local workspace context with browser-based LLM chats, so you stop copy-pasting code.",
    image: "/contextbridge.png", technologies: ["VS Code API", "TypeScript", "React", "Node.js"], 
    demo: "https://marketplace.visualstudio.com/items?itemName=vivek-hipparkar.contextbridge", github: "https://github.com/Vivek1819/ContextBridge", year: "2026", type: "Extension"
  },
  {
    id: 5, title: "LEETCODE_FRIENDS", description: "A Chrome extension that adds social features to LeetCode, so you can keep up with friends right inside the site.",
    image: "/lcfriends.png", technologies: ["Javascript", "Node.js", "MongoDB", "Express"], 
    demo: "#", github: "https://github.com/Vivek1819/LeetCode-Friends", year: "2025", type: "Extension"
  },
  {
    id: 6, title: "REPOZY", description: "An AI-powered GitHub explorer: point it at a repo and ask questions about the codebase, answered using vector embeddings.",
    image: "/repozy.png", technologies: ["Next.js", "TypeScript", "tRPC", "Langchain","Prisma"], 
    demo: "#", github: "https://github.com/Vivek1819/repozy", year: "2024", type: "Full Stack"
  },
  {
    id: 7, title: "PORTFOLIO", description: "This site: an interactive, space-themed portfolio built with React, Tailwind CSS and Framer Motion.",
    image: "/portfolio.png", technologies: ["React", "Tailwind CSS", "Framer Motion", "Vercel"], 
    demo: "https://vivek-hipparkar.vercel.app/", github: "https://github.com/Vivek1819/portfolio", year: "2025", type: "Frontend"
  },
  {
    id: 8, title: "SIFTOR", description: "A real-time web scraper that turns a website's structure into clean, structured data, with a live view of the crawl.",
    image: "/siftor.png", technologies: ["React", "Websockets", "Node.js", "Express"], 
    demo: "#", github: "https://github.com/Vivek1819/siftor", year: "2024", type: "Full Stack"
  },
  {
    id: 9, title: "PING", description: "A real-time chat app with JWT-secured auth for fast messaging and image sharing.",
    image: "/ping.png", technologies: ["React", "Socket.io", "MongoDB", "Cloudinary"], 
    demo: "#", github: "https://github.com/Vivek1819/ping", year: "2024", type: "Full Stack"
  },
  {
    id: 10, title: "LEXIS", description: "Chat with your PDFs: upload a document and ask questions about it, powered by vector search.",
    image: "/lexis.png", technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "UploadThing"], 
    demo: "#", github: "https://github.com/Vivek1819/lexis", year: "2024", type: "Full Stack"
  },
  {
    id: 11, title: "NOTIFY", description: "A rich-text notes app with user authentication and AI-assisted writing.",
    image: "/notify.png", technologies: ["React", "Appwrite", "Redux", "HuggingFace"], 
    demo: "#", github: "https://github.com/Vivek1819/notify", year: "2024", type: "Frontend"
  }
];

// Projects shown as large featured rows, in this order. Everything else goes in the catalog list below.
const FEATURED = ["CONTEXTBRIDGE", "REPOZY", "LEETCODE_FRIENDS", "SIFTOR"];
const pad = (n) => String(n).padStart(2, "0");
const hasDemo = (p) => p.demo && p.demo !== "#";

/* Telescope-viewfinder corner brackets */
const Viewfinder = () => (
  <>
    {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((pos) => (
      <span
        key={pos}
        className={`absolute ${pos} w-4 h-4 border-starlight/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-supernova/80 pointer-events-none z-10`}
      />
    ))}
  </>
);

const ProjectLinks = ({ project, size = "md" }) => {
  const base =
    size === "md"
      ? "inline-flex items-center gap-2 text-base font-medium transition-colors"
      : "inline-flex items-center gap-1.5 text-sm font-medium transition-colors";
  const icon = size === "md" ? 16 : 14;
  return (
    <div className={`flex items-center ${size === "md" ? "gap-6" : "gap-4"}`}>
      {hasDemo(project) && (
        <a href={project.demo} target="_blank" rel="noreferrer" className={`${base} text-supernova hover:text-starlight`}>
          Live <ArrowUpRight size={icon} />
        </a>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className={`${base} text-starlight/70 hover:text-starlight`}>
          <CodeXml size={icon} /> Code
        </a>
      )}
    </div>
  );
};

const FeaturedProject = ({ project, index }) => {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
    >
      {/* Screenshot */}
      <a
        href={hasDemo(project) ? project.demo : project.github}
        target="_blank"
        rel="noreferrer"
        className={`relative block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        aria-label={`Open ${project.title}`}
      >
        <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_70%)] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative rounded-2xl overflow-hidden border border-starlight/10 group-hover:border-starlight/25 bg-void-900/60 transition-colors duration-500 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-void-900/50 via-transparent to-transparent pointer-events-none" />
          <Viewfinder />
          <span className="absolute bottom-4 right-5 font-mono text-[12px] tracking-[0.2em] text-starlight/0 group-hover:text-starlight/70 transition-colors duration-500 z-10">
            TARGET ACQUIRED
          </span>
        </div>
      </a>

      {/* Details */}
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.2em] text-starlight/50 mb-5">
          <span className="text-supernova">VH-{pad(project.id)}</span>
          <span className="w-6 h-px bg-starlight/20" />
          <span>{project.type.toUpperCase()}</span>
          <span className="text-starlight/30">·</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-cinematic text-3xl md:text-4xl xl:text-5xl font-medium tracking-tight text-starlight mb-5">
          {project.title}
        </h3>

        <p className="text-starlight/70 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-starlight/55 mb-8">
          {project.technologies.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-neon-cyan/70" />
              {t}
            </li>
          ))}
        </ul>

        <ProjectLinks project={project} />
      </div>
    </motion.article>
  );
};

/* Compact catalog row + cursor-following preview (desktop) */
const CatalogRow = ({ project, onHover }) => (
  <motion.li
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5 }}
    onMouseEnter={() => onHover(project)}
    onMouseLeave={() => onHover(null)}
    className="group relative grid grid-cols-12 gap-x-4 gap-y-2 items-center py-6 border-b border-starlight/15 hover:border-starlight/30 transition-colors"
  >
    <span className="absolute inset-y-0 -inset-x-4 rounded-xl bg-starlight/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    <span className="col-span-2 md:col-span-1 font-mono text-sm text-starlight/60 group-hover:text-supernova transition-colors">
      VH-{pad(project.id)}
    </span>
    <div className="col-span-10 md:col-span-4">
      <h4 className="font-cinematic text-lg md:text-xl text-starlight tracking-tight">{project.title}</h4>
      <span className="font-mono text-[12px] text-starlight/55">{project.type} · {project.year}</span>
    </div>
    <p className="col-span-12 md:col-span-4 text-base text-starlight/60 leading-relaxed md:line-clamp-2">
      {project.description}
    </p>
    <div className="col-span-12 md:col-span-3 flex md:justify-end">
      <ProjectLinks project={project} size="sm" />
    </div>
  </motion.li>
);

const Projects = () => {
  const featured = FEATURED.map((t) => projectsData.find((p) => p.title === t)).filter(Boolean);
  const catalog = projectsData.filter((p) => !FEATURED.includes(p.title));
  const years = projectsData.map((p) => +p.year);

  const [preview, setPreview] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 30 });
  const y = useSpring(my, { stiffness: 300, damping: 30 });

  return (
    <section className="relative w-full py-32 md:py-40" id="projects">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="micro-text text-neon-cyan mb-8 flex items-center gap-4"
            >
              03 <span className="w-12 h-px bg-neon-cyan/30"></span> MISSION ARCHIVE
            </motion.div>
            <h2 className="celestial-heading text-6xl md:text-8xl text-starlight">
              <DecipherText text="ORBITAL" delay={0.4} />
              <br />
              <span className="aurora-text"><DecipherText text="HANGAR" delay={0.7} /></span>
            </h2>
          </div>
          <p className="max-w-sm text-starlight/60 text-base leading-relaxed md:text-right">
            {projectsData.length} missions launched between {Math.min(...years)} and {Math.max(...years)}: full-stack
            systems, developer tools and experiments.
          </p>
        </div>

        {/* Featured */}
        <div className="flex flex-col gap-28 md:gap-36">
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Catalog */}
        <div className="mt-32 md:mt-44">
          <div className="flex items-center gap-4 mb-6 font-mono text-[12px] tracking-[0.25em] text-starlight/50">
            <span>STAR CATALOG</span>
            <span className="flex-1 h-px bg-starlight/10" />
            <span>{catalog.length} ENTRIES</span>
          </div>
          <ul
            className="relative"
            onMouseMove={(e) => {
              mx.set(e.clientX);
              my.set(e.clientY);
            }}
          >
            {catalog.map((p) => (
              <CatalogRow key={p.id} project={p} onHover={setPreview} />
            ))}
          </ul>
        </div>
      </div>

      {/* Floating preview */}
      <motion.div
        style={{ x, y }}
        className="fixed top-0 left-0 z-40 pointer-events-none hidden lg:block"
      >
        <AnimatePresence>
          {preview && (
            <motion.div
              key={preview.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-72 aspect-[16/10] translate-x-6 -translate-y-1/2 rounded-xl overflow-hidden border border-starlight/20 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] bg-void-900"
            >
              <img src={preview.image} alt="" className="w-full h-full object-cover object-top" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
