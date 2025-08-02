'use client';

import { useEffect, useState } from 'react';
import { translations, Language } from './translations';
import { detectLanguage, setLanguage, DEFAULT_LANGUAGE } from './config';

export function useTranslation() {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLangState(detectedLang);
  }, []);

  function t(path: string): string {
    const keys = path.split('.');
    let value: any = translations[lang];

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return path; // fallback to key
    }

    return value;
  }

  function changeLanguage(newLang: Language) {
    setLangState(newLang);
    setLanguage(newLang);
  }

  return { lang, t, changeLanguage };
}
