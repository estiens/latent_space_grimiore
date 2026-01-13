import { cn } from '@/lib/utils';
import { dynamicWidth } from '@/lib/styleUtils';

type LoaderVariant = 'bar' | 'dots' | 'spinner' | 'text';

interface BBSLoaderProps {
  variant?: LoaderVariant;
  text?: string;
  progress?: number; // 0-100 for determinate progress
  className?: string;
}

export const BBSLoader = ({
  variant = 'bar',
  text = 'LOADING',
  progress,
  className
}: BBSLoaderProps) => {
  // Bar loader (indeterminate or determinate)
  if (variant === 'bar') {
    const isDeterminate = typeof progress === 'number';
    return (
      <div className={cn('space-y-1', className)}>
        {text && (
          <div className="text-xs text-[var(--muted-foreground)]">
            {text}
            {isDeterminate && <span className="ml-2 text-[var(--chart-1)]">{Math.round(progress)}%</span>}
          </div>
        )}
        {isDeterminate ? (
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={dynamicWidth(progress)}
            />
          </div>
        ) : (
          <div className="loading-bar" />
        )}
      </div>
    );
  }

  // Dots loader
  if (variant === 'dots') {
    return (
      <span className={cn('text-[var(--chart-1)]', className)}>
        {text}<span className="dot-loader" />
      </span>
    );
  }

  // ASCII Spinner
  if (variant === 'spinner') {
    return (
      <span className={cn('text-[var(--chart-1)]', className)}>
        {text} <span className="ascii-spinner" />
      </span>
    );
  }

  // Text with blinking cursor
  if (variant === 'text') {
    return (
      <span className={cn('terminal-cursor text-[var(--chart-1)]', className)}>
        {text}
      </span>
    );
  }

  return null;
};

// Skeleton loader for content placeholders
interface BBSSkeletonProps {
  lines?: number;
  className?: string;
}

export const BBSSkeleton = ({ lines = 3, className }: BBSSkeletonProps) => {
  return (
    <div className={cn('space-y-2 animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-[var(--muted)] rounded-none"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
};

export default BBSLoader;
