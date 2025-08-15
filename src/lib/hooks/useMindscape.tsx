import useSWR from 'swr';
import type { TranslatedItem, TopicType } from '@/types/mindscape';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const isValidTopic = (topic: any): topic is TopicType => {
  return ['journey', 'todo', 'focus'].includes(topic);
};


export function useMindscape(lang: string) {
  const { data, error, isLoading } = useSWR<TranslatedItem[]>(`/api/mindscape?lang=${lang}`, fetcher);

  const itemsByTopic: Record<TopicType, TranslatedItem[]> = {
    journey: [],
    todo: [],
    focus: [],
  };

  const topics: TopicType[] = [];

  if (data) {
    data.forEach((item) => {
      if (isValidTopic(item.topic)) {
        itemsByTopic[item.topic].push(item);
      } else {
        console.warn(`Invalid topic: ${item.topic}`, item);
      }
    });

    Object.entries(itemsByTopic).forEach(([topic, items]) => {
      if (items.length > 0) {
        topics.push(topic as TopicType);
      }
    });
  }

  return {
    itemsByTopic,
    topics,
    isLoading,
    isError: !!error,
  };
}

