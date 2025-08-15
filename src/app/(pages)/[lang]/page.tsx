'use client';

import Head from 'next/head';
import ArticleList from '@/components/ArticleList';
import { useLang } from '@/i18n/LanguageProvider';
import { Suspense } from 'react';

export default function HomePage() {
  const { t } = useLang();

  return (
    <>
      {/* SEO metadata：client-side fallback */}
      <Head>
        <title>{t('homepage.metaTitle')}</title>
        <meta name="description" content={t('homepage.metaDescription')} />
        <meta name="keywords" content="Next.js, Affective Computing, TypeScript, Emotion-aware" />
        <meta property="og:title" content={t('homepage.metaTitle')} />
        <meta property="og:description" content={t('homepage.metaDescription')} />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('homepage.metaTitle')} />
        <meta name="twitter:description" content={t('homepage.metaDescription')} />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>

      {/* 主內容區塊 */}
      <main className="main-content">
        <h1>{t('homepage.welcome')}</h1>
        <p>{t('homepage.description')}</p>

        {/* 懶載入文章列表，提升 UX */}
        <Suspense fallback={<p>{t('common.loading')}</p>}>
          <ArticleList />
        </Suspense>
      </main>
    </>
  );
}
