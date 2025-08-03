import { Language } from './translations';

const DEFAULT_LANGUAGE: Language = 'en';

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'zh') return stored;

  const browserLang = navigator.language;
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('en')) return 'en';

  return DEFAULT_LANGUAGE;
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
  }
}

export { DEFAULT_LANGUAGE };
