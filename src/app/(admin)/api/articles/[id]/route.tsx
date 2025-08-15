import { NextResponse, type NextRequest } from 'next/server';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '@/lib/firebase';

export async function GET(
  request: NextRequest,
  // context: { params: { id: string } } // inline 型別
  context: any
) {
  const { id } = context.params;
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';

  const db = getDatabase(app);
  const snap = await get(ref(db, `articles/${id}`));

  if (!snap.exists()) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  const article = snap.val();
  const translated = article.translations?.find((t: any) => t.language === lang);

  return NextResponse.json({
    id: article.id,
    title: translated?.title || 'Untitled',
    content: translated?.content || '',
    category: article.category,
    tags: article.tags,
    language: translated?.language || article.language,
    createdAt: article.createdAt,
    coverImageUrl: article.coverImageUrl
  });
}
