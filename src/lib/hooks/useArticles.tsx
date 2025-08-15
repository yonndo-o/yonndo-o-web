'use client';

import useSWR from 'swr';
import { useLang } from '@/i18n/LanguageProvider';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  createdAt: string;
}

const ARTICLES_PER_PAGE = 10;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useArticles() {
  const { lang: langFromContext } = useLang();
  const { lang: langFromParams } = useParams();
  const lang = langFromParams || langFromContext;

  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR<Article[]>(
    `/api/articles?lang=${lang}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const totalPages = data ? Math.ceil(data.length / ARTICLES_PER_PAGE) : 0;
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const currentArticles = data?.slice(start, start + ARTICLES_PER_PAGE) ?? [];

  return {
    articles: currentArticles,
    page,
    setPage,
    totalPages,
    isLoading,
    isError: !!error,
  };
}
