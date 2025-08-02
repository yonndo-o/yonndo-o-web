'use client';

export function getInitialLang(): 'en' | 'zh' {
  if (typeof window === 'undefined') return 'zh';
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'zh') return saved;

  const browserLang = navigator.language.startsWith('en') ? 'en' : 'zh';
  localStorage.setItem('lang', browserLang);
  return browserLang;
}
