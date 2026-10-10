'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, GraduationCap, Trophy, Languages, ArrowUpRight, Eye } from 'lucide-react';
import CVModal from '@/components/ui/CVModal';
import { education, awards, profile } from '@/data';

export default function Resume() {
  const [isCvOpen, setIsCvOpen] = useState(false);

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
    <section id="resume" className="py-24" style={{ backgroundColor: 'color-mix(in srgb, var(--surface-2) 30%, transparent)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-14">
          <p className="section-label mb-2">06 / RESUME</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--text)' }}
              >
                Curriculum Vitae &amp; Credentials
              </h2>
              <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
                Academic qualifications, industry recognitions, and spoken languages.
              </p>
            </div>

            {/* Prominent CV Actions: Review online & Download PDF */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsCvOpen(true)}
                className="btn btn-secondary !py-2.5 !px-4 mono text-xs flex items-center gap-2"
                title="Review CV directly in browser"
              >
                <Eye size={15} strokeWidth={2} className="text-[var(--accent-text,var(--accent))]" />
                <span>Review CV Online</span>
              </button>

              <a
                href="/Ishimwe_Ghislain_CV.pdf"
                download="Ishimwe_Ghislain_CV.pdf"
                className="btn btn-primary"
              >
                <FileDown size={16} strokeWidth={2} />
                <span>Download PDF</span>
                <ArrowUpRight size={14} strokeWidth={2} className="btn-arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Education */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card p-6 md:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border)]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--accent-text,var(--accent))]"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                >
                  <GraduationCap size={16} strokeWidth={1.75} />
                </div>
                <h3 className="mono font-semibold text-sm uppercase tracking-wider text-[var(--text)]">
                  Education
                </h3>
              </div>

              <div className="space-y-5">
                {education.map((edu, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="mono text-xs text-[var(--accent-text,var(--accent))]">
                      {edu.period}
                    </span>
                    <h4 className="font-bold text-sm text-[var(--text)] mt-0.5">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {edu.institution}
                    </p>
                    {edu.detail && (
                      <span className="chip mt-2 self-start !text-[0.65rem] !py-0.5 !px-2">
                        {edu.detail}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] mt-6 text-right">
              <span className="mono text-[0.7rem] text-[var(--muted)]">AUCA Year 2</span>
            </div>
          </motion.div>

          {/* Card 2: Awards & Honors */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card p-6 md:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border)]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--accent-text,var(--accent))]"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                >
                  <Trophy size={16} strokeWidth={1.75} />
                </div>
                <h3 className="mono font-semibold text-sm uppercase tracking-wider text-[var(--text)]">
                  Awards &amp; Honors
                </h3>
              </div>

              <div className="space-y-5">
                {awards.map((award, i) => (
                  <div key={i} className="flex flex-col">
                    <h4 className="font-bold text-sm text-[var(--text)]">
                      {award.title}
                    </h4>
                    <span className="mono text-xs text-[var(--accent-text,var(--accent))] mt-0.5">
                      {award.issuer}
                    </span>
                    {award.detail && (
                      <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                        {award.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] mt-6 text-right">
              <span className="mono text-[0.7rem] text-[var(--muted)]">Verified Achievements</span>
            </div>
          </motion.div>

          {/* Card 3: Languages & Global Communication */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="card p-6 md:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border)]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--accent-text,var(--accent))]"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                >
                  <Languages size={16} strokeWidth={1.75} />
                </div>
                <h3 className="mono font-semibold text-sm uppercase tracking-wider text-[var(--text)]">
                  Languages
                </h3>
              </div>

              <div className="space-y-4">
                {profile.languages.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">
                        {item.language}
                      </p>
                      <span className="mono text-xs text-[var(--muted)]">
                        {item.level}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--muted)] leading-relaxed">
                Comfortable operating in bilingual engineering sprints, technical documentation, and cross-border client discussions.
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] mt-6 text-right">
              <span className="mono text-[0.7rem] text-[var(--muted)]">Global Readiness</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive In-Browser CV Review Modal */}
      <CVModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}
