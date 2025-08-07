"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useLang } from "@/i18n/LanguageProvider";
import {
    generateSlug,
    estimateReadingTime,
    translateArticle,
} from "@/lib/utils/articleHelpers";
import styles from "./CreateArticle.module.css";

export default function CreateArticlePage() {
    const { t, lang } = useLang();
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        content: "",
        tags: "",
        category: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) return;

        const db = getDatabase(app);
        const id = `article_${Date.now()}`;
        const now = new Date().toISOString();
        const slug = generateSlug(form.title);
        const tagsArray = form.tags.split(",").map((tag) => tag.trim());

        const baseArticle = {
            id,
            title: form.title,
            content: form.content,
            authorId: user.uid,
            createdAt: now,
            updatedAt: now,
            tags: tagsArray,
            category: form.category || "未分類",
            excerpt: form.content.slice(0, 100),
            coverImageUrl: "/default-cover.jpg",
            isPublished: false,
            language: lang,
            readingTime: estimateReadingTime(form.content),
            views: 0,
            likes: 0,
            commentsCount: 0,
            visibility: "public",
            status: "draft",
            revisionHistory: [],
            contributors: [user.uid],
            metaTitle: `${form.title} | ${form.category}`,
            metaDescription: form.content.slice(0, 100),
            slug,
        };

        const translations = await translateArticle({
            title: form.title,
            content: form.content,
            languages: [lang],
        });
        const articleData = { ...baseArticle, translations };

        await set(ref(db, `articles/${id}`), articleData);

        router.push(`/articles/${id}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t("article.createTitle")}</h1>

            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder={t("article.title")}
                className={styles.input}
            />

            <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder={t("article.content")}
                className={styles.textarea}
            />

            <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder={t("article.tags")}
                className={styles.input}
            />

            <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder={t("article.category")}
                className={styles.input}
            />

            <button onClick={handleSubmit} className={styles.glassbutton}>
                {t("submit")}
            </button>
        </div>
    );
}