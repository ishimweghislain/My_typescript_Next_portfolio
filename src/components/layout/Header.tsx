'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';

const navItems = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Resume', href: '#resume', id: 'resume' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Handle scroll detection and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section based on scroll offset
      const headerOffset = 100;
      const scrollPos = window.scrollY + headerOffset;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with offset for sticky header
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#');
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      const headerHeight = 72;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <>
      <ScrollProgressBar />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
          scrolled ? 'shadow-xs' : ''
        }`}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg) 94%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Wordmark logo */}
            <a
              href="#home"
              onClick={(e) => scrollTo(e, 'home')}
              className="mono font-semibold text-sm tracking-tight inline-flex items-center group py-2"
              style={{ color: 'var(--text)' }}
            >
              <span>ghislain</span>
              <span className="text-[var(--accent-text,var(--accent))] font-bold">.</span>
              <span>dev</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] ml-1 opacity-75 group-hover:scale-125 transition-transform" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.id)}
                    className="mono text-xs px-3 py-1.5 rounded-[var(--radius-sm)] transition-all duration-200 relative"
                    style={{
                      color: isActive ? 'var(--text)' : 'var(--muted)',
                      backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {isActive && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] mr-1.5 align-middle" />
                    )}
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Actions: Download CV + ThemeToggle */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="/Ishimwe_Ghislain_CV.pdf"
                download="Ishimwe_Ghislain_CV.pdf"
                className="btn btn-secondary !py-2 !px-3.5 !min-h-[38px] mono text-xs flex items-center gap-2"
                title="Download CV (PDF)"
              >
                <FileDown size={14} strokeWidth={1.75} />
                <span>CV</span>
              </a>

              <ThemeToggle />
            </div>

            {/* Mobile controls */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                className="btn btn-secondary !p-2 !min-w-[40px] !min-h-[40px] flex items-center justify-center"
              >
                {menuOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden card overflow-hidden mb-3 p-3 flex flex-col gap-1 border border-[var(--border)]"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => scrollTo(e, item.id)}
                      className="mono text-xs px-3 py-2.5 rounded-[var(--radius-sm)] flex items-center justify-between"
                      style={{
                        color: isActive ? 'var(--text)' : 'var(--muted)',
                        backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                      }}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                    </a>
                  );
                })}

                <div className="pt-2 mt-1 border-t border-[var(--border)] flex justify-between items-center px-1">
                  <a
                    href="/Ishimwe_Ghislain_CV.pdf"
                    download="Ishimwe_Ghislain_CV.pdf"
                    className="btn btn-secondary !py-2 !px-3 mono text-xs flex items-center gap-2 w-full justify-center"
                  >
                    <FileDown size={14} strokeWidth={1.75} />
                    <span>Download CV (PDF)</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
