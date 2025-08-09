'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LanguageProvider';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import '@/styles/pages/not-found.css';

export default function NotFoundPage() {
  const { t } = useLang();

  return (
    <main className="notfound-container" role="main" aria-labelledby="notfound-title">
      <div className="notfound-icon-wrapper" aria-hidden="true">
        <FaExclamationTriangle className="notfound-icon" />
      </div>
      <h1 id="notfound-title" className="notfound-title">
        {t('notFound.title')}
      </h1>
      <p className="notfound-description">
        {t('notFound.description')}
      </p>
      <Link href="/" className="notfound-button" aria-label={t('notFound.backHome')}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} />
        {t('notFound.backHome')}
      </Link>
    </main>
  );
}
