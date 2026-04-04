import React, { useEffect, useRef, useState } from "react";

const MAX_POINTS  = 24;
const HEAD_RADIUS = 2;

const CustomCursor = () => {
  const canvasRef   = useRef(null);
  const pointsRef   = useRef([]);
  const currentPos  = useRef({ x: -200, y: -200 });
  const rafRef      = useRef(null);
  const hoveringRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      currentPos.current = { x: e.clientX, y: e.clientY };
      pointsRef.current.push({ x: e.clientX, y: e.clientY });
      if (pointsRef.current.length > MAX_POINTS) pointsRef.current.shift();
    };

    const onOver = (e) => {
      const t = e.target;
      hoveringRef.current =
        t.tagName === "BUTTON" || t.tagName === "A" ||
        !!t.closest("button")  || !!t.closest("a");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    // helper — draws glowing head dot at any position
    const drawHead = (ctx, pos, r, g, b) => {
      const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, HEAD_RADIUS * 5);
      glow.addColorStop(0,   `rgba(${r},${g},${b},0.3)`);
      glow.addColorStop(0.5, `rgba(${r},${g},${b},0.08)`);
      glow.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, HEAD_RADIUS * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, HEAD_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle   = `rgba(${r},${g},${b},0.9)`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
      ctx.shadowBlur  = 7;
      ctx.fill();
      ctx.shadowBlur  = 0;
    };

    const draw = () => {
      const ctx   = canvas.getContext("2d");
      const pts   = pointsRef.current;
      const isHov = hoveringRef.current;
      const [r, g, b] = isHov ? [248, 161, 255] : [168, 100, 255];

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── smooth tapered trail ──────────────────────────────────
      if (pts.length >= 2) {
        for (let i = 1; i < pts.length; i++) {
          const t       = i / (pts.length - 1);
          const width   = 0.5 + 2.5 * (t * t);
          const opacity = t * t * 0.45;

          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x,     pts[i].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx.lineWidth   = width;
          ctx.lineCap     = "round";
          ctx.lineJoin    = "round";
          ctx.stroke();
        }
      }

      // ── head — always visible at current position ─────────────
      drawHead(ctx, currentPos.current, r, g, b);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CustomCursor;
