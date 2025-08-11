'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLang } from '@/i18n/LanguageProvider';
import { getLangText } from '@/lib/utils/lang';
import { formatLocalTime } from '@/lib/utils/time';
import { hasCompletedAt } from '@/types/mindscape';
import type { UnifiedItem } from '@/types/mindscape';
import '@/styles/pages/mindscape-edit.css';


export default function EditMindscapePage() {
  const { id } = useParams();
  const router = useRouter();
  const { t, lang } = useLang();

  const [item, setItem] = useState<UnifiedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`/api/mindscape/${id}`);
        if (!res.ok) throw new Error();
        const data: UnifiedItem = await res.json();
        setItem(data);
        setTitle(getLangText(data.title, lang));
        setContent(getLangText(data.content, lang));
      } catch {
        setError(t('common.errorOccurred'));
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchItem();
  }, [id, lang, t]);

  const handleSave = async () => {
    try {
      const payload = {
        title: { ...item?.title, [lang]: title },
        content: { ...item?.content, [lang]: content },
      };
      await fetch(`/api/mindscape/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      router.push('/profile/manage');
    } catch {
      setError(t('common.errorOccurred'));
    }
  };

  if (loading) return <main className="manageContainer"><p>{t('common.loading')}</p></main>;
  if (error) return <main className="manageContainer"><p className="error">{error}</p></main>;
  if (!item) return null;

  return (
    <main className="manageContainer">
      <h1 className="manageTitle">{t('mindscape.editCenter')}</h1>

      <div className="infoBlock">
        <label htmlFor="title">{t('common.title')}</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="editInput"
        />

        <label htmlFor="content">{t('common.content')}</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="editTextarea"
        />

        <p className="createdAt">
          {item.created_at ? `${t('common.createdAt')}: ${formatLocalTime(item.created_at, lang)}` : ''}
        </p>

        <span className={`statusTag ${item.topic}`}>
          {t(`mindscape.${item.topic}.title`)}
        </span>
      </div>

      <div className="actionBlock">
        <button onClick={handleSave} className="editBtn">{t('common.save')}</button>
        <button onClick={() => router.back()} className="deleteBtn">{t('common.cancel')}</button>
      </div>
    </main>
  );
}
