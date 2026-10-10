'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profile } from '@/data';

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const socialIconsMap: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  Instagram: <InstagramIcon />,
  GitHub: <GitHubIcon />,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="py-16 border-t border-[var(--border)]"
      style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 40%, transparent)' }}
    >
      <div className="container">
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5">
            <a
              href="#home"
              className="mono text-base font-semibold tracking-tight inline-flex items-center gap-1 mb-3"
              style={{ color: 'var(--text)' }}
            >
              <span>ghislain</span>
              <span className="text-[var(--accent-text,var(--accent))] font-bold">.</span>
              <span>dev</span>
            </a>
            <p className="text-sm max-w-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
              Full Stack Developer based in Kamonyi, Rwanda. Focused on reliable fintech, e-commerce, and education platforms.
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
                  Kamonyi, Rwanda (UTC+2)
                </span>
              </div>
              <a
                href={`tel:${profile.phoneRaw}`}
                className="mono text-xs hover:text-[var(--accent-text,var(--accent))] transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                Direct: {profile.phone}
              </a>
            </div>
          </div>

          {/* Quick links (4 cols) */}
          <div className="md:col-span-4">
            <p className="mono text-xs uppercase tracking-wider text-[var(--muted)] mb-3">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="mono text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors py-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <p className="mono text-xs uppercase tracking-wider text-[var(--muted)] mb-3">
                Connect
              </p>
              <div className="flex gap-2.5">
                {profile.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="btn btn-secondary !p-2.5 !min-w-[38px] !min-h-[38px] flex items-center justify-center"
                    style={{ color: 'var(--muted)' }}
                    title={s.name}
                  >
                    {socialIconsMap[s.name]}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <button
                type="button"
                onClick={scrollToTop}
                className="mono text-xs inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp size={13} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            &copy; {currentYear} Ishimwe Ghislain. All rights reserved.
          </p>

          <p className="mono text-xs" style={{ color: 'var(--muted)' }}>
            Built with Next.js 15 &amp; Tailwind v4
          </p>
        </div>
      </div>
    </footer>
  );
}
