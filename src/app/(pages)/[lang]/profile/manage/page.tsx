"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import Link from "next/link";
import "@/styles/pages/profile-manage.css";

interface Article {
  id: string;
  title: string;
  createdAt: number;
  status: "draft" | "published" | "archived";
}

export default function ArticleManagePage() {
  const { t } = useLang();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/articles", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data: Article[]) => {
        setArticles(data);
      })
      .catch((err) => {
        console.error("讀取失敗：", err);
        setError(t("common.pleaseLogin"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [t]);

  const handleDelete = async (id: string) => {
    if (!confirm(t("article.confirmDelete"))) return;

    try {
      const res = await fetch("/api/articles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Delete failed");

      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("刪除失敗：", err);
      alert(t("common.deleteFailed"));
    }
  };

  return (
    <main className="manageContainer">
      <h1 className="manageTitle">{t("article.manageCenter")}</h1>

      {loading && <p>{t("common.loading")}</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && articles.length === 0 && <p>{t("common.notProvided")}</p>}

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
                  {t(`article.status.${article.status}`)}
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
