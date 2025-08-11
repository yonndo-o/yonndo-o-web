"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import "@/styles/components/articlelist/articlelist.css";
import Pagination from "./ui/Pagination";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  createdAt: string;
  translations?: Record<string, { title: string; excerpt: string }>;
}

const ARTICLES_PER_PAGE = 10;

export default function ArticleList() {
  const { lang, t } = useLang();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      const db = getDatabase(app);
      const snapshot = await get(ref(db, "articles"));
      if (!snapshot.exists()) return;

      const data = snapshot.val();

      const rawArticles = Object.values(data) as Article[];

      const articleArray = rawArticles.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setArticles(articleArray);
    };

    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(start, start + ARTICLES_PER_PAGE);

  return (
    <div className="wrapper">
      <h2 className="heading">{t("article.recentArticles")}</h2>

      <ul className="grid">
        {currentArticles.map((article) => {
          const translated = article.translations?.[lang];
          const title = translated?.title || article.title;
          const excerpt = translated?.excerpt || article.excerpt;

          return (
            <li key={article.id} className="card">
              <Link href={`/articles/${article.id}`}>
                <div className="imageWrapper">
                  <Image
                    src={article.coverImageUrl || "/default-cover.jpg"}
                    alt={title}
                    fill
                    className="image"
                  />
                </div>
                <div className="text">
                  <h3>{title}</h3>
                  <p className="excerpt">{excerpt}</p>
                  <span className="date">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>

  );
}
