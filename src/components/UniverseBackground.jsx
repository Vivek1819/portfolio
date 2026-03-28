import React, { useEffect, useRef } from "react";

const UniverseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width, height;
    let stars = [];
    let shootingStars = [];
    let nebulaLayers = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.1;
        this.baseOpacity = Math.random() * 0.6 + 0.1;
        this.opacity = this.baseOpacity;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDir = 1;
        this.parallaxFactor = this.size * 0.05;
        this.color = this.getRandomColor();
      }

      getRandomColor() {
        const colors = ["#ffffff", "#e0e7ff", "#fef3c7", "#fff7ed", "#bae6fd"];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update(scrollProgress, mouseX, mouseY) {
        // Twinkle
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity > 1 || this.opacity < this.baseOpacity) {
          this.twinkleDir *= -1;
        }

        // Parallax scroll
        const scrollOffset = scrollProgress * this.parallaxFactor * 1000;
        let drawY = (this.y - scrollOffset) % height;
        if (drawY < 0) drawY += height;

        // Mouse interaction (subtle drift)
        const dx = mouseX - this.x;
        const dy = mouseY - drawY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;
        
        let offsetX = 0;
        let offsetY = 0;
        
        if (dist < interactionRadius) {
          const force = (1 - dist / interactionRadius) * 10;
          offsetX = (dx / dist) * force * -1;
          offsetY = (dy / dist) * force * -1;
        }

        this.draw(this.x + offsetX, drawY + offsetY);
      }

      draw(x, y) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
        this.active = false;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.5;
        this.length = Math.random() * 80 + 50;
        this.speed = Math.random() * 10 + 5;
        this.angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degrees
        this.opacity = 0;
        this.active = false;
        this.waitTime = Math.random() * 500 + 100;
      }

      update() {
        if (!this.active) {
          this.waitTime--;
          if (this.waitTime <= 0) {
            this.active = true;
          }
          return;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity += 0.05;

        if (this.opacity > 1) this.opacity = 1;

        if (this.x > width || this.y > height) {
          this.reset();
        }

        this.draw();
      }

      draw() {
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x - Math.cos(this.angle) * this.length, 
          this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length, 
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
      }
    }

    const init = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 4000);
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }

      shootingStars = [];
      for (let i = 0; i < 2; i++) {
        shootingStars.push(new ShootingStar());
      }

      nebulaLayers = [
        {
          x: width * 0.2,
          y: height * 0.3,
          radius: Math.max(width, height) * 0.6,
          color: "rgba(20, 8, 38, 0.4)",
          parallax: 0.02
        },
        {
          x: width * 0.8,
          y: height * 0.7,
          radius: Math.max(width, height) * 0.5,
          color: "rgba(8, 18, 38, 0.4)",
          parallax: 0.03
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          radius: Math.max(width, height) * 0.7,
          color: "rgba(10, 20, 30, 0.3)",
          parallax: 0.01
        }
      ];
    };

    let mouseX = -1000;
    let mouseY = -1000;
    let scrollProgress = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
    };

    const drawNebula = () => {
      nebulaLayers.forEach(layer => {
        const offsetY = scrollProgress * layer.parallax * height;
        let drawY = (layer.y - offsetY) % height;
        if (drawY < 0) drawY += height;

        const gradient = ctx.createRadialGradient(
          layer.x, drawY, 0,
          layer.x, drawY, layer.radius
        );
        gradient.addColorStop(0, layer.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, width, height);
      });
    };

    const animate = () => {
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      drawNebula();

      stars.forEach(star => star.update(scrollProgress, mouseX, mouseY));
      shootingStars.forEach(star => star.update());

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -10 }}
    />
  );
};

export default UniverseBackground;
