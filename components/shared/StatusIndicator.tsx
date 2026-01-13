import { cn } from '@/lib/utils';
import { colors } from '@/lib/styleUtils';

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
      dotColor: colors.neon.green,
      icon: '●', // Filled circle
      ariaLabel: 'System online'
    },
    warning: {
      class: 'status-warning',
      defaultLabel: 'WARNING',
      dotColor: colors.neon.yellow,
      icon: '▲', // Triangle
      ariaLabel: 'System warning'
    },
    error: {
      class: 'status-error',
      defaultLabel: 'ERROR',
      dotColor: colors.neon.red,
      icon: '✕', // X mark
      ariaLabel: 'System error'
    },
    loading: {
      class: 'text-[var(--chart-3)] animate-pulse',
      defaultLabel: 'LOADING',
      dotColor: 'var(--chart-3)',
      icon: '◌', // Open circle
      ariaLabel: 'System loading'
    },
    offline: {
      class: 'text-[var(--muted-foreground)]',
      defaultLabel: 'OFFLINE',
      dotColor: 'var(--muted-foreground)',
      icon: '○', // Empty circle
      ariaLabel: 'System offline'
    }
  };

  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <span
      className={cn('text-xs flex items-center gap-1.5', config.class, className)}
      role="status"
      aria-label={config.ariaLabel}
    >
      {showDot && (
        <span
          className={cn(
            'inline-flex items-center justify-center w-3 h-3 text-3xs font-bold',
            status === 'loading' && 'animate-pulse',
            status === 'warning' && 'animate-pulse',
            status === 'error' && 'animate-pulse'
          )}
          style={{ color: config.dotColor }}
          aria-hidden="true"
        >
          {config.icon}
        </span>
      )}
      {displayLabel}
    </span>
  );
};

export default StatusIndicator;
