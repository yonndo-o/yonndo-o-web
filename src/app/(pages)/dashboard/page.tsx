'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/i18n/LanguageProvider';
import { formatLocalTime } from '@/lib/utils/time';
import { getLangText } from '@/lib/utils/lang';
import { hasCompletedAt } from '@/types/mindscape';
import type { UnifiedItem, TopicType } from '@/types/mindscape';
import AdminLoginForm from '@/components/dashboard/AdminLoginForm';
import '@/styles/pages/dashboard.css';

const topics: TopicType[] = ['journey', 'todo', 'focus'];

export default function MindscapeManageCenter() {
  const { t, lang } = useLang();
  const router = useRouter();

  // 🔐 Auth state
  const [role, setRole] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // 📦 Data state
  const [items, setItems] = useState<Record<TopicType, UnifiedItem[]>>({
    journey: [],
    todo: [],
    focus: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Modal state
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // 🔐 Verify admin
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/api/admin-verify', { credentials: 'include' });
        const data = await res.json();
        setRole(data.valid && data.role === 'admin' ? 'admin' : null);
      } catch {
        setRole(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    verifyToken();
  }, []);

  // 🔄 Load items
  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch('/api/mindscape');
        if (!res.ok) throw new Error('Failed to fetch');
        const all: UnifiedItem[] = await res.json();

        const grouped: Record<TopicType, UnifiedItem[]> = {
          journey: [],
          todo: [],
          focus: [],
        };
        for (const item of all) {
          grouped[item.topic].push(item);
        }
        setItems(grouped);
      } catch {
        setError(t('common.errorOccurred'));
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [t]);

  // ✅ Mark as completed
  const handleComplete = async (id: string) => {
    try {
      const now = new Date().toISOString();
      const res = await fetch(`/api/mindscape/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed_at: now, status: 'completed' }),
      });

      if (!res.ok) throw new Error();

      const updated: UnifiedItem = await res.json();

      setItems((prev) => {
        const updatedMap = { ...prev };
        updatedMap[updated.topic] = updatedMap[updated.topic].map((item) =>
          item.id === updated.id ? updated : item
        );
        return updatedMap;
      });
    } catch {
      setError(t('common.errorOccurred'));
    }
  };

  // 🗑️ Delete item
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/mindscape/${id}`, { method: 'DELETE' });
      setItems((prev) => {
        const updated = { ...prev };
        for (const topic of topics) {
          updated[topic] = updated[topic].filter((item) => item.id !== id);
        }
        return updated;
      });
    } catch {
      setError(t('common.errorOccurred'));
    }
  };

  // 🔓 Logout
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  // 🧠 Render
  return (
    <main className="manageContainer">
      {/* 🔄 Auth loading */}
      {loadingAuth && <p>{t('dashboard.loading') || 'Loading...'}</p>}

      {/* 🔐 Not logged in */}
      {!loadingAuth && role !== 'admin' && (
        <AdminLoginForm onSuccess={() => setRole('admin')} />
      )}

      {/* ✅ Logged in */}
      {!loadingAuth && role === 'admin' && (
        <>
          <h1 className="manageTitle">{t('mindscape.manageCenter')}</h1>
          <button onClick={handleLogout} className="logoutBtn">
            {t('dashboard.logout')}
          </button>
          <button
            onClick={() => router.push('/dashboard/mindscape/new')}
            className="createBtn"
          >
            {t('common.create')}
          </button>


          {loading && <p>{t('common.loading')}</p>}
          {!loading && error && <p className="error">{error}</p>}

          {!loading &&
            topics.map((topic) => {
              const topicItems = items[topic];
              return (
                <section key={topic}>
                  <h2 className="manageTitle">{t(`mindscape.${topic}.title`)}</h2>

                  {topicItems.length === 0 ? (
                    <p>{t('common.notProvided')}</p>
                  ) : (
                    <ul className="manageList">
                      {topicItems.map((item) => (
                        <li key={item.id} className="manageItem">
                          <div className="infoBlock">
                            <Link href={`/mindscape/${item.id}`} className="articleLink">
                              {getLangText(item.title, lang)}
                            </Link>

                            <span className="createdAt">
                              {hasCompletedAt(item) && item.completed_at
                                ? `${t('mindscape.completed_at')}: ${formatLocalTime(item.completed_at, lang)}`
                                : t('mindscape.inProgress')}
                            </span>

                            <span className={`statusTag ${item.topic}`}>
                              {t(`mindscape.${item.topic}.title`)}
                            </span>
                          </div>

                          <div className="actionBlock">
                            <Link href={`/dashboard/mindscape/edit/${item.id}`} className="editBtn">
                              {t('common.edit')}
                            </Link>
                            <button onClick={() => setDeleteConfirmId(item.id)} className="deleteBtn">
                              {t('common.delete')}
                            </button>

                            {['todo', 'focus'].includes(item.topic) && item.status === 'in_progress' && (
                              <button onClick={() => setConfirmId(item.id)} className="completeBtn">
                                {t('common.markAsCompleted')}
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}

          {/* ✅ Completion Modal */}
          {confirmId && (
            <div className="modalOverlay">
              <div className="modalBox">
                <p>{t('mindscape.confirmCompletion')}</p>
                <div className="modalActions">
                  <button
                    onClick={() => {
                      handleComplete(confirmId);
                      setConfirmId(null);
                    }}
                    className="confirmBtn"
                  >
                    {t('common.confirm')}
                  </button>
                  <button onClick={() => setConfirmId(null)} className="cancelBtn">
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🗑️ Delete Modal */}
          {deleteConfirmId && (
            <div className="modalOverlay">
              <div className="modalBox">
                <p>{t('mindscape.confirmDeletion')}</p>
                <div className="modalActions">
                  <button
                    onClick={() => {
                      handleDelete(deleteConfirmId);
                      setDeleteConfirmId(null);
                    }}
                    className="confirmBtn"
                  >
                    {t('common.confirm')}
                  </button>
                  <button onClick={() => setDeleteConfirmId(null)} className="cancelBtn">
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
