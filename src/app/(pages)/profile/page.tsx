"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";
import { useLang } from "@/i18n/LanguageProvider";
import styles from "./profile.module.css";

type UserInfo = {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
};

export default function ProfilePage() {
  const { t } = useLang();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<import("firebase/auth").User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function initAuth() {
      const authModule = await import("firebase/auth");
      const dbModule = await import("firebase/database");

      const auth = authModule.getAuth(app);
      const db = dbModule.getDatabase(app);

      unsubscribe = authModule.onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/login");
        } else {
          setCurrentUser(user);
          const userRef = dbModule.ref(db, `users/${user.uid}`);
          dbModule.set(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
          setUserInfo({
            uid: user.uid,
            displayName: user.displayName || "",
            email: user.email || "",
            photoURL: user.photoURL || "/default-avatar.png",
          });
        }
      });
    }

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    const authModule = await import("firebase/auth");
    const auth = authModule.getAuth(app);
    await authModule.signOut(auth);
    router.push("/login");
  };

  return (
    <main className={styles.container}>
      {currentUser && userInfo && (
        <>
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
            aria-label={t("logout")}
          >
            {t("logout")}
          </button>

          <section className={styles.profileSection}>
            <h1>{t("profile.title")}</h1>
            <div className={styles.userCard}>
              <img
                src={userInfo.photoURL}
                alt={`Avatar of ${userInfo.displayName}`}
                className={styles.userAvatar}
              />
              <p>{userInfo.displayName}</p>
              {userInfo.email && <p>{userInfo.email}</p>}
            </div>
          </section>
        </>
      )}
    </main>
  );
}