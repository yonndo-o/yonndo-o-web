"use client";

import Link from "next/link";
import { FiHome } from "react-icons/fi";
import "@/styles/components/buttons.css";
import "@/styles/globals.css";

export default function LinksPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", textAlign: "center" }}>
      <p>此頁面仍在施工中 🚧</p>
      {/* <p>也許是路徑錯了，或這頁正在建置中。</p> */}
      <Link href="/" passHref>
        <button className="glassbutton">
          <FiHome style={{ marginRight: 8 }} />
          回首頁
        </button>
      </Link>
    </div>
  );
}