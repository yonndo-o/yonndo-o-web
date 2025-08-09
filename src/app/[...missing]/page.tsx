import { notFound } from 'next/navigation';

export default function MissingPage() {
  notFound(); // 導向 not-found.tsx
}
