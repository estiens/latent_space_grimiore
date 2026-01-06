import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ASCIIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  active?: boolean;
}

export const ASCIIButton = ({
  label,
  variant = 'primary',
  active = false,
  className,
  disabled,
  ...props
}: ASCIIButtonProps) => {
  const variantClasses = {
    primary: 'border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]',
    secondary: 'border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]',
    danger: 'border-[var(--destructive)] hover:bg-[var(--destructive)] hover:text-white',
    ghost: 'border-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
  };

  return (
    <button
      className={cn(
        'media-btn font-mono transition-all',
        variantClasses[variant],
        active && 'bg-[var(--primary)] text-[var(--primary-foreground)]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      [{label}]
    </button>
  );
};

export default ASCIIButton;
