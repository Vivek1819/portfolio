import { useEffect, useRef } from "react";

/*
 * CosmosBackground — refined replacement for UniverseBackground.
 *  - crisp (devicePixelRatio-aware), cleared every frame → true blacks, vivid colour
 *  - noise-generated nebula (indigo / violet / magenta / cyan) with dust lanes + a faint
 *    galactic band, rendered ONCE to an offscreen layer
 *  - scroll parallax: nebula, far stars and near stars drift at different rates
 *  - a soft "colour journey" light whose hue shifts down the page
 *  - a few bright stars with diffraction spikes; only some stars twinkle
 *  - the black hole is a pre-rendered sprite that lives in the hero and parallaxes away
 *  - keeps the warp-jump star stretch; pauses when the tab is hidden; static for reduced motion
 */

/* ── tiny value-noise + fBm ─────────────────────────────────────────── */
const makeNoise = (seed = 1) => {
  const P = new Uint8Array(512);
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const base = Array.from({ length: 256 }, (_, i) => i).sort(() => rnd() - 0.5);
  for (let i = 0; i < 512; i++) P[i] = base[i & 255];
  const V = Array.from({ length: 256 }, () => rnd());
  const fade = (t) => t * t * (3 - 2 * t);
  const n2 = (x, y) => {
    const xi = Math.floor(x) & 255, yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const a = V[P[P[xi] + yi]], b = V[P[P[xi + 1] + yi]];
    const c = V[P[P[xi] + yi + 1]], d = V[P[P[xi + 1] + yi + 1]];
    const u = fade(xf), v = fade(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  return (x, y, oct = 5) => {
    let f = 0, amp = 0.5, fr = 1, norm = 0;
    for (let o = 0; o < oct; o++) { f += amp * n2(x * fr, y * fr); norm += amp; amp *= 0.5; fr *= 2.03; }
    return f / norm;
  };
};

const lerp = (a, b, t) => a + (b - a) * t;
const mixRGB = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
const clamp01 = (x) => Math.min(1, Math.max(0, x));

const NEBULA = {
  indigo: [38, 30, 110],
  violet: [124, 58, 237],
  magenta: [192, 38, 211],
  cyan: [6, 182, 212],
};

/* ── offscreen: nebula + galactic band + far stars ─────────────────── */
const renderStaticLayer = (W, H) => {
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d");

  // deep-space base
  const base = g.createLinearGradient(0, 0, W * 0.3, H);
  base.addColorStop(0, "#05030d");
  base.addColorStop(0.5, "#070416");
  base.addColorStop(1, "#04030a");
  g.fillStyle = base; g.fillRect(0, 0, W, H);

  // nebula from two noise fields, computed at low res then upscaled smoothly
  const lw = 720, lh = Math.max(240, Math.round((720 * H) / W));
  const low = document.createElement("canvas");
  low.width = lw; low.height = lh;
  const lg = low.getContext("2d");
  const img = lg.createImageData(lw, lh);
  const nA = makeNoise(7), nB = makeNoise(23), nD = makeNoise(51);
  for (let y = 0; y < lh; y++) {
    for (let x = 0; x < lw; x++) {
      const u = x / lw * 3.2, v = y / lh * (3.2 * lh / lw);
      const density = nA(u, v);                         // where gas is
      const hue = nB(u * 0.7 + 10, v * 0.7);            // which colour
      const dust = nD(u * 1.8 + 4, v * 1.8);            // dark lanes
      const fine = nA(u * 4.5 + 70, v * 4.5 + 70, 3);
      let a = clamp01((density - 0.36) * 2.2 + (fine - 0.5) * 0.5);
      a *= 1 - clamp01((dust - 0.55) * 3) * 0.75;
      // colour ramp: indigo → violet → magenta, with cyan pockets
      let col = hue < 0.5 ? mixRGB(NEBULA.indigo, NEBULA.violet, hue * 2) : mixRGB(NEBULA.violet, NEBULA.magenta, (hue - 0.5) * 2);
      const cyanAmt = clamp01((nB(u * 1.3 + 30, v * 1.3 + 5) - 0.58) * 4);
      col = mixRGB(col, NEBULA.cyan, cyanAmt * 0.9);
      const magAmt = clamp01((nA(u * 0.9 + 50, v * 0.9 + 20) - 0.56) * 4);
      col = mixRGB(col, NEBULA.magenta, magAmt * 0.7);
      const i = (y * lw + x) * 4;
      img.data[i] = col[0]; img.data[i + 1] = col[1]; img.data[i + 2] = col[2];
      img.data[i + 3] = Math.round(a * a * 215);
    }
  }
  lg.putImageData(img, 0, 0);
  g.save();
  g.globalCompositeOperation = "screen";
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = "high";
  g.filter = "blur(1.2px) saturate(1.3) contrast(1.12)";
  g.drawImage(low, 0, 0, W, H);
  g.filter = "none";
  g.restore();

  // faint galactic band (diagonal), made of fine dust + tiny stars
  g.save();
  g.translate(W * 0.5, H * 0.5); g.rotate(-0.42);
  const bandW = Math.hypot(W, H);
  const band = g.createLinearGradient(0, -H * 0.18, 0, H * 0.18);
  band.addColorStop(0, "rgba(160,140,255,0)");
  band.addColorStop(0.5, "rgba(170,150,255,0.07)");
  band.addColorStop(1, "rgba(160,140,255,0)");
  g.fillStyle = band; g.fillRect(-bandW / 2, -H * 0.18, bandW, H * 0.36);
  for (let k = 0; k < 2600; k++) {
    const x = (Math.random() - 0.5) * bandW;
    const y = (Math.random() + Math.random() + Math.random() - 1.5) * H * 0.09;
    g.fillStyle = `rgba(230,225,255,${Math.random() * 0.45 + 0.08})`;
    g.fillRect(x, y, Math.random() < 0.9 ? 0.8 : 1.4, Math.random() < 0.9 ? 0.8 : 1.4);
  }
  g.restore();

  // a distant spiral galaxy
  drawGalaxy(g, W * 0.12, H * 0.7, Math.min(380, W * 0.26), -0.5, 0.45);

  // far star field (baked)
  const tints = ["255,255,255", "214,226,255", "233,213,255", "186,230,253", "255,236,210"];
  for (let k = 0; k < Math.round((W * H) / 900); k++) {
    const r = Math.random();
    g.fillStyle = `rgba(${tints[(Math.random() * tints.length) | 0]},${Math.random() * 0.55 + 0.15})`;
    g.beginPath(); g.arc(Math.random() * W, Math.random() * H, r < 0.92 ? 0.55 : 0.95, 0, Math.PI * 2); g.fill();
  }
  return c;
};

/* ── offscreen: the black hole sprite (accretion disk + lensing + photon ring) ── */
const BH_TILT = -0.06;   // roll of the accretion disk
const BH_FLAT = 0.17;    // how edge-on we see it

/*
 * The black hole is built from three pre-rendered pieces so the disk can rotate cheaply:
 *  - bloom: soft glow around everything
 *  - disk:  a top-down texture of turbulent glowing gas (bands + clumps), drawn each frame
 *           rotated and squashed — the back half behind the shadow, the front half over it
 *  - core:  the shadow, the lensed glow arching over/under it and the photon ring
 */
const renderBlackHole = (R) => {
  const S = Math.ceil(R * 16);
  const mk = (w, h = w) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return [c, c.getContext("2d")]; };
  const cx = S / 2, cy = S / 2;

  // bloom
  const [bloom, b] = mk(S);
  const bg = b.createRadialGradient(cx, cy, R, cx, cy, R * 7);
  bg.addColorStop(0, "rgba(168,110,250,0.26)");
  bg.addColorStop(0.3, "rgba(124,58,237,0.1)");
  bg.addColorStop(0.65, "rgba(80,70,200,0.05)");
  bg.addColorStop(1, "rgba(0,0,0,0)");
  b.fillStyle = bg; b.fillRect(0, 0, S, S);

  // disk texture (top-down)
  const D = Math.ceil(R * 13);
  const [disk, d] = mk(D);
  const img = d.createImageData(D, D);
  const nBand = makeNoise(91), nWarp = makeNoise(13), nClump = makeNoise(57);
  const inner = 1.55, outer = 6.2;
  const ramp = [
    [0.0, [246, 232, 255]],
    [0.12, [226, 190, 255]],
    [0.35, [192, 140, 250]],
    [0.6, [139, 92, 246]],
    [1.0, [67, 56, 202]],
  ];
  const colAt = (k) => {
    for (let i = 1; i < ramp.length; i++) {
      if (k <= ramp[i][0]) {
        const [k0, c0] = ramp[i - 1], [k1, c1] = ramp[i];
        return mixRGB(c0, c1, (k - k0) / (k1 - k0));
      }
    }
    return ramp[ramp.length - 1][1];
  };
  for (let y = 0; y < D; y++) {
    for (let x = 0; x < D; x++) {
      const dx = (x - D / 2) / R, dy = (y - D / 2) / R;
      const r = Math.hypot(dx, dy);
      if (r < inner || r > outer) continue;
      const th = Math.atan2(dy, dx);
      const k = (r - inner) / (outer - inner);              // 0 inner edge → 1 outer edge
      const warpN = nWarp(Math.cos(th) * 2.2 + 9, Math.sin(th) * 2.2 + 9, 3);
      const band = nBand(r * 2.6 + warpN * 1.6, 3.3, 4);    // concentric streaky bands
      const clump = nClump(dx * 0.9 + 20, dy * 0.9 + 20, 4); // brighter knots of gas
      const edge = Math.min(1, (r - inner) / 0.12);          // crisp but anti-aliased inner edge
      let I = Math.pow(1 - k, 2.1) * edge * 0.62;
      I *= 0.45 + 0.9 * band;
      I *= 0.7 + 0.6 * clump;
      const col = colAt(k);
      const i = (y * D + x) * 4;
      img.data[i] = col[0]; img.data[i + 1] = col[1]; img.data[i + 2] = col[2];
      img.data[i + 3] = Math.min(255, Math.round(I * 255));
    }
  }
  d.putImageData(img, 0, 0);

  // core: shadow + lensed glow + photon ring
  const [core, g] = mk(S);
  const shadow = g.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.04);
  shadow.addColorStop(0, "#000"); shadow.addColorStop(0.93, "#000"); shadow.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = shadow; g.beginPath(); g.arc(cx, cy, R * 1.04, 0, Math.PI * 2); g.fill();
  g.globalCompositeOperation = "lighter";
  // the far side of the disk, bent by gravity into a bright halo over the top
  // (thick and warm like the disk itself) and a thinner, dimmer one underneath
  for (let i = 0; i < 34; i++) {
    const t = i / 34;
    const rr = R * (1.06 + t * 0.95);
    const a = Math.pow(1 - t, 1.5);
    const top = g.createLinearGradient(cx - rr, cy - rr, cx + rr, cy);
    top.addColorStop(0, "rgba(236,222,255," + 0.34 * a + ")");
    top.addColorStop(0.45, "rgba(210,180,255," + 0.28 * a + ")");
    top.addColorStop(0.75, "rgba(170,130,250," + 0.2 * a + ")");
    top.addColorStop(1, "rgba(120,100,230," + 0.12 * a + ")");
    g.strokeStyle = top; g.lineWidth = 1.6 + t * 2.6;
    g.beginPath(); g.ellipse(cx, cy, rr, rr * 0.97, BH_TILT, Math.PI * 1.0, Math.PI * 2.0); g.stroke();
    g.strokeStyle = "rgba(225,200,255," + 0.3 * a * (t < 0.5 ? 1 : 0.5) + ")";
    g.lineWidth = 1 + t * 1.4;
    g.beginPath(); g.ellipse(cx, cy, rr * 1.01, rr * 0.99, BH_TILT, Math.PI * 0.04, Math.PI * 0.96); g.stroke(); // stays outside the shadow
  }
  g.strokeStyle = "rgba(240,230,255,0.6)"; g.lineWidth = 0.9;
  g.beginPath(); g.arc(cx, cy, R * 1.035, 0, Math.PI * 2); g.stroke();
  g.strokeStyle = "rgba(200,170,255,0.18)"; g.lineWidth = 2.4;
  g.beginPath(); g.arc(cx, cy, R * 1.075, 0, Math.PI * 2); g.stroke();

  return { bloom, core, disk, S, D };
};

/* a small, finely detailed spiral galaxy for the far background */
const drawGalaxy = (g, x, y, size, rot, squash) => {
  const [c, gc] = (() => { const cv = document.createElement("canvas"); cv.width = size; cv.height = size; return [cv, cv.getContext("2d")]; })();
  const cxy = size / 2;
  gc.globalCompositeOperation = "lighter";
  const core = gc.createRadialGradient(cxy, cxy, 0, cxy, cxy, size * 0.18);
  core.addColorStop(0, "rgba(255,236,214,0.55)"); core.addColorStop(1, "rgba(255,236,214,0)");
  gc.fillStyle = core; gc.fillRect(0, 0, size, size);
  for (let i = 0; i < 5200; i++) {
    const r = Math.pow(Math.random(), 0.55) * (size * 0.46);
    const arm = (Math.floor(Math.random() * 2) * Math.PI);
    const th = r * 0.045 + arm + (Math.random() - 0.5) * (0.5 + r / size);
    const px = cxy + Math.cos(th) * r, py = cxy + Math.sin(th) * r;
    const k = r / (size * 0.46);
    const col = k < 0.2 ? "255,240,225" : Math.random() < 0.7 ? "180,170,255" : "165,243,252";
    gc.fillStyle = `rgba(${col},${(1 - k) * 0.5 + 0.05})`;
    gc.fillRect(px, py, k < 0.2 ? 1.2 : 0.9, k < 0.2 ? 1.2 : 0.9);
  }
  g.save();
  g.translate(x, y); g.rotate(rot); g.scale(1, squash);
  g.globalCompositeOperation = "screen"; g.globalAlpha = 0.75;
  g.drawImage(c, -size / 2, -size / 2);
  g.restore();
};

/* ── component ─────────────────────────────────────────────────────── */
const CosmosBackground = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const PARALLAX_RANGE = 900; // px the static layer can drift with scroll

    let W = 0, H = 0, raf = 0, staticLayer = null, hole = null, stars = [], bright = [], shooting = [], swirl = [], dust = [];
    let spin = 0, mx = 0, my = 0, smx = 0, smy = 0;
    let warp = false, warpK = 0, last = performance.now(), t = 0;

    const build = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      staticLayer = renderStaticLayer(W, H + PARALLAX_RANGE);
      const R = Math.max(24, Math.min(50, W * 0.031));
      hole = { ...renderBlackHole(R), R };

      const tints = ["255,255,255", "221,214,254", "199,210,254", "165,243,252", "254,240,220"];
      const count = Math.round((W * H) / 4200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() < 0.85 ? Math.random() * 0.8 + 0.5 : Math.random() * 1.1 + 1.1,
        a: Math.random() * 0.6 + 0.35,
        depth: Math.random() < 0.6 ? 0.12 : 0.22,        // parallax rate
        tw: Math.random() < 0.25 ? Math.random() * 0.002 + 0.0008 : 0, // only some twinkle
        ph: Math.random() * Math.PI * 2,
        c: tints[(Math.random() * tints.length) | 0],
      }));
      swirl = Array.from({ length: 160 }, () => ({
        ang: Math.random() * Math.PI * 2,
        rad: R * (1.7 + Math.pow(Math.random(), 1.6) * 4.4),
        sp: (Math.random() * 0.00035 + 0.00012),
        sz: Math.random() * 0.9 + 0.3,
        a: Math.random() * 0.25 + 0.05,
        c: Math.random() < 0.8 ? "221,200,255" : "190,220,255",
      }));
      bright = Array.from({ length: Math.max(3, Math.round(W / 420)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        s: Math.random() * 3 + 4,
        c: Math.random() < 0.5 ? "255,255,255" : Math.random() < 0.5 ? "196,181,253" : "165,243,252",
        ph: Math.random() * Math.PI * 2,
      }));
      shooting = Array.from({ length: 3 }, () => ({ on: false }));
      // foreground star dust: slow drift, strong parallax (scroll + mouse)
      dust = Array.from({ length: Math.round((W * H) / 9000) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() < 0.8 ? Math.random() * 0.7 + 0.4 : Math.random() * 0.9 + 1.2,
        a: Math.random() * 0.18 + 0.05,
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.004 - 0.002,
        depth: Math.random() * 0.35 + 0.3,
        c: Math.random() < 0.6 ? "233,213,255" : Math.random() < 0.5 ? "165,243,252" : "255,236,214",
      }));
    };

    // section "colour journey": violet (top) → teal (middle) → magenta (bottom)
    const journey = (p) => {
      const stops = [[124, 58, 237], [6, 182, 212], [168, 85, 247], [192, 38, 211]];
      const f = clamp01(p) * (stops.length - 1);
      const i = Math.min(stops.length - 2, Math.floor(f));
      return mixRGB(stops[i], stops[i + 1], f - i);
    };

    // bright star: a soft halo + core, with very faint rays that taper to nothing
    const spikes = (x, y, s, c, a) => {
      const halo = ctx.createRadialGradient(x, y, 0, x, y, s * 1.6);
      halo.addColorStop(0, `rgba(${c},${0.55 * a})`);
      halo.addColorStop(0.18, `rgba(${c},${0.16 * a})`);
      halo.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(x, y, s * 1.6, 0, Math.PI * 2); ctx.fill();
      const L = s * 1.9;
      const ray = (dx, dy) => {
        const g = ctx.createLinearGradient(x, y, x + dx * L, y + dy * L);
        g.addColorStop(0, `rgba(${c},${0.28 * a})`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.strokeStyle = g; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx * L, y + dy * L); ctx.stroke();
      };
      ray(1, 0); ray(-1, 0); ray(0, 1); ray(0, -1);
      ctx.fillStyle = `rgba(255,255,255,${0.95 * a})`; ctx.beginPath(); ctx.arc(x, y, 1.15, 0, Math.PI * 2); ctx.fill();
    };

    const frame = (now) => {
      const dt = Math.min(now - last, 50); last = now; t += dt;
      const sy = window.scrollY || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
      const p = sy / maxScroll;
      warpK = warp ? Math.min(1, warpK + dt / 300) : Math.max(0, warpK - dt / 500);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      // 1. nebula + far stars, drifting slowly with scroll
      const off = Math.min(PARALLAX_RANGE, sy * 0.06);
      ctx.drawImage(staticLayer, 0, off, W, H, 0, 0, W, H);

      // 2. colour-journey light
      const jc = journey(p);
      const jx = W * (0.3 + 0.4 * Math.sin(p * Math.PI * 1.3));
      const jy = H * (0.55 + 0.15 * Math.cos(p * Math.PI * 2));
      const jg = ctx.createRadialGradient(jx, jy, 0, jx, jy, Math.max(W, H) * 0.75);
      jg.addColorStop(0, `rgba(${jc[0] | 0},${jc[1] | 0},${jc[2] | 0},0.26)`);
      jg.addColorStop(0.5, `rgba(${jc[0] | 0},${jc[1] | 0},${jc[2] | 0},0.07)`);
      jg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = jg; ctx.fillRect(0, 0, W, H);

      // 3. black hole — lives in the hero, glides up and away as you scroll
      const hx = W * (W < 768 ? 0.8 : 0.86), hy = H * 0.24 - sy * 0.45;
      if (hy > -hole.S / 2) {
        const A = 0.82 * (1 - warpK * 0.8);
        if (!reduce) spin += dt * 0.00009;
        const paintDisk = () => {
          ctx.scale(1, BH_FLAT); ctx.rotate(spin);
          ctx.drawImage(hole.disk, -hole.D / 2, -hole.D / 2);
        };
        const drawDisk = (front) => {
          const D = hole.D, Rs = hole.R * 1.03;
          ctx.save();
          ctx.translate(hx, hy); ctx.rotate(BH_TILT);
          if (!front) { paintDisk(); ctx.restore(); return; }
          // near half of the disk, kept OFF the shadow…
          ctx.beginPath(); ctx.rect(-D, 0, D * 2, D); ctx.clip();
          ctx.beginPath(); ctx.rect(-D, -D, D * 2, D * 2); ctx.arc(0, 0, Rs, 0, Math.PI * 2); ctx.clip("evenodd");
          paintDisk();
          ctx.restore();
          // …except a thin bright band where it actually crosses in front of the hole
          ctx.save();
          ctx.translate(hx, hy); ctx.rotate(BH_TILT);
          ctx.beginPath(); ctx.arc(0, 0, Rs, 0, Math.PI * 2); ctx.clip();
          ctx.beginPath(); ctx.rect(-D, 0, D * 2, hole.R * 0.16); ctx.clip();
          paintDisk();
          ctx.restore();
        };
        ctx.globalAlpha = A;
        ctx.globalCompositeOperation = "screen";
        ctx.drawImage(hole.bloom, hx - hole.S / 2, hy - hole.S / 2);
        ctx.globalCompositeOperation = "lighter";
        drawDisk(false);                                   // far side, behind the shadow
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1 - warpK * 0.8;               // shadow stays truly black
        ctx.drawImage(hole.core, hx - hole.S / 2, hy - hole.S / 2);
        ctx.globalAlpha = A;
        ctx.globalCompositeOperation = "lighter";
        drawDisk(true);                                    // near side, in front of the shadow
        // swirling disk particles (front half drawn after, so they cross in front of the hole)
        ctx.globalCompositeOperation = "lighter";
        for (const q of swirl) {
          if (!reduce) q.ang += q.sp * dt;
          const x = hx + Math.cos(q.ang) * q.rad, y = hy + Math.sin(q.ang) * q.rad * BH_FLAT;
          if (Math.sin(q.ang) < 0 && Math.hypot(x - hx, (y - hy) / 0.2 * 0.2) < hole.R * 1.05) continue;
          ctx.fillStyle = `rgba(${q.c},${q.a * (1 - warpK)})`;
          ctx.fillRect(x, y, q.sz, q.sz);
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      }

      // 4. near / mid stars with their own parallax (wrap vertically)
      ctx.globalCompositeOperation = "lighter";
      smx += (mx - smx) * 0.04; smy += (my - smy) * 0.04;
      for (const s of stars) {
        let y = (s.y - sy * s.depth + smy * s.depth * 40) % H; if (y < 0) y += H;
        const sx = s.x + smx * s.depth * 60;
        const tw = s.tw && !reduce ? 0.65 + 0.35 * Math.sin(t * s.tw + s.ph) : 1;
        const a = s.a * tw;
        if (warpK > 0.02) {
          const len = warpK * (s.depth * 260);
          ctx.strokeStyle = `rgba(${s.c},${a})`; ctx.lineWidth = s.r;
          ctx.beginPath(); ctx.moveTo(sx, y); ctx.lineTo(sx, y + len); ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${s.c},${a})`;
          ctx.beginPath(); ctx.arc(sx, y, s.r, 0, Math.PI * 2); ctx.fill();
        }
      }

      // 5. a few bright stars with diffraction spikes
      for (const b of bright) {
        let y = (b.y - sy * 0.18) % H; if (y < 0) y += H;
        const a = reduce ? 0.9 : 0.75 + 0.25 * Math.sin(t * 0.0007 + b.ph);
        spikes(b.x, y, b.s, b.c, a * (1 - warpK));
      }

      // 6. foreground star dust
      for (const d of dust) {
        if (!reduce) { d.x += d.vx * dt; d.y += d.vy * dt; }
        let x = (d.x + smx * d.depth * 90) % W; if (x < 0) x += W;
        let y = (d.y - sy * d.depth + smy * d.depth * 60) % H; if (y < 0) y += H;
        const a = d.a * (1 - warpK * 0.6);
        if (d.r > 1.1) {
          const gd = ctx.createRadialGradient(x, y, 0, x, y, d.r * 4);
          gd.addColorStop(0, `rgba(${d.c},${a * 1.6})`); gd.addColorStop(1, `rgba(${d.c},0)`);
          ctx.fillStyle = gd; ctx.beginPath(); ctx.arc(x, y, d.r * 4, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${d.c},${a})`;
          ctx.fillRect(x, y, d.r, d.r);
        }
      }

      // 7. the occasional shooting star
      if (!reduce && !warp && Math.random() < 0.0025) {
        const s = shooting.find((x) => !x.on);
        if (s) Object.assign(s, { on: true, x: Math.random() * W * 0.8, y: Math.random() * H * 0.4, vx: 9 + Math.random() * 5, vy: 3 + Math.random() * 3, life: 1 });
      }
      for (const s of shooting) {
        if (!s.on) continue;
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
        g.addColorStop(0, `rgba(255,255,255,${0.8 * s.life})`); g.addColorStop(1, "rgba(165,243,252,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9); ctx.stroke();
        s.x += s.vx * dt / 16; s.y += s.vy * dt / 16; s.life -= dt / 900;
        if (s.life <= 0 || s.x > W + 100 || s.y > H + 100) s.on = false;
      }
      ctx.globalCompositeOperation = "source-over";

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const start = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame); };
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    const onResize = () => { build(); start(); };
    const onWarpStart = () => { warp = true; };
    const onWarpEnd = () => { warp = false; };
    const onScroll = () => { if (reduce) requestAnimationFrame(frame); }; // static mode: redraw on scroll only
    const onMouse = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };

    build(); start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("warp-jump-start", onWarpStart);
    window.addEventListener("warp-jump-end", onWarpEnd);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("warp-jump-start", onWarpStart);
      window.removeEventListener("warp-jump-end", onWarpEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="enter-zoom fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -10 }} aria-hidden="true" />;
};

export default CosmosBackground;
