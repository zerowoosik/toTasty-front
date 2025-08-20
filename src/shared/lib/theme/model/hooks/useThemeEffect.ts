'use client';

import { useEffect } from 'react';
import { Theme } from '../types';
import useThemeStore from './useThemeStore';

const THEME_KEY = 'theme';

export default function useThemeEffect() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    if (storedTheme === Theme.dark || storedTheme === Theme.light) {
      setTheme(storedTheme as Theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === Theme.dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);
}
