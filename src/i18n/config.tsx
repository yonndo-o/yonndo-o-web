export type Language =
  | 'en' | 'zh' | 'ja' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'ko' | 'vi'
  | 'th' | 'id' | 'tr' | 'ar' | 'hi' | 'bn' | 'ms' | 'nl' | 'sv' | 'pl' | 'he' | 'uk';

export const DEFAULT_LANGUAGE: Language = 'en';

export const SUPPORTED_LANGUAGES: Language[] = [
  'en', 'zh', 'ja', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'ko', 'vi',
  'th', 'id', 'tr', 'ar', 'hi', 'bn', 'ms', 'nl', 'sv', 'pl', 'he', 'uk',
];

export function isValidLang(lang: string | null): lang is Language {
  return lang !== null && SUPPORTED_LANGUAGES.includes(lang as Language);
}

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const stored = localStorage.getItem('lang');
  if (SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }

  const browserLang = navigator.language.toLowerCase();
  const matched = SUPPORTED_LANGUAGES.find(lang => browserLang.startsWith(lang));
  return matched ?? DEFAULT_LANGUAGE;
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined' && SUPPORTED_LANGUAGES.includes(lang)) {
    localStorage.setItem('lang', lang);
    document.cookie = `preferred-lang=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`;
  }
}
