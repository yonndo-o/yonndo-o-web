// src/lib/utils/lang.ts
import type { LangText } from '@/types/mindscape';

export function getLangText(text: LangText, lang: string): string {
  if (lang in text) {
    return text[lang as keyof LangText];
  }
  return text.en; // fallback 預設英文
}
