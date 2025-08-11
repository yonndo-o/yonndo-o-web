import { NextResponse } from 'next/server';
import { getAllMindscapeItems } from '@/lib/data/mindscape';
import type { UnifiedItem } from '@/types/mindscape';

export async function GET() {
  try {
    const items: UnifiedItem[] = await getAllMindscapeItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/mindscape failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
