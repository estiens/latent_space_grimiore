import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BBSHeader } from '@/components/shared/BBSHeader';
import { ASCIIButton } from '@/components/shared/ASCIIButton';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface BBSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl w-full mx-4'
};

export const BBSModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  footer,
  className
}: BBSModalProps) => {
  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[var(--background)]/95 noise-overlay" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'relative w-full border-2 border-[var(--primary)] bg-[var(--background)]',
              sizeClasses[size],
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* ASCII Border Top */}
            <div className="absolute -top-3 left-0 right-0 text-[var(--primary)] text-xs text-center pointer-events-none">
              ╔{'═'.repeat(40)}╗
            </div>

            {/* Header */}
            <BBSHeader
              title={title}
              status="ACTIVE"
              actions={
                showCloseButton && (
                  <button
                    onClick={onClose}
                    className="hover:text-[var(--chart-1)] transition-colors"
                    aria-label="Close modal"
                  >
                    [X]
                  </button>
                )
              }
            />

            {/* Content */}
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-[var(--muted)] p-4 flex justify-end gap-2">
                {footer}
              </div>
            )}

            {/* ASCII Border Bottom */}
            <div className="absolute -bottom-3 left-0 right-0 text-[var(--primary)] text-xs text-center pointer-events-none">
              ╚{'═'.repeat(40)}╝
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render at document body
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
};

// Confirm dialog helper
interface BBSConfirmProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger';
}

export const BBSConfirm = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'CONFIRM_ACTION.SYS',
  message,
  confirmLabel = 'OK',
  cancelLabel = 'CANCEL',
  variant = 'primary'
}: BBSConfirmProps) => {
  return (
    <BBSModal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <ASCIIButton label={cancelLabel} variant="ghost" onClick={onCancel} />
          <ASCIIButton
            label={confirmLabel}
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
          />
        </>
      }
    >
      <p className="text-center">{message}</p>
    </BBSModal>
  );
};

export default BBSModal;
