// app/not-found.tsx 或 pages/404.tsx
import Link from 'next/link';
import { FiHome } from 'react-icons/fi'; // 使用開源 Icon：Feather Icons

export default function NotFound() {
  return (
    <div>
      <h1 style={styles.title}>404 - 找不到頁面</h1>
      <p style={styles.subtitle}>此頁面仍在施工中 🚧</p>
      <p style={styles.message}>也許是路徑錯了，或這頁正在建置中。</p>

      <Link href="/" style={styles.homeLink}>
        <FiHome style={{ marginRight: '8px' }} />
        回首頁
      </Link>
    </div>
  );
}

const styles = {
  container: {
    padding: '4rem 2rem',
    textAlign: 'center',
    color: '#333',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '0.5rem',
  },
  message: {
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  homeLink: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.25rem',
    backgroundColor: '#0070f3',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};