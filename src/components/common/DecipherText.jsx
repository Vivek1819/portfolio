import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|;:,.~+-=_";

const DecipherText = ({ text = "", className, delay = 0, speed = 40, trigger = "reveal" }) => {
  const [displayText, setDisplayText] = useState(text ? text.split("") : []);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < iterations) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iterations += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isAnimating]);

  useEffect(() => {
    if (trigger === "reveal") {
      const timeout = setTimeout(startAnimation, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [startAnimation, delay, trigger]);

  return (
    <motion.span
      className={className}
      onMouseEnter={() => trigger === "hover" && startAnimation()}
      style={{ display: "inline-block", whiteSpace: "pre" }}
    >
      {text.split("").map((char, i) => (
        /*
         * Each character slot uses display:inline-grid so both spans
         * share grid-area 1/1 and overlap each other — the hidden span
         * locks the width to the final character, the visible span shows
         * the scrambled character. Everything stays in normal flow so
         * background-clip:text gradients from ancestor aurora-text work.
         */
        <span
          key={i}
          style={{ display: "inline-grid", verticalAlign: "top" }}
        >
          {/* Visible scrambled character */}
          <span style={{ gridArea: "1/1" }}>{displayText[i] ?? char}</span>
          {/* Hidden anchor – always the final char, defines the cell width */}
          <span style={{ gridArea: "1/1", visibility: "hidden", userSelect: "none", pointerEvents: "none" }} aria-hidden="true">
            {char}
          </span>
        </span>
      ))}
    </motion.span>
  );
};

export default DecipherText;
