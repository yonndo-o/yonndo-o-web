'use client';

import React, { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LanguageProvider';


const FontSizeButton: React.FC = () => {
  const scaleOrder = ['sm', 'md', 'lg', 'xl'] as const;
  const [currentScale, setCurrentScale] = useState<typeof scaleOrder[number]>('md');

  const applyFontScale = (scale: typeof currentScale) => {
    document.documentElement.setAttribute('data-font-scale', scale);
    setCurrentScale(scale);
    localStorage.setItem('font-scale', scale);
  };

  const handleClick = () => {
    const index = scaleOrder.indexOf(currentScale);
    const nextIndex = (index + 1) % scaleOrder.length; // 循環邏輯
    applyFontScale(scaleOrder[nextIndex]);
  };

  const { t } = useLang();

  return (
    <button
      className="header-button"
      onClick={handleClick}
      aria-label={`目前字級：${currentScale}`}
    >
      <span className="icon">A+</span>
      <span className="label">{t('components.fontSize.text')}</span>
    </button>
  );
};

export default FontSizeButton;