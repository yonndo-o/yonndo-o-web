import '@/styles/globals.css';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import { LanguageProvider } from '@/i18n/LanguageProvider';

export const metadata = {
  title: 'Blog',
  description: 'A personal blog.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleIncreaseFont = () => {
    const currentScale = document.documentElement.getAttribute('data-font-scale') || 'md';
    const scaleOrder = ['sm', 'md', 'lg', 'xl'];
    const currentIndex = scaleOrder.indexOf(currentScale);
    const nextScale = scaleOrder[Math.min(currentIndex + 1, scaleOrder.length - 1)];

    document.documentElement.setAttribute('data-font-scale', nextScale);
  };

  return (
    <html>
      <body>
        <LanguageProvider>
          <a href="#main" className="skip-link">跳至主內容</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}