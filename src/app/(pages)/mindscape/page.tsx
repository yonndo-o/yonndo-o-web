'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import type { UnifiedItem, TopicType } from '@/types/mindscape';
import { formatLocalTime } from '@/lib/utils/time';
import '@/styles/pages/mindscape.css';

const topics: TopicType[] = ['journey', 'todo', 'focus'];

export default function MindscapePage() {
  const { t, lang } = useLang();
  const [activeTopic, setActiveTopic] = useState<TopicType>('journey');

  const [contentMap, setContentMap] = useState<Record<TopicType, UnifiedItem[]>>({
    journey: [],
    todo: [],
    focus: [],
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/mindscape');
        const allItems: UnifiedItem[] = await res.json();

        const grouped: Record<TopicType, UnifiedItem[]> = {
          journey: [],
          todo: [],
          focus: [],
        };

        for (const item of allItems) {
          grouped[item.topic].push(item);
        }

        setContentMap(grouped);
      } catch (err) {
        console.error('Failed to load mindscape items:', err);
      }
    }

    loadData();
  }, []);

  return (
    <main className="mindscape-layout" role="main" aria-labelledby="mindscape-title">
      <h1 id="mindscape-title" className="mindscape-title">
        {t('mindscape.title')}
      </h1>

      <div className="mindscape-content">
        {topics.map((topic) => (
          <section
            key={topic}
            className={`timeline-section ${activeTopic === topic ? 'visible' : 'hidden'}`}
          >
            {contentMap[topic].length === 0 ? (
              <p>{t('mindscape.empty')}</p>
            ) : (
              contentMap[topic].map((item) => (
                <div key={item.id} className="timeline-event">
                  <h3>{item.title[lang]}</h3>
                  <p>{item.content[lang]}</p>
                  {item.topic === 'journey' && item.completed_at && (
                    <p className="completed-time">
                      {t('mindscape.completed_at')}: {formatLocalTime(item.completed_at, lang)}
                    </p>
                  )}
                </div>
              ))
            )}
          </section>
        ))}
      </div>

      <nav className="mindscape-nav">
        {topics.map((topic) => (
          <button
            key={topic}
            className={`nav-button ${activeTopic === topic ? 'active' : ''}`}
            onClick={() => setActiveTopic(topic)}
            aria-label={t(`mindscape.${topic}.title`)}
          >
            {t(`mindscape.${topic}.title`)}
          </button>
        ))}
      </nav>
    </main>
  );
}
