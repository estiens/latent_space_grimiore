import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface YouTubeHoverPreviewProps {
  videoId: string;
  title?: string;
}

export const YouTubeHoverPreview: React.FC<YouTubeHoverPreviewProps> = ({
  videoId,
  title,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Extract YouTube ID from various formats
  const extractYouTubeId = (input: string): string => {
    if (!input) return '';

    // Already just an ID
    if (input.length === 11 && !input.includes('/') && !input.includes('?')) {
      return input;
    }

    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return input; // Return as-is if no pattern matches
  };

  const extractedId = extractYouTubeId(videoId);
  const thumbnailUrl = `https://img.youtube.com/vi/${extractedId}/mqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${extractedId}`;

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // Capture button position
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
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

  // Calculate preview position
  const previewStyle = buttonRect
    ? {
        position: 'fixed' as const,
        top: `${buttonRect.top - 280}px`, // 280px is approximately the height of the preview
        left: `${Math.max(10, buttonRect.left - 384 + buttonRect.width)}px`, // Align right edge with some margin
        width: '384px',
      }
    : {};

  return (
    <>
      {/* Thumbnail button */}
      <button
        ref={buttonRef}
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

      {/* Hover video preview - rendered as portal */}
      {showVideo && extractedId && buttonRect && createPortal(
        <div
          style={previewStyle}
          className="z-[9999] shadow-2xl animate-in fade-in duration-200"
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
                src={`https://www.youtube.com/embed/${extractedId}?autoplay=1&mute=1&modestbranding=1&rel=0`}
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
        </div>,
        document.body
      )}
    </>
  );
};
