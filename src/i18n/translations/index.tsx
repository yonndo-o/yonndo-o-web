import en from './en';
import zh from './zh';

export const translations = {
  en,
  zh,
} as const;

export type Language = keyof typeof translations; // "en" | "zh"

export type Translations = {
  [K in Language]: {
    [key: string]: string; // 動態 key 型別
  };
};
