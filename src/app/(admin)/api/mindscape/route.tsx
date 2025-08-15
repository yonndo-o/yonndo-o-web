import { NextResponse } from 'next/server';
import { getAllMindscapeItems } from '@/lib/data/mindscape';
import { hasCompletedAt } from '@/types/mindscape';
import type { UnifiedItem } from '@/types/mindscape';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, Language } from '@/i18n/config';

function extractPreferredLang(request: Request): Language {
  const { searchParams } = new URL(request.url);
  const queryLang = searchParams.get('lang');

  if (queryLang && SUPPORTED_LANGUAGES.includes(queryLang as Language)) {
    return queryLang as Language;
  }

  const acceptLang = request.headers.get('accept-language');
  if (acceptLang) {
    const firstLang = acceptLang.split(',')[0].split(';')[0].trim();
    if (SUPPORTED_LANGUAGES.includes(firstLang as Language)) {
      return firstLang as Language;
    }
  }

  return DEFAULT_LANGUAGE;
}


export async function GET(request: Request) {
  const preferredLang = extractPreferredLang(request);

  try {
    const items: UnifiedItem[] = await getAllMindscapeItems();

    const translatedItems = items.map((item) => {
      const langToUse: Language = item.title?.[preferredLang]
        ? preferredLang
        : DEFAULT_LANGUAGE;
      return {
        id: item.id,
        topic: item.topic,
        type: item.type,
        status: item.status,
        created_at: item.created_at,
        completed_at: hasCompletedAt(item) ? item.completed_at : undefined,
        title: item.title?.[langToUse] ?? '',
        content: item.content?.[langToUse] ?? '',
        category: item.category?.[langToUse] ?? '',
        tags: item.tags,
        impact_level: item.impact_level,
        expertise: item.expertise,
        links: item.links.map((link) => ({
          text: link.text?.[langToUse] ?? '',
          url: link.url,
        })),
        media: item.media.map((media) => ({
          alt_text: media.alt_text?.[langToUse] ?? '',
          type: media.type,
          url: media.url,
        })),
        isFallback: langToUse !== preferredLang,
      };
    });

    return NextResponse.json(translatedItems);
  } catch (error) {
    console.error('GET /api/mindscape failed:', error);
    return NextResponse.json({ error: 'Failed to fetch mindscape items' }, { status: 500 });
  }
}
