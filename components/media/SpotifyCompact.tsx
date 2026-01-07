import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface SpotifyCompactProps {
  uri: string;
  type?: 'track' | 'album' | 'playlist' | 'artist';
  title?: string;
}

export const SpotifyCompact: React.FC<SpotifyCompactProps> = ({
  uri,
  type = 'track',
  title,
}) => {
  const [showEmbed, setShowEmbed] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [iframeSrc, setIframeSrc] = useState<string>('');
  const [embedError, setEmbedError] = useState(false);

  // Extract ID from various URI formats
  const extractId = (input: string): string => {
    if (!input) return '';

    // Handle spotify:type:id format
    if (input.startsWith('spotify:')) {
      const parts = input.split(':');
      return parts[parts.length - 1] || '';
    }
    // Handle URL format
    const match = input.match(/spotify\.com\/(?:embed\/)?(?:track|album|playlist|artist)\/([a-zA-Z0-9]+)/);
    if (match && match[1]) return match[1];

    // If it's already just an ID (22 chars alphanumeric)
    if (input.length === 22 && /^[a-zA-Z0-9]+$/.test(input)) {
      return input;
    }

    return input; // Return as-is and let Spotify handle it
  };

  const spotifyId = extractId(uri);
  const isValidId = spotifyId && spotifyId.length > 0;
  const spotifyUrl = `https://open.spotify.com/${type}/${spotifyId}`;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!showEmbed && buttonRef.current) {
      // Opening - capture position and set iframe src
      setButtonRect(buttonRef.current.getBoundingClientRect());
      // Remove query params - Spotify's embed doesn't accept them properly
      setIframeSrc(`https://open.spotify.com/embed/${type}/${spotifyId}`);
      setEmbedError(false);
    }

    setShowEmbed(!showEmbed);
  };

  const handleOpenSpotify = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  // Calculate preview position
  const embedHeight = type === 'track' ? 152 : 352; // Bigger embeds
  const previewWidth = 400;
  const previewStyle = buttonRect
    ? {
        position: 'fixed' as const,
        top: `${Math.max(10, buttonRect.top - embedHeight - 50)}px`, // Position above button with margin
        left: `${Math.max(10, Math.min(window.innerWidth - previewWidth - 10, buttonRect.left - previewWidth + buttonRect.width))}px`, // Smart positioning
        width: `${previewWidth}px`,
      }
    : {};

  // Don't render if no valid ID
  if (!isValidId) {
    return null;
  }

  return (
    <>
      {/* Compact button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`group flex items-center gap-1.5 px-2 py-1 border transition-all cursor-pointer ${
          showEmbed
            ? 'border-[#1DB954] ring-2 ring-[#1DB954] bg-black'
            : 'border-[var(--muted)] hover:border-[#1DB954] bg-black/50 hover:bg-black'
        }`}
        title={showEmbed ? 'Click to close' : (title || 'Click to listen')}
      >
        {/* Spotify icon */}
        <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-[10px] text-[var(--muted-foreground)] group-hover:text-[#1DB954] uppercase">
          {type}
        </span>
      </button>

      {/* Embed preview - rendered as portal */}
      {showEmbed && buttonRect && iframeSrc && createPortal(
        <div
          style={previewStyle}
          className="z-[9999] shadow-2xl animate-in fade-in duration-200"
        >
          <div className="border-2 border-[#1DB954] bg-black">
            {/* Header with close button */}
            <div className="px-2 py-1 bg-[#1DB954] text-black text-xs flex justify-between items-center">
              <span className="truncate font-bold">{title || `Spotify ${type}`}</span>
              <button
                onClick={handleToggle}
                className="ml-2 hover:text-white transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>
            {/* Spotify embed */}
            {!embedError ? (
              <iframe
                src={iframeSrc}
                width="100%"
                height={embedHeight}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block"
                onError={() => setEmbedError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 p-6 bg-black/80" style={{ height: embedHeight }}>
                <div className="text-center">
                  <svg className="w-12 h-12 text-[var(--muted)] mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <p className="text-xs text-[var(--muted-foreground)] mb-3">
                    Spotify embed unavailable
                  </p>
                  <button
                    onClick={handleOpenSpotify}
                    className="px-3 py-1.5 border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-all text-xs"
                  >
                    Search on Spotify →
                  </button>
                </div>
              </div>
            )}
            {/* Footer */}
            <div className="px-2 py-1 text-[10px] text-[var(--muted-foreground)] border-t border-[var(--muted)] flex justify-between items-center">
              <span>{embedError ? 'Embed failed' : 'Playing'} • Click X to close</span>
              <button
                onClick={handleOpenSpotify}
                className="text-[#1DB954] hover:text-[var(--primary)] transition-colors"
                title="Open in Spotify"
              >
                Open Spotify →
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
