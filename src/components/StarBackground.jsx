import React, { useEffect, useRef, useState } from "react";

const StarBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawNebulaEffect(ctx, canvas.width, canvas.height);
    };

    const drawNebulaEffect = (ctx, width, height) => {
      const nebulaCanvas = document.createElement("canvas");
      nebulaCanvas.width = width;
      nebulaCanvas.height = height;
      const nebulaCtx = nebulaCanvas.getContext("2d");

      const gradient1 = nebulaCtx.createRadialGradient(
        width * 0.3,
        height * 0.4,
        0,
        width * 0.3,
        height * 0.4,
        height * 0.7
      );      gradient1.addColorStop(0, "rgba(50, 50, 50, 0.02)");
      gradient1.addColorStop(0.5, "rgba(40, 40, 40, 0.01)");
      gradient1.addColorStop(1, "rgba(30, 30, 30, 0)");

      const gradient2 = nebulaCtx.createRadialGradient(
        width * 0.7,
        height * 0.6,
        0,
        width * 0.7,
        height * 0.6,
        height * 0.65
      );
      gradient2.addColorStop(0, "rgba(60, 60, 60, 0.02)");
      gradient2.addColorStop(0.5, "rgba(45, 45, 45, 0.01)");
      gradient2.addColorStop(1, "rgba(30, 30, 30, 0)");

      nebulaCtx.fillStyle = gradient1;
      nebulaCtx.fillRect(0, 0, width, height);
      nebulaCtx.fillStyle = gradient2;
      nebulaCtx.fillRect(0, 0, width, height);

      const nebulaImage = new Image();
      nebulaImage.src = nebulaCanvas.toDataURL();
      return nebulaImage;
    };    let lastMoveTime = 0;
    const moveThrottle = 20;
    
    const handleMouseMove = (event) => {
      const now = Date.now();
      
      // Throttle regular star interaction updates
      if (now - lastMoveTime > moveThrottle) {
        lastMoveTime = now;
        setMousePosition({ x: event.clientX, y: event.clientY });
        setIsMouseMoving(true);
        
        clearTimeout(window.mouseTimeout);
        window.mouseTimeout = setTimeout(() => {
          setIsMouseMoving(false);
        }, 150);
      }
    };    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const nebulaImage = drawNebulaEffect(ctx, canvas.width, canvas.height); // Star properties
    const stars = [];
    const starCount = 180;
    const maxSize = 3;

    const twinklingStars = [];
    const twinkleStarCount = 50; 
    for (let i = 0; i < twinkleStarCount; i++) {
      twinklingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.005, 
        brightness: Math.random() * 0.7 + 0.3,
        maxBrightness: Math.random() * 0.7 + 0.3,
        minBrightness: Math.random() * 0.2,
        brightnessFactor: Math.random() < 0.5 ? 1 : -1,
        color: Math.random() > 0.5 ? "#ffffff" : "#f8f8ff",
      });
    }
    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.2 + 0.05; 

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * maxSize + 0.5,
        speed: speed, 
        directionX: Math.cos(angle) * speed * 0.4,
        directionY: Math.sin(angle) * speed * 0.4, 
        wobble: Math.random() > 0.7,
        wobbleIntensity: Math.random() * 0.15 + 0.05, 
        wobbleSpeed: Math.random() * 0.01 + 0.005, 
        wobbleAngle: 0,
        brightness: Math.random() * 0.5 + 0.5,
        originalSize: Math.random() * maxSize + 0.5, 
        color:
          Math.random() > 0.3
            ? "#ffffff"
            : Math.random() > 0.5
            ? "#88a9ff"
            : "#ffccaa",
        pulsate: Math.random() > 0.7, 
        pulsateSpeed: Math.random() * 0.02 + 0.005,
        pulsateAmount: Math.random() * 0.4 + 0.4, 
        pulsateDirection: 1,
        shape: Math.random() > 0.8 ? "circle" : "star", 
        velocityX: 0, 
        velocityY: 0,
        mouseInteractionFactor: Math.random() * 0.5 + 0.5,
      });
    } 
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (nebulaImage.complete) {
        ctx.drawImage(nebulaImage, 0, 0);
      }

      twinklingStars.forEach((star) => {
        star.brightness += star.twinkleSpeed * star.brightnessFactor;

        if (star.brightness >= star.maxBrightness) {
          star.brightnessFactor = -1;
        } else if (star.brightness <= star.minBrightness) {
          star.brightnessFactor = 1;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      stars.forEach((star) => {
        if (mousePosition.x !== null && isMouseMoving) {
          const dx = mousePosition.x - star.x;
          const dy = mousePosition.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const interactionRadius = 200;
          if (distance < interactionRadius) {
            const force =
              (1 - distance / interactionRadius) *
              0.3 *
              star.mouseInteractionFactor;
            star.velocityX -= (dx / distance) * force;
            star.velocityY -= (dy / distance) * force;
            star.size =
              star.originalSize *
              (1 + (1 - distance / interactionRadius) * 0.8);
          } else {
            star.size = star.size * 0.98 + star.originalSize * 0.02;
          }
        } else {
          star.size = star.size * 0.98 + star.originalSize * 0.02;
        }
        if (star.wobble) {
          star.wobbleAngle += star.wobbleSpeed;
          const wobbleX = Math.sin(star.wobbleAngle) * star.wobbleIntensity;
          const wobbleY = Math.cos(star.wobbleAngle) * star.wobbleIntensity;
          star.x += star.directionX + wobbleX + star.velocityX;
          star.y += star.directionY + wobbleY + star.velocityY;
        } else {
          star.x += star.directionX + star.velocityX;
          star.y += star.directionY + star.velocityY;
        }
        star.velocityX *= 0.98;
        star.velocityY *= 0.98;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        } else if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        if (star.x < 0) {
          star.x = canvas.width;
        } else if (star.x > canvas.width) {
          star.x = 0;
        }

        if (star.pulsate) {
          star.brightness += star.pulsateSpeed * star.pulsateDirection;
          if (star.brightness >= 1) {
            star.pulsateDirection = -1;
          } else if (star.brightness <= star.pulsateAmount) {
            star.pulsateDirection = 1;
          }
        }
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;

        if (star.shape === "circle") {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawStar(ctx, star.x, star.y, star.size * 2);
        }
      });      
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    const drawStar = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size / 4, y - size / 4);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size / 4, y + size / 4);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size / 4, y + size / 4);
      ctx.lineTo(x - size, y);
      ctx.lineTo(x - size / 4, y - size / 4);
      ctx.closePath();
      ctx.fill();
    };

    animate();    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(window.mouseTimeout);
    };
  }, []);  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{
        background: "linear-gradient(to bottom, #050505, #0c0c0c 40%, #111111)",
        pointerEvents: "none"
      }}
    />
  );
};

export default StarBackground;
