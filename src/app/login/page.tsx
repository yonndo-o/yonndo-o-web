"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";
import { useLang } from "@/i18n/LanguageProvider";
import "@/styles/components/buttons.css";

export default function LoginPage() {
  const { t } = useLang();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const authModule = await import("firebase/auth");
    const auth = authModule.getAuth(app);
    const provider = new authModule.GoogleAuthProvider();
    await authModule.signInWithPopup(auth, provider);
    router.push("/profile"); // ✅ 登入成功後導向會員中心
  };

  return (
    <main className={'container'}>
      <section className={'loginSection'}>
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          alt="Google Icon"
          className={'loginIcon'}
        />
        <button onClick={handleGoogleLogin} className='glassbutton'>
          {t("loginWithGoogle")}
        </button>
      </section>
    </main>
  );
}