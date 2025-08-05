import NavItem from '../NavItem/NnavItem'
import styles from './NavBar.module.css'

const NavBar = () => {
  const navItems = [
    { label: '首頁', href: '/' },
    { label: '個人資訊', href: '/about' },
    { label: '文章排行', href: '/stats' },
    { label: '分類標籤', href: '/tags' },
    { label: '外部連結', href: '/links' },
  ]

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <NavItem key={item.href} label={item.label} href={item.href} />
        ))}
      </ul>
    </nav>
  )
}

export default NavBar