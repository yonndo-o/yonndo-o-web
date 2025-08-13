'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLang } from '@/i18n/LanguageProvider';
import styles from './article.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { getLangFromParams } from '@/lib/utils/lang';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  language: string;
  createdAt: string;
  coverImageUrl: string;
}

export default function ArticleDetailPage() {
  const { t } = useLang();
  const params = useParams();
  const id = params.id as string;
  const lang = getLangFromParams(params);
  const router = useRouter();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArticle = useCallback(async () => {
    if (!id) return;

    try {
      const res = await fetch(`/api/articles/${id}?lang=${lang}`);
      if (!res.ok) {
        router.replace(`/${lang}/not-found`);
        return;
      }
      const data = await res.json();
      setArticle(data);
    } catch (error) {
      console.error('Fetch article failed:', error);
      router.replace(`/${lang}/not-found`);
    } finally {
      setLoading(false);
    }
  }, [id, lang, router]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return <p className={styles.loading}>{t('loading')}</p>;
  }

  if (!article) {
    return null;
  }

  const coverSrc = article.coverImageUrl || '/default-cover.jpg';
  const formattedDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.createdAt));

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={article.id}
        className={styles.container}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <header className={styles.header}>
          <motion.img
            src={coverSrc}
            alt={article.title}
            className={styles.cover}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {article.title}
          </motion.h1>

          <motion.p
            className={styles.meta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('article.category')}: {article.category} |{' '}
            {t('article.tags')}: {article.tags?.join(', ') || t('common.notProvided')} |{' '}
            {t('article.language')}: {article.language} |{' '}
            {t('article.date')}: {formattedDate}
          </motion.p>
        </header>

        <motion.section
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>{article.content}</p>
        </motion.section>
      </motion.article>
    </AnimatePresence>
  );
}
