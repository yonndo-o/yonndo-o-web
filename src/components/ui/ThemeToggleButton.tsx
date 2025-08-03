'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';

export default function ThemeToggle() {
  const { t } = useLang();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initial);
    document.documentElement.style.colorScheme = initial;
    setDark(initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = dark ? 'light' : 'dark';
    setDark(!dark);
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <button className={'button flex items-center px-2 py-1 text-sm sm:text-base rounded transition duration-300'} onClick={toggleTheme} aria-label={t('components.toggleTheme')}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}