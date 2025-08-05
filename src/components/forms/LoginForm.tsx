"use client";

import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/lib/firebase"; // ⬅️ 從初始化過的 auth 引入

const LoginForm = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("登入失敗：", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>使用 Google 登入</button>
      {user && (
        <div>
          <p>歡迎，{user.displayName ?? "使用者"}</p>
          <img
            src={user.photoURL ?? "/assets/images/default-avatar.png"}
            alt="頭像"
            width={50}
          />
        </div>
      )}
    </div>
  );
};

export default LoginForm;