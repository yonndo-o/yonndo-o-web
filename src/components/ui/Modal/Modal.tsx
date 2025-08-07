"use client";

import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
