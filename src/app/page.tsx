// app/page.tsx

import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';

export default async function RootPage() {
    const cookieStore = await cookies();
    const headerStore = await headers();
    // 取得 cookie 中的語系設定
    const cookieLang = cookieStore.get('preferred-lang')?.value;

    // 取得瀏覽器語系（Accept-Language header）
    const acceptLang = headerStore.get('accept-language') ?? '';
    const browserLang = acceptLang.split(',')[0].split('-')[0]; // 例如 "zh-TW" → "zh"

    // 判斷最終語系
    const lang =
        SUPPORTED_LANGUAGES.includes(cookieLang as any)
            ? cookieLang
            : SUPPORTED_LANGUAGES.includes(browserLang as any)
                ? browserLang
                : 'en'; // 預設語系

    // 導向對應語系首頁
    redirect(`/${lang}`);
}
