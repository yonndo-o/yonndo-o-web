'use client';

import { useLang } from '@/i18n/LanguageProvider';
import LoginForm from "@/components/forms/LoginForm";

export default function HomePage() {
  const { t } = useLang();

  return (
    <main className="
        max-w-screen-xl   /* 限制最大寬度 */
        w-full
        px-4              /* 左右留白 */
        md:px-8           /* 更寬的裝置增加留白 */
        mx-auto           /* 中央對齊 */
        py-8              /* 上下內距 */
      "
>
      <h1>{t('homepage.welcome')}</h1>
      <p>{t('homepage.description')}</p>
      <LoginForm />

    </main>
  );
}
