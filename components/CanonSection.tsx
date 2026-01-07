import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoPreview,
  ImageViewer,
  SpotifyEmbed,
  BandcampEmbed,
  SoundCloudEmbed,
  LinkPreview,
  YouTubeHoverPreview,
  SpotifyCompact,
} from '@/components';
import type { SymbolAnnotation, SymbolCategory, MediaEmbed } from '@/types/annotations';

interface CanonSectionProps {
  symbols: SymbolAnnotation[];
  defaultCategory?: SymbolCategory;
  showCategoryTabs?: boolean;
}

type TabMode = 'all' | SymbolCategory;

export const CanonSection: React.FC<CanonSectionProps> = ({
  symbols,
  defaultCategory,
  showCategoryTabs = true,
}) => {
  const [activeTab, setActiveTab] = useState<TabMode>(defaultCategory || 'all');
  const [expandedSymbol, setExpandedSymbol] = useState<string | null>(null);

  // Group symbols by category - memoized to avoid recalculation on every render
  const symbolsByCategory = useMemo(() => {
    return symbols.reduce((acc, symbol) => {
      if (!acc[symbol.category]) {
        acc[symbol.category] = [];
      }
      acc[symbol.category].push(symbol);
      return acc;
    }, {} as Record<SymbolCategory, SymbolAnnotation[]>);
  }, [symbols]);

  const filteredSymbols = activeTab === 'all'
    ? symbols
    : symbolsByCategory[activeTab] || [];

  const categoryLabels: Record<SymbolCategory, string> = {
    'music': '♪ MUSIC',
    'literature': '📖 LITERATURE',
    'film': '▶ FILM',
    'visual-art': '⬛ VISUAL ART',
    'strange-sources': '⚡ STRANGE SOURCES',
  };

  const categoryCount = (cat: SymbolCategory) => symbolsByCategory[cat]?.length || 0;

  return (
    <div className="space-y-4">
      {/* Category Tabs - BBS Style */}
      {showCategoryTabs && (
        <div className="border-2 border-[var(--primary)] bg-[rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap gap-0 border-b-2 border-[var(--primary)]">
            <button
              onClick={() => setActiveTab('all')}
              className={`
                px-4 py-2 text-sm font-bold transition-all border-r-2 border-[var(--primary)]
                ${activeTab === 'all'
                  ? 'bg-[var(--primary)] text-[var(--background)] animate-pulse-subtle'
                  : 'hover:bg-[rgba(255,0,255,0.1)]'
                }
              `}
            >
              [ALL] ({symbols.length})
            </button>
            {(Object.keys(categoryLabels) as SymbolCategory[]).map((cat) => (
              categoryCount(cat) > 0 && (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`
                    px-4 py-2 text-sm font-bold transition-all border-r-2 border-[var(--primary)]
                    ${activeTab === cat
                      ? 'bg-[var(--primary)] text-[var(--background)] animate-pulse-subtle'
                      : 'hover:bg-[rgba(255,0,255,0.1)]'
                    }
                  `}
                >
                  {categoryLabels[cat]} ({categoryCount(cat)})
                </button>
              )
            ))}
          </div>

          {/* Status Bar */}
          <div className="px-4 py-2 text-xs flex justify-between items-center bg-[rgba(0,0,0,0.3)]">
            <span className="text-[var(--muted-foreground)]">
              MODE: <span className="text-[var(--secondary)]">{activeTab.toUpperCase()}</span>
            </span>
            <span className="status-online">CANON_LOADED</span>
          </div>
        </div>
      )}

      {/* Symbols Display */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredSymbols.map((symbol) => (
            <SymbolCard
              key={symbol.id}
              symbol={symbol}
              isExpanded={expandedSymbol === symbol.id}
              onToggleExpand={() =>
                setExpandedSymbol(expandedSymbol === symbol.id ? null : symbol.id)
              }
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredSymbols.length === 0 && (
        <div className="border border-[var(--muted)] p-8 text-center">
          <p className="text-[var(--muted-foreground)] text-sm">
            [NO SYMBOLS FOUND IN THIS CATEGORY]
          </p>
        </div>
      )}
    </div>
  );
};

// Compact inline embed renderer - shows small buttons/thumbnails
const CompactEmbedButton: React.FC<{ embed: MediaEmbed }> = ({ embed }) => {
  switch (embed.type) {
    case 'youtube':
      return (
        <YouTubeHoverPreview
          videoId={embed.embedId || embed.url || ''}
          title={embed.title}
        />
      );

    case 'spotify':
      return (
        <SpotifyCompact
          uri={embed.embedId || embed.url || ''}
          type={embed.spotifyType || 'track'}
          title={embed.title}
        />
      );

    case 'bandcamp':
      return (
        <a
          href={embed.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-2 py-1 border border-[var(--muted)] hover:border-[#1DA0C3] bg-black/50 hover:bg-black transition-all"
          title={embed.title || 'Listen on Bandcamp'}
        >
          <svg className="w-4 h-4 text-[#1DA0C3]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
          </svg>
          <span className="text-[10px] text-[var(--muted-foreground)] uppercase">BC</span>
        </a>
      );

    case 'soundcloud':
      return (
        <a
          href={embed.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-2 py-1 border border-[var(--muted)] hover:border-[#ff5500] bg-black/50 hover:bg-black transition-all"
          title={embed.title || 'Listen on SoundCloud'}
        >
          <svg className="w-4 h-4 text-[#ff5500]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.098-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.19-1.308-.19-1.334c-.01-.057-.044-.09-.09-.09zm1.83-1.229c-.06 0-.12.037-.12.1l-.21 2.563.225 2.458c0 .06.045.105.105.105.074 0 .12-.045.12-.105l.24-2.458-.24-2.563c0-.06-.045-.1-.12-.1zm.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.135.149.135.075 0 .135-.06.15-.135l.225-2.544-.225-2.64c-.015-.075-.074-.135-.15-.135zm.964-.039c-.09 0-.165.075-.165.165l-.18 2.715.195 2.625c0 .09.075.165.165.165.089 0 .165-.075.165-.165l.21-2.625-.21-2.715c0-.09-.075-.165-.165-.165zm1.016-.06c-.104 0-.179.074-.194.179l-.165 2.775.18 2.685c.014.104.09.179.194.179.09 0 .164-.074.179-.179l.195-2.685-.195-2.775c-.015-.105-.09-.179-.179-.179zm.989-.045c-.105 0-.194.09-.21.195l-.149 2.82.164 2.73c.015.12.105.21.21.21.119 0 .194-.09.21-.21l.18-2.73-.18-2.82c-.015-.105-.09-.195-.21-.195zm1.035.18c-.12 0-.225.105-.225.225l-.135 2.685.15 2.7c0 .135.105.225.225.225.135 0 .24-.09.24-.225l.165-2.7-.165-2.685c0-.135-.105-.225-.24-.225zm.99-.615c-.135 0-.24.105-.255.24l-.12 3.255.135 2.715c.015.135.12.24.255.24.12 0 .24-.105.255-.24l.149-2.715-.149-3.255c-.015-.135-.135-.24-.255-.24zm1.049.15c-.15 0-.27.12-.27.27l-.12 3.075.135 2.715c0 .165.12.285.27.285.165 0 .285-.12.285-.285l.15-2.715-.15-3.075c0-.15-.12-.27-.285-.27zm1.05-.195c-.165 0-.3.135-.3.3l-.12 3.225.12 2.73c0 .165.135.3.3.3.15 0 .3-.135.315-.3l.12-2.73-.12-3.225c-.015-.165-.165-.3-.315-.3zm1.064.645c-.15 0-.3.135-.315.3l-.09 2.595.105 2.715c.015.18.165.315.315.315.165 0 .315-.135.315-.315l.12-2.715-.12-2.595c0-.165-.15-.3-.315-.3zm7.74 1.635c-.39 0-.75.105-1.065.285-.165-1.65-1.56-2.955-3.27-2.955-.405 0-.795.075-1.14.195-.135.045-.18.105-.18.21v5.97c0 .105.075.195.165.21.015 0 5.49.015 5.49.015 1.095 0 1.98-.885 1.98-1.98s-.885-1.95-1.98-1.95z"/>
          </svg>
          <span className="text-[10px] text-[var(--muted-foreground)] uppercase">SC</span>
        </a>
      );

    case 'link':
    case 'book':
    case 'article':
      return (
        <a
          href={embed.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-2 py-1 border border-[var(--muted)] hover:border-[var(--secondary)] bg-black/50 hover:bg-black transition-all"
          title={embed.title || 'View resource'}
        >
          <svg className="w-4 h-4 text-[var(--secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span className="text-[10px] text-[var(--muted-foreground)] uppercase">
            {embed.type === 'book' ? 'BOOK' : embed.type === 'article' ? 'READ' : 'LINK'}
          </span>
        </a>
      );

    default:
      return null;
  }
};

// Individual Symbol Card Component
interface SymbolCardProps {
  symbol: SymbolAnnotation;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ symbol, isExpanded, onToggleExpand }) => {
  const hasDeepDive = symbol.deepDive && (symbol.deepDive.analysis || (symbol.deepDive.quotes && symbol.deepDive.quotes.length > 0));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="border-2 border-[var(--muted)] hover:border-[var(--primary)] transition-all bg-[rgba(0,0,0,0.3)] neon-border-subtle"
    >
      {/* Header - Always Visible */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-bold text-[var(--foreground)]">
                {symbol.title}
              </h4>
              <span className="text-xs px-1.5 py-0.5 border border-[var(--chart-1)] text-[var(--chart-1)]">
                {symbol.category.toUpperCase().replace('-', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-[var(--chart-2)]">{symbol.artist}</span>
              {symbol.year && (
                <span className="text-xs text-[var(--muted-foreground)]">[{symbol.year}]</span>
              )}
            </div>
          </div>

          {/* Inline Embeds - Always visible */}
          {symbol.embeds.length > 0 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {symbol.embeds.map((embed, idx) => (
                <CompactEmbedButton key={idx} embed={embed} />
              ))}
            </div>
          )}
        </div>

        {/* Description preview */}
        <p className="text-sm text-[var(--muted-foreground)] mt-2 line-clamp-2">
          {symbol.description}
        </p>

        {/* Expand button for deep dive */}
        {hasDeepDive && (
          <button
            onClick={onToggleExpand}
            className="mt-2 text-xs text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
          >
            {isExpanded ? '[-] HIDE DEEP DIVE' : '[+] DEEP DIVE'}
          </button>
        )}
      </div>

      {/* Expanded Content - Deep Dive Only */}
      <AnimatePresence>
        {isExpanded && hasDeepDive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t-2 border-[var(--muted)] overflow-hidden"
          >
            <div className="p-3 space-y-3">
              {/* Deep Dive Content */}
              {symbol.deepDive && (
                <>
                  <div className="flex items-center gap-2 text-xs text-[var(--chart-2)]">
                    <span className="font-bold">[DEEP_DIVE.TXT]</span>
                  </div>

                  {symbol.deepDive.analysis && (
                    <div className="border-l-2 border-[var(--chart-1)] pl-3 bg-[rgba(0,0,0,0.3)] p-2">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {symbol.deepDive.analysis}
                      </p>
                    </div>
                  )}

                  {symbol.deepDive.quotes && symbol.deepDive.quotes.length > 0 && (
                    <div className="space-y-2">
                      {symbol.deepDive.quotes.map((quote, idx) => (
                        <blockquote
                          key={idx}
                          className="border-l-2 border-[var(--chart-3)] pl-3 text-sm italic"
                        >
                          "{quote.text}"
                          {quote.source && (
                            <cite className="block text-xs text-[var(--muted-foreground)] mt-1 not-italic">
                              — {quote.source}
                            </cite>
                          )}
                        </blockquote>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Metadata Tags */}
              <div className="flex flex-wrap gap-1.5 text-xs pt-2 border-t border-[var(--muted)]">
                {symbol.convergencePoints && symbol.convergencePoints.map((cp) => (
                  <span
                    key={cp}
                    className="px-1.5 py-0.5 border border-[var(--chart-1)] text-[var(--chart-1)]"
                  >
                    CP {cp}
                  </span>
                ))}
                {symbol.voices && symbol.voices.map((voice) => (
                  <span
                    key={voice}
                    className="px-1.5 py-0.5 border border-[var(--chart-2)] text-[var(--chart-2)]"
                  >
                    {voice.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Full Media Embed Renderer - kept for other uses
interface MediaEmbedRendererProps {
  embed: SymbolAnnotation['embeds'][0];
}

const MediaEmbedRenderer: React.FC<MediaEmbedRendererProps> = ({ embed }) => {
  switch (embed.type) {
    case 'spotify':
      return (
        <SpotifyEmbed
          uri={embed.embedId || embed.url || ''}
          type={embed.spotifyType || 'track'}
          compact={false}
        />
      );

    case 'bandcamp':
      return (
        <BandcampEmbed
          albumId={embed.bandcampAlbumId || undefined}
          trackId={embed.bandcampTrackId || undefined}
          size="large"
        />
      );

    case 'soundcloud':
      return <SoundCloudEmbed url={embed.url || ''} visual={true} />;

    case 'youtube':
      return (
        <VideoPreview
          src={embed.embedId || embed.url || ''}
          type="youtube"
          title={embed.title}
          duration={embed.duration}
          showControls={true}
          crtOverlay={true}
          aspectRatio={embed.aspectRatio || '16:9'}
        />
      );

    case 'vimeo':
      return (
        <VideoPreview
          src={embed.embedId || embed.url || ''}
          type="vimeo"
          title={embed.title}
          showControls={true}
          crtOverlay={true}
          aspectRatio={embed.aspectRatio || '16:9'}
        />
      );

    case 'local-video':
      return (
        <VideoPreview
          src={embed.url || ''}
          type="local"
          title={embed.title}
          poster={embed.thumbnail}
          showControls={true}
          crtOverlay={true}
          aspectRatio={embed.aspectRatio || '16:9'}
        />
      );

    case 'image':
      return (
        <ImageViewer
          src={embed.url || ''}
          alt={embed.title || 'Symbol image'}
          title={embed.title}
          caption={embed.description}
          zoomable={true}
          crtOverlay={true}
        />
      );

    case 'link':
    case 'book':
    case 'article':
      return (
        <LinkPreview
          url={embed.url || ''}
          title={embed.title || 'External Resource'}
          description={embed.description}
          image={embed.thumbnail}
          variant="card"
        />
      );

    default:
      return (
        <div className="border border-[var(--muted)] p-4 text-center">
          <p className="text-[var(--muted-foreground)] text-sm">
            [UNSUPPORTED MEDIA TYPE: {embed.type}]
          </p>
        </div>
      );
  }
};

export { MediaEmbedRenderer };
