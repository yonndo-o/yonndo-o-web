'use client';

import { useState, useRef, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import LanguageToggleButton from '../ui/LanguageToggleButton';
import FontSizeButton from '@/components/ui/FontSizeButton/FontSizeButton';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';

export default function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 點擊外部自動關閉
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

  // 焦點管理 & 鍵盤控制
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement;
    const menuEl = menuRef.current;
    if (!menuOpen || !menuEl) return;

    // 找出所有可聚焦元素
    const selectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableEls = Array.from(
      menuEl.querySelectorAll<HTMLElement>(selectors)
    ).filter((el) => !el.hasAttribute('disabled'));

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    // 打開時自動聚焦第一個
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
        // Shift + Tab
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
        // Tab
        else if (!e.shiftKey && document.activeElement === lastEl) {
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
    <header className="relative flex items-center justify-between px-4 py-2 border-b bg-white z-10">
      {/* 標題 */}
      <h1 className="text-lg sm:text-xl font-semibold m-0">
        {t('components.title')}
      </h1>

      {/* 桌機版按鈕列 */}
      <div className="hidden sm:flex gap-2 sm:gap-4 items-center">
        <LanguageToggleButton />
        <FontSizeButton />
        <ThemeToggleButton />
      </div>

      {/* 手機版漢堡按鈕 */}
      <button
        ref={buttonRef}
        className="sm:hidden p-2 text-2xl"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* 手機版彈出選單（永遠在 DOM，但透過 CSS 顯示/隱藏） */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="menu"
        className={`
          sm:hidden
          absolute top-full right-4 mt-1 w-40
          bg-white shadow-lg rounded
          flex flex-col
          transform transition-all duration-200 ease-out origin-top
          ${menuOpen
            ? 'opacity-100 scale-y-100 pointer-events-auto'
            : 'opacity-0 scale-y-0 pointer-events-none'}
          z-50
        `}
      >
        <div role="menuitem" className="px-4 py-2 hover:bg-gray-100">
          <LanguageToggleButton />
        </div>
        <div role="menuitem" className="px-4 py-2 hover:bg-gray-100">
          <FontSizeButton />
        </div>
        <div role="menuitem" className="px-4 py-2 hover:bg-gray-100">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}