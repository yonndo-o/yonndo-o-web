"use client";

import Link from "next/link";
import styles from "./navbar.module.css"; // optional: 自訂樣式

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link href="/articles">📚 瀏覽文章</Link>
        </li>
        <li>
          <Link href="/profile">👤 個人介面</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;