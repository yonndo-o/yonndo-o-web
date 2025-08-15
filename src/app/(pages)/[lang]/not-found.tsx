'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LanguageProvider';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import '@/styles/pages/not-found.css';

//加入 metadata（可根據語系擴充）
export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFoundPage() {
  const { t } = useLang();

  return (
    <main
      className="notfound-container"
      aria-labelledby="notfound-title"
      data-testid="notfound-page" //測試用 ID
    >
      {/*錯誤圖示 */}
      <div className="notfound-icon-wrapper" aria-hidden="true">
        <FaExclamationTriangle className="notfound-icon" />
      </div>

      {/*標題 */}
      <h1 id="notfound-title" className="notfound-title">
        {t('notFound.title')}
      </h1>

      {/* 說明文字 */}
      <p className="notfound-description">
        {t('notFound.description')}
      </p>

      {/* 導回語系首頁 */}
      <Link
        href={`/${t('lang')}`} // 根據語系導回正確首頁
        className="notfound-button"
        aria-label={t('notFound.backHome')}
      >
        <FaArrowLeft style={{ marginRight: '0.5rem' }} />
        {t('notFound.backHome')}
      </Link>
    </main>
  );
}
