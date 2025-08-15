// app//api/articles/route.ts
import { NextResponse } from 'next/server';
import { getDatabase, ref, get, set } from 'firebase/database';
import { getAuth } from 'firebase-admin/auth';
import { app } from '@/lib/firebase';
import { adminApp, adminAuth, adminDatabase } from '@/lib/firebase-admin'; // Admin SDK
import { generateSlug, estimateReadingTime } from '@/lib/utils/articleHelpers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';

  const db = getDatabase(app);
  const snapshot = await get(ref(db, 'articles'));

  if (!snapshot.exists()) {
    return NextResponse.json([], { status: 200 });
  }

  const data = snapshot.val();
  const rawArticles = Object.values(data) as any[];

  const articles = rawArticles
    // .filter((article) => article.visibility === 'public' && article.status === 'published') // 可選：過濾草稿
    .filter((article) => article.visibility === 'public') // 可選：過濾草稿
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((article) => {
      const translated =
        article.translations?.find((t: any) => t.language === lang) ||
        article.translations?.find((t: any) => t.language === 'zh');

      return {
        id: article.id,
        title: translated?.title || article.title || 'Untitled',
        excerpt: translated?.excerpt || article.excerpt || '',
        coverImageUrl: article.coverImageUrl,
        createdAt: article.createdAt,
      };
    });

  return NextResponse.json(articles);
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, form, lang } = body;

    if (!token || !form || !lang) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const auth = getAuth(adminApp);
    const decoded = await auth.verifyIdToken(token);
    const uid = decoded.uid;

    const db = getDatabase(app);
    const id = `article_${uid}_${Date.now()}`;
    const now = new Date().toISOString();
    const slug = generateSlug(form.title);
    const tagsArray = form.tags.split(',').map((tag: string) => tag.trim());

    const translation = {
      language: lang,
      title: form.title,
      content: form.content,
      excerpt: form.content.slice(0, 100),
      summary: form.content.slice(0, 50),
      metaTitle: `${form.title} | ${form.category || 'Uncategorized'}`,
      metaDescription: form.content.slice(0, 100),
    };

    const article = {
      id,
      authorId: uid,
      contributors: [
        {
          id: uid,
          name: '作者名稱', // 可改為從使用者資料取得
          avatarUrl: '/avatars/default.jpg',
        },
      ],
      category: form.category || 'Uncategorized',
      tags: tagsArray,
      coverImageUrl: '/default-cover.jpg',
      createdAt: now,
      updatedAt: now,
      publishedAt: null,
      likes: 0,
      views: 0,
      commentsCount: 0,
      readingTime: estimateReadingTime(form.content),
      readingLevel: '初級',
      isFeatured: false,
      locales: [lang],
      relatedArticles: [],
      slug: {
        [lang]: slug,
      },
      translations: [translation],
      visibility: 'public',
      status: 'draft',
    };

    await set(ref(db, `articles/${id}`), article);
    await set(ref(db, `userArticles/${uid}/${id}`), {
      title: form.title,
      createdAt: now,
    });

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
