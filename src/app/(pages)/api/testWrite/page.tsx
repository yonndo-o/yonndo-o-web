'use client'; // 確保這個元件只在瀏覽器執行

import { ref, set } from 'firebase/database';
import { database } from '@/lib/firebase';
import { useState } from 'react';

export default function TestWritePage() {
  const [status, setStatus] = useState('');

  const handleWrite = async () => {
    try {
      const entryRef = ref(database, 'test/' + Date.now()); // 使用時間戳當 key
      await set(entryRef, {
        name: 'Yonndo',
        purpose: '手動測試寫入',
        time: new Date().toISOString(),
      });
      setStatus('✅ 寫入成功！');
    } catch (error) {
      console.error(error);
      setStatus('❌ 寫入失敗');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧪 Firebase 寫入測試</h1>
      <button onClick={handleWrite}>寫入一筆資料</button>
      <p>{status}</p>
    </div>
  );
}