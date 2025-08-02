'use client';

import { useLang } from '@/i18n/LanguageProvider';

export default function HomePage() {
  const { t } = useLang();

  return (
    <main>
      <h1>{t('homepage.welcome')}</h1>
      <p>{t('homepage.description')}</p>
    </main>
  );
}
