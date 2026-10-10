'use client';

import React, { useEffect, useRef } from 'react';

interface ConstellationCanvasProps {
  className?: string;
  count?: number;
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  opacity: number;
}

export default function ConstellationCanvas({
  className = 'fixed inset-0 pointer-events-none z-0',
  count,
}: ConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of stars: 40 to 60 stars across the whole viewport for a balanced constellation
    const STAR_COUNT =
      count || Math.min(65, Math.max(32, Math.floor((width * height) / 22000)));
    const CONNECT_DISTANCE = 120;
    const MOUSE_RADIUS = 180;

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    // Initialize stars
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const vx = (Math.random() - 0.5) * 0.35;
      const vy = (Math.random() - 0.5) * 0.35;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 1.5 + 1.2,
        opacity: Math.random() * 0.45 + 0.35,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Star & connection line colors tuned for Graphite + Lime Spark
      const starColor = isDark ? 'rgba(182, 255, 46,' : 'rgba(22, 24, 31,';
      const lineColor = isDark ? 'rgba(182, 255, 46,' : 'rgba(22, 24, 31,';
      const mouseLineColor = isDark ? 'rgba(182, 255, 46,' : 'rgba(59, 96, 0,';

      // Update positions & follow cursor
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          // If cursor is near, stars smoothly pull toward and follow the cursor
          if (mouse.active) {
            const dx = mouse.x - star.x;
            const dy = mouse.y - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_RADIUS && dist > 0) {
              const force = (1 - dist / MOUSE_RADIUS) * 0.05;
              star.vx += dx * force;
              star.vy += dy * force;
            }
          }

          // Apply natural damping toward base drift velocity
          star.vx = star.vx * 0.94 + star.baseVx * 0.06;
          star.vy = star.vy * 0.94 + star.baseVy * 0.06;

          star.x += star.vx;
          star.y += star.vy;

          // Screen boundaries wrap / bounce
          if (star.x < 0) {
            star.x = 0;
            star.vx = Math.abs(star.vx);
          } else if (star.x > width) {
            star.x = width;
            star.vx = -Math.abs(star.vx);
          }

          if (star.y < 0) {
            star.y = 0;
            star.vy = Math.abs(star.vy);
          } else if (star.y > height) {
            star.y = height;
            star.vy = -Math.abs(star.vy);
          }
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${starColor} ${star.opacity})`;
        ctx.fill();

        // Connect star to nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const star2 = stars[j];
          const dx = star.x - star2.x;
          const dy = star.y - star2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECT_DISTANCE) * (isDark ? 0.18 : 0.09);
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.strokeStyle = `${lineColor} ${lineOpacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw interactive connection line between star and mouse cursor
        if (mouse.active) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const cursorLineOpacity = (1 - dist / MOUSE_RADIUS) * (isDark ? 0.32 : 0.18);
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${mouseLineColor} ${cursorLineOpacity})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }
        }
      }

      // Small cursor constellation core anchor dot
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${mouseLineColor} ${isDark ? 0.55 : 0.4})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
