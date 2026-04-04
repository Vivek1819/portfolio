import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HolographicCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Mouse positions within the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse motion
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform mouse values to degrees of rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sheenGradient = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) => `radial-gradient(circle at ${mx * 100 + 50}% ${my * 100 + 50}%, rgba(6, 182, 212, 0.3) 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group/hologram ${className}`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* Holographic "Sheen" Light Effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-lg opacity-0 group-hover/hologram:opacity-30 transition-opacity duration-300"
        style={{
          background: sheenGradient,
        }}
      />

      {/* Grid Overlay for HUD feel */}
      <div className="absolute inset-0 pointer-events-none rounded-lg z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover/hologram:opacity-20 transition-opacity duration-500" />
      </div>

      {/* Flicker Animation on Border on Hover */}
      <div className="absolute -inset-[1px] rounded-lg border border-neon-cyan/0 group-hover/hologram:border-neon-cyan/50 group-hover/hologram:animate-pulse shadow-[0_0_20px_rgba(6,182,212,0)] group-hover/hologram:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default HolographicCard;
