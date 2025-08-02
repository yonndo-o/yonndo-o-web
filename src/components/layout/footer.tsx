'use client';

import { useLang } from '@/i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="text-center py-4 text-gray-500">
      {t('components.footer')}
    </footer>
  );
}