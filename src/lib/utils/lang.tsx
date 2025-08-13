// src/lib/utils/lang.ts
import type { LangText } from '@/types/mindscape';
import type { Lang } from '@/i18n/LanguageProvider';

export function getLangText(text: LangText, lang: string): string {
  if (lang in text) {
    return text[lang as keyof LangText];
  }
  return text.en; // fallback 預設英文
}


// 所有支援的語系列表
export const supportedLangs: Lang[] = [
  'en', 'zh', 'ja', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'ko', 'vi', 'th',
  'id', 'tr', 'ar', 'hi', 'bn', 'ms', 'nl', 'sv', 'pl', 'he', 'uk',
];

// 檢查語系是否有效
export function isValidLang(lang: string): lang is Lang {
  return supportedLangs.includes(lang as Lang);
}

export function getLangFromParams(params: Record<string, unknown>, fallback = 'en'): string {
  const raw = params['lang'];
  if (typeof raw === 'string') return raw;
  if (Array.isArray(raw)) return raw[0];
  return fallback;
}
