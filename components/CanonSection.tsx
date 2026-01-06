import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AudioPlayer,
  VideoPreview,
  ImageViewer,
  SpotifyEmbed,
  BandcampEmbed,
  SoundCloudEmbed,
  LinkPreview,
} from '@/components';
import type { SymbolAnnotation, SymbolCategory } from '@/types/annotations';

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

  // Group symbols by category
  const symbolsByCategory = symbols.reduce((acc, symbol) => {
    if (!acc[symbol.category]) {
      acc[symbol.category] = [];
    }
    acc[symbol.category].push(symbol);
    return acc;
  }, {} as Record<SymbolCategory, SymbolAnnotation[]>);

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

// Individual Symbol Card Component
interface SymbolCardProps {
  symbol: SymbolAnnotation;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ symbol, isExpanded, onToggleExpand }) => {
  const [activeEmbed, setActiveEmbed] = useState(0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="border-2 border-[var(--muted)] hover:border-[var(--primary)] transition-all bg-[rgba(0,0,0,0.3)] neon-border-subtle"
    >
      {/* Header - Always Visible */}
      <div
        onClick={onToggleExpand}
        className="p-4 cursor-pointer hover:bg-[rgba(255,0,255,0.05)] transition-all"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-[var(--foreground)] mb-1">
              {symbol.title}
            </h4>
            <p className="text-sm text-[var(--chart-2)]">{symbol.artist}</p>
            {symbol.year && (
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                [{symbol.year}]
              </p>
            )}
          </div>

          <div className="text-right text-xs space-y-1">
            <span className={`px-2 py-1 border border-[var(--chart-1)] text-[var(--chart-1)] block`}>
              {symbol.category.toUpperCase().replace('-', ' ')}
            </span>
            {symbol.embeds.length > 0 && (
              <span className="text-[var(--muted-foreground)]">
                {symbol.embeds.length} EMBED{symbol.embeds.length > 1 ? 'S' : ''}
              </span>
            )}
            <span className="text-[var(--secondary)]">
              {isExpanded ? '[-] COLLAPSE' : '[+] EXPAND'}
            </span>
          </div>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] mt-3 line-clamp-2">
          {symbol.description}
        </p>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t-2 border-[var(--muted)] overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Full Description */}
              <div className="border-l-4 border-[var(--chart-1)] pl-4 bg-[rgba(0,0,0,0.3)] p-3">
                <p className="text-sm">{symbol.description}</p>
              </div>

              {/* Media Embeds */}
              {symbol.embeds.length > 0 && (
                <div className="space-y-3">
                  {/* Embed Selector if multiple */}
                  {symbol.embeds.length > 1 && (
                    <div className="flex gap-2 text-xs">
                      {symbol.embeds.map((embed, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveEmbed(idx)}
                          className={`
                            px-3 py-1 border transition-all
                            ${activeEmbed === idx
                              ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--background)]'
                              : 'border-[var(--muted)] hover:border-[var(--secondary)]'
                            }
                          `}
                        >
                          {embed.type.toUpperCase()} {idx + 1}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Active Embed */}
                  <MediaEmbedRenderer embed={symbol.embeds[activeEmbed]} />
                </div>
              )}

              {/* Deep Dive Content */}
              {symbol.deepDive && (
                <div className="border-t border-[var(--muted)] pt-4 space-y-3">
                  <h5 className="text-[var(--chart-2)] font-bold text-sm">
                    [DEEP_DIVE.TXT]
                  </h5>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {symbol.deepDive.analysis}
                  </p>

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
                </div>
              )}

              {/* Metadata Tags */}
              <div className="flex flex-wrap gap-2 text-xs">
                {symbol.convergencePoints && symbol.convergencePoints.map((cp) => (
                  <span
                    key={cp}
                    className="px-2 py-1 border border-[var(--chart-1)] text-[var(--chart-1)]"
                  >
                    CP {cp}
                  </span>
                ))}
                {symbol.voices && symbol.voices.map((voice) => (
                  <span
                    key={voice}
                    className="px-2 py-1 border border-[var(--chart-2)] text-[var(--chart-2)]"
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

// Media Embed Renderer Component
interface MediaEmbedRendererProps {
  embed: SymbolAnnotation['embeds'][0];
}

const MediaEmbedRenderer: React.FC<MediaEmbedRendererProps> = ({ embed }) => {
  switch (embed.type) {
    case 'spotify':
      return (
        <SpotifyEmbed
          uri={embed.embedId || embed.url}
          type={embed.spotifyType || 'track'}
          compact={false}
        />
      );

    case 'bandcamp':
      return (
        <BandcampEmbed
          albumId={embed.bandcampAlbumId}
          trackId={embed.bandcampTrackId}
          size="large"
        />
      );

    case 'soundcloud':
      return <SoundCloudEmbed url={embed.url} visual={true} />;

    case 'youtube':
      return (
        <VideoPreview
          src={embed.embedId || embed.url}
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
          src={embed.embedId || embed.url}
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
          src={embed.url}
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
          src={embed.url}
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
          url={embed.url}
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
