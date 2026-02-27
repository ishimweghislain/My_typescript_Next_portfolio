'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'cyberpunk' | 'ocean' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark' | 'cyberpunk' | 'ocean';
  themes: { value: Theme; label: string; icon: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeOptions = [
  { value: 'light' as Theme, label: 'Light', icon: '☀️' },
  { value: 'dark' as Theme, label: 'Dark', icon: '🌙' },
  { value: 'cyberpunk' as Theme, label: 'Cyberpunk', icon: '🔮' },
  { value: 'ocean' as Theme, label: 'Ocean', icon: '🌊' },
  { value: 'auto' as Theme, label: 'Auto', icon: '🔄' },
];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark' | 'cyberpunk' | 'ocean'>('dark');

  const themes = themeOptions;

  // Get system theme preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  }, []);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((themeToApply: 'light' | 'dark' | 'cyberpunk' | 'ocean') => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeToApply);
      setResolvedTheme(themeToApply);
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && themes.some(t => t.value === savedTheme)) {
        setThemeState(savedTheme);
      } else {
        // Default to dark theme for this portfolio
        setThemeState('dark');
        localStorage.setItem('theme', 'dark');
      }

      // Set initial theme immediately to prevent flash
      document.documentElement.setAttribute('data-theme', savedTheme || 'dark');
    }
  }, [themes]);

  // Handle theme changes
  useEffect(() => {
    let themeToApply: 'light' | 'dark' | 'cyberpunk' | 'ocean';

    if (theme === 'auto') {
      themeToApply = getSystemTheme();
    } else {
      themeToApply = theme as 'light' | 'dark' | 'cyberpunk' | 'ocean';
    }

    applyTheme(themeToApply);

    // Listen for system theme changes when auto is selected
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        applyTheme(getSystemTheme());
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, applyTheme, getSystemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
