'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, type Theme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun size={14} strokeWidth={2} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={14} strokeWidth={2} /> },
    { value: 'system', label: 'System', icon: <Monitor size={14} strokeWidth={2} /> },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className="inline-flex items-center p-1 rounded-full border border-[var(--border)] shadow-xs"
      style={{ backgroundColor: 'var(--surface-2)' }}
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${opt.label} theme`}
            title={`${opt.label} theme`}
            onClick={() => setTheme(opt.value)}
            className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            style={{
              backgroundColor: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? 'var(--accent-fg)' : 'var(--muted)',
            }}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}
