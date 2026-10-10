'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, Printer, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { profile, experiences, projects, education, awards } from '@/data';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl overflow-hidden shadow-2xl z-10 border border-[var(--border)]"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-2)] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                <span className="mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                  Curriculum Vitae Preview
                </span>
                <span className="hidden sm:inline-block mono text-[0.7rem] px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-text,var(--accent))]">
                  Live Document
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-secondary !py-1.5 !px-2.5 !min-h-[32px] mono text-xs flex items-center gap-1.5"
                  title="Print or Save as PDF"
                >
                  <Printer size={13} strokeWidth={2} />
                  <span className="hidden md:inline">Print</span>
                </button>

                <a
                  href="/Ishimwe_Ghislain_CV.pdf"
                  download="Ishimwe_Ghislain_CV.pdf"
                  className="btn btn-primary !py-1.5 !px-3 !min-h-[32px] mono text-xs flex items-center gap-1.5"
                  title="Download Official PDF"
                >
                  <FileDown size={13} strokeWidth={2} />
                  <span>Download PDF</span>
                </a>

                <a
                  href="/cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary !py-1.5 !px-2.5 !min-h-[32px] mono text-xs hidden sm:flex items-center gap-1.5"
                  title="Open Dedicated Full Page"
                >
                  <ExternalLink size={13} strokeWidth={2} />
                  <span className="hidden lg:inline">Full Page</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary !p-1.5 !min-w-[32px] !min-h-[32px] flex items-center justify-center ml-1 text-[var(--muted)] hover:text-[var(--text)]"
                  aria-label="Close modal"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Scrollable Document Paper */}
            <div className="overflow-y-auto p-4 sm:p-8 space-y-6 text-[var(--text)] font-sans">
              {/* Document Header */}
              <div className="border-b-2 border-[var(--border)] pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                    {profile.name}
                  </h1>
                  <p className="mono text-sm sm:text-base font-semibold text-[var(--accent-text,var(--accent))] mt-1">
                    {profile.role} &bull; Software Engineer
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-1.5">
                    {profile.currentCompany} &bull; {profile.availability}
                  </p>
                </div>

                <div className="mono text-xs text-[var(--muted)] space-y-1.5 md:text-right shrink-0">
                  <div className="flex items-center md:justify-end gap-1.5">
                    <MapPin size={12} className="text-[var(--accent-text,var(--accent))]" />
                    <span>{profile.based}</span>
                  </div>
                  <div className="flex items-center md:justify-end gap-1.5">
                    <Phone size={12} className="text-[var(--accent-text,var(--accent))]" />
                    <a href={`tel:${profile.phoneRaw}`} className="hover:text-[var(--text)] font-medium">
                      {profile.phone}
                    </a>
                  </div>
                  <div className="flex items-center md:justify-end gap-1.5">
                    <Mail size={12} className="text-[var(--accent-text,var(--accent))]" />
                    <a href={`mailto:${profile.email}`} className="hover:text-[var(--text)] font-medium">
                      {profile.email}
                    </a>
                  </div>
                  <div className="flex items-center md:justify-end gap-1.5">
                    <Globe size={12} className="text-[var(--accent-text,var(--accent))]" />
                    <a href="https://ghislain.dev" target="_blank" rel="noreferrer" className="hover:text-[var(--text)] font-medium">
                      ghislain.dev
                    </a>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-2.5">
                  01 / Professional Summary
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                  {profile.bio}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-3">
                  02 / Experience
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="card p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h3 className="text-sm font-bold text-[var(--text)]">
                            {exp.role} <span className="text-[var(--accent-text,var(--accent))]">&bull;</span> {exp.company}
                          </h3>
                          <p className="text-xs text-[var(--muted)]">{exp.location}</p>
                        </div>
                        <span className="mono text-[0.7rem] px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted)] shrink-0 self-start sm:self-center">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-[var(--text)] space-y-1">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Production Projects */}
              <div>
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-3">
                  03 / Selected Production Systems
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.slice(0, 6).map((p) => (
                    <div key={p.slug} className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[var(--text)]">{p.title}</span>
                        <span className="mono text-[0.65rem] text-[var(--accent-text,var(--accent))]">{p.category}</span>
                      </div>
                      <p className="text-[0.75rem] text-[var(--muted)] mb-2 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {p.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="mono text-[0.6rem] px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--muted)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Awards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-3">
                    04 / Education
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.institution} className="text-xs">
                        <p className="font-bold text-[var(--text)]">{edu.degree}</p>
                        <p className="text-[var(--muted)]">{edu.institution} &bull; {edu.period}</p>
                        {edu.detail && <p className="text-[0.7rem] text-[var(--muted)] mt-0.5">{edu.detail}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-3">
                    05 / Awards &amp; Languages
                  </h2>
                  <div className="space-y-3 text-xs">
                    {awards.map((a, i) => (
                      <div key={i}>
                        <p className="font-bold text-[var(--text)]">{a.title}</p>
                        <p className="text-[var(--muted)]">{a.issuer}</p>
                        {a.detail && <p className="text-[0.7rem] text-[var(--muted)] mt-0.5">{a.detail}</p>}
                      </div>
                    ))}
                    <div className="pt-1">
                      <p className="font-bold text-[var(--text)] mb-1">Languages:</p>
                      <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                        {profile.languages.map((l) => (
                          <span key={l.language} className="mono text-[0.7rem] px-2 py-0.5 rounded bg-[var(--surface-2)]">
                            {l.language}: {l.level}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
                <span>Verified Curriculum Vitae &bull; Updated October 2026</span>
                <div className="flex gap-2">
                  <a
                    href="/Ishimwe_Ghislain_CV.pdf"
                    download="Ishimwe_Ghislain_CV.pdf"
                    className="btn btn-primary !py-1.5 !px-3 text-xs"
                  >
                    Download Official PDF
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
