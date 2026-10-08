'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface MetricCounterProps {
  numericValue: number;
  suffix: string;
  label: string;
}

export default function MetricCounter({ numericValue, suffix, label }: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCount(numericValue);
      return;
    }

    const start = 0;
    const duration = 600; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: cubic-bezier(0.22, 1, 0.36, 1) approx
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (numericValue - start) * ease);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <span
          className="mono text-2xl md:text-3xl font-bold tracking-tight text-[var(--accent-text,var(--accent))]"
        >
          {count}
        </span>
        <span className="mono text-lg md:text-xl font-bold text-[var(--accent-text,var(--accent))]">
          {suffix}
        </span>
      </div>
      <p className="mono text-xs uppercase tracking-wider text-[var(--muted)] mt-1">
        {label}
      </p>
    </div>
  );
}
