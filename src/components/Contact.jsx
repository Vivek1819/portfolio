import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecipherText from "./common/DecipherText";
import { LINKS } from "./SocialSidebar";

const EMAIL = "vivekhipparkar@gmail.com";
const CHANNELS = LINKS.filter((l) => ["github", "linkedin"].includes(l.label));

/* Tilted, slowly rotating accretion rings + glowing core behind the launch button */
const Wormhole = () => (
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    {/* core glow */}
    <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.55)_0%,rgba(6,182,212,0.2)_40%,transparent_70%)] blur-2xl animate-pulse-aura-slow" />

    {/* tilted disk */}
    <div className="absolute inset-0 [perspective:900px]">
      <div className="absolute inset-0 [transform:rotateX(72deg)] [transform-style:preserve-3d]">
        <div className="absolute inset-0 rounded-full border border-dashed border-neon-cyan/50 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-[10%] rounded-full border border-neon-purple/60 shadow-[0_0_30px_rgba(168,85,247,0.35)] animate-[spin_28s_linear_infinite_reverse]">
          <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-supernova shadow-[0_0_12px_#fbbf24]" />
        </div>
        <div className="absolute inset-[20%] rounded-full border-2 border-dotted border-starlight/30 animate-[spin_18s_linear_infinite]" />
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,transparent_45%,rgba(168,85,247,0.45)_60%,transparent_72%)]" />
      </div>
    </div>

    {/* upright orbit rings */}
    <div className="absolute inset-[18%] rounded-full border border-starlight/[0.1]" />
    <div className="absolute inset-[6%] rounded-full border border-starlight/[0.07]" />
  </div>
);

/* Circular launch button: hover charges a ring with a 3-2-1 countdown, click copies email + opens mail app */
const LaunchButton = () => {
  const [phase, setPhase] = useState("idle"); // idle | charging | ready | sent
  const [count, setCount] = useState(3);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  const charge = () => {
    if (phase === "sent") return;
    clearTimers();
    setPhase("charging");
    setCount(3);
    timers.current.push(
      setTimeout(() => setCount(2), 450),
      setTimeout(() => setCount(1), 900),
      setTimeout(() => setPhase("ready"), 1350),
    );
  };

  const reset = () => {
    if (phase === "sent") return;
    clearTimers();
    setPhase("idle");
  };

  const launch = async () => {
    clearTimers();
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* clipboard unavailable */ }
    setPhase("sent");
    window.location.href = `mailto:${EMAIL}`;
    timers.current.push(setTimeout(() => setPhase("idle"), 3500));
  };

  const R = 86;
  const C = 2 * Math.PI * R;
  const progress = phase === "idle" ? 0 : 1;

  return (
    <div className="relative">
      {/* signal beam on launch */}
      <AnimatePresence>
        {phase === "sent" && (
          <motion.span
            initial={{ scaleY: 0, opacity: 1 }}
            animate={{ scaleY: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 bottom-1/2 -translate-x-1/2 w-[2px] h-[60vh] origin-bottom bg-gradient-to-t from-supernova via-neon-cyan to-transparent shadow-[0_0_20px_#06b6d4] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        onMouseEnter={charge}
        onMouseLeave={reset}
        onFocus={charge}
        onBlur={reset}
        onClick={launch}
        aria-label={`Send a signal: email ${EMAIL}`}
        className="group relative w-48 h-48 md:w-52 md:h-52 rounded-full flex items-center justify-center cursor-pointer outline-none"
      >
        {/* charge ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle
            cx="100" cy="100" r={R} fill="none"
            stroke={phase === "ready" || phase === "sent" ? "#fbbf24" : "#06b6d4"}
            strokeWidth="2" strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            style={{
              transition: phase === "charging" ? "stroke-dashoffset 1.35s linear" : "stroke-dashoffset 0.4s ease-out, stroke 0.3s",
              filter: "drop-shadow(0 0 6px currentColor)",
            }}
          />
        </svg>

        {/* glass core */}
        <span
          className={`absolute inset-4 rounded-full backdrop-blur-md border transition-all duration-500 ${
            phase === "ready" || phase === "sent"
              ? "bg-supernova/15 border-supernova/50 shadow-[0_0_60px_rgba(251,191,36,0.35)]"
              : "bg-white/[0.04] border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
          }`}
        />

        {/* label */}
        <span className="relative w-full h-full grid place-items-center [&>*]:[grid-area:1/1]">
          <AnimatePresence initial={false}>
            {phase === "idle" && (
              <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex flex-col items-center gap-2">
                <span className="celestial-heading text-lg md:text-xl">SEND A<br />SIGNAL</span>
              </motion.span>
            )}
            {phase === "charging" && (
              <motion.span key={`c${count}`} initial={{ opacity: 0, scale: 1.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.25 }} className="celestial-heading text-6xl !text-neon-cyan">
                {count}
              </motion.span>
            )}
            {phase === "ready" && (
              <motion.span key="ready" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                <span className="micro-text !text-[11px] !tracking-[0.4em] text-supernova/70">ALL SYSTEMS GO</span>
                <span className="celestial-heading text-2xl !text-supernova">LAUNCH ▸</span>
              </motion.span>
            )}
            {phase === "sent" && (
              <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                <span className="celestial-heading text-lg !text-supernova">SIGNAL SENT</span>
                <span className="micro-text !text-[11px] !tracking-[0.3em] text-starlight/60">EMAIL COPIED</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </div>
  );
};

const Contact = () => {
  return (
    <section className="relative w-full pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden" id="contact">
      <div className="px-6 md:px-16 max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="micro-text text-neon-cyan mb-8 flex items-center gap-4 justify-center"
        >
          <span className="w-12 h-px bg-neon-cyan/30"></span>
          05 // INITIATE CONNECTION
          <span className="w-12 h-px bg-neon-cyan/30"></span>
        </motion.div>

        <h2 className="celestial-heading text-5xl md:text-7xl xl:text-8xl text-starlight">
          <DecipherText text="THE" delay={0.3} /> <span className="aurora-text"><DecipherText text="UNIVERSE" delay={0.5} /></span>
          <br />
          <DecipherText text="AWAITS." delay={0.8} />
        </h2>

        <p className="mt-8 max-w-md text-starlight/60 text-base md:text-lg leading-relaxed">
          Have a mission in mind? Send a signal and let's build something out of this world.
        </p>

        {/* Launch pad */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mt-10 md:-mt-16 w-[min(92vw,560px)] aspect-square flex items-center justify-center"
        >
          <Wormhole />
          <LaunchButton />
        </motion.div>

        {/* Direct frequency + channels */}
        <div className="-mt-12 md:-mt-16 flex flex-col items-center gap-6">
          <a href={`mailto:${EMAIL}`} className="group flex flex-col items-center gap-2">
            <span className="micro-text !text-[12px] text-starlight/40 group-hover:text-supernova transition-colors">DIRECT FREQUENCY</span>
            <span className="font-cinematic text-lg md:text-xl text-starlight/80 group-hover:text-starlight tracking-wide transition-colors">{EMAIL}</span>
          </a>

          <div className="flex items-center gap-4">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                aria-label={c.label}
                className="w-11 h-11 rounded-full flex items-center justify-center border border-starlight/10 bg-white/[0.03] text-starlight/60 hover:text-supernova hover:border-supernova/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)] transition-all"
              >
                {c.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
