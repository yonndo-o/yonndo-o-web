'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { getInitialLang } from '@/lib/getInitialLang';
import { translations } from './translations';

type Lang = 'en' | 'zh';

interface LangContextType {
  lang: Lang;
  t: (key: string) => string;
  changeLanguage: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');

  useEffect(() => {
    const initLang = getInitialLang();
    setLang(initLang);
  }, []);

  const changeLanguage = (newLang: Lang) => {
    localStorage.setItem('lang', newLang);
    setLang(newLang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[lang];

    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = result[k];
      } else {
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <LangContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
