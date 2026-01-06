import React from 'react';
import { cn } from '@/lib/utils';

type BlockquoteVariant = 'standard' | 'terminal' | 'redacted' | 'mystic';

interface BBSBlockquoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
  variant?: BlockquoteVariant;
  className?: string;
}

export const BBSBlockquote = ({
  children,
  author,
  source,
  variant = 'standard',
  className
}: BBSBlockquoteProps) => {
  const variantClasses: Record<BlockquoteVariant, string> = {
    standard: 'border-l-4 border-[var(--chart-2)] bg-[rgba(255,0,255,0.05)]',
    terminal: 'border-l-4 border-[#00ff00] bg-[rgba(0,0,0,0.5)] text-[#00ff00]',
    redacted: 'border-l-4 border-[var(--destructive)] bg-[rgba(255,0,0,0.05)]',
    mystic: 'border-l-4 border-[var(--chart-4)] bg-[rgba(0,100,255,0.05)]'
  };

  const quoteMarker = {
    standard: '»',
    terminal: '>',
    redacted: '█',
    mystic: '✧'
  }[variant];

  return (
    <blockquote
      className={cn(
        'pl-4 py-3 pr-3 my-4',
        variantClasses[variant],
        className
      )}
    >
      <div className="relative">
        {/* Quote marker */}
        <span className="absolute -left-3 top-0 text-[var(--muted-foreground)] opacity-50">
          {quoteMarker}
        </span>

        {/* Quote content */}
        <div className={cn(
          'text-lg italic',
          variant === 'terminal' && 'font-mono not-italic',
          variant === 'redacted' && 'glitch-hover'
        )}>
          {variant === 'terminal' ? (
            <span className="before:content-['$_'] before:text-[#00ff00] before:opacity-50">
              {children}
            </span>
          ) : (
            children
          )}
        </div>

        {/* Attribution */}
        {(author || source) && (
          <footer className="mt-3 text-sm text-[var(--muted-foreground)]">
            {author && (
              <cite className="not-italic font-bold text-[var(--foreground)]">
                — {author}
              </cite>
            )}
            {source && (
              <span className="ml-2 text-xs">
                [{source}]
              </span>
            )}
          </footer>
        )}
      </div>
    </blockquote>
  );
};

// Inline quote for shorter quotes
interface InlineQuoteProps {
  children: React.ReactNode;
  className?: string;
}

export const InlineQuote = ({ children, className }: InlineQuoteProps) => (
  <q className={cn(
    'text-[var(--chart-2)] italic',
    'before:content-[\'"\'] after:content-[\'"\']',
    'before:text-[var(--muted-foreground)] after:text-[var(--muted-foreground)]',
    className
  )}>
    {children}
  </q>
);

export default BBSBlockquote;
