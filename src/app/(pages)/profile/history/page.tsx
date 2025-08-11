"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useLang } from "@/i18n/LanguageProvider";
import Link from "next/link";
import "@/styles/pages/profile-history.css";

export default function ProfileHistoryPage() {
  const { t } = useLang();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const userArticlesRef = ref(db, `userArticles/${user.uid}`);

    get(userArticlesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.entries(data).map(([id, info]: any) => ({
          id,
          ...info,
        }));
        setArticles(list);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className="historyContainer">
      <h1 className="historyTitle">{t("article.history")}</h1>

      {loading ? (
        <p className="loading">{t("common.loading")}</p>
      ) : articles.length === 0 ? (
        <p>{t("common.notProvided")}</p>
      ) : (
        <ul className="articleList">
          {articles.map((article) => (
            <li key={article.id} className="articleItem">
              <Link href={`/articles/${article.id}`} className="articleLink">
                {article.title}
              </Link>
              <span className="createdAt">{new Date(article.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
