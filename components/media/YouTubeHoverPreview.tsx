import { useState, useRef } from 'react';

interface YouTubeHoverPreviewProps {
  videoId: string;
  title?: string;
}

export const YouTubeHoverPreview: React.FC<YouTubeHoverPreviewProps> = ({
  videoId,
  title,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // Small delay before showing video to prevent flicker
    hoverTimeoutRef.current = setTimeout(() => {
      setShowVideo(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // Delay hiding to allow smooth transitions
    hideTimeoutRef.current = setTimeout(() => {
      setShowVideo(false);
    }, 150);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative inline-block">
      {/* Thumbnail button */}
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative w-16 h-12 overflow-hidden border border-[var(--muted)] hover:border-[var(--primary)] transition-all cursor-pointer"
        title={title || 'Watch on YouTube'}
      >
        <img
          src={thumbnailUrl}
          alt={title || 'YouTube video'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
          <svg
            className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 transition-all"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        {/* YouTube badge */}
        <div className="absolute bottom-0.5 right-0.5 bg-red-600 text-white text-[8px] px-1 leading-tight">
          YT
        </div>
      </button>

      {/* Hover video preview */}
      {showVideo && (
        <div
          className="absolute z-50 bottom-full left-0 mb-2 w-64 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="border-2 border-[var(--primary)] bg-black">
            {/* Header */}
            <div className="px-2 py-1 bg-[var(--primary)] text-[var(--background)] text-xs truncate">
              {title || 'YouTube'}
            </div>
            {/* Video */}
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                title={title || 'YouTube preview'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            {/* Footer hint */}
            <div className="px-2 py-1 text-[10px] text-[var(--muted-foreground)] text-center border-t border-[var(--muted)]">
              Click thumbnail to open YouTube
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
