import React, { useState } from "react";
import { motion } from "framer-motion";
import DecipherText from "./common/DecipherText";

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;
const simple = (slug, color = "white") => `https://cdn.simpleicons.org/${slug}/${color}`;

/*
 * Each constellation is drawn in its own 100x75 coordinate box (4:3).
 * stars: [name, logo, x%, y%, major?, invert?]
 *   major  = daily driver, drawn as a bright star
 *   invert = logo has dark artwork (e.g. AWS) — flip it light while keeping its colours
 * links: pairs of star indices joined by a line
 */
const CONSTELLATIONS = [
  {
    id: "interface",
    numeral: "I",
    name: "INTERFACE",
    stars: [
      ["HTML5", devicon("html5/html5-original.svg"), 12, 28],
      ["CSS3", devicon("css3/css3-original.svg"), 12, 74],
      ["JavaScript", devicon("javascript/javascript-original.svg"), 29, 50, true],
      ["TypeScript", devicon("typescript/typescript-original.svg"), 46, 22, true],
      ["React", devicon("react/react-original.svg"), 48, 64, true],
      ["Next.js", simple("nextdotjs"), 66, 40, true],
      ["Tailwind", devicon("tailwindcss/tailwindcss-original.svg"), 64, 84],
      ["Framer", simple("framer"), 86, 18],
      ["Redux", devicon("redux/redux-original.svg"), 87, 54],
      ["Material UI", devicon("materialui/materialui-original.svg"), 86, 86],
    ],
    links: [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6], [5, 7], [5, 8], [8, 9], [6, 9]],
  },
  {
    id: "core",
    numeral: "II",
    name: "CORE SYSTEMS",
    stars: [
      ["Node.js", devicon("nodejs/nodejs-original.svg"), 20, 32, true],
      ["Express", simple("express"), 14, 74],
      ["Python", devicon("python/python-original.svg"), 44, 58, true],
      ["Go", devicon("go/go-original-wordmark.svg"), 58, 20],
      ["C++", devicon("cplusplus/cplusplus-original.svg"), 80, 38],
      ["Java", devicon("java/java-original.svg"), 84, 78],
    ],
    links: [[1, 0], [0, 2], [2, 3], [3, 4], [4, 5], [2, 5]],
  },
  {
    id: "data",
    numeral: "III",
    name: "DATA & INFRA",
    stars: [
      ["PostgreSQL", devicon("postgresql/postgresql-original.svg"), 18, 28, true],
      ["MySQL", devicon("mysql/mysql-original.svg"), 14, 74],
      ["Prisma", simple("prisma"), 40, 52],
      ["MongoDB", devicon("mongodb/mongodb-original.svg"), 62, 20, true],
      ["Docker", devicon("docker/docker-original.svg"), 66, 72, true],
      ["Vercel", simple("vercel"), 87, 44],
      ["AWS", "/aws.png", 88, 84, true, true],
    ],
    links: [[0, 2], [1, 2], [2, 3], [2, 4], [4, 5], [3, 5], [4, 6]],
  },
  {
    id: "toolchain",
    numeral: "IV",
    name: "TOOLCHAIN",
    stars: [
      ["Git", devicon("git/git-original.svg"), 12, 42, true],
      ["GitHub", simple("github"), 28, 16],
      ["VS Code", devicon("vscode/vscode-original.svg"), 32, 66, true],
      ["NPM", simple("npm", "CB3837"), 50, 40],
      ["Vite", devicon("vitejs/vitejs-original.svg"), 52, 84],
      ["Postman", devicon("postman/postman-original.svg"), 68, 18],
      ["Figma", devicon("figma/figma-original.svg"), 70, 62],
      ["HuggingFace", simple("huggingface", "FFD21E"), 88, 30],
      ["Canva", "https://www.vectorlogo.zone/logos/canva/canva-icon.svg", 88, 82],
    ],
    links: [[0, 1], [0, 2], [2, 3], [1, 3], [3, 4], [3, 5], [5, 7], [3, 6], [6, 8]],
  },
];

const Star = ({ name, src, x, y, major, invert, lit, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: 0.3 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="absolute -translate-x-1/2 -translate-y-1/2 group/star z-10"
    style={{ left: `${x}%`, top: `${(y / 100) * 100}%` }}
  >
    <div className="relative flex flex-col items-center">
      {/* halo — brighter for daily drivers, and when the constellation is lit */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-500 ${
          major ? "w-20 h-20 md:w-24 md:h-24" : "w-14 h-14 md:w-16 md:h-16"
        } ${lit ? "opacity-100" : major ? "opacity-60" : "opacity-25"}`}
        style={{
          background: major
            ? "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(6,182,212,0.12) 35%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 65%)",
        }}
      />
      {/* star body */}
      <div
        className={`relative rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-500 group-hover/star:scale-110 ${
          major ? "w-12 h-12 md:w-14 md:h-14" : "w-10 h-10 md:w-11 md:h-11"
        } ${
          lit
            ? "bg-white/[0.08] border-neon-cyan/50 shadow-[0_0_24px_rgba(6,182,212,0.35)]"
            : "bg-white/[0.04] border-white/10"
        } group-hover/star:border-supernova/70 group-hover/star:shadow-[0_0_28px_rgba(251,191,36,0.45)]`}
      >
        <img
          src={src}
          alt={name}
          loading="lazy"
          className={`object-contain ${invert ? "[filter:invert(1)_hue-rotate(180deg)_drop-shadow(0_0_4px_rgba(255,255,255,0.35))]" : "[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.7))_drop-shadow(0_0_6px_rgba(255,255,255,0.35))]"} ${major ? "w-7 h-7 md:w-8 md:h-8" : "w-5 h-5 md:w-6 md:h-6"}`}
        />
        {/* 4-point glint on major stars */}
        {major && (
          <span className="absolute -top-1 -right-1 w-2 h-2 pointer-events-none">
            <span className="absolute inset-x-0 top-1/2 h-px bg-white/80" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-white/80" />
          </span>
        )}
      </div>
      {/* label */}
      <span
        className={`absolute top-full mt-2 whitespace-nowrap font-mono text-[11px] md:text-[12px] tracking-[0.15em] uppercase transition-colors duration-300 group-hover/star:text-supernova ${
          lit ? "text-starlight/85" : major ? "text-starlight/60" : "text-starlight/40"
        }`}
      >
        {name}
      </span>
    </div>
  </motion.div>
);

const Constellation = ({ data, index }) => {
  const [hover, setHover] = useState(false);
  const pt = (i) => ({ x: data.stars[i][2], y: (data.stars[i][3] / 100) * 75 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.15 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative"
    >
      {/* constellation label */}
      <div className="flex items-center gap-3 mb-4 font-mono text-[12px] tracking-[0.3em]">
        <span className={`transition-colors duration-300 ${hover ? "text-supernova" : "text-neon-cyan/70"}`}>{data.numeral}</span>
        <span className={`h-px w-8 transition-all duration-500 ${hover ? "bg-supernova/60 w-14" : "bg-starlight/15"}`} />
        <span className={`transition-colors duration-300 ${hover ? "text-starlight" : "text-starlight/50"}`}>{data.name}</span>
        <span className="text-starlight/25">· {data.stars.length} STARS</span>
      </div>

      {/* chart */}
      <div className="relative w-full aspect-[4/3]">
        {/* faint coordinate ring */}
        <div className={`absolute inset-[8%] rounded-full border border-dashed transition-colors duration-700 pointer-events-none ${hover ? "border-neon-cyan/15" : "border-starlight/[0.04]"}`} />

        <svg viewBox="0 0 100 75" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          {data.links.map(([a, b], i) => {
            const p = pt(a), q = pt(b);
            return (
              <motion.line
                key={i}
                x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.08, ease: "easeInOut" }}
                stroke={hover ? "rgba(6,182,212,0.75)" : "rgba(255,255,255,0.22)"}
                strokeWidth={hover ? 1.4 : 1}
                style={{
                  transition: "stroke 0.5s, stroke-width 0.5s",
                  filter: hover ? "drop-shadow(0 0 3px rgba(6,182,212,0.9))" : "none",
                }}
              />
            );
          })}
        </svg>

        {data.stars.map(([name, src, x, y, major, invert], i) => (
          <Star key={name} name={name} src={src} x={x} y={y} major={!!major} invert={!!invert} lit={hover} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section className="relative w-full py-32 md:py-40 overflow-hidden" id="tech">
      <div className="px-6 md:px-16 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="micro-text text-neon-cyan mb-6 flex items-center justify-center gap-4"
          >
            <span className="w-8 h-px bg-neon-cyan/30"></span> 04 / CONSTELLATION <span className="w-8 h-px bg-neon-cyan/30"></span>
          </motion.div>

          <h2 className="celestial-heading text-4xl md:text-6xl text-starlight font-light">
            <DecipherText text="THE ENGINE OF" delay={0.3} />{" "}
            <span className="aurora-text"><DecipherText text="CREATION" delay={0.6} /></span>
          </h2>

          <p className="mt-6 text-starlight/55 text-base md:text-lg max-w-md mx-auto">
            My toolkit, charted as four constellations. Hover one to trace it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-20 md:gap-y-24">
          {CONSTELLATIONS.map((c, i) => (
            <Constellation key={c.id} data={c} index={i} />
          ))}
        </div>

        {/* legend */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-[12px] tracking-[0.25em] text-starlight/45">
          <span className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white/20 border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            BRIGHT STAR · DAILY DRIVER
          </span>
          <span className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.05] border border-white/15" />
            FAINT STAR · IN THE TOOLKIT
          </span>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
