interface NavItemProps {
  label: string
  href: string
  isActive?: boolean
}

const NavItem = ({ label, href, isActive }: NavItemProps) => (
  <li className="nav-item">
    <a href={href} className={isActive ? "active" : undefined}>
      {label}
    </a>
  </li>
);


export default NavItem;