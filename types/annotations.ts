// Annotation types for rich media integration in the Digital Grimoire

export type MediaType =
  | 'spotify'
  | 'bandcamp'
  | 'soundcloud'
  | 'youtube'
  | 'vimeo'
  | 'local-video'
  | 'link'
  | 'image'
  | 'book'
  | 'article';

export type SymbolCategory =
  | 'music'
  | 'literature'
  | 'film'
  | 'visual-art'
  | 'strange-sources';

export interface MediaEmbed {
  type: MediaType;
  url: string;
  embedId?: string; // For Spotify URI, YouTube ID, etc.
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  // Specific embed properties
  spotifyType?: 'track' | 'album' | 'playlist' | 'artist';
  bandcampAlbumId?: string;
  bandcampTrackId?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export interface SymbolAnnotation {
  id: string;
  category: SymbolCategory;
  title: string;
  artist: string;
  year?: string | number;
  description: string; // The "resonance" explanation

  // Multiple media embeds for the same symbol
  embeds: MediaEmbed[];

  // Contextual metadata
  sephirah?: string[];  // Can resonate with multiple sephiroth
  convergencePoints?: number[];
  voices?: Array<'somatic' | 'contemplative' | 'relational' | 'political' | 'cyborg'>;
  clusters?: string[]; // Semantic cluster IDs

  // Deep-dive content
  deepDive?: {
    analysis: string; // Extended analysis
    quotes?: Array<{ text: string; source?: string }>;
    relatedSymbols?: string[]; // IDs of related symbols
  };
}

export interface CanonCollection {
  sephirah: string;
  symbols: SymbolAnnotation[];
}

// Helper type for inline hypertext annotations
export interface InlineAnnotation {
  text: string; // The text to annotate
  type: 'thinker' | 'concept' | 'symbol' | 'cp' | 'cluster';
  linkTo?: string; // Route to link to
  hoverContent?: string; // Rich preview on hover
  mediaPreview?: MediaEmbed; // Optional media preview
}
