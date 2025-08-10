'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import { fetchMindscapeItems, fetchTODOItems, fetchFocusItems } from '@/lib/mindscapeApi';
import { MindscapeItem, TODOItem, FocusItem } from '@/types/mindscape';
import '@/styles/pages/mindscape.css';

type TopicKey = 'journey' | 'todo' | 'focus';

const topics: TopicKey[] = ['journey', 'todo', 'focus'];

export default function MindscapePage() {
    const { t, lang } = useLang();
    const [activeTopic, setActiveTopic] = useState<TopicKey>('journey');

    const [contentMap, setContentMap] = useState<Record<TopicKey, Array<MindscapeItem | TODOItem | FocusItem>>>({
        journey: [],
        todo: [],
        focus: [],
    });

    useEffect(() => {
        async function loadData() {
            const [journeyItems, todoItems, focusItems] = await Promise.all([
                fetchMindscapeItems(),
                fetchTODOItems(),
                fetchFocusItems(),
            ]);

            setContentMap({
                journey: journeyItems,
                todo: todoItems,
                focus: focusItems,
            });
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
