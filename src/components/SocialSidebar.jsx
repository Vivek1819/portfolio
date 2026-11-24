import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const LINKS = [
  {
    href: "https://github.com/Vivek1819",
    id: "01",
    label: "github",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/vivekhipparkar/",
    id: "02",
    label: "linkedin",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/vivekh_19/",
    id: "03",
    label: "instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: "mailto:vivekhipparkar@gmail.com",
    id: "04",
    label: "email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

const EMAIL = LINKS.find((l) => l.label === "email").href.replace("mailto:", "");

/* Tuner geometry: channels sit on a vertical dial, PAD from each end, GAP apart */
const PAD = 28;
const GAP = 60;
const DIAL_H = PAD * 2 + GAP * (LINKS.length - 1);
const FREQS = ["98.6", "101.2", "104.7", "107.9"];
const chY = (i) => PAD + i * GAP;

const SignalBars = ({ on }) => (
  <span className="flex items-end gap-[2px] h-3">
    {[4, 7, 10, 13].map((h, i) => (
      <span
        key={i}
        className={`w-[3px] transition-colors duration-300 ${on ? "bg-neon-cyan" : "bg-starlight/20"}`}
        style={{ height: h, transitionDelay: `${i * 60}ms` }}
      />
    ))}
  </span>
);

const SocialSidebar = () => {
  const [scan, setScan] = useState(0);       // channel the idle needle is passing
  const [locked, setLocked] = useState(null); // channel under the cursor
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  // idle: needle sweeps from channel to channel like a radio seeking a station
  useEffect(() => {
    if (locked !== null) return;
    const id = setInterval(() => setScan((s) => (s + 1) % LINKS.length), 1800);
    return () => clearInterval(id);
  }, [locked]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const active = locked ?? scan;
  const isLocked = locked !== null;

  const copyEmail = async (e, href) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = href;
    }
  };

  return (
    <motion.aside
      className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:block pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      aria-label="Social links"
    >
      {/* frequency readout (absolute, so it doesn't shift the dial off-centre) */}
      <div className="absolute bottom-full mb-4 left-0 font-mono text-[10px] tracking-[0.25em] whitespace-nowrap">
        <div className="text-starlight/35">FREQ</div>
        <div className={`text-[12px] tracking-[0.15em] transition-colors duration-300 ${isLocked ? "text-supernova" : "text-neon-cyan/80"}`}>
          {FREQS[active]} <span className="text-starlight/35">MHz</span>
        </div>
      </div>

      {/* the dial */}
      <div className="relative w-[64px]" style={{ height: DIAL_H }}>
        {/* spine */}
        <div className="absolute left-[6px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-starlight/25 to-transparent" />

        {/* minor ticks */}
        {Array.from({ length: Math.floor(DIAL_H / 10) + 1 }).map((_, i) => (
          <span key={i} className="absolute left-[6px] h-px w-[5px] bg-starlight/15" style={{ top: i * 10 }} />
        ))}

        {/* needle */}
        <motion.div
          className="absolute left-0 -translate-y-1/2 flex items-center pointer-events-none"
          animate={{ top: chY(active) }}
          transition={{ type: "spring", stiffness: isLocked ? 380 : 90, damping: isLocked ? 28 : 18 }}
        >
          <span className={`w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] transition-colors duration-300 ${isLocked ? "border-l-supernova" : "border-l-neon-cyan"}`} />
          <span
            className={`h-[2px] w-[14px] transition-all duration-300 ${
              isLocked ? "bg-supernova shadow-[0_0_10px_#fbbf24]" : "bg-neon-cyan shadow-[0_0_10px_#06b6d4]"
            }`}
          />
        </motion.div>

        {/* channels */}
        {LINKS.map((link, i) => {
          const isEmail = link.label === "email";
          const on = active === i;
          const lockedHere = locked === i;
          const showCopied = isEmail && copied;
          return (
            <div
              key={link.id}
              className="absolute left-[22px] -translate-y-1/2 flex items-center pointer-events-auto"
              style={{ top: chY(i) }}
              onMouseEnter={() => setLocked(i)}
              onMouseLeave={() => setLocked(null)}
            >
              {/* major tick */}
              <span className={`absolute -left-[16px] h-px transition-all duration-300 ${on ? "w-[12px] bg-starlight/70" : "w-[9px] bg-starlight/35"}`} />

              <a
                href={link.href}
                onClick={isEmail ? (e) => copyEmail(e, link.href) : undefined}
                onFocus={() => setLocked(i)}
                onBlur={() => setLocked(null)}
                target={isEmail ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={isEmail ? `Copy email ${EMAIL}` : link.label}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
                  showCopied
                    ? "border-neon-cyan/70 text-neon-cyan bg-neon-cyan/10 shadow-[0_0_18px_rgba(6,182,212,0.45)]"
                    : lockedHere
                      ? "border-supernova/60 text-supernova bg-supernova/10 shadow-[0_0_18px_rgba(251,191,36,0.35)] scale-110"
                      : on
                        ? "border-neon-cyan/40 text-starlight bg-white/[0.05]"
                        : "border-starlight/10 text-starlight/55 bg-white/[0.02]"
                }`}
              >
                {link.icon}
              </a>

              {/* locked-channel readout */}
              <span
                className={`absolute left-12 flex items-center gap-3 whitespace-nowrap px-3 py-1.5 border backdrop-blur-md font-mono text-[11px] tracking-[0.25em] pointer-events-none transition-all duration-300 ${
                  lockedHere || showCopied
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                } ${showCopied ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" : "border-starlight/10 bg-void-900/75 text-starlight/85"}`}
              >
                <span className="text-supernova/80">CH-{link.id}</span>
                <span className="text-starlight/40">{FREQS[i]}</span>
                <span>{isEmail ? (copied ? "SIGNAL COPIED ✓" : "COPY EMAIL") : link.label.toUpperCase()}</span>
                <SignalBars on={lockedHere || showCopied} />
              </span>
            </div>
          );
        })}
      </div>

      {/* status (absolute below the dial) */}
      <div className="absolute top-full mt-4 left-0 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] whitespace-nowrap">
        <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? "bg-supernova" : "bg-neon-cyan animate-pulse"}`} />
        <span className={isLocked ? "text-supernova/90" : "text-starlight/40"}>{isLocked ? "LOCKED" : "SCANNING…"}</span>
      </div>
    </motion.aside>
  );
};

export default SocialSidebar;
