import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

const THEME_STORAGE_KEY = 'vidyapaths-theme';

// Apply theme classes immediately to DOM without waiting for React re-render cycle
function applyThemeClass(themeName) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (themeName === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

// Temporary transition manager: activates 180ms transition class and auto-removes it
let transitionTimeoutId = null;

function triggerThemeTransition() {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.add('theme-transition');
  
  if (transitionTimeoutId) {
    clearTimeout(transitionTimeoutId);
  }
  
  transitionTimeoutId = setTimeout(() => {
    root.classList.remove('theme-transition');
    transitionTimeoutId = null;
  }, 220);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'dark' || storedTheme === 'light') {
          return storedTheme;
        }
        // Fallback to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
      } catch {}
    }
    return 'light';
  });

  // Keep state in sync with DOM on initial mount & handle external updates
  useEffect(() => {
    applyThemeClass(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  // System color-scheme listener for first-visit users
  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        // Only adapt automatically if user has not explicitly chosen a preference
        if (!stored) {
          const next = e.matches ? 'dark' : 'light';
          triggerThemeTransition();
          applyThemeClass(next);
          setThemeState(next);
        }
      } catch {}
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Synchronous, instant theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    // 1. Immediately trigger transition and update DOM synchronously (0ms delay)
    triggerThemeTransition();
    applyThemeClass(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}
    // 2. Update React state for icons and listeners
    setThemeState(nextTheme);
  };

  // Synchronous, instant theme setter
  const setTheme = (newTheme) => {
    if ((newTheme === 'dark' || newTheme === 'light') && newTheme !== theme) {
      triggerThemeTransition();
      applyThemeClass(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {}
      setThemeState(newTheme);
    }
  };

  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
