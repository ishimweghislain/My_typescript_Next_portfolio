'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data';

export default function Skills() {
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
    <section id="skills" className="py-24" style={{ backgroundColor: 'transparent' }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-14">
          <p className="section-label mb-2">02 / SKILLS</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--text)' }}
              >
                Technical Stack &amp; Capabilities
              </h2>
              <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
                Tools, frameworks, and architecture patterns I employ to build scalable software.
              </p>
            </div>

            <div className="flex items-center gap-2 mono text-xs text-[var(--muted)] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span>Highlighted tags denote core production stack</span>
            </div>
          </div>
        </div>

        {/* Skill Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="card p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--border)]">
                  <h3 className="mono font-semibold text-sm tracking-wide text-[var(--text)]">
                    {category.title}
                  </h3>
                  <span className="mono text-xs text-[var(--muted)]">
                    {category.skills.length} tools
                  </span>
                </div>

                {/* Chip list */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`chip ${skill.isCore ? 'chip-core font-medium' : ''}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
