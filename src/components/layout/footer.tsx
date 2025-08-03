'use client';

import { useLang } from '@/i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      className="text-center py-4"
      style={{
        backgroundColor: 'var(--footer-transparent)',
        color: 'var(--foreground)',
        transition: 'var(--transition)',
      }}
    >
      {t('components.footer')}
    </footer>
  );
}