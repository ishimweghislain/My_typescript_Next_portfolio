'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const { resolvedTheme } = useTheme();

  // Theme-based particle colors
  const getParticleColors = useCallback(() => {
    switch (resolvedTheme) {
      case 'light':
        return ['#0070f3', '#61dafb', '#6366f1', '#8b5cf6'];
      case 'dark':
        return ['#0070f3', '#61dafb', '#3b82f6', '#06b6d4'];
      case 'cyberpunk':
        return ['#ff0080', '#00ff88', '#ff6b35', '#7209b7'];
      case 'ocean':
        return ['#0ea5e9', '#06b6d4', '#3b82f6', '#1e40af'];
      default:
        return ['#0070f3', '#61dafb', '#3b82f6', '#06b6d4'];
    }
  }, [resolvedTheme]);

  const createParticle = useCallback((x: number, y: number): Particle => {
    const colors = getParticleColors();
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 100 + 50,
    };
  }, [getParticleColors]);

  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.opacity = Math.max(0, 1 - particle.life / particle.maxLife);

      // Gravity towards mouse
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100 * 0.01;
        particle.vx += dx * force;
        particle.vy += dy * force;
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      return particle.life < particle.maxLife;
    });
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particlesRef.current.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    // Draw connections between nearby particles
    ctx.strokeStyle = resolvedTheme === 'light' ? 'rgba(0, 112, 243, 0.1)' : 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

        if (distance < 80) {
          ctx.globalAlpha = (80 - distance) / 80 * 0.3;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }, [resolvedTheme]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles();
    drawParticles(ctx);

    animationRef.current = requestAnimationFrame(animate);
  }, [drawParticles, updateParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add particles on mouse move
      if (Math.random() < 0.3) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Burst of particles on click
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (isVisible) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, resolvedTheme, animate, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: resolvedTheme === 'light' ? 'multiply' : 'screen' }}
    />
  );
};

export default ParticleSystem;
