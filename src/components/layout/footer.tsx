'use client';

import { useLang } from '@/i18n/LanguageProvider';
import '@/styles/components/nav/footer.css';

export default function Footer() {
  const { t, lang } = useLang();

  if (!lang) return null; // 等語言載入後再渲染

  return (
    <footer className="footer">
      {/* <p>{t('components.footer')}</p> */}
      <p>© 2025 Quatre</p>
    </footer>
  );
}
