'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';

const translations = {
  zh: { toggleLang: "切換語言" },
  en: { toggleLang: "Switch Language" },
} as const;

type Lang = keyof typeof translations;

export default function LanguageToggle() {
  const { changeLanguage } = useLang();
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // 安全地使用 document
      const lang = document.documentElement.lang;
      console.log(lang);
    }
  }, []);

  const [lang, setLang] = useState<Lang>(() =>
    (document.documentElement.lang as Lang) || 'en'
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
      className="button flex items-center px-2 py-1 text-sm sm:text-base rounded transition duration-300"
    >
      🌐 {lang.toUpperCase()}
    </button>
  );
}