import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { BookOpen, Trophy, Plane, Gamepad2, Satellite, Telescope } from "lucide-react";

/* ───────────────────────── Captain's Log ───────────────────────── */

const LOG_LINES = [
  "Software engineer at AiPrise, building identity verification & compliance infrastructure (KYC / KYB).",
  "I care about system design and building products that feel as good as they perform.",
  "I love taking an idea from a blank file to something people actually use.",
  "Based in Bangalore. Always up for a hard problem.",
];

const STATS = [
  { label: "EXPERIENCE", to: 1, suffix: "Y+" },
  { label: "PROJECTS", to: 20, suffix: "+" },
  { label: "COMMITS", to: 1, suffix: "k+" },
];

const CountUp = ({ to, suffix, start }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [start, to]);
  return <>{v}{suffix}</>;
};

export const CaptainsLog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const total = LOG_LINES.reduce((n, l) => n + l.length, 0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTyped(total); return; }
    const id = setInterval(() => setTyped((t) => (t >= total ? (clearInterval(id), t) : t + 2)), 16);
    return () => clearInterval(id);
  }, [inView, total]);

  // split the typed character budget across lines
  let budget = typed;
  const shown = LOG_LINES.map((line) => {
    const s = line.slice(0, Math.max(0, budget));
    budget -= line.length;
    return s;
  });
  const activeLine = shown.findIndex((s, i) => s.length < LOG_LINES[i].length);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="stellar-glass group relative h-full flex flex-col"
    >
      <div className="absolute hud-corner hud-corner-tl group-hover:w-4 group-hover:h-4 transition-all" />
      <div className="absolute hud-corner hud-corner-tr group-hover:w-4 group-hover:h-4 transition-all" />
      <div className="absolute hud-corner hud-corner-bl group-hover:w-4 group-hover:h-4 transition-all" />
      <div className="absolute hud-corner hud-corner-br group-hover:w-4 group-hover:h-4 transition-all" />

      {/* header */}
      <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-3 border-b border-void-line">
        <span className="font-mono text-[12px] tracking-[0.3em] text-supernova">CAPTAIN'S LOG</span>
        <span className="font-mono text-[12px] tracking-[0.3em] text-starlight/40">STARDATE 2026.11 · BANGALORE</span>
      </div>

      {/* log body */}
      <div className="flex-1 px-6 md:px-8 py-8 space-y-5">
        {LOG_LINES.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className={`font-mono text-sm pt-1 shrink-0 ${shown[i].length ? "text-neon-cyan" : "text-transparent"}`}>{">"}</span>
            {/* invisible full line reserves height so the card doesn't grow while typing */}
            <p className={`relative leading-relaxed ${i === 0 ? "text-xl md:text-2xl font-cinematic text-starlight/90 tracking-tight" : "text-base md:text-lg text-starlight/65"}`}>
              <span className="invisible">{line}</span>
              <span className="absolute inset-0">
                {i === 0
                  ? shown[i].split("AiPrise").flatMap((part, k, arr) =>
                      k < arr.length - 1 ? [part, <span key={k} className="text-neon-cyan">AiPrise</span>] : [part]
                    )
                  : shown[i]}
                {i === activeLine && (
                  <span className="inline-block w-[0.55em] h-[1.1em] align-[-0.15em] ml-0.5 bg-neon-cyan/70" />
                )}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* flight record */}
      <div className="grid grid-cols-3 border-t border-void-line divide-x divide-white/5">
        {STATS.map((s) => (
          <div key={s.label} className="px-6 md:px-8 py-5">
            <div className="font-mono text-[11px] tracking-[0.3em] text-starlight/40 mb-2">{s.label}</div>
            <div className="text-3xl md:text-4xl font-cinematic text-starlight">
              <CountUp to={s.to} suffix={s.suffix} start={inView} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ───────────────────────── Current Orbit ───────────────────────── */

const HOBBIES = [
  { name: "Reading", icon: BookOpen },
  { name: "Sports", icon: Trophy },
  { name: "Travelling", icon: Plane },
  { name: "Gaming", icon: Gamepad2 },
];

const OrbitTile = ({ label, status, icon: Icon, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="stellar-glass group relative px-6 py-5 flex-1 flex flex-col justify-center"
  >
    <div className="absolute hud-corner hud-corner-tl group-hover:w-4 group-hover:h-4 transition-all" />
    <div className="absolute hud-corner hud-corner-br group-hover:w-4 group-hover:h-4 transition-all" />
    <div className="flex items-center justify-between mb-3">
      <span className="flex items-center gap-2.5 font-mono text-[12px] tracking-[0.3em] text-starlight/45">
        <Icon size={14} className="text-neon-cyan/80" />
        {label}
      </span>
      <span className="font-editorial text-lg text-starlight/35 leading-none">{status.text}</span>
    </div>
    {children}
  </motion.div>
);

export const CurrentOrbit = () => (
  <div className="flex flex-col gap-4 h-full">
    <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.3em] text-starlight/50 mb-1">
      CURRENT ORBIT
      <span className="flex-1 h-px bg-starlight/10" />
    </div>

    <OrbitTile label="NOW BUILDING" icon={Satellite} delay={0} status={{ text: "01" }}>
      <div className="font-cinematic text-lg md:text-xl text-starlight tracking-tight">Identity & compliance infra at AiPrise</div>
      <div className="mt-2 font-mono text-sm text-starlight/50 tracking-wider">KYC · KYB · FRAUD CHECKS</div>
    </OrbitTile>

    <OrbitTile label="CHARTING" icon={Telescope} delay={0.1} status={{ text: "02" }}>
      <div className="font-cinematic text-lg md:text-xl text-starlight tracking-tight">Backend systems & system design</div>
      <div className="mt-2 font-mono text-sm text-starlight/50 tracking-wider">APIS · DATABASES · CACHING · QUEUES</div>
    </OrbitTile>

    <OrbitTile label="OFF-DUTY" icon={Gamepad2} delay={0.2} status={{ text: "03" }}>
      <div className="grid grid-cols-2 gap-2 mt-1">
        {HOBBIES.map(({ name, icon: I }) => (
          <span
            key={name}
            className="flex items-center gap-2.5 px-3 py-2 border border-starlight/10 bg-white/[0.03] text-starlight/80 text-base hover:border-neon-purple/50 hover:text-starlight hover:bg-neon-purple/10 transition-colors"
          >
            <I size={15} className="text-neon-purple/80" />
            {name}
          </span>
        ))}
      </div>
    </OrbitTile>
  </div>
);
