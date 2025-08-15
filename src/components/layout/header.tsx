'use client';

import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import LanguageToggleButton from '../ui/LanguageToggleButton';
import FontSizeButton from '@/components/ui/FontSizeButton';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';
import '@/styles/components/nav/header.css';

export default function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuOpen &&
        !menuRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement;
    const menuEl = menuRef.current;
    if (!menuOpen || !menuEl) return;

    const selectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableEls = Array.from(
      menuEl.querySelectorAll<HTMLElement>(selectors)
    ).filter((el) => !el.hasAttribute('disabled'));

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    firstEl?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
      if (e.key === 'Tab') {
        if (focusableEls.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      prevFocus?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <h1 className="header-title">{t('components.title')}</h1>

      <div className="header-buttons">
        <LanguageToggleButton />
        <FontSizeButton />
        <ThemeToggleButton />
      </div>

      <button
        ref={buttonRef}
        className="header-toggle sm:hidden"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="menu"
        className={`header-menu sm:hidden ${menuOpen ? 'visible' : 'hidden'}`}
      >
        <div role="menuitem" className="header-menu-item">
          <LanguageToggleButton />
        </div>
        <div role="menuitem" className="header-menu-item">
          <FontSizeButton />
        </div>
        <div role="menuitem" className="header-menu-item">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
