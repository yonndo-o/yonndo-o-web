'use client';

import NavItem from './NavItem';
import { useLang } from '@/i18n/LanguageProvider';

interface NavItemData {
  label: string;
  href: string;
}

const NavBar = () => {
  const { lang, t } = useLang();

  const navItems: NavItemData[] = [
    { label: t('common.homepage'), href: '' },
    { label: t('common.mindscape'), href: '/mindscape' },
    { label: t('common.memberCenter'), href: '/profile' },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-inner">
        <ul className="nav-list">
          {navItems.map((item) => (
            <NavItem
              key={item.href || 'home'}
              label={item.label}
              href={`/${lang}${item.href}`}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
