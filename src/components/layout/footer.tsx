'use client';

import { useLang } from '@/i18n/LanguageProvider';
import '@/styles/components/nav/footer.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <p>{t('components.footer')}</p>
    </footer>
  );
}
