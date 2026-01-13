import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BBSHeader } from '@/components/shared/BBSHeader';
import { StatusIndicator } from '@/components/shared/StatusIndicator';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type VideoType = 'local' | 'youtube' | 'vimeo';
type AspectRatio = '16:9' | '4:3' | '1:1';

interface VideoPreviewProps {
  src: string;
  type?: VideoType;
  poster?: string;
  title?: string;
  duration?: string;
  autoplayOnHover?: boolean;
  autoplayInView?: boolean;
  showControls?: boolean;
  crtOverlay?: boolean;
  aspectRatio?: AspectRatio;
  className?: string;
  onClick?: () => void;
}

// Extract YouTube video ID (handles full URLs or raw video IDs)
const getYoutubeId = (url: string): string | null => {
  // If it looks like a raw video ID (11 chars, alphanumeric + _ -), return as-is
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
};

// Extract Vimeo video ID (handles full URLs or raw video IDs)
const getVimeoId = (url: string): string | null => {
  // If it's just digits, treat as raw Vimeo ID
  if (/^\d+$/.test(url)) {
    return url;
  }
  const match = url.match(/(?:vimeo\.com\/)(\d+)/);
  return match ? match[1] : null;
};

// Get filename from path
const getFilename = (src: string): string => {
  const parts = src.split('/');
  return parts[parts.length - 1]?.toUpperCase() || 'VIDEO.MP4';
};

const aspectRatioClasses: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square'
};

export const VideoPreview = ({
  src,
  type = 'local',
  poster,
  title,
  duration,
  autoplayOnHover = true,
  autoplayInView = false,
  showControls = false,
  crtOverlay = true,
  aspectRatio = '16:9',
  className,
  onClick
}: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { ref: inViewRef, isInView } = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: false
  });

  const displayTitle = title || (type === 'local' ? getFilename(src) : 'VIDEO');

  // Handle autoplay on hover for local videos
  useEffect(() => {
    if (type !== 'local' || !videoRef.current) return;

    if (autoplayOnHover && isHovered) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else if (autoplayOnHover && !isHovered) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isHovered, autoplayOnHover, type]);

  // Handle autoplay in viewport for local videos
  useEffect(() => {
    if (type !== 'local' || !videoRef.current || !autoplayInView) return;

    if (isInView) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView, autoplayInView, type]);

  // Render YouTube embed
  const renderYoutubeEmbed = () => {
    const videoId = getYoutubeId(src);
    if (!videoId) return <div className="text-[var(--destructive)]">Invalid YouTube URL</div>;

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`}
        title={displayTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    );
  };

  // Render Vimeo embed
  const renderVimeoEmbed = () => {
    const videoId = getVimeoId(src);
    if (!videoId) return <div className="text-[var(--destructive)]">Invalid Vimeo URL</div>;

    return (
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
        title={displayTitle}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    );
  };

  // Render local video
  const renderLocalVideo = () => (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls={showControls && isPlaying}
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />

      {/* Play overlay */}
      <AnimatePresence>
        {!isPlaying && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="video-play-overlay"
            onClick={onClick}
          >
            <span className="video-play-btn">[▶]</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <motion.div
      ref={inViewRef}
      className={cn(
        'border border-[var(--muted)] hover:border-[var(--primary)] transition-colors',
        'bg-[var(--overlay-medium)]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
    >
      <BBSHeader
        title="VIDEO_FEED.SYS"
        status={isLoading ? 'LOADING' : hasError ? 'ERROR' : isPlaying ? 'ACTIVE' : 'READY'}
      />

      {/* Video container */}
      <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio])}>
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)] noise-overlay">
            <div className="text-[var(--chart-1)] animate-pulse">
              BUFFERING<span className="dot-loader" />
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]">
            <div className="text-center">
              <div className="text-[var(--destructive)]">// PLAYBACK_ERROR //</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1">
                Unable to load video
              </div>
            </div>
          </div>
        )}

        {/* Video content based on type */}
        {type === 'local' && renderLocalVideo()}
        {type === 'youtube' && renderYoutubeEmbed()}
        {type === 'vimeo' && renderVimeoEmbed()}

        {/* CRT scanline overlay */}
        {crtOverlay && <div className="crt-overlay" />}

        {/* Glitch effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute inset-0 glitch" style={{ mixBlendMode: 'overlay' }} />
          </div>
        )}
      </div>

      {/* Info footer */}
      <div className="p-2 border-t border-[var(--muted)] flex justify-between items-center text-xs">
        <span className="text-[var(--foreground)] truncate">{displayTitle}</span>
        <div className="flex items-center gap-3 shrink-0">
          {duration && (
            <span className="text-[var(--muted-foreground)]">DUR: {duration}</span>
          )}
          <StatusIndicator
            status={hasError ? 'error' : isPlaying ? 'online' : 'offline'}
            label={hasError ? 'ERR' : isPlaying ? 'PLAY' : 'STOP'}
            showDot
          />
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPreview;
