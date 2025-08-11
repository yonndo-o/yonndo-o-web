'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';

const translations = {
  zh: { toggleLang: '切換語言' },
  en: { toggleLang: 'Switch Language' },
} as const;

type Lang = keyof typeof translations;

export default function LanguageToggleButton() {
  const { changeLanguage } = useLang();
  const [lang, setLang] = useState<Lang>('en');

  // 初始化語言（從 localStorage 或 <html lang> 取得）
  useEffect(() => {
    const saved = localStorage.getItem('preferred-lang') as Lang | null;
    const htmlLang = document.documentElement.lang as Lang | undefined;

    const initialLang: Lang =
      saved && ['en', 'zh'].includes(saved)
        ? saved
        : htmlLang && ['en', 'zh'].includes(htmlLang)
          ? htmlLang
          : 'en';

    setLang(initialLang);
    document.documentElement.lang = initialLang;
    changeLanguage(initialLang);
  }, [changeLanguage]);

  // 切換語言
  const toggleLang = () => {
    const newLang: Lang = lang === 'zh' ? 'en' : 'zh';
    setLang(newLang);
    document.documentElement.lang = newLang;
    localStorage.setItem('preferred-lang', newLang);
    changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      aria-label={translations[lang].toggleLang}
      className="header-button"
    >
      🌐 {lang.toUpperCase()}
    </button>
  );
}