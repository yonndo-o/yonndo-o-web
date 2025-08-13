// src/lib/utils/time.ts
import type { Lang } from '@/i18n/LanguageProvider';

const langToLocaleMap: Record<Lang, string> = {
  en: 'en-US',
  zh: 'zh-TW',
  ja: 'ja-JP',
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-PT',
  ru: 'ru-RU',
  ko: 'ko-KR',
  vi: 'vi-VN',
  th: 'th-TH',
  id: 'id-ID',
  tr: 'tr-TR',
  ar: 'ar-SA',
  hi: 'hi-IN',
  bn: 'bn-BD',
  ms: 'ms-MY',
  nl: 'nl-NL',
  sv: 'sv-SE',
  pl: 'pl-PL',
  he: 'he-IL',
  uk: 'uk-UA',
};

export function formatLocalTime(isoString?: string, lang: Lang = 'en'): string {
  if (!isoString) return '';
  const date = new Date(isoString);

  const locale = langToLocaleMap[lang] ?? 'en-US';
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: locale.startsWith('en'), // 英文使用 AM/PM，其他使用 24 小時制
  });
}
