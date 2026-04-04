import { useState, useCallback } from "react";
import { animate } from "framer-motion";

export const useWarpDrive = () => {
  const [isWarping, setIsWarping] = useState(false);

  const initiateJump = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // 1. Calculate Target Position (with 7rem offset)
    const offset = 7 * 16; // 7rem in pixels
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    
    // 2. Dispatch Warp Event for Background
    setIsWarping(true);
    window.dispatchEvent(new CustomEvent("warp-jump-start"));

    // 3. Perform Spring-Loaded Scroll with Framer Motion
    animate(window.scrollY, targetPosition, {
      type: "spring",
      stiffness: 45,
      damping: 15,
      mass: 1,
      onUpdate: (latest) => {
        window.scrollTo(0, latest);
      },
      onComplete: () => {
        setIsWarping(false);
        window.dispatchEvent(new CustomEvent("warp-jump-end"));
      }
    });
  }, []);

  return { initiateJump, isWarping };
};
