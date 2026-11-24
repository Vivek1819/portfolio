import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PILOT = {
  name: "VIVEK HIPPARKAR",
  role: "SOFTWARE ENGINEER",
  crewId: "VH-2026",
  portrait: "/ghibli.png",
  fields: [
    { label: "CURRENT MISSION", value: "AIPRISE", accent: true },
    { label: "HOME BASE", value: "BANGALORE" },
    { label: "SPECIALTY", value: "BACKEND & INFRA" },
    { label: "TRAINING", value: "DSA & SYSTEM DESIGN" },
    { label: "ACADEMY", value: "IIIT GWALIOR '26" },
    { label: "CLEARANCE", value: "LEVEL IV", bars: 4 },
  ],
  mrz: "VH<HIPPARKAR<<VIVEK<<<<<<<<<<SWE<<AIPRISE<<<2026",
};

/* Pseudo-barcode: deterministic stripe widths from the crew id */
const Barcode = () => {
  const widths = "31213121132131221312312112313211231".split("").map(Number);
  return (
    <div className="flex items-stretch h-8 gap-[2px] opacity-70" aria-hidden="true">
      {widths.map((w, i) => (
        <span key={i} className={i % 2 ? "bg-transparent" : "bg-starlight/70"} style={{ width: `${w}px` }} />
      ))}
    </div>
  );
};

const Field = ({ label, value, accent, bars }) => (
  <div className="flex flex-col gap-1.5 min-w-0">
    <span className="font-mono text-[11px] tracking-[0.3em] text-starlight/40">{label}</span>
    {bars ? (
      <span className="flex items-center gap-3">
        <span className="font-mono text-sm tracking-wider text-starlight/85">{value}</span>
        <span className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`w-1.5 h-3 ${i < bars ? "bg-neon-cyan shadow-[0_0_6px_#06b6d4]" : "bg-starlight/15"}`} />
          ))}
        </span>
      </span>
    ) : (
      <span className={`font-mono text-sm tracking-wider truncate ${accent ? "text-neon-cyan" : "text-starlight/85"}`}>{value}</span>
    )}
  </div>
);

const PilotIDCard = () => {
  // subtle 3D tilt toward the cursor, like holding a holographic card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });
  const sheenX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1400px]"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="stellar-glass group relative rounded-none"
      >
        <div className="absolute hud-corner hud-corner-tl group-hover:w-4 group-hover:h-4 transition-all" />
        <div className="absolute hud-corner hud-corner-tr group-hover:w-4 group-hover:h-4 transition-all" />
        <div className="absolute hud-corner hud-corner-bl group-hover:w-4 group-hover:h-4 transition-all" />
        <div className="absolute hud-corner hud-corner-br group-hover:w-4 group-hover:h-4 transition-all" />

        {/* holographic sheen that follows the cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen z-20"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 30%, rgba(6,182,212,0.10) 42%, rgba(168,85,247,0.12) 50%, rgba(251,191,36,0.08) 58%, transparent 70%)",
            backgroundSize: "250% 100%",
            backgroundPositionX: sheenX,
          }}
        />

        {/* header strip */}
        <div className="relative flex items-center justify-between gap-4 px-6 md:px-8 py-3 border-b border-void-line">
          <span className="font-mono text-[12px] tracking-[0.3em] text-starlight/45">DEEP SPACE ENGINEERING · CREW MANIFEST</span>
          <span className="hidden sm:inline font-mono text-[12px] tracking-[0.3em] text-supernova">ID // {PILOT.crewId}</span>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
          {/* portrait */}
          <div className="relative h-80 md:h-auto md:min-h-[340px] overflow-hidden border-b md:border-b-0 md:border-r border-void-line">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,0.35),rgba(6,182,212,0.08)_45%,transparent_75%)]" />
            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_75%)]" />
            {/* tiny stars */}
            {[[18, 20], [78, 14], [64, 32], [24, 48], [86, 56]].map(([x, y], i) => (
              <span key={i} className="absolute w-[3px] h-[3px] rounded-full bg-white/70 animate-pulse" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.6}s` }} />
            ))}
            <img
              src={PILOT.portrait}
              alt="Illustrated portrait of Vivek"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[92%] w-auto max-w-none object-contain object-bottom [filter:drop-shadow(0_0_24px_rgba(168,85,247,0.35))] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* scanlines + bottom fade */}
            <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_3px)]" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void-900/70 to-transparent pointer-events-none" />
            {/* viewfinder brackets */}
            <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-neon-cyan/60" />
            <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-neon-cyan/60" />
            <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-neon-cyan/60" />
            <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-neon-cyan/60" />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.3em] text-starlight/60 whitespace-nowrap">
              BIOMETRIC · VERIFIED
            </span>
          </div>

          {/* details */}
          <div className="relative p-6 md:p-8 lg:p-10 flex flex-col">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] tracking-[0.3em] text-starlight/40 mb-2">PILOT</div>
                <h3 className="celestial-heading text-3xl md:text-4xl lg:text-5xl text-starlight">{PILOT.name}</h3>
                <div className="mt-3 font-cinematic text-sm md:text-base font-bold tracking-[0.3em] text-neon-cyan">{PILOT.role}</div>
              </div>
              <div className="px-4 py-2 border border-neon-cyan/30 bg-neon-cyan/5 status-pulse-cyan">
                <span className="text-neon-cyan font-mono font-bold tracking-widest text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                  STATUS: ACTIVE
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 py-6 border-y border-void-line">
              {PILOT.fields.map((f) => <Field key={f.label} {...f} />)}
            </div>

            {/* barcode + machine-readable line */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="font-mono text-[12px] md:text-sm tracking-[0.2em] text-starlight/35 break-all leading-relaxed">
                {PILOT.mrz}
              </div>
              <Barcode />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PilotIDCard;
