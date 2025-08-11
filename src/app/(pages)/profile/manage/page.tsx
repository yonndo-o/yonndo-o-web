"use client";

import { useEffect, useState } from "react";
import { auth, database } from "@/lib/firebase";
import { ref, get, remove } from "firebase/database";
import { useLang } from "@/i18n/LanguageProvider";
import Link from "next/link";
import "@/styles/pages/profile-manage.css";

export default function ArticleManagePage() {
  const { t } = useLang();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReady, setUserReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setError(t("common.pleaseLogin"));
        setLoading(false);
        return;
      }

      const userArticlesRef = ref(database, `userArticles/${user.uid}`);
      get(userArticlesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const list = Object.entries(data).map(([id, info]: any) => ({
              id,
              ...info,
            }));
            setArticles(list);
          }
        })
        .catch((err) => {
          console.error("讀取文章失敗：", err);
          setError(t("common.loadFailed"));
        })
        .finally(() => {
          setLoading(false);
          setUserReady(true);
        });
    });

    return () => unsubscribe();
  }, [t]);

  const handleDelete = (id: string) => {
    if (!confirm(t("article.confirmDelete"))) return;
    const articleRef = ref(database, `userArticles/${auth.currentUser?.uid}/${id}`);
    remove(articleRef)
      .then(() => {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      })
      .catch((err) => {
        console.error("刪除失敗：", err);
        alert(t("common.deleteFailed"));
      });
  };

  return (
    <main className="manageContainer">
      <h1 className="manageTitle">{t("article.manageCenter")}</h1>

      {loading && <p>{t("common.loading")}</p>}

      {!loading && error && <p className="error">{error}</p>}

      {!loading && userReady && articles.length === 0 && (
        <p>{t("common.notProvided")}</p>
      )}

      {!loading && articles.length > 0 && (
        <ul className="manageList">
          {articles.map((article) => (
            <li key={article.id} className="manageItem">
              <div className="infoBlock">
                <Link href={`/articles/${article.id}`} className="articleLink">
                  {article.title}
                </Link>
                <span className="createdAt">
                  {new Date(article.createdAt).toLocaleString()}
                </span>
                <span className={`statusTag ${article.status}`}>
                  {t(`article.status.${article.status || "published"}`)}
                </span>
              </div>
              <div className="actionBlock">
                <Link href={`/articles/edit/${article.id}`} className="editBtn">
                  {t("common.edit")}
                </Link>
                <button onClick={() => handleDelete(article.id)} className="deleteBtn">
                  {t("common.delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
