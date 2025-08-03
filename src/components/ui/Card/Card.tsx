'use client';

import React from 'react';
import styles from './FontSizeButton.module.css';

const FontSizeButton = () => {
  const handleClick = () => {
    const scaleOrder = ['sm', 'md', 'lg', 'xl'];
    const currentScale = document.documentElement.getAttribute('data-font-scale') || 'md';
    const currentIndex = scaleOrder.indexOf(currentScale);
    const nextScale = scaleOrder[Math.min(currentIndex + 1, scaleOrder.length - 1)];

    document.documentElement.setAttribute('data-font-scale', nextScale);
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label="Increase font size"
    >
      <span className={styles.icon}>A+</span>
      <span className={styles.label}>Font Size</span>
    </button>
  );
};

export default FontSizeButton;