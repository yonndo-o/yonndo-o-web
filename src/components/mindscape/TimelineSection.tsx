import { formatLocalTime } from '@/lib/utils/time';
import type { MindscapeItem } from '@/lib/hooks/useMindscape';
import { useLang } from '@/i18n/LanguageProvider';
import '@/styles/pages/mindscape.css';

interface Props {
  topic: string;
  items: MindscapeItem[];
  isVisible: boolean;
}

export default function TimelineSection({ topic, items, isVisible }: Props) {
  const { t, lang } = useLang();

  return (
    <section className={`timeline-section ${isVisible ? 'visible' : 'hidden'}`}>
      {items.length === 0 ? (
        <p>{t('mindscape.empty')}</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="timeline-event">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            {topic === 'journey' && item.completed_at && (
              <p className="completed-time">
                {t('mindscape.completed_at')}: {formatLocalTime(item.completed_at, lang)}
              </p>
            )}
          </div>
        ))
      )}
    </section>
  );
}
