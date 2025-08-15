'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LanguageProvider';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import '@/styles/pages/not-found.css'; // 共用樣式

// metadata：提升 SEO 與 SSR
// export const metadata = {
//   title: '401 - Unauthorized',
//   description: 'You do not have permission to access this page.',
// };

export default function UnauthorizedPage() {
  const { t } = useLang();

  return (
    <main
      className="notfound-container"
      aria-labelledby="unauthorized-title"
      data-testid="unauthorized-page" // 測試用 ID
    >
      {/* 鎖頭圖示 */}
      <div className="notfound-icon-wrapper" aria-hidden="true">
        <FaLock className="notfound-icon" style={{ color: 'var(--accent-dark)' }} />
      </div>

      {/* 標題 */}
      <h1 id="unauthorized-title" className="notfound-title">
        {t('unauthorized.title')}
      </h1>

      {/* 說明文字 */}
      <p className="notfound-description">
        {t('unauthorized.description')}
      </p>

      {/* 導回語系首頁 */}
      <Link
        href={`/${t('common.back')}`}
        className="notfound-button"
        aria-label={t('unauthorized.backHome')}
      >
        <FaArrowLeft style={{ marginRight: '0.5rem' }} />
        {t('unauthorized.backHome')}
      </Link>
    </main>
  );
}
