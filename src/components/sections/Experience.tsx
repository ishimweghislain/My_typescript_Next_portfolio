'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { experiences } from '@/data';

export default function Experience() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--mouse-x', '-9999px');
    e.currentTarget.style.setProperty('--mouse-y', '-9999px');
  };

  return (
    <section id="experience" className="py-24" style={{ backgroundColor: 'color-mix(in srgb, var(--surface-2) 30%, transparent)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-14">
          <p className="section-label mb-2">03 / EXPERIENCE</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--text)' }}
              >
                Work Experience &amp; Engineering Roles
              </h2>
              <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
                Track record of shipping mission-critical client platforms and mentoring junior developers.
              </p>
            </div>

            <div className="mono text-xs text-[var(--muted)] shrink-0">
              Kigali &amp; Remote • 2025 — Present
            </div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 md:pl-8 border-l border-[var(--border)] max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Lime Node Marker on the timeline */}
              <div
                className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[var(--bg)] flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-fg)]" />
              </div>

              {/* Timeline Card */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="card p-6 md:p-8"
              >
                {/* Header row: Role + Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--text)]">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="mono text-sm font-semibold text-[var(--accent-text,var(--accent))]">
                        {exp.company}
                      </span>
                      <span className="text-[var(--border)]">•</span>
                      <span className="mono text-xs text-[var(--muted)] inline-flex items-center gap-1">
                        <MapPin size={12} strokeWidth={1.75} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="mono text-xs text-[var(--muted)] inline-flex items-center gap-1 bg-[var(--surface-2)] px-2.5 py-1 rounded-[var(--radius-sm)] border border-[var(--border)]">
                      <Calendar size={12} strokeWidth={1.75} />
                      {exp.period}
                    </span>
                    {exp.subperiod && (
                      <p className="mono text-[0.7rem] text-[var(--muted)] mt-1">
                        {exp.subperiod}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--muted)' }}>
                      <span className="mono text-[var(--accent-text,var(--accent))] font-bold text-xs mt-1 shrink-0">
                        ›
                      </span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
