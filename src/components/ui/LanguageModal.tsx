'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import '@/styles/components/modal/language-modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="elegant-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="elegant-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="elegant-modal-header">
          <h2 className="elegant-modal-title">{title}</h2>
          <button className="elegant-close-button" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className="elegant-modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
