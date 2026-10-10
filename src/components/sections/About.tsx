'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Languages, Terminal, Building2 } from 'lucide-react';
import { profile } from '@/data';

export default function About() {
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
    <section id="about" className="py-24" style={{ backgroundColor: 'color-mix(in srgb, var(--surface-2) 30%, transparent)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-14">
          <p className="section-label mb-2">01 / ABOUT</p>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: 'var(--text-h2)', color: 'var(--text)' }}
          >
            Engineering Background &amp; Profile
          </h2>
          <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
            Full stack engineer shipping production platforms end-to-end for African businesses and beyond.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large Main Bio (Span 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card md:col-span-7 p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="chip chip-core">Full Stack Engineer</span>
                <span className="mono text-xs text-[var(--muted)]">At Fullstack Software Ltd</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-5" style={{ color: 'var(--text)' }}>
                Building reliable software systems, from database schema to cloud servers.
              </h3>

              <p
                className="text-base mb-4 leading-relaxed"
                style={{ color: 'var(--muted)', maxWidth: 'none' }}
              >
                {profile.bio}
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Building2 size={16} strokeWidth={1.75} className="text-[var(--accent-text,var(--accent))]" />
                <span className="mono text-xs text-[var(--text)] font-medium">Fullstack Software Ltd</span>
              </div>
              <span className="text-[var(--border)]">•</span>
              <div className="flex items-center gap-2">
                <Terminal size={16} strokeWidth={1.75} className="text-[var(--accent-text,var(--accent))]" />
                <span className="mono text-xs text-[var(--muted)]">PostgreSQL, APIs, Docker, CI/CD</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Photo Card (Span 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card md:col-span-5 p-6 md:p-8 flex flex-col items-center justify-center text-center"
          >
            <div className="photo-frame-wrapper mb-6">
              <div className="photo-frame w-48 h-48 md:w-56 md:h-56 relative">
                <Image
                  src="/images/me.jpeg"
                  alt="Ishimwe Ghislain"
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            <h4 className="font-bold text-lg text-[var(--text)] mb-1">
              Ishimwe Ghislain
            </h4>
            <p className="mono text-xs text-[var(--accent-text,var(--accent))]">
              Full Stack Developer &amp; Project Manager
            </p>
            <p className="mono text-xs text-[var(--muted)] mt-1">
              Kamonyi, Rwanda
            </p>
          </motion.div>

          {/* Card 3: Location (Span 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card md:col-span-4 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="mono text-xs uppercase tracking-wider text-[var(--muted)]">
                Location
              </span>
              <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent-text,var(--accent))]">
                <MapPin size={16} strokeWidth={1.75} />
              </div>
            </div>

            <div>
              <p className="text-lg font-bold text-[var(--text)] mb-1">
                {profile.based}
              </p>
              <p className="mono text-xs text-[var(--muted)] mb-3">
                CAT (UTC+2) • Remote Ready
              </p>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Available for remote teams across African, European, and US time zones.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Education (Span 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card md:col-span-4 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="mono text-xs uppercase tracking-wider text-[var(--muted)]">
                Education
              </span>
              <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent-text,var(--accent))]">
                <GraduationCap size={16} strokeWidth={1.75} />
              </div>
            </div>

            <div>
              <p className="text-lg font-bold text-[var(--text)] mb-1">
                AUCA
              </p>
              <p className="mono text-xs text-[var(--accent-text,var(--accent))] mb-2">
                BSc Software Engineering
              </p>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Adventist University of Central Africa (AUCA), Year 2 student. Focus on systems architecture and data engineering.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Languages (Span 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card md:col-span-4 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="mono text-xs uppercase tracking-wider text-[var(--muted)]">
                Languages
              </span>
              <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent-text,var(--accent))]">
                <Languages size={16} strokeWidth={1.75} />
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-2">
                {profile.languages.map((l) => (
                  <div key={l.language} className="flex items-center justify-between py-1 border-b border-[var(--border)] last:border-b-0">
                    <span className="text-sm font-medium text-[var(--text)]">{l.language}</span>
                    <span className="mono text-xs text-[var(--muted)]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
