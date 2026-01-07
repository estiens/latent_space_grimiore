import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'compact' | 'bordered';
  className?: string;
}

export const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
  variant = 'default',
  className
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantClasses = {
    default: 'border border-[var(--muted)]',
    compact: 'border-b border-[var(--muted)]',
    bordered: 'border-2 border-[var(--secondary)]'
  };

  return (
    <div className={cn(variantClasses[variant], 'mb-4', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          'w-full text-left p-3 flex justify-between items-center transition-colors',
          'bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)]',
          variant === 'bordered' && 'bg-[rgba(0,0,0,0.5)]'
        )}
        aria-expanded={isOpen}
      >
        <span className="text-[var(--secondary)] font-bold">
          {isOpen ? '[-]' : '[+]'} {title}
        </span>
        <span className="text-xs text-[var(--muted-foreground)]">
          {isOpen ? 'EXPANDED' : 'COLLAPSED'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={cn(
              'p-4',
              variant !== 'compact' && 'border-t border-[var(--muted)]'
            )}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Accordion for multiple collapsible sections
interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
  }[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion = ({ items, allowMultiple = false, className }: AccordionProps) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    items.forEach((item, index) => {
      if (item.defaultOpen) initial.add(index);
    });
    return initial;
  });

  const toggleIndex = (index: number) => {
    setOpenIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <div key={index} className="border border-[var(--muted)]">
          <button
            onClick={() => toggleIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleIndex(index);
              }
            }}
            className="w-full text-left p-3 flex justify-between items-center bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors"
            aria-expanded={openIndices.has(index)}
          >
            <span className="text-[var(--secondary)] font-bold">
              {openIndices.has(index) ? '[-]' : '[+]'} {item.title}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndices.has(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 border-t border-[var(--muted)]">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default CollapsibleSection;
