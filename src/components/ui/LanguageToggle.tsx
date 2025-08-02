'use client';

import { useLang } from '@/i18n/LanguageProvider';
import { useState, useEffect } from 'react';

const translations = {
  zh: { toggleLang: "切換語言" },
  en: { toggleLang: "Switch Language" },
} as const;

type Lang = keyof typeof translations;

export default function LanguageToggle() {
  const { changeLanguage } = useLang();
  const [lang, setLang] = useState<Lang>(() =>
    (document.documentElement.lang as Lang) || 'zh'
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    changeLanguage(lang);
  }, [lang, changeLanguage]);

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLang}
      aria-label={translations[lang].toggleLang}
      className="px-2 py-1 rounded bg-gray-200 text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors duration-200"
    >
      🌐 {lang.toUpperCase()}
    </button>
  );
}