import styles from './NavItem.module.css'

interface NavItemProps {
  label: string
  href: string
}

const NavItem = ({ label, href }: NavItemProps) => (
  <li className={styles.navItem}>
    <a href={href}>{label}</a>
  </li>
)

export default NavItem