import React, { useState } from 'react';

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

  // Extract ID from various URI formats
  const extractId = (input: string): string => {
    // Handle spotify:type:id format
    if (input.startsWith('spotify:')) {
      const parts = input.split(':');
      return parts[parts.length - 1];
    }
    // Handle URL format
    const match = input.match(/spotify\.com\/(?:embed\/)?(?:track|album|playlist|artist)\/([a-zA-Z0-9]+)/);
    return match ? match[1] : input;
  };

  const spotifyId = extractId(uri);
  const spotifyUrl = `https://open.spotify.com/${type}/${spotifyId}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleMouseEnter = () => setShowEmbed(true);
  const handleMouseLeave = () => setShowEmbed(false);

  return (
    <div className="relative inline-block">
      {/* Compact button */}
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex items-center gap-1.5 px-2 py-1 border border-[var(--muted)] hover:border-[#1DB954] bg-black/50 hover:bg-black transition-all cursor-pointer"
        title={title || 'Listen on Spotify'}
      >
        {/* Spotify icon */}
        <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-[10px] text-[var(--muted-foreground)] group-hover:text-[#1DB954] uppercase">
          {type}
        </span>
      </button>

      {/* Hover embed preview */}
      {showEmbed && spotifyId && (
        <div
          className="absolute z-[9999] bottom-full right-0 mb-2 w-80 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="border-2 border-[#1DB954] bg-black">
            <iframe
              src={`https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height={type === 'track' ? '80' : '152'}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block"
            />
            <div className="px-2 py-1 text-[10px] text-[var(--muted-foreground)] text-center border-t border-[var(--muted)]">
              Click button to open Spotify
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
