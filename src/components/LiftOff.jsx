import { useEffect, useRef, useState } from "react";

/*
 * Lift-off intro: boot log → 3·2·1 countdown → hyperspace → arrival.
 * Everything is one continuous motion: warp speed builds gently from the first frame,
 * peaks, then decelerates while the site cross-fades in underneath (onReveal), so the
 * hyperspace stars settle into the real starfield with no black gap.
 * rAF-driven (pauses in background tabs). Click / any key skips. Plays on every load.
 */

const BOOT = [
  ["FLIGHT COMPUTER", "ONLINE"],
  ["NAV SYSTEMS", "OK"],
  ["DESTINATION", "VIVEK HIPPARKAR"],
];
const TRANSMISSIONS = ["HELLO", "BONJOUR", "नमस्ते", "HOLA", "こんにちは", "CIAO", "你好", "OLÁ", "GUTEN TAG"];

// timeline (ms)
const T = { boot1: 300, boot2: 800, boot3: 1300, c3: 1800, c2: 2800, c1: 3800, ignite: 4800, reveal: 5800, done: 7400 };
const STAGES = Object.entries(T).sort((a, b) => a[1] - b[1]);
const PEAK = 14;

const smooth = (x) => x * x * (3 - 2 * x); // smoothstep 0..1
const clamp01 = (x) => Math.min(Math.max(x, 0), 1);

/* one continuous speed curve: drift → build → peak → glide to a stop */
const speedAt = (t) => {
  if (t < T.ignite) return 0.12 + 0.9 * smooth(clamp01(t / T.ignite));            // slow build during countdown
  if (t < T.reveal) return 1.02 + (PEAK - 1.02) * smooth(clamp01((t - T.ignite) / (T.reveal - T.ignite)));
  return 0.15 + (PEAK - 0.15) * Math.pow(1 - clamp01((t - T.reveal) / (T.done - T.reveal)), 3); // ease out
};

const LiftOff = ({ onReveal, onComplete }) => {
  const canvasRef = useRef(null);
  const [stage, setStage] = useState("start");
  const [tx, setTx] = useState(0);
  const skipRef = useRef(null);
  const revealedRef = useRef(false);
  const doneRef = useRef(false);

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    onReveal?.();
  };
  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    reveal();
    onComplete();
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, maxR = 0;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maxR = Math.hypot(W, H) / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    // each star starts near-white and shifts into a site palette colour as the jump builds
    const PALETTE = [[6, 182, 212], [168, 85, 247], [168, 85, 247], [251, 191, 36]]; // cyan, purple (x2), gold
    const tints = [[255, 255, 255], [207, 250, 254], [233, 213, 255]];
    const stars = Array.from({ length: 520 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random() * maxR,
      s: 0.6 + Math.random() * 0.8,
      c: tints[Math.random() < 0.8 ? 0 : 1 + Math.floor(Math.random() * 2)],
      p: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }));

    let start = null, last = null, raf = 0, lastStage = "start", lastTx = -1;

    const frame = (now) => {
      if (start === null) { start = now; last = now; }
      const dt = Math.min(now - last, 50);
      last = now;
      let t = now - start;

      // skip → jump straight into the arrival / cross-fade
      if (skipRef.current !== null) t = Math.max(t, T.reveal + (now - skipRef.current));

      let st = "start";
      for (const [name, at] of STAGES) if (t >= at) st = name;
      if (st !== lastStage) { lastStage = st; setStage(st); }
      if (t >= T.reveal) reveal();

      const txi = Math.floor(t / 280) % TRANSMISSIONS.length;
      if (t < T.c3 && txi !== lastTx) { lastTx = txi; setTx(txi); }

      const speed = speedAt(t);
      const intensity = speed / PEAK; // 0..1, drives trail persistence
      // 0 → 1 from the last count to arrival: how much of the site palette bleeds in
      const warmth = smooth(clamp01((t - T.c1) / (T.reveal - T.c1)));
      const mix = (a, b, k) => Math.round(a + (b - a) * k);

      // arrival: 0 → 1 after reveal. The void thins out to show the site underneath,
      // while the streaks keep drifting over it and fade (no opacity dip).
      const arrival = clamp01((t - T.reveal) / (T.done - T.reveal));
      const bgR = mix(2, 24, warmth), bgG = mix(2, 14, warmth), bgB = mix(4, 58, warmth); // near-black → deep indigo-purple
      if (arrival === 0) {
        ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},${0.55 - intensity * 0.2})`; // translucent fill = motion trails
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},${1 - smooth(arrival)})`;
        ctx.fillRect(0, 0, W, H);
      }
      const starFade = 1 - arrival * arrival;
      const cx = W / 2, cy = H / 2;

      for (const p of stars) {
        const step = (p.r * 0.012 + 0.35) * speed * p.s * (dt / 16);
        const prev = p.r;
        p.r += step;
        if (p.r > maxR) { p.r = Math.random() * 60 + 4; continue; }
        const cos = Math.cos(p.a), sin = Math.sin(p.a);
        const alpha = Math.min(0.75, (p.r / maxR) * 1.1 + 0.1) * starFade;
        const trail = Math.min(p.r, Math.max(1.2, (p.r - prev) * 2.5));
        const k = warmth * 0.85;
        ctx.strokeStyle = `rgba(${mix(p.c[0], p.p[0], k)},${mix(p.c[1], p.p[1], k)},${mix(p.c[2], p.p[2], k)},${alpha})`;
        ctx.lineWidth = Math.min(1.4, 0.5 + (p.r / maxR) * 1.1 * p.s);
        ctx.beginPath();
        ctx.moveTo(cx + cos * (p.r - trail), cy + sin * (p.r - trail));
        ctx.lineTo(cx + cos * p.r, cy + sin * p.r);
        ctx.stroke();
      }

      if (t >= T.done) { finish(); return; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const skip = () => { if (skipRef.current === null) skipRef.current = performance.now(); };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const at = (name) => STAGES.findIndex(([n]) => n === stage) >= STAGES.findIndex(([n]) => n === name);
  const count = at("c1") ? 1 : at("c2") ? 2 : at("c3") ? 3 : null;
  const igniting = at("ignite");
  const revealing = at("reveal");

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden select-none ${
        revealing ? "pointer-events-none" : "bg-[#020204] cursor-pointer"
      }`}
      aria-label="Intro animation. Click or press any key to skip."
      role="presentation"
    >
      <style>{`
        @keyframes softIn { 0%{opacity:0; transform:translateY(6px)} 100%{opacity:1; transform:translateY(0)} }
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)] transition-opacity duration-[1400ms] ${revealing ? "opacity-0" : "opacity-100"}`} />

      {/* boot log */}
      <div className={`absolute left-6 md:left-12 bottom-10 md:bottom-14 font-mono text-[11px] md:text-[12px] tracking-[0.25em] space-y-2 transition-opacity duration-1000 ${igniting ? "opacity-0" : "opacity-100"}`}>
        {BOOT.map(([k, v], i) =>
          at(`boot${i + 1}`) ? (
            <div key={k} className="flex gap-3 animate-[softIn_0.6s_ease-out]">
              <span className="text-neon-cyan/70">{">"}</span>
              <span className="text-starlight/40">{k}</span>
              <span className="text-starlight/15 hidden sm:inline">{".".repeat(18 - k.length + 4)}</span>
              <span className={i === 2 ? "text-starlight/80" : "text-neon-cyan/70"}>{v}</span>
            </div>
          ) : null
        )}
      </div>

      {/* incoming transmissions */}
      <div className={`absolute top-10 md:top-14 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.3em] text-starlight/30 whitespace-nowrap transition-opacity duration-1000 ${count || igniting ? "opacity-0" : "opacity-100"}`}>
        INCOMING TRANSMISSION <span className="text-starlight/15">//</span> <span className="text-starlight/60 inline-block min-w-[7ch]">{TRANSMISSIONS[tx]}</span>
      </div>

      {/* countdown */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${count && !igniting ? "opacity-100 scale-100" : igniting ? "opacity-0 scale-110" : "opacity-0 scale-95"}`}>
          <svg className="absolute w-44 h-44 md:w-52 md:h-52 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
            <circle
              cx="50" cy="50" r="46" fill="none"
              stroke="rgba(6,182,212,0.7)" strokeWidth="0.5" strokeLinecap="round"
              strokeDasharray={289} strokeDashoffset={igniting ? 0 : 289 * ((count ?? 3) / 3) - 96}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span key={count ?? "x"} className="font-cinematic font-light text-7xl md:text-8xl text-starlight/85 leading-none animate-[softIn_0.6s_ease-out]">
            {count ?? 1}
          </span>
          <span className="absolute -bottom-14 md:-bottom-16 whitespace-nowrap font-mono text-[11px] tracking-[0.5em] text-starlight/35">
            T-MINUS
          </span>
        </div>
      </div>

      {/* soft glow that swells with the jump */}
      <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3),rgba(6,182,212,0.12)_45%,rgba(30,27,75,0.25)_75%,transparent)] transition-opacity duration-[1400ms] ${igniting && !revealing ? "opacity-100" : "opacity-0"}`} />

      <div className={`absolute right-6 md:right-12 bottom-10 md:bottom-14 font-mono text-[11px] tracking-[0.3em] text-starlight/25 transition-opacity duration-1000 ${igniting ? "opacity-0" : "opacity-100"}`}>
        CLICK / ANY KEY TO SKIP
      </div>
    </div>
  );
};

export default LiftOff;
