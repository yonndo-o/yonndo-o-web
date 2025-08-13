// app/layout.tsx

import '@/styles/global.css';
import Header from '@/components/layout/header';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

// 定義支援語系型別
type Lang = 'en' | 'zh';

// 語系對應的 SEO metadata
const meta: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Quatre (Affective Computing × Next.js Developer)',
    description: 'Exploring emotion-aware apps with Next.js and TypeScript.',
  },
  zh: {
    title: '四季（情緒計算 × Next.js 開發者）',
    description: '使用 Next.js 與 TypeScript 探索情緒感知應用。',
  },
};

// ⛳ 動態產生 metadata，根據 cookie 中的語系設定
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const langRaw = cookieStore.get('preferred-lang')?.value;
  const lang: Lang = langRaw === 'zh' ? 'zh' : 'en';

  return {
    // metadataBase: new URL('http://localhost:3000/'), // 可改為正式網址
    metadataBase: new URL('https://yonndo.vercel.app/'), // 可改為正式網址
    title: meta[lang].title,
    description: meta[lang].description,
    keywords: ['Next.js', '情緒計算', 'TypeScript', 'Affective Computing'],
    openGraph: {
      title: meta[lang].title,
      description: meta[lang].description,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta[lang].title,
      description: meta[lang].description,
      images: ['/og-image.png'],
    },
  };
}

// 🧱 根 layout：套用於所有頁面
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 提供語系上下文 */}
        <LanguageProvider>
          {/* 無障礙導覽：跳至主內容 */}
          <a href="#main" className="skip-link">跳至主內容</a>

          {/* 全域導覽元件 */}
          <Header />
          <NavBar />

          {/* 主內容區塊 */}
          <main id="main">{children}</main>

          {/* 頁尾區塊，使用 Suspense 包裝以支援 lazy loading */}
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  );
}
