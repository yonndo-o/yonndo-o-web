'use client';

import NavItem from '../NavItem/NnavItem';
import { useLang } from '@/i18n/LanguageProvider';

const NavBar = () => {
  const { t } = useLang();

  const navItems = [
    { label: t('common.homepage'), href: '/' },
    { label: t('common.personalInfo'), href: '/about' },
    { label: t('common.articleRanking'), href: '/stats' },
    { label: t('common.categoryTags'), href: '/tags' },
    { label: t('common.externalLinks'), href: '/links' },
    { label: t('common.memberCenter'), href: '/profile' },
  ];

  return (
<nav className="w-full bg-white border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ul className="flex flex-wrap justify-between items-center py-4 text-sm sm:text-base md:text-lg">
      {navItems.map((item) => (
        <NavItem key={item.href} label={item.label} href={item.href} />
      ))}
    </ul>
  </div>
</nav>
  );
};

export default NavBar;