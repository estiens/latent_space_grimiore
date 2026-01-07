import { cn } from '@/lib/utils';

export type StatusType = 'online' | 'warning' | 'error' | 'loading' | 'offline';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  showDot?: boolean;
  className?: string;
}

export const StatusIndicator = ({
  status,
  label,
  showDot = true,
  className
}: StatusIndicatorProps) => {
  const statusConfig = {
    online: {
      class: 'status-online',
      defaultLabel: 'ONLINE',
      dotColor: '#00ff00'
    },
    warning: {
      class: 'status-warning',
      defaultLabel: 'WARNING',
      dotColor: '#ffff00'
    },
    error: {
      class: 'status-error',
      defaultLabel: 'ERROR',
      dotColor: '#ff0000'
    },
    loading: {
      class: 'text-[var(--chart-3)] animate-pulse',
      defaultLabel: 'LOADING',
      dotColor: 'var(--chart-3)'
    },
    offline: {
      class: 'text-[var(--muted-foreground)]',
      defaultLabel: 'OFFLINE',
      dotColor: 'var(--muted-foreground)'
    }
  };

  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <span className={cn('text-xs flex items-center gap-1.5', config.class, className)}>
      {showDot && (
        <span
          className={cn(
            'inline-block w-2 h-2 rounded-full',
            status === 'loading' && 'animate-pulse',
            status === 'warning' && 'animate-pulse',
            status === 'error' && 'animate-pulse'
          )}
          style={{ backgroundColor: config.dotColor }}
        />
      )}
      {displayLabel}
    </span>
  );
};

export default StatusIndicator;
