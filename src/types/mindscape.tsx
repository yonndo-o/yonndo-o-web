// types/mindscape.tsx

export type LangText = {
  zh: string;
  en: string;
};

export type MediaType = 'image' | 'video' | 'other' | 'unknown';

export interface LinkItem {
  text: LangText;
  url: string;
}

export interface MediaItem {
  type: MediaType;
  url: string;
  alt_text: string;
}

export type MindscapeType = 'website' | 'personal' | 'other';
export type MindscapeStatus = 'completed' | 'in_progress' | 'pending';
export type ImpactLevel = 'low' | 'medium' | 'high';

export type TopicType = 'journey' | 'todo' | 'focus';

/**
 * 共用欄位：所有項目都會有的基本結構
 */
export interface BaseItem {
  id: string; // six-digit string, e.g. "000001"
  type: MindscapeType;
  status: MindscapeStatus;
  created_at?: string; // ISO8601
  title: LangText;
  category?: string;
  content: LangText;
  tags: string[];
  expertise: string[];
  impact_level: ImpactLevel;
  media: MediaItem[];
  links: LinkItem[];
}

/**
 * Mindscape 對應 journey，有 completed_at
 */
export interface JourneyItem extends BaseItem {
  topic: 'journey';
  completed_at?: string; // ISO8601
}

/**
 * TODO 對應 todo，無 completed_at
 */
export interface TodoItem extends BaseItem {
  topic: 'todo';
}

/**
 * Focus 對應 focus，無 completed_at
 */
export interface FocusItem extends BaseItem {
  topic: 'focus';
}

/**
 * 統一型別：用於處理所有資料
 */
export type UnifiedItem = JourneyItem | TodoItem | FocusItem;

/**
 * Type Guard：判斷是否為 JourneyItem
 */
export const hasCompletedAt = (item: UnifiedItem): item is JourneyItem => {
  return item.topic === 'journey';
};
