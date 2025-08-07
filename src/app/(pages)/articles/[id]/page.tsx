"use client";

import { useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { useLang } from "@/i18n/LanguageProvider";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/lib/firebase";
import styles from "./article.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  tags: string[];
  category: string;
  excerpt: string;
  coverImageUrl: string;
  language: string;
  translations?: Record<string, { title: string; content: string }>;
}

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { t, lang } = useLang();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => setResolvedId(id));
  }, [params]);

  useEffect(() => {
    if (!resolvedId) return;

    const fetchArticle = async () => {
      const db = getDatabase(app);
      const snap = await get(ref(db, `articles/${resolvedId}`));
      if (!snap.exists()) {
        setArticle(null);
        setLoading(false);
        return;
      }

      setArticle(snap.val());
      setLoading(false);
    };

    fetchArticle();
  }, [resolvedId]);

  if (loading) {
    return <p className={styles.loading}>{t("loading")}</p>;
  }

  if (!article) {
    return notFound();
  }

  const display = article.translations?.[lang] ?? article;

  const coverSrc =
    !article.coverImageUrl || article.coverImageUrl === "/default-cover.jpg"
      ? "/default-cover.jpg"
      : article.coverImageUrl;

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
            alt="cover"
            className={styles.cover}
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
            {display.title}
          </motion.h1>

          <motion.p
            className={styles.meta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("article.category")}: {article.category} | {t("article.tags")}:{" "}
            {article.tags.join(", ")} | {t("article.language")}: {article.language}
          </motion.p>
        </header>

        <motion.section
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>{display.content}</p>
        </motion.section>
      </motion.article>
    </AnimatePresence>
  );
}