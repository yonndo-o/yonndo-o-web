// pages/about.tsx
"use client";

import React, { useState, useEffect } from "react";
import { app } from "@/lib/firebase";
import { useLang } from "@/i18n/LanguageProvider";
import styles from "./about.module.css";

type UserInfo = {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
};

export default function AboutPage() {
  const { t } = useLang();
  const [currentUser, setCurrentUser] = useState<import("firebase/auth").User | null>(null);
  const [userList, setUserList] = useState<UserInfo[]>([]);

  useEffect(() => {
    let unsubscribeFromAuth: (() => void) | undefined;

    async function initFirebaseListeners() {
      const authModule = await import("firebase/auth");
      const dbModule = await import("firebase/database");

      const auth = authModule.getAuth(app);
      const db = dbModule.getDatabase(app);

      unsubscribeFromAuth = authModule.onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        if (user) {
          const userRef = dbModule.ref(db, `users/${user.uid}`);
          dbModule.set(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });

          const allUsersRef = dbModule.ref(db, "users");
          dbModule.onValue(allUsersRef, (snapshot) => {
            const data = snapshot.val() || {};
            const list = Object.values(data) as UserInfo[];
            setUserList(list);
          });
        }
      });
    }

    initFirebaseListeners();

    return () => {
      if (unsubscribeFromAuth) unsubscribeFromAuth();
    };
  }, []);

  const handleGoogleLogin = async () => {
    const authModule = await import("firebase/auth");
    const auth = authModule.getAuth(app);
    const provider = new authModule.GoogleAuthProvider();
    await authModule.signInWithPopup(auth, provider);
  };

  return (
    <main className={styles.container}>
      {!currentUser ? (
        <section className={styles.loginSection} aria-labelledby="login-heading">
          <button
            onClick={handleGoogleLogin}
            className={styles.loginButton}
            aria-label={t("loginWithGoogle")}
          >
            {t("loginWithGoogle")}
          </button>
        </section>
      ) : (
        <>
          <h1>{t("about.title")}</h1>
          <section aria-labelledby="user-list-heading">
            <h2 id="user-list-heading">{t("about.userListTitle")}</h2>
            <ul className={styles.userGrid}>
              {userList.map((user) => (
                <li key={user.uid} className={styles.userCard}>
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={`Avatar of ${user.displayName}`}
                    className={styles.userAvatar}
                  />
                  <p>{user.displayName}</p>
                  {user.email && <p>{user.email}</p>}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}