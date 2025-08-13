'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import { useMindscape } from '@/lib/hooks/useMindscape';
import TimelineSection from '@/components/mindscape/TimelineSection';
import MindscapeNav from '@/components/mindscape/MindscapeNav';
import TimelineSkeleton from '@/components/ui/TimelineSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/pages/mindscape.css';
import type { TopicType } from '@/types/mindscape';

export default function MindscapePage() {
  const { t } = useLang();
  const { itemsByTopic, isLoading, isError, topics } = useMindscape();
  const [activeTopic, setActiveTopic] = useState<TopicType | null>(null);

  useEffect(() => {
    if (topics.length > 0 && !activeTopic) {
      setActiveTopic(topics[0]);
    }
  }, [topics, activeTopic]);

  if (isError) {
    return (
      <main className="mindscape-layout" role="main" aria-labelledby="mindscape-title">
        <h1 id="mindscape-title" className="mindscape-title">
          {t('mindscape.title')}
        </h1>
        <p className="mindscape-error">{t('mindscape.error')}</p>
      </main>
    );
  }

  return (
    <main className="mindscape-layout" role="main" aria-labelledby="mindscape-title">
      <h1 id="mindscape-title" className="mindscape-title">
        {t('mindscape.title')}
      </h1>

      <div className="mindscape-content" id="mindscape-content">
        {isLoading || !activeTopic ? (
          <TimelineSkeleton count={3} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              aria-hidden={false}
            >
              <TimelineSection
                topic={activeTopic}
                items={itemsByTopic[activeTopic]}
                isVisible={true}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <MindscapeNav
        topics={topics}
        activeTopic={activeTopic ?? topics[0]}
        onChange={setActiveTopic}
        aria-controls="mindscape-content"
        aria-selected={activeTopic ?? undefined}
      />
    </main>
  );
}
