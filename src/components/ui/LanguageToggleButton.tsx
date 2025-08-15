'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLang } from '@/i18n/LanguageProvider';
import Modal from '@/components/ui/LanguageModal';

const supportedLanguages = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  ko: '한국어',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  tr: 'Türkçe',
  ar: 'العربية',
  hi: 'हिन्दी',
  bn: 'বাংলা',
  ms: 'Bahasa Melayu',
  nl: 'Nederlands',
  sv: 'Svenska',
  pl: 'Polski',
  he: 'עברית',
  uk: 'Українська',
} as const;

type Lang = keyof typeof supportedLanguages;

function getInitialLang(): Lang {
  const saved = localStorage.getItem('preferred-lang') as Lang | null;
  const htmlLang = document.documentElement.lang as Lang | undefined;

  if (saved && saved in supportedLanguages) return saved;
  if (htmlLang && htmlLang in supportedLanguages) return htmlLang;
  return 'en';
}

function getPreferredLanguages(): Lang[] {
  const browserLangs = navigator.languages.map((l) => l.split('-')[0]);
  const uniqueLangs = Array.from(new Set(browserLangs));

  return uniqueLangs.filter((lang): lang is Lang => lang in supportedLanguages);
}

export default function LanguageModalButton() {
  const { changeLanguage, t } = useLang();
  const router = useRouter();
  const pathname = usePathname();

  const [lang, setLang] = useState<Lang>('en');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortedLangs, setSortedLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const initialLang = getInitialLang();
    setLang(initialLang);
    document.documentElement.lang = initialLang;
    changeLanguage(initialLang);
    setLoading(false);

    const preferred = getPreferredLanguages();
    const rest = Object.keys(supportedLanguages).filter(
      (code) => !preferred.includes(code as Lang)
    ) as Lang[];

    setSortedLangs([...preferred, ...rest]);
  }, [changeLanguage]);

  const handleSelect = (code: Lang) => {
    if (code === lang) {
      setOpen(false);
      return;
    }

    setLang(code);
    changeLanguage(code);
    document.documentElement.lang = code;
    localStorage.setItem('preferred-lang', code);
    setOpen(false);

    const segments = pathname.split('/');
    segments[1] = code;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  if (loading) return null;

  const suggested = sortedLangs.slice(0, 3);
  const others = sortedLangs.slice(3);

  return (
    <>
      <button
        className="header-button"
        onClick={() => setOpen(true)}
        aria-label={t('common.selectLanguage')}
      >
        🌐 {supportedLanguages[lang]}
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={t('common.selectLanguage')}>
        <div className="language-modal-body">
          <h4>{t('common.suggestedLanguages')}</h4>
          <div className="language-grid">
            {suggested.map((code) => (
              <button
                key={code}
                className={`lang-option ${lang === code ? 'active' : ''}`}
                onClick={() => handleSelect(code)}
              >
                {supportedLanguages[code]}
              </button>
            ))}
          </div>

          <h4>{t('common.allLanguages')}</h4>
          <div className="language-grid">
            {others.map((code) => (
              <button
                key={code}
                className={`lang-option ${lang === code ? 'active' : ''}`}
                onClick={() => handleSelect(code)}
              >
                {supportedLanguages[code]}
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
