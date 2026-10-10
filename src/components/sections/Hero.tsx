'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown, Mail, Phone, Eye } from 'lucide-react';
import MetricCounter from '@/components/ui/MetricCounter';
import CVModal from '@/components/ui/CVModal';
import { profile } from '@/data';

export default function Hero() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Subtle Lime radial glow behind the hero only */}
      <div className="hero-glow" />

      <div className="container relative z-10 flex flex-col">
        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-12 md:mb-16">
          {/* Left Column: Bio / Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Availability Badge & Direct Phone */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <div className="availability-badge">
                <span className="availability-dot animate-pulse-dot" />
                <span>{profile.availability}</span>
              </div>
              <a
                href={`tel:${profile.phoneRaw}`}
                className="mono text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent-text,var(--accent))] transition-colors inline-flex items-center gap-1.5"
                title={`Call: ${profile.phone}`}
              >
                <Phone size={11} strokeWidth={2.2} className="text-[var(--accent-text,var(--accent))]" />
                <span>{profile.phoneRaw}</span>
              </a>
            </div>

            {/* Name */}
            <h1
              className="font-bold tracking-tight mb-2 text-[var(--text)]"
              style={{
                fontSize: 'var(--text-hero)',
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
              }}
            >
              Ishimwe Ghislain
            </h1>

            {/* Title / Role */}
            <p
              className="mono text-lg md:text-xl font-medium mb-3"
              style={{ color: 'var(--accent-text,var(--accent))' }}
            >
              {profile.role}
            </p>

            {/* Value Proposition */}
            <p
              className="text-base md:text-lg mb-7 max-w-[56ch]"
              style={{ color: 'var(--muted)', lineHeight: 1.6 }}
            >
              {profile.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('projects');
                }}
                className="btn btn-primary"
              >
                <span>View Projects</span>
                <ArrowRight size={15} strokeWidth={2} className="btn-arrow" />
              </a>

              <button
                type="button"
                onClick={() => setIsCvOpen(true)}
                className="btn btn-secondary !py-2.5 !px-3.5 flex items-center gap-1.5"
                title="Review CV directly in browser"
              >
                <Eye size={15} strokeWidth={1.75} className="text-[var(--accent-text,var(--accent))]" />
                <span>Review CV</span>
              </button>

              <a
                href="/Ishimwe_Ghislain_CV.pdf"
                download="Ishimwe_Ghislain_CV.pdf"
                className="btn btn-secondary !py-2.5 !px-3.5 flex items-center gap-1.5"
                title="Download CV (PDF)"
              >
                <FileDown size={15} strokeWidth={1.75} />
                <span>Download CV</span>
              </a>

              <a
                href={`tel:${profile.phoneRaw}`}
                className="btn btn-secondary mono text-xs !py-2.5 !px-3.5 flex items-center gap-1.5"
                title={`Direct Call: ${profile.phone}`}
              >
                <Phone size={13} strokeWidth={2} className="text-[var(--accent-text,var(--accent))]" />
                <span className="font-semibold">{profile.phoneRaw}</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                className="mono text-xs px-2 py-3 underline underline-offset-4 transition-colors hover:text-[var(--text)]"
                style={{ color: 'var(--muted)' }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Mail size={13} strokeWidth={1.75} />
                  Contact me
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Engineer Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="code-card shadow-lg">
              {/* Editor Header Bar with traffic lights */}
              <div className="code-card-bar">
                <div className="flex items-center gap-1.5">
                  <span className="code-card-dot-red" />
                  <span className="code-card-dot-yellow" />
                  <span className="code-card-dot-green" />
                </div>
                <span className="code-card-title">profile.ts</span>
              </div>

              {/* Typed Object Body with minimal accent/muted/text syntax */}
              <div className="code-body">
                <div className="code-line">
                  <span className="code-keyword">const</span>
                  <span className="code-var">&nbsp;ghislain&nbsp;</span>
                  <span className="code-punct">= {'{'}</span>
                </div>
                <div className="code-line">
                  <span className="code-key">&nbsp;&nbsp;role</span>
                  <span className="code-punct">:&nbsp;</span>
                  <span className="code-str">&quot;Full Stack Developer&quot;</span>
                  <span className="code-punct">,</span>
                </div>
                <div className="code-line">
                  <span className="code-key">&nbsp;&nbsp;based</span>
                  <span className="code-punct">:&nbsp;</span>
                  <span className="code-str">&quot;Kamonyi, Rwanda&quot;</span>
                  <span className="code-punct">,</span>
                </div>
                <div className="code-line">
                  <span className="code-key">&nbsp;&nbsp;stack</span>
                  <span className="code-punct">:&nbsp;[</span>
                </div>
                <div className="code-line">
                  <span className="code-str">&nbsp;&nbsp;&nbsp;&nbsp;&quot;Next.js&quot;</span>
                  <span className="code-punct">,&nbsp;</span>
                  <span className="code-str">&quot;NestJS&quot;</span>
                  <span className="code-punct">,&nbsp;</span>
                  <span className="code-str">&quot;Laravel&quot;</span>
                  <span className="code-punct">,</span>
                </div>
                <div className="code-line">
                  <span className="code-str">&nbsp;&nbsp;&nbsp;&nbsp;&quot;PostgreSQL&quot;</span>
                  <span className="code-punct">,&nbsp;</span>
                  <span className="code-str">&quot;Flutter&quot;</span>
                </div>
                <div className="code-line">
                  <span className="code-punct">&nbsp;&nbsp;],</span>
                </div>
                <div className="code-line">
                  <span className="code-key">&nbsp;&nbsp;ships</span>
                  <span className="code-punct">:&nbsp;[</span>
                  <span className="code-str">&quot;Docker&quot;</span>
                  <span className="code-punct">,&nbsp;</span>
                  <span className="code-str">&quot;Nginx&quot;</span>
                  <span className="code-punct">,&nbsp;</span>
                  <span className="code-str">&quot;CI/CD&quot;</span>
                  <span className="code-punct">],</span>
                </div>
                <div className="code-line">
                  <span className="code-key">&nbsp;&nbsp;openTo</span>
                  <span className="code-punct">:&nbsp;</span>
                  <span className="code-str">&quot;Remote, hybrid &amp; on-site&quot;</span>
                  <span className="code-punct">,</span>
                </div>
                <div className="code-line">
                  <span className="code-punct">{'}'};</span>
                  <span
                    className="animate-blink font-bold ml-1"
                    style={{ color: 'var(--accent)' }}
                    aria-hidden="true"
                  >
                    ▌
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pt-8 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {profile.metrics.map((m) => (
            <MetricCounter
              key={m.label}
              numericValue={m.numericValue}
              suffix={m.suffix}
              label={m.label}
            />
          ))}
        </motion.div>
      </div>

      {/* Interactive CV Review Modal */}
      <CVModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}
