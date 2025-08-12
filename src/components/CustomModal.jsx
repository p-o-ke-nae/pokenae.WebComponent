'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomModal.module.css';

const CustomModal = React.memo(({ 
  isOpen, 
  onClose, 
  showCloseButton = false, 
  className = '',
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ...otherProps 
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle escape key
  const handleEscape = useCallback((event) => {
    if (closeOnEscape && event.key === 'Escape' && onClose) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback((event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget && onClose) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Handle focus trap and body scroll
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement;
      
      // Prevent body scroll
      if (preventBodyScroll) {
        document.body.classList.add('no-scroll');
      }
      
      // Add escape listener
      if (closeOnEscape) {
        document.addEventListener('keydown', handleEscape);
      }
      
      // Focus modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      // Remove body scroll prevention
      if (preventBodyScroll) {
        document.body.classList.remove('no-scroll');
      }
      
      // Remove escape listener
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscape);
      }
      
      // Restore previous focus
      if (previousFocusRef.current && !isOpen) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleEscape, closeOnEscape, preventBodyScroll]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.customoverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <div 
        ref={modalRef}
        className={`${styles.customdialog} ${className}`.trim()}
        tabIndex={-1}
        {...otherProps}
      >
        {showCloseButton && (
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
});

CustomModal.displayName = 'CustomModal';

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  preventBodyScroll: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
};

export default CustomModal;