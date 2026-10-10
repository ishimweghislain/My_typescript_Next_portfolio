import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileDown, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { profile, experiences, projects, education, awards } from '@/data';

export const metadata: Metadata = {
  title: 'Curriculum Vitae (CV) | Ishimwe Ghislain',
  description:
    'Official Curriculum Vitae of Ishimwe Ghislain. Full Stack Developer and Software Engineer in Rwanda with expertise in Next.js, TypeScript, Laravel, Flutter, PostgreSQL, and Docker.',
  alternates: {
    canonical: '/cv',
  },
  openGraph: {
    title: 'Ishimwe Ghislain — Curriculum Vitae (CV)',
    description:
      'Professional engineering CV and credentials of Ishimwe Ghislain — Full Stack Developer & Software Engineer.',
    url: 'https://ghislain.dev/cv',
    type: 'profile',
  },
};

export default function CVPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm print:hidden">
          <Link
            href="/"
            className="btn btn-secondary !py-2 !px-3 mono text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="/Ishimwe_Ghislain_CV.pdf"
              download="Ishimwe_Ghislain_CV.pdf"
              className="btn btn-primary !py-2 !px-3.5 mono text-xs flex items-center gap-1.5"
            >
              <FileDown size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Paper Document Container */}
        <main
          className="p-6 sm:p-10 rounded-2xl border border-[var(--border)] shadow-xl space-y-8"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          {/* Header */}
          <header className="border-b-2 border-[var(--border)] pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
                {profile.name}
              </h1>
              <p className="mono text-base font-semibold text-[var(--accent-text,var(--accent))] mt-1">
                {profile.role} &bull; Software Engineer
              </p>
              <p className="text-xs text-[var(--muted)] mt-1.5">
                {profile.currentCompany} &bull; {profile.availability}
              </p>
            </div>

            <div className="mono text-xs text-[var(--muted)] space-y-1.5 md:text-right shrink-0">
              <div className="flex items-center md:justify-end gap-1.5">
                <MapPin size={13} className="text-[var(--accent-text,var(--accent))]" />
                <span>{profile.based}</span>
              </div>
              <div className="flex items-center md:justify-end gap-1.5">
                <Phone size={13} className="text-[var(--accent-text,var(--accent))]" />
                <a href={`tel:${profile.phoneRaw}`} className="hover:text-[var(--text)] font-semibold">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center md:justify-end gap-1.5">
                <Mail size={13} className="text-[var(--accent-text,var(--accent))]" />
                <a href={`mailto:${profile.email}`} className="hover:text-[var(--text)] font-semibold">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center md:justify-end gap-1.5">
                <Globe size={13} className="text-[var(--accent-text,var(--accent))]" />
                <a href="https://ghislain.dev" className="hover:text-[var(--text)] font-semibold">
                  ghislain.dev
                </a>
              </div>
            </div>
          </header>

          {/* 01 Summary */}
          <section>
            <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-3">
              01 / Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {profile.bio}
            </p>
          </section>

          {/* 02 Experience */}
          <section>
            <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-4">
              02 / Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="card p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text)]">
                        {exp.role} <span className="text-[var(--accent-text,var(--accent))]">&bull;</span> {exp.company}
                      </h3>
                      <p className="text-xs text-[var(--muted)]">{exp.location}</p>
                    </div>
                    <span className="mono text-[0.7rem] px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted)] self-start sm:self-center">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[var(--text)] space-y-1.5 mb-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 03 Selected Projects */}
          <section>
            <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-4">
              03 / Selected Production Systems
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 6).map((p) => (
                <div key={p.slug} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-[var(--text)]">{p.title}</span>
                    <span className="mono text-[0.68rem] text-[var(--accent-text,var(--accent))] font-semibold">{p.category}</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mb-2.5 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="mono text-[0.65rem] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--muted)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 04 Education & Awards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <section>
              <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-3">
                04 / Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.institution} className="text-xs">
                    <p className="font-bold text-[var(--text)] text-sm">{edu.degree}</p>
                    <p className="text-[var(--muted)] mt-0.5">{edu.institution} &bull; {edu.period}</p>
                    {edu.detail && <p className="text-[0.75rem] text-[var(--muted)] mt-1">{edu.detail}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--accent-text,var(--accent))] border-b border-[var(--border)] pb-1.5 mb-3">
                05 / Awards &amp; Languages
              </h2>
              <div className="space-y-3 text-xs">
                {awards.map((a, i) => (
                  <div key={i}>
                    <p className="font-bold text-[var(--text)] text-sm">{a.title}</p>
                    <p className="text-[var(--muted)] text-xs mt-0.5">{a.issuer}</p>
                    {a.detail && <p className="text-[var(--muted)] text-[0.75rem] mt-0.5 leading-relaxed">{a.detail}</p>}
                  </div>
                ))}
                <div className="pt-2">
                  <p className="font-bold text-[var(--text)] mb-1.5">Languages:</p>
                  <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                    {profile.languages.map((l) => (
                      <span key={l.language} className="mono text-[0.72rem] px-2.5 py-1 rounded bg-[var(--surface-2)]">
                        {l.language}: {l.level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Action Footer */}
          <footer className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
            <span>Official Curriculum Vitae &bull; Ishimwe Ghislain</span>
            <a
              href="/Ishimwe_Ghislain_CV.pdf"
              download="Ishimwe_Ghislain_CV.pdf"
              className="btn btn-primary !py-2 !px-4 mono text-xs flex items-center gap-1.5"
            >
              <FileDown size={14} />
              <span>Download PDF Copy</span>
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
