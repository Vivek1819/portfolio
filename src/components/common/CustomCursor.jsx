import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 1 });

  // Motion values for fluid movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the outer ring
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest(".magnetic") ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring (Magnetic Feel) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neon-cyan/40 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(251, 191, 36, 0.4)" : "rgba(6, 182, 212, 0.4)",
        }}
      />

      {/* Inner Dot (Target Point) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-starlight rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHovering ? "#fbbf24" : "#ffffff",
        }}
      />

      {/* HUD Coordinates Label */}
      <AnimatePresence>
        {!isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 pointer-events-none z-[9999] ml-6 mt-6 font-mono text-[8px] text-starlight tracking-widest whitespace-nowrap"
            style={{
              x: cursorX,
              y: cursorY,
            }}
          >
            LOC: [{coords.x.toString().padStart(4, "0")}, {coords.y.toString().padStart(4, "0")}]<br />
            STATUS: ACTIVE
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magnified HUD Crosshair when hovering */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
               x: cursorX,
               y: cursorY,
               translateX: "-50%",
               translateY: "-50%",
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-supernova/60"></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-supernova/60"></div>
               <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-supernova/60"></div>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-supernova/60"></div>
               <div className="micro-text text-[6px] text-supernova absolute -top-4 font-bold">LOCK_ON</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
