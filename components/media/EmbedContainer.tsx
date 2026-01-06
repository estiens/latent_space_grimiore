import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BBSHeader } from '@/components/shared/BBSHeader';
import { StatusIndicator } from '@/components/shared/StatusIndicator';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type AspectRatio = '16:9' | '4:3' | '1:1' | 'auto';

interface EmbedContainerProps {
  src: string;
  title: string;
  aspectRatio?: AspectRatio;
  allowFullscreen?: boolean;
  sandbox?: string;
  lazyLoad?: boolean;
  crtOverlay?: boolean;
  className?: string;
}

// Parse domain from URL for display
const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname.toUpperCase();
  } catch {
    return 'EXTERNAL';
  }
};

const aspectRatioClasses: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  'auto': ''
};

export const EmbedContainer = ({
  src,
  title,
  aspectRatio = '16:9',
  allowFullscreen = true,
  sandbox = 'allow-scripts allow-same-origin allow-popups',
  lazyLoad = true,
  crtOverlay = false,
  className
}: EmbedContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!lazyLoad);

  const { ref, isInView } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  // Lazy load when in view
  React.useEffect(() => {
    if (lazyLoad && isInView) {
      setIsLoaded(true);
    }
  }, [lazyLoad, isInView]);

  const domain = getDomain(src);

  return (
    <motion.div
      ref={ref}
      className={cn(
        'border border-[var(--muted)] bg-[rgba(0,0,0,0.5)]',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <BBSHeader
        title={`EMBED.SYS // ${domain}`}
        status={isLoading ? 'LOADING' : hasError ? 'ERROR' : 'ACTIVE'}
      />

      {/* Embed container */}
      <div className={cn(
        'relative overflow-hidden bg-[var(--background)]',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
        aspectRatio === 'auto' && 'min-h-[300px]'
      )}>
        {/* Loading placeholder */}
        {(isLoading || !isLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center noise-overlay">
            <div className="text-center">
              <div className="text-[var(--chart-1)] animate-pulse">
                {isLoaded ? 'CONNECTING' : 'WAITING'}<span className="dot-loader" />
              </div>
              <div className="text-xs text-[var(--muted-foreground)] mt-2">
                {src.substring(0, 50)}...
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[var(--destructive)]">// CONNECTION_FAILED //</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-2">
                Unable to load external content
              </div>
            </div>
          </div>
        )}

        {/* Iframe */}
        {isLoaded && (
          <iframe
            src={src}
            title={title}
            sandbox={sandbox}
            allowFullScreen={allowFullscreen}
            className={cn(
              'absolute inset-0 w-full h-full',
              isLoading && 'opacity-0'
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}

        {/* CRT overlay */}
        {crtOverlay && !hasError && <div className="crt-overlay" />}
      </div>

      {/* Info footer */}
      <div className="p-2 border-t border-[var(--muted)] flex justify-between items-center text-xs">
        <span className="text-[var(--foreground)] truncate">{title}</span>
        <StatusIndicator
          status={hasError ? 'error' : isLoading ? 'loading' : 'online'}
          label={hasError ? 'ERR' : isLoading ? 'SYNC' : 'OK'}
        />
      </div>
    </motion.div>
  );
};

// Specialized embeds
interface SpotifyEmbedProps {
  uri: string; // e.g., "track/4iV5W9uYEdYUVa79Axb7Rh" or full URL
  type?: 'track' | 'album' | 'playlist' | 'artist';
  compact?: boolean;
  className?: string;
}

export const SpotifyEmbed = ({
  uri,
  type = 'track',
  compact = false,
  className
}: SpotifyEmbedProps) => {
  // Extract ID from URI if needed
  const id = uri.includes('/') ? uri.split('/').pop() : uri;
  const src = `https://open.spotify.com/embed/${type}/${id}?theme=0`;

  return (
    <EmbedContainer
      src={src}
      title={`Spotify ${type}`}
      aspectRatio={compact ? '1:1' : '16:9'}
      sandbox="allow-scripts allow-same-origin allow-popups"
      className={className}
    />
  );
};

// Bandcamp embed
interface BandcampEmbedProps {
  albumId: string;
  trackId?: string;
  size?: 'small' | 'large';
  className?: string;
}

export const BandcampEmbed = ({
  albumId,
  trackId,
  size = 'large',
  className
}: BandcampEmbedProps) => {
  const height = size === 'large' ? '470' : '120';
  const src = trackId
    ? `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=${size}/track=${trackId}/`
    : `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=${size}/`;

  return (
    <div className={cn('border border-[var(--muted)]', className)}>
      <BBSHeader title="BANDCAMP.SYS" status="ACTIVE" />
      <iframe
        src={src}
        seamless
        className="w-full border-0"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

// SoundCloud embed
interface SoundCloudEmbedProps {
  url: string;
  visual?: boolean;
  className?: string;
}

export const SoundCloudEmbed = ({
  url,
  visual = true,
  className
}: SoundCloudEmbedProps) => {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff00ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=${visual}`;

  return (
    <EmbedContainer
      src={src}
      title="SoundCloud"
      aspectRatio={visual ? '16:9' : 'auto'}
      className={className}
    />
  );
};

export default EmbedContainer;
