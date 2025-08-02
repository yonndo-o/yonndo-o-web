'use client';

import { useState, useEffect } from 'react';
import { translations, Lang } from '../lang';
import { useLang } from '@/i18n/LanguageProvider';

export default function LanguageToggle() {
    const [lang, setLang] = useState<Lang>('zh');
    const t = translations[lang];
    const { changeLanguage } = useLang();


    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const newLang = lang === 'zh' ? 'en' : 'zh';

    return (
        <button
            onClick={() => {
                const newLang = lang === 'zh' ? 'en' : 'zh';
                setLang(newLang);           // 更新狀態（如果你有用 useState）
                changeLanguage(newLang);    // 更新 context 或 localStorage
            }}
            aria-label={t.toggleLang}
            className="px-2 py-1 rounded bg-gray-200 text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors duration-200"
        >
            🌐 {lang.toUpperCase()}
        </button>
    );
}