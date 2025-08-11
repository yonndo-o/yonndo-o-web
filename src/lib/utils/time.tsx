// src/lib/utils/time.ts

type SupportedLang = 'zh' | 'en';

/**
 * 根據語言格式化 ISO8601 時間字串為當地時間格式
 * @param isoString ISO8601 格式的時間字串
 * @param lang 語言代碼（zh 或 en）
 * @returns 當地時間格式字串
 */
export function formatLocalTime(isoString?: string, lang: SupportedLang = 'en'): string {
  if (!isoString) return '';
  const date = new Date(isoString);

  const locale = lang === 'zh' ? 'zh-TW' : 'en-US';
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: lang === 'en', // 英文使用 AM/PM，中文使用 24 小時制
  });
}
