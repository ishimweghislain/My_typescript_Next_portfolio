'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  themes: { value: Theme; label: string; icon: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeOptions: { value: Theme; label: string; icon: string }[] = [
  { value: 'light',  label: 'Light',  icon: 'sun' },
  { value: 'dark',   label: 'Dark',   icon: 'moon' },
  { value: 'system', label: 'System', icon: 'monitor' },
];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  const applyTheme = useCallback((resolved: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', resolved);
    setResolvedTheme(resolved);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem('theme', next);
  }, []);

  // Init from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const valid: Theme[] = ['light', 'dark', 'system'];
    const initial = saved && valid.includes(saved) ? saved : 'dark';
    setThemeState(initial);
  }, []);

  // Apply whenever theme changes; listen for system changes
  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    applyTheme(resolved);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme(getSystemTheme());
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, themes: themeOptions }}>
      {children}
    </ThemeContext.Provider>
  );
};
