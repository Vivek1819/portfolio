import React, { useEffect, useRef } from "react";

const UniverseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isWarping = false;
    let warpFactor = 0; // 0 to 1

    // Celestial components
    let starsNear = [];
    let starsMid = [];
    let starsFar = [];
    let nebulaGasClouds = [];
    let shootingStars = [];
    let blackHole = null;
    let galaxyCanvases = [];
    let singularityParticles = []; // For the high-density gaseous bloom (2,500+)

    // Cinematic Palette (Purple/Indigo Focus)
    const STAR_COLORS = [
      '#8b5cf6', // Purple
      '#a78bfa', // Light Purple
      '#c4b5fd', // Lavender
      '#ffffff', // White
      '#3b82f6', // Blue
      '#60a5fa', // Light Blue
      '#ff4d4d'  // M-Red (Tiny hint)
    ];

    const createStar = (sizeMult) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * sizeMult + 0.2,
      baseOpacity: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.005 + 0.002,
      twinklePhase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
    });

    const createShootingStar = () => ({
      active: false,
      x: 0, y: 0, vx: 0, vy: 0, opacity: 0
    });

    const createGasCloud = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * width * 0.7 + 600,
      opacity: Math.random() * 0.04 + 0.03,
      // PURPLE AURORA PALETTE
      color: Math.random() > 0.5 ? '76, 29, 149' : '30, 58, 138',
      angle: Math.random() * Math.PI * 2,
      velocity: Math.random() * 0.00003 + 0.00002
    });

    const createSingularityParticle = (bhX, bhY, radius) => ({
      angle: Math.random() * Math.PI * 2,
      orbitalRadius: radius * (1.1 + Math.pow(Math.random(), 1.5) * 4),
      speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 0.8 + 0.2, // Tiny particles for smoke effect
      opacity: Math.random() * 0.3 + 0.05,
      color: Math.random() > 0.3 ? '#c084fc' : '#ffffff'
    });

    const preRenderGalaxy = (type) => {
      const gCanvas = document.createElement('canvas');
      const size = 1200;
      gCanvas.width = size; gCanvas.height = size;
      const gCtx = gCanvas.getContext('2d');
      if (!gCtx) return null;
      const centerX = size / 2; const centerY = size / 2;
      const particles = type === 'spiral' ? 9000 : 5000;
      gCtx.globalCompositeOperation = 'screen';
      if (type === 'spiral') {
        const arms = 4; const tightness = 0.14;
        for (let i = 0; i < particles; i++) {
          const r = Math.pow(Math.random(), 0.45) * (size / 2.2);
          const armOffset = (Math.floor(Math.random() * arms) * (Math.PI * 2)) / arms;
          const theta = r * tightness + armOffset + (Math.random() - 0.5) * 0.35;
          const px = centerX + Math.cos(theta) * r;
          const py = centerY + Math.sin(theta) * r;
          const pSize = Math.max(0.1, (1 - r / (size / 2)) * 2);
          const alpha = (1 - r / (size / 2)) * 0.65;
          gCtx.fillStyle = r < 50 ? '#fff' : (Math.random() > 0.3 ? '#8b5cf6' : '#6366f1');
          gCtx.globalAlpha = alpha; gCtx.beginPath(); gCtx.arc(px, py, pSize, 0, Math.PI * 2); gCtx.fill();
        }
      } else {
        for (let i = 0; i < particles; i++) {
          const r = Math.pow(Math.random(), 1.6) * (size / 3);
          const theta = Math.random() * Math.PI * 2;
          const px = centerX + Math.cos(theta) * r;
          const py = centerY + Math.sin(theta) * r * 0.6;
          const alpha = (1 - r / (size/3)) * 0.5;
          gCtx.fillStyle = '#a855f7'; gCtx.globalAlpha = alpha; gCtx.beginPath(); gCtx.arc(px, py, 1.5, 0, Math.PI * 2); gCtx.fill();
        }
      }
      return gCanvas;
    };

    const init = () => {
      starsFar = Array.from({ length: 800 }, () => createStar(1.0));
      starsMid = Array.from({ length: 500 }, () => createStar(1.8));
      starsNear = Array.from({ length: 150 }, () => createStar(2.8));
      nebulaGasClouds = Array.from({ length: 9 }, createGasCloud);
      shootingStars = Array.from({ length: 4 }, createShootingStar);
      
      const bhX = width * 0.85; 
      const bhY = height * 0.28;
      const bhRadius = 55;
      blackHole = { x: bhX, y: bhY, radius: bhRadius };
      // DENSE PARTICLE CLOUD (2500+)
      singularityParticles = Array.from({ length: 2800 }, () => createSingularityParticle(bhX, bhY, bhRadius));

      galaxyCanvases = [
        { canvas: preRenderGalaxy('spiral'), x: width * 0.1, y: height * 0.75, scale: 1.0 },
        { canvas: preRenderGalaxy('elliptical'), x: width * 0.78, y: height * 0.62, scale: 0.7 },
        { canvas: preRenderGalaxy('spiral'), x: width * 0.42, y: height * 0.35, scale: 0.4 }
      ];
    };

    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
      init();
    };

    const triggerShootingStar = () => {
      const s = shootingStars.find(ss => !ss.active);
      if (s) {
        s.active = true;
        s.x = Math.random() * width; s.y = Math.random() * height * 0.4;
        s.vx = Math.random() * 7 + 7; s.vy = Math.random() * 4 + 2;
        s.opacity = 1;
      }
    };

    const drawCinematicStars = (stars) => {
      const now = Date.now();
      stars.forEach(s => {
        const twinkle = Math.sin(now * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.baseOpacity * twinkle;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const drawVolumetricVortex = () => {
      if (!blackHole) return;
      
      ctx.save();
      ctx.translate(blackHole.x, blackHole.y);
      
      // 1. PRIMARY BLOOM PASS (BASE GLOW)
      ctx.globalCompositeOperation = 'screen';
      const bloom = ctx.createRadialGradient(0, 0, blackHole.radius * 1.5, 0, 0, blackHole.radius * 8);
      bloom.addColorStop(0, 'rgba(168, 85, 247, 0.25)'); // Intense Purple
      bloom.addColorStop(0.4, 'rgba(168, 85, 247, 0.08)');
      bloom.addColorStop(1, 'transparent');
      ctx.fillStyle = bloom; ctx.beginPath(); ctx.arc(0, 0, blackHole.radius * 8, 0, Math.PI * 2); ctx.fill();

      // 2. VOLUMETRIC RING STACK (60+ DENSE LAYERS)
      const ringCount = 65;
      for (let i = 0; i < ringCount; i++) {
        // High-density stacking for "Bloom" look instead of wireframe
        const progress = i / ringCount;
        const alpha = (1 - Math.pow(progress, 0.5)) * 0.08;
        const radiusOffset = 1.1 + Math.pow(progress, 1.4) * 5;
        const eccentric = 0.4 + (progress * 0.2); 
        
        ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
        ctx.lineWidth = 3 + (progress * 10); // Broader strokes for soft look
        ctx.beginPath();
        ctx.ellipse(0, 0, blackHole.radius * radiusOffset, blackHole.radius * radiusOffset * eccentric, 0, 0, Math.PI * 2);
        ctx.stroke();

        // High-Intensity Internal Rim
        if (i < 8) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - i * 0.01})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, blackHole.radius * (1.1 + i * 0.08), blackHole.radius * (1.05 + i * 0.04), 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 3. SECONARY "EINSTEIN HALO" (The broad blurry arcs)
      for (let i = 0; i < 2; i++) {
        const factor = i === 0 ? 1 : -1;
        ctx.save();
        ctx.scale(1, factor);
        const haloGrad = ctx.createRadialGradient(0, -blackHole.radius * 0.5, 0, 0, -blackHole.radius * 0.5, blackHole.radius * 4);
        haloGrad.addColorStop(0, 'rgba(233, 213, 255, 0.15)'); // Soft Lavender
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.ellipse(0, -blackHole.radius * 1.4, blackHole.radius * 4.2, blackHole.radius * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. MIST PARTICLE CLOUD (2,800+ PARTICLES)
      singularityParticles.forEach(p => {
        p.angle += p.speed;
        const x = Math.cos(p.angle) * p.orbitalRadius;
        const y = Math.sin(p.angle) * p.orbitalRadius * 0.45;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
      });

      // 5. THE PITCH-BLACK VOID (EVENT HORIZON)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000000';
      ctx.beginPath(); ctx.arc(0, 0, blackHole.radius, 0, Math.PI * 2); ctx.fill();

      // 6. SHARP INTENSE PHOTON RIM
      const photonRing = ctx.createRadialGradient(0, 0, blackHole.radius, 0, 0, blackHole.radius * 1.05);
      photonRing.addColorStop(0, 'transparent');
      photonRing.addColorStop(0.01, '#ffffff'); // Tight Intense White Edge
      photonRing.addColorStop(1, 'transparent');
      ctx.fillStyle = photonRing; ctx.beginPath(); ctx.arc(0, 0, blackHole.radius * 1.05, 0, Math.PI * 2); ctx.fill();
      
      ctx.restore();
    };

    const drawShootingStars = () => {
      ctx.globalCompositeOperation = 'lighter';
      shootingStars.forEach(s => {
        if (!s.active) return;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 3, s.y - s.vy * 3);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`); grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4); ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.opacity -= 0.012;
        if (s.opacity <= 0 || s.x > width || s.y > height) s.active = false;
      });
      ctx.globalCompositeOperation = 'source-over';
    };

    const animate = () => {
      ctx.globalCompositeOperation = 'source-over';
      
      // Dynamic motion blur based on warp
      const clearOpacity = isWarping ? 0.35 : 0.15;
      ctx.fillStyle = `rgba(4, 2, 8, ${clearOpacity})`; 
      ctx.fillRect(0, 0, width, height);

      // Galaxies (Subtle)
      galaxyCanvases.forEach(g => {
        if (!g.canvas) return;
        ctx.globalAlpha = 0.4 * (1 - warpFactor * 0.8); // Fade galaxies during warp
        ctx.drawImage(g.canvas, g.x - 600 * g.scale, g.y - 600 * g.scale, 1200 * g.scale, 1200 * g.scale);
        ctx.globalAlpha = 1;
      });

      // Purple Aura Nebulas
      nebulaGasClouds.forEach(n => {
        n.angle += n.velocity;
        ctx.save(); ctx.translate(n.x, n.y); ctx.rotate(n.angle);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, n.radius);
        grad.addColorStop(0, `rgba(${n.color}, ${n.opacity * (1 - warpFactor)})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad; ctx.globalCompositeOperation = 'screen';
        ctx.beginPath(); ctx.arc(0, 0, n.radius, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });

      if (Math.random() < 0.005) triggerShootingStar();

      // Smooth warpFactor transition
      if (isWarping) {
        warpFactor = Math.min(1, warpFactor + 0.05);
      } else {
        warpFactor = Math.max(0, warpFactor - 0.03);
      }

      // Draw Stars with Stretching
      const drawStretchedStars = (stars, stretchMult) => {
        const now = Date.now();
        stars.forEach(s => {
          const twinkle = Math.sin(now * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
          ctx.globalAlpha = s.baseOpacity * twinkle;
          
          if (warpFactor > 0.01) {
             const stretch = warpFactor * stretchMult * 40;
             const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + stretch);
             grad.addColorStop(0, s.color);
             grad.addColorStop(1, 'transparent');
             ctx.strokeStyle = grad;
             ctx.lineWidth = s.size;
             ctx.beginPath();
             ctx.moveTo(s.x, s.y);
             ctx.lineTo(s.x, s.y + stretch);
             ctx.stroke();
          } else {
             ctx.fillStyle = s.color;
             ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
          }
        });
        ctx.globalAlpha = 1;
      };

      drawStretchedStars(starsFar, 1.2);
      drawStretchedStars(starsMid, 2.5);
      drawStretchedStars(starsNear, 4.5);

      if (!isWarping) {
        drawVolumetricVortex();
        drawShootingStars();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleWarpStart = () => { isWarping = true; };
    const handleWarpEnd = () => { isWarping = false; };

    window.addEventListener("warp-jump-start", handleWarpStart);
    window.addEventListener("warp-jump-end", handleWarpEnd);

    window.addEventListener("resize", resize);
    resize(); animate();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("warp-jump-start", handleWarpStart);
      window.removeEventListener("warp-jump-end", handleWarpEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -10 }} />;
};

export default UniverseBackground;
