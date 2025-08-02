'use client';

import { useLang } from '@/i18n/LanguageProvider';

export default function HomePage() {
  const { t, changeLanguage, lang } = useLang();

  return (
    <main>
      <h1>{t('homepage.welcome')}</h1>
      <p>{t('homepage.description')}</p>

      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value as 'en' | 'zh')}
      >
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </main>
  );
}
