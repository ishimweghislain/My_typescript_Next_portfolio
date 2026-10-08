'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function getInitials(title: string): string {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(`/previews/${project.slug}.webp`);
  const [imgFailed, setImgFailed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const hostname = getHostname(project.url);

  // Spotlight mousemove tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--mouse-x', '-9999px');
    cardRef.current.style.setProperty('--mouse-y', '-9999px');
  };

  // Image error fallback handling
  const handleImageError = () => {
    if (project.fallbackImage && imgSrc !== project.fallbackImage) {
      setImgSrc(project.fallbackImage);
    } else {
      setImgFailed(true);
    }
  };

  // Escape key & scroll lock for modal
  useEffect(() => {
    if (!modalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View project details for ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setModalOpen(true);
          }
        }}
        className={`card group cursor-pointer overflow-hidden flex flex-col h-full text-left p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
          featured ? 'border-[var(--border)]' : ''
        }`}
      >
        {/* Browser Window Frame Preview */}
        <div className="browser-frame m-3 mb-0">
          <div className="browser-frame-bar">
            <div className="browser-dots">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
            </div>
            <span className="browser-address">{hostname}</span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-2)]">
            {!imgFailed ? (
              <Image
                src={imgSrc}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface)] text-center">
                <span className="mono font-bold text-2xl text-[var(--accent)] tracking-wider">
                  {getInitials(project.title)}
                </span>
                <span className="text-xs text-[var(--muted)] mono mt-1">{hostname}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content body */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Header row: category + role tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="chip chip-core">{project.category}</span>
            {project.role && (
              <span className="chip">{project.role}</span>
            )}
            {project.year && (
              <span className="mono text-xs text-[var(--muted)] ml-auto">
                {project.year}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent-text,var(--accent))] transition-colors duration-200">
            {project.title}
          </h3>

          {/* Short description */}
          <p className="text-sm line-clamp-2 mb-4 flex-grow" style={{ color: 'var(--muted)' }}>
            {project.description}
          </p>

          {/* Technology chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="chip" title={project.technologies.slice(4).join(', ')}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action links */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-auto">
            <span className="mono text-xs text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
              Details &amp; stack →
            </span>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs mono py-1 px-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent-text,var(--accent))] transition-all"
              style={{ color: 'var(--muted)' }}
            >
              Visit site <ExternalLink size={12} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>

      {/* Accessible Detail Modal */}
      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setModalOpen(false)}
          role="presentation"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.slug}`}
            className="modal-content relative p-6 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 btn btn-secondary !p-2 !min-w-[36px] !min-h-[36px] flex items-center justify-center z-10"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            {/* Modal preview */}
            <div className="browser-frame mb-6">
              <div className="browser-frame-bar">
                <div className="browser-dots">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                </div>
                <span className="browser-address">{hostname}</span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-2)]">
                {!imgFailed ? (
                  <Image
                    src={imgSrc}
                    alt={`${project.title} large preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[var(--surface-2)] text-center">
                    <span className="mono font-bold text-3xl text-[var(--accent)] tracking-wider">
                      {getInitials(project.title)}
                    </span>
                    <span className="text-sm text-[var(--muted)] mono mt-2">{hostname}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="chip chip-core">{project.category}</span>
              {project.role && <span className="chip">{project.role}</span>}
              {project.year && (
                <span className="mono text-xs text-[var(--muted)]">
                  Shipped {project.year}
                </span>
              )}
            </div>

            {/* Modal title */}
            <h2
              id={`modal-title-${project.slug}`}
              className="text-2xl font-bold mb-3"
              style={{ color: 'var(--text)' }}
            >
              {project.title}
            </h2>

            {/* Full description */}
            <p className="text-base mb-6" style={{ color: 'var(--muted)', maxWidth: 'none' }}>
              {project.description}
            </p>

            {/* Full technology list */}
            <div className="mb-6">
              <p className="mono text-xs uppercase tracking-wider mb-2 text-[var(--muted)]">
                Technologies &amp; Architecture
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border)]">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit live site
                <ArrowUpRight size={16} strokeWidth={2} className="btn-arrow" />
              </a>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
