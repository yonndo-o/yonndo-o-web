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