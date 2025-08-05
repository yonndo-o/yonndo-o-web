"use client";

import React, { useState, useEffect } from "react";
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    User,
} from "firebase/auth";
import {
    getDatabase,
    ref,
    set,
    onValue,
    DataSnapshot,
} from "firebase/database";
import { app } from "@/lib/firebase";
import { useLang } from '@/i18n/LanguageProvider';
import styles from "./about.module.css";

type UserInfo = {
    uid: string;
    displayName: string;
    email?: string;
    photoURL?: string;
};

export default function AboutPage() {
    const auth = getAuth(app);
    const db = getDatabase(app);
    const { t } = useLang();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userList, setUserList] = useState<UserInfo[]>([]);

    // 1. 監聽登入狀態
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                // 登入後把自己寫入 /users
                const userRef = ref(db, `users/${user.uid}`);
                set(userRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });
                // 串接所有 users
                const allUsersRef = ref(db, "users");
                onValue(allUsersRef, (snapshot: DataSnapshot) => {
                    const data = snapshot.val() || {};
                    const list = Object.values(data) as UserInfo[];
                    setUserList(list);
                });
            }
        });
        return () => unsubscribe();
    }, [auth, db]);

    // 2. Google 登入按鈕
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    return (
        <main className={styles.container}>
            {!currentUser ? (
                <section
                    className={styles.loginSection}
                    aria-labelledby="login-heading"
                >
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