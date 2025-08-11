import { ref, get, set, remove } from 'firebase/database';
import { database } from '@/lib/firebase';
import type { UnifiedItem } from '@/types/mindscape';

export async function getMindscapeItemById(id: string): Promise<UnifiedItem | null> {
  const snapshot = await get(ref(database, `mindscape/${id}`));
  const data = snapshot.val();
  return data ?? null;
}

export async function updateMindscapeItem(id: string, data: Partial<UnifiedItem>): Promise<UnifiedItem> {
  const itemRef = ref(database, `mindscape/${id}`);
  const snapshot = await get(itemRef);
  const existing = snapshot.val();

  if (!existing) throw new Error('Item not found');

  const updated = { ...existing, ...data };
  await set(itemRef, updated);
  return updated;
}

export async function deleteMindscapeItem(id: string): Promise<void> {
  await remove(ref(database, `mindscape/${id}`));
}

export async function getAllMindscapeItems(): Promise<UnifiedItem[]> {
  const snapshot = await get(ref(database, 'mindscape'));
  const data = snapshot.val();

  if (!data) return [];

  return Object.entries(data).map(([id, value]) => ({
    ...(value as UnifiedItem),
    id, // ✅ 放最後，避免被覆蓋
  }));
}
