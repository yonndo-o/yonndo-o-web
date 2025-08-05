'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';

const translations = {
  zh: { toggleLang: "切換語言" },
  en: { toggleLang: "Switch Language" },
} as const;

type Lang = keyof typeof translations;

export default function LanguageToggleButton() {
  const { changeLanguage } = useLang();
  const [lang, setLang] = useState<Lang>('en'); // 初始值延後由 useEffect 設定

  // 初始化語言設定（僅在 client 執行）
  useEffect(() => {
    const currentLang = document?.documentElement.lang as Lang;
    setLang(currentLang || 'en');
  }, []);

  // 當語言切換時更新 <html lang>
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