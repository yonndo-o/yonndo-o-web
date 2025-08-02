'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import LanguageToggle from '../ui/LanguageToggle';

export default function Header() {
  const { t } = useLang();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <header style={{
      padding: '1rem',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{t('components.title')}</h1>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <LanguageToggle />
        <button onClick={() => setDark(!dark)} aria-label={t('components.toggleTheme')}>
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
