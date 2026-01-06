import React from 'react';
import { cn } from '@/lib/utils';

export type BBSStatus = 'READY' | 'LOADING' | 'ERROR' | 'ACTIVE' | 'PAUSED' | 'OFFLINE';

interface BBSHeaderProps {
  title: string;
  status?: BBSStatus;
  showRecIndicator?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export const BBSHeader = ({
  title,
  status = 'READY',
  showRecIndicator = false,
  actions,
  className
}: BBSHeaderProps) => {
  const statusClass = {
    READY: 'text-[#00ff00]',
    LOADING: 'text-[var(--chart-3)] animate-pulse',
    ERROR: 'text-[#ff0000] animate-pulse',
    ACTIVE: 'text-[var(--chart-1)]',
    PAUSED: 'text-[var(--chart-3)]',
    OFFLINE: 'text-[var(--muted-foreground)]'
  }[status];

  return (
    <div
      className={cn(
        "bg-[var(--primary)] text-[var(--primary-foreground)] px-3 py-1.5 flex justify-between items-center",
        className
      )}
    >
      <span className="font-bold text-sm truncate">
        &gt;&gt; {title}
      </span>
      <div className="flex items-center gap-3 text-xs shrink-0">
        {showRecIndicator && (
          <span className="text-[#ff0000] animate-pulse flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff0000]" />
            REC
          </span>
        )}
        {status && (
          <span className={statusClass}>
            [{status}]
          </span>
        )}
        {actions}
      </div>
    </div>
  );
};

export default BBSHeader;
