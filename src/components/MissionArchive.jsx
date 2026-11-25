import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/*
 * Mission Archive: a ship's database console in the same HUD language as the Pilot ID card.
 *  - left: the record list (index, company, role, years, duration bar)
 *  - right: a holographic viewer that "loads" the selected record (rings draw in, one scan pass)
 *  - bottom: a 2024 → now timeline strip showing when each mission happened
 * Click / ↑ ↓ to browse. Opens on the current mission. Never touches page scroll.
 */

const ease = [0.22, 1, 0.36, 1];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const toMonth = (s) => {
  if (/PRESENT/i.test(s)) { const d = new Date(); return d.getFullYear() * 12 + d.getMonth(); }
  const [m, y] = s.trim().split(" ");
  return +y * 12 + MONTHS.indexOf(m);
};
const fmtDur = (n) => (n < 12 ? `${n} MO${n > 1 ? "S" : ""}` : `${Math.floor(n / 12)} YR ${n % 12} MO`);

const HudCorners = () => (
  <>
    <div className="absolute hud-corner hud-corner-tl" />
    <div className="absolute hud-corner hud-corner-tr" />
    <div className="absolute hud-corner hud-corner-bl" />
    <div className="absolute hud-corner hud-corner-br" />
  </>
);

/* hologram rings + logo, drawn in when a record loads */
const Hologram = ({ m }) => (
  <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
      {[96, 80, 62].map((r, i) => (
        <motion.circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none"
          stroke={i === 1 ? "rgba(6,182,212,0.55)" : "rgba(255,255,255,0.16)"}
          strokeWidth={i === 1 ? 1.2 : 0.8}
          strokeDasharray={i === 2 ? "2 5" : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1 + i * 0.25, ease, delay: i * 0.08 }}
        />
      ))}
      {/* tick marks on the outer ring */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="100" y1="2" x2="100" y2={i % 6 === 0 ? 10 : 6}
          stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}
    </svg>
    {/* projection glow */}
    <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.22),transparent_70%)]" />
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.35, ease }}
      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center"
    >
      {m.logo ? (
        <img src={m.logo} alt="" className="w-11 h-11 md:w-12 md:h-12 object-contain" />
      ) : (
        <span className="font-editorial text-3xl text-starlight/85">{m.initials}</span>
      )}
    </motion.div>
  </div>
);

const Readout = ({ label, value, accent }) => (
  <div className="flex flex-col gap-1.5 min-w-0">
    <span className="font-mono text-[11px] tracking-[0.3em] text-starlight/40">{label}</span>
    <span className={`font-mono text-sm tracking-wider truncate ${accent ? "text-neon-cyan" : "text-starlight/85"}`}>{value}</span>
  </div>
);

const MissionArchive = ({ experiences }) => {
  const records = [
    ...experiences.map((e, i) => {
      const [s, en] = e.period.split("—");
      const start = toMonth(s), end = toMonth(en);
      return {
        key: e.company,
        n: experiences.length - i,
        name: e.companyName ?? e.company,
        title: e.title,
        period: e.period,
        launch: s.trim(),
        ret: /PRESENT/i.test(en) ? "ONGOING" : en.trim(),
        current: /PRESENT/i.test(en),
        type: e.type,
        url: e.url,
        logo: e.logo,
        tech: e.tech,
        start, end,
        months: Math.max(1, end - start + 1),
        years: s.trim().split(" ")[1] === en.trim().split(" ")[1] || /PRESENT/i.test(en)
          ? s.trim().split(" ")[1]
          : `${s.trim().split(" ")[1]}–${en.trim().split(" ")[1].slice(2)}`,
      };
    }),
    { key: "origin", n: 0, origin: true, name: "IIIT Gwalior", title: "Launch pad", period: "CLASS OF 2026", launch: "—", ret: "CLASS OF 2026", type: "ACADEMY", initials: "IG", years: "'26" },
  ];

  const [sel, setSel] = useState(0);
  const r = records[sel];
  const missions = records.filter((x) => !x.origin);
  const maxMonths = Math.max(...missions.map((x) => x.months));
  const t0 = Math.min(...missions.map((x) => x.start));
  const t1 = Math.max(...missions.map((x) => x.end)) + 1;
  const pct = (m) => ((m - t0) / (t1 - t0)) * 100;
  const yearTicks = [];
  for (let y = Math.ceil(t0 / 12); y * 12 < t1; y++) yearTicks.push(y);

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(records.length - 1, s + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
  };

  return (
    <div className="relative max-w-6xl mx-auto px-6 md:px-16">
      <div className="stellar-glass relative outline-none" tabIndex={0} onKeyDown={onKey} aria-label="Mission archive. Use up and down arrow keys to browse records.">
        <HudCorners />

        {/* header strip */}
        <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-3 border-b border-void-line font-mono text-[12px] tracking-[0.3em]">
          <span className="text-starlight/45">MISSION ARCHIVE <span className="text-starlight/20">·</span> {String(records.length).padStart(2, "0")} RECORDS</span>
          <span className="hidden sm:inline text-starlight/30">SELECT A RECORD · ↑ ↓</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.3fr)]">
          {/* record list */}
          <ul className="flex lg:block overflow-x-auto lg:overflow-visible snap-x border-b lg:border-b-0 lg:border-r border-void-line py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {records.map((x, i) => {
              const on = i === sel;
              return (
                <li key={x.key} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    aria-pressed={on}
                    className={`group relative w-auto lg:w-full text-left px-5 lg:px-8 py-3 lg:py-4 flex items-center gap-3 lg:gap-5 transition-colors cursor-pointer ${on ? "bg-white/[0.045]" : "hover:bg-white/[0.02]"}`}
                  >
                    {/* selection bar */}
                    <span className={`absolute left-0 top-2 bottom-2 w-[2px] transition-all duration-300 ${on ? "bg-neon-cyan" : "bg-transparent group-hover:bg-starlight/20"}`} />
                    <span className={`font-mono text-[12px] tracking-[0.2em] w-6 ${on ? "text-neon-cyan" : "text-starlight/30"}`}>
                      {String(x.n).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block font-cinematic text-base md:text-lg tracking-tight whitespace-nowrap lg:truncate transition-colors ${on ? "text-starlight" : "text-starlight/70 group-hover:text-starlight/90"}`}>
                        {x.name}
                      </span>
                      <span className="hidden lg:block mt-0.5 font-mono text-[11px] tracking-[0.15em] text-starlight/40 truncate uppercase">{x.title}</span>
                    </span>
                    <span className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-starlight/45">{x.years}</span>
                      {!x.origin && (
                        <span className="block w-16 h-[3px] bg-starlight/10 overflow-hidden">
                          <span className={`block h-full ${on ? "bg-neon-cyan/80" : "bg-starlight/35"}`} style={{ width: `${Math.max(12, (x.months / maxMonths) * 100)}%` }} />
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* holographic viewer */}
          <div className="relative overflow-hidden min-h-[420px]">
            <div className="absolute inset-0 pointer-events-none opacity-40 [background-image:linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_75%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={r.key}
                className="relative p-6 md:p-8 lg:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {/* single scan pass when a record loads */}
                <motion.span
                  className="absolute inset-x-0 h-24 pointer-events-none bg-gradient-to-b from-transparent via-neon-cyan/[0.12] to-transparent"
                  initial={{ top: "-25%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
                  <Hologram m={r} />
                  <motion.div
                    className="min-w-0"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.45, ease }}
                  >
                    <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.3em] text-starlight/45">
                      <span>{r.origin ? "MSN-00" : `MSN-${String(r.n).padStart(2, "0")}`}</span>
                      <span className="w-6 h-px bg-starlight/20" />
                      <span className={r.current ? "text-neon-cyan" : ""}>{r.current ? "IN FLIGHT" : r.type}</span>
                    </div>
                    <h3 className="mt-3 font-editorial text-4xl md:text-5xl text-starlight leading-none">{r.name}</h3>
                    <div className="mt-4 font-cinematic text-sm md:text-base tracking-[0.22em] text-starlight/80 uppercase">{r.title}</div>
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 font-mono text-[12px] tracking-[0.3em] text-starlight/55 hover:text-supernova transition-colors">
                        OPEN CHANNEL <ArrowUpRight size={13} />
                      </a>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease }}
                >
                  <div className="mt-8 py-4 border-y border-void-line grid grid-cols-3 gap-4">
                    <Readout label="LAUNCH" value={r.launch} />
                    <Readout label="RETURN" value={r.ret} accent={r.current} />
                    <Readout label="DURATION" value={r.months ? fmtDur(r.months) : "4 YRS"} />
                  </div>

                  {r.tech?.length > 0 && (
                    <div className="mt-6">
                      <div className="font-mono text-[11px] tracking-[0.35em] text-starlight/40 mb-3">PAYLOAD</div>
                      <div className="flex flex-wrap gap-2">
                        {r.tech.map((t) => (
                          <span key={t} className="trapezoid-badge !py-1 !px-4 text-[12px] font-bold tracking-widest text-starlight/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {r.origin && (
                    <p className="mt-6 text-starlight/60 leading-relaxed max-w-md">Where the journey began: the launch pad for every mission above.</p>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* timeline strip */}
        <div className="border-t border-void-line px-6 md:px-8 pt-5 pb-7">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.3em] text-starlight/40 mb-4">
            <span>FLIGHT TIMELINE</span>
            <span className="hidden sm:inline text-starlight/25">TAP A SEGMENT</span>
          </div>
          <div className="relative h-14">
            {/* axis */}
            <div className="absolute left-0 right-0 bottom-5 h-px bg-starlight/15" />
            {yearTicks.map((y) => (
              <div key={y} className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center" style={{ left: `${pct(y * 12)}%` }}>
                <span className="w-px h-2 bg-starlight/30 mb-1" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-starlight/35">{y}</span>
              </div>
            ))}
            {/* mission segments */}
            {missions.map((x) => {
              const i = records.indexOf(x);
              const on = i === sel;
              return (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => setSel(i)}
                  title={`${x.name} · ${x.years}`}
                  aria-label={`Select ${x.name}`}
                  className="absolute bottom-[18px] h-3 group cursor-pointer"
                  style={{ left: `${pct(x.start)}%`, width: `${Math.max(1.6, pct(x.end + 1) - pct(x.start))}%` }}
                >
                  <span className={`block w-full h-[5px] mt-[3.5px] transition-all duration-300 ${on ? "bg-neon-cyan shadow-[0_0_12px_rgba(6,182,212,0.7)]" : "bg-starlight/30 group-hover:bg-starlight/60"}`} />
                  <span className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] transition-colors ${on ? "text-starlight/90" : "text-starlight/0 group-hover:text-starlight/60"}`}>
                    {x.name.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionArchive;
