'use client';

import { useRouter, useParams } from 'next/navigation';
import { app } from '@/lib/firebase';

export const useGoogleLogin = () => {
  const router = useRouter();
  const { lang } = useParams(); // 支援語系路由

  return async () => {
    try {
      const authModule = await import('firebase/auth');
      const auth = authModule.getAuth(app);
      const provider = new authModule.GoogleAuthProvider();

      const result = await authModule.signInWithPopup(auth, provider);
      const user = result.user;

      const adminUID = process.env.NEXT_PUBLIC_ADMIN_UID;
      const role = user.uid === adminUID ? 'admin' : 'user';

      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, role }),
      });

      router.push(`/${lang}/profile`); // 保留語系
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };
};
