'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import LanguageToggle from '../ui/LanguageToggle';
import FontSizeButton from '@/components/ui/FontSizeButton/FontSizeButton';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';

export default function Header() {
  const { t } = useLang();

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
      <h1 className="text-lg sm:text-xl font-semibold m-0">
        {t('components.title')}
      </h1>

      <div className="flex gap-2 sm:gap-4 items-center">
        <LanguageToggle />
        <FontSizeButton />
        <ThemeToggleButton />
      </div>
    </header>
  );
}
