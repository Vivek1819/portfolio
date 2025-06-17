import React, { useEffect, useRef } from "react";

const SubtleSpaceBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const generateStars = () => {
      const starCount = 3000;
      const stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.4 + 0.05,
        });
      }
      starsRef.current = stars;
    };    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight * 3
      );
      if (canvas.width > document.documentElement.clientWidth) {
        canvas.width = document.documentElement.clientWidth;
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#111111");
      gradient.addColorStop(1, "#13151a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawDistantGalaxy(
        ctx,
        canvas.width * 0.7,
        canvas.height * 0.2,
        canvas.width * 0.15
      );
      drawDistantGalaxy(
        ctx,
        canvas.width * 0.3,
        canvas.height * 0.4,
        canvas.width * 0.12
      );
      drawDistantGalaxy(
        ctx,
        canvas.width * 0.8,
        canvas.height * 0.6,
        canvas.width * 0.18
      );
      drawDistantGalaxy(
        ctx,
        canvas.width * 0.2,
        canvas.height * 0.8,
        canvas.width * 0.14
      );
      starsRef.current.forEach((star) => {
        const x = star.x * canvas.width;
        const y = star.y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };
    const drawDistantGalaxy = (ctx, x, y, radius) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

      const hue = Math.random() > 0.5 ? 230 : 210;
      const saturation = 15 + Math.random() * 15;
      const lightness = 2 + Math.random() * 5;

      gradient.addColorStop(
        0,
        `hsla(${hue}, ${saturation}%, ${lightness}%, 0.1)`
      );
      gradient.addColorStop(
        0.5,
        `hsla(${hue}, ${saturation}%, ${lightness}%, 0.05)`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };
    generateStars();

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full"
      style={{
        zIndex: -2,
        pointerEvents: "none",
        height: "100%",
        maxWidth: "100vw",
        overflow: "hidden"
      }}
    />
  );
};

export default SubtleSpaceBackground;
