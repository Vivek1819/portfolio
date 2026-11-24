import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|;:,.~+-=_";

/*
 * Scrambles the text once when it scrolls into view (trigger="reveal"),
 * or each time it's hovered (trigger="hover"), then settles on the real text.
 */
const DecipherText = ({ text = "", className, delay = 0, speed = 40, trigger = "reveal" }) => {
  const [displayText, setDisplayText] = useState(text.split(""));
  const animatingRef = useRef(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startAnimation = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    let iterations = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < iterations || char === " ") return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );

      if (iterations >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text.split(""));
        animatingRef.current = false;
      }

      iterations += 1 / 3;
    }, speed);
  }, [text, speed]);

  // Clean up timers on unmount
  useEffect(() => () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <motion.span
      className={className}
      viewport={{ once: true, margin: "-10% 0px" }}
      onViewportEnter={() => {
        if (trigger === "reveal") timeoutRef.current = setTimeout(startAnimation, delay * 1000);
      }}
      onMouseEnter={() => trigger === "hover" && startAnimation()}
      style={{ display: "inline-block", whiteSpace: "pre" }}
    >
      {text.split("").map((char, i) => (
        /*
         * Each slot is an inline-grid: the hidden span holds the final
         * character and alone sets the width; the visible span has zero
         * width so wider scrambled glyphs overflow instead of resizing the
         * line (no layout shift). Everything stays in normal flow so
         * background-clip:text gradients from ancestor aurora-text work.
         */
        <span key={i} style={{ display: "inline-grid", verticalAlign: "top" }}>
          <span style={{ gridArea: "1/1", width: 0, whiteSpace: "pre" }}>{displayText[i] ?? char}</span>
          <span style={{ gridArea: "1/1", visibility: "hidden", userSelect: "none", pointerEvents: "none" }} aria-hidden="true">
            {char}
          </span>
        </span>
      ))}
    </motion.span>
  );
};

export default DecipherText;
