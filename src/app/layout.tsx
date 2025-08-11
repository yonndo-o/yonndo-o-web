// app/layout.tsx
import '@/styles/global.css';
import Header from '../components/layout/header';
import NavBar from "../components/ui/NavBar";
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { Suspense } from 'react';
import Footer from '@/components/layout/Footer';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

type Lang = 'en' | 'zh';

const meta: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Quatre(Affective Computing × Next.js Developer)',
    description: 'Exploring emotion-aware apps with Next.js and TypeScript.',
  },
  zh: {
    title: '四季(情緒計算 × Next.js 開發者)',
    description: '使用 Next.js 與 TypeScript 探索情緒感知應用。',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const langRaw = (await cookies()).get('preferred-lang')?.value;
  const lang: Lang = langRaw === 'zh' ? 'zh' : 'en';

  return {
    // metadataBase: new URL('http://localhost:3000/'),
    metadataBase: new URL('https://yonndo.vercel.app/'),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <a href="#main" className="skip-link">跳至主內容</a>
          <Header />
          <NavBar />
          <main id="main">{children}</main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  );
}
