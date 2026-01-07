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

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!showVideo && buttonRef.current) {
      // Opening - capture position
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }

    setShowVideo(!showVideo);
  };

  const handleOpenYouTube = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  // Calculate preview position
  const previewWidth = 480;
  const previewHeight = 320;
  const previewStyle = buttonRect
    ? {
        position: 'fixed' as const,
        top: `${Math.max(10, buttonRect.top - previewHeight - 10)}px`, // Position above with margin, ensure visible
        left: `${Math.max(10, Math.min(window.innerWidth - previewWidth - 10, buttonRect.left - previewWidth + buttonRect.width))}px`, // Smart positioning
        width: `${previewWidth}px`,
      }
    : {};

  return (
    <>
      {/* Thumbnail button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`group relative w-16 h-12 overflow-hidden border transition-all cursor-pointer ${
          showVideo ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]' : 'border-[var(--muted)] hover:border-[var(--primary)]'
        }`}
        title={showVideo ? 'Click to close' : (title || 'Click to watch')}
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

      {/* Video preview - rendered as portal */}
      {showVideo && extractedId && buttonRect && createPortal(
        <div
          style={previewStyle}
          className="z-[9999] shadow-2xl animate-in fade-in duration-200"
        >
          <div className="border-2 border-[var(--primary)] bg-black">
            {/* Header with close button */}
            <div className="px-2 py-1 bg-[var(--primary)] text-[var(--background)] text-xs flex justify-between items-center">
              <span className="truncate">{title || 'YouTube'}</span>
              <button
                onClick={handleToggle}
                className="ml-2 hover:text-black transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>
            {/* Video */}
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${extractedId}?autoplay=1&rel=0&modestbranding=1`}
                title={title || 'YouTube preview'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            {/* Footer hint */}
            <div className="px-2 py-1 text-[10px] text-[var(--muted-foreground)] text-center border-t border-[var(--muted)] flex justify-between items-center">
              <span>Playing • Click X to close</span>
              <button
                onClick={handleOpenYouTube}
                className="text-[var(--chart-1)] hover:text-[var(--primary)] transition-colors"
                title="Open in YouTube"
              >
                Open YouTube →
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
