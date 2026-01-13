import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BBSHeader } from '@/components/shared/BBSHeader';

interface LinkPreviewProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  siteName?: string;
  variant?: 'compact' | 'card';
  className?: string;
  onClick?: () => void;
}

// Convert URL to DOS-style path
const urlToDosPath = (url: string): string => {
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname.replace(/\./g, '_').toUpperCase();
    const path = parsed.pathname.replace(/\//g, '\\').toUpperCase();
    return `C:\\NET\\${domain}${path || '\\'}`;
  } catch {
    return 'C:\\NET\\UNKNOWN';
  }
};

export const LinkPreview = ({
  url,
  title,
  description,
  image,
  siteName,
  variant = 'card',
  className,
  onClick
}: LinkPreviewProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Compact variant - inline link style
  if (variant === 'compact') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center gap-2 px-2 py-1',
          'border border-[var(--muted)] hover:border-[var(--primary)]',
          'bg-[var(--overlay-light)] transition-all',
          'text-[var(--chart-1)] hover:text-[var(--primary)]',
          'chromatic-shift',
          className
        )}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <span className="text-xs text-[var(--muted-foreground)]">[LINK]</span>
        <span className="truncate max-w-[200px]">{title}</span>
        <span className="text-xs text-[var(--muted-foreground)]">→</span>
      </a>
    );
  }

  // Card variant - full preview
  return (
    <motion.div
      whileHover={{ x: 2 }}
      className={cn(
        'link-preview-card border border-[var(--muted)] bg-[var(--overlay-light)]',
        'cursor-pointer',
        className
      )}
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <BBSHeader
        title="EXTERNAL_LINK.SYS"
        status="READY"
      />

      <div className="p-4">
        <div className="flex gap-4">
          {/* Image preview */}
          {image && (
            <div className="shrink-0 w-20 h-20 border border-[var(--muted)] overflow-hidden">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover media-image-preview"
                loading="lazy"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {siteName && (
              <div className="text-xs text-[var(--muted-foreground)] mb-1">
                {siteName.toUpperCase()}
              </div>
            )}
            <h3 className="link-preview-title font-bold text-[var(--chart-1)] truncate mb-1">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* URL Footer */}
        <div className="mt-3 pt-3 border-t border-dashed border-[var(--muted)]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--muted-foreground)] font-mono truncate">
              {urlToDosPath(url)}
            </span>
            <span className="text-[var(--primary)] shrink-0 ml-2">
              [ OPEN_LINK ]
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Simple external link component
interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const ExternalLink = ({ href, children, className }: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'text-[var(--chart-1)] hover:text-[var(--primary)]',
      'chromatic-shift underline underline-offset-2',
      className
    )}
  >
    {children}
    <span className="text-xs ml-1 text-[var(--muted-foreground)]">↗</span>
  </a>
);

export default LinkPreview;
