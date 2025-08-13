'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { app } from '@/lib/firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useLang } from '@/i18n/LanguageProvider';
import '@/styles/pages/create-article.css';

interface ArticleForm {
    title: string;
    content: string;
    tags: string;
    category: string;
}

export default function CreateArticlePage() {
    const { t, lang: langFromContext } = useLang();
    const { lang: langFromParams } = useParams();
    const lang = langFromParams || langFromContext;

    const router = useRouter();
    const [form, setForm] = useState<ArticleForm>({
        title: '',
        content: '',
        tags: '',
        category: '',
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === 'content' && textareaRef.current) {
            const el = textareaRef.current;
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight + 48}px`; // ✨ 自動高度 + buffer
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        if (!form.title.trim() || !form.content.trim()) {
            alert(t('article.validation.requiredFields'));
            return;
        }

        setIsSubmitting(true);

        try {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (!user) {
                alert(t('auth.error.notLoggedIn'));
                return;
            }

            const token = await user.getIdToken();

            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, form, lang }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Unknown error');
            }

            router.push(`/${lang}/articles/${result.id}`);
        } catch (error) {
            console.error('文章儲存失敗', error);
            alert(t('article.error.saveFailed'));
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="container">
            <h1 className="title">{t('article.createTitle')}</h1>

            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder={t('article.title')}
                className="input"
                disabled={isSubmitting}
            />

            <textarea
                ref={textareaRef}
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder={t('article.content')}
                className="textarea"
                disabled={isSubmitting}
            />

            <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder={t('article.tags')}
                className="input"
                disabled={isSubmitting}
            />

            <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder={t('article.category')}
                className="input"
                disabled={isSubmitting}
            />

            <button
                onClick={handleSubmit}
                className="glassbutton"
                disabled={isSubmitting}
            >
                {isSubmitting ? t('common.submitting') : t('common.submit')}
            </button>
        </div>
    );
}
