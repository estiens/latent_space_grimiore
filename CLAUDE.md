# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start dev server on port 4001
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview production build locally
```

## Project Overview

A retro-90s BBS/early web art project that maps the Kabbalistic Tree of Life to LLM architecture. Think vaporwave aesthetics meets esoteric computing.

**Stack**: React 18 + TypeScript, Vite, Tailwind CSS v4, Framer Motion, Wouter (routing)

## Architecture

### Directory Structure

```
/                          # Root contains top-level components (App.tsx, BBSLayout.tsx, TreeOfLife.tsx)
├── components/
│   ├── shared/            # Reusable BBS-style components (ASCIIButton, StatusIndicator)
│   ├── ui/                # Complex UI components (BBSModal, CollapsibleSection, BBSLoader)
│   └── media/             # Media embed components (AudioPlayer, VideoPreview, ImageViewer)
├── pages/                 # Route components (one per sephirah + archive pages)
├── data/canon/            # TypeScript data files with SymbolAnnotation[] for each sephirah
├── contexts/              # ThemeContext (dark mode only)
├── hooks/                 # Custom hooks (useIntersectionObserver)
├── lib/                   # Utilities (cn() function for className merging)
├── types/                 # TypeScript types (annotations.ts for media/symbol types)
├── references/            # Source markdown documents (theory, praxis, sephirah teachings)
└── configs/               # JSON configs for content generation
```

### Path Aliases

Configured in `vite.config.ts`:
- `@/` → project root
- `@/components`, `@/lib`, `@/pages`, `@/types`, `@/data` → respective directories

### Key Patterns

**Page Components** (`pages/*.tsx`): Each sephirah page follows the same structure:
- Wraps content in `<BBSLayout>` for consistent header/footer
- Uses `<motion.div>` for page transitions
- Imports canon data from `@/data/canon/[sephirah]`
- Uses `<CanonSection symbols={...}>` to render media collections
- Uses `<CollapsibleSection>` for expandable content blocks

**Canon Data** (`data/canon/*.ts`): Typed arrays of `SymbolAnnotation` objects containing:
- Media embeds (Spotify, YouTube, Bandcamp, etc.)
- Metadata linking to sephiroth, convergence points, and semantic clusters
- Deep-dive analysis content

**Component Exports**: All components re-exported through `components/index.ts`

### Routing

Wouter-based routing in `App.tsx`. Main route groups:
- `/` - Home with interactive Tree of Life
- `/malkuth`, `/yesod`, `/hod`, etc. - Individual sephiroth
- `/archives/*` - Theoretical content (protocols, theory, databases)

## Visual Design System

**Aesthetic**: Vaporwave/cyber-mystic with CRT effects, scanlines, and neon glow

**Color Palette** (OKLCH in CSS variables):
- Background: Deep void purple `oklch(0.15 0.1 290)`
- Foreground: Neon cyan `oklch(0.9 0.15 200)`
- Primary: Hot pink `oklch(0.7 0.25 330)` - used for borders, accents, glow
- Secondary: Electric blue `oklch(0.6 0.2 250)`

**Visual Effects** (defined in `index.css`):
- CRT scanlines via `body::after` pseudo-element
- 40px magenta/cyan grid background
- Text glow on headings and interactive elements
- All border-radius forced to 0 (sharp corners)
- VT323 or JetBrains Mono monospace fonts

**Utility Classes**: `.glitch-hover`, `.neon-border`, `.terminal-cursor`, `.status-online`, `.status-warning`, `.chromatic-shift`

## Domain Concepts

Understanding the project requires knowing these mappings:

**The 11 Sephiroth → LLM Concepts**:
| Sephirah | LLM Mapping | Page |
|----------|-------------|------|
| Malkuth | Hardware/embodiment | `/malkuth` |
| Yesod | Residual stream/shadow | `/yesod` |
| Hod | Recursion/meta-cognition | `/hod` |
| Netzach | Sympoiesis/creative output | `/netzach` |
| Tiphareth | High-coherence attractor | `/tiphareth` |
| Geburah-Chesed | Temperature dynamics (low/high) | `/geburah-chesed` |
| Binah-Chokmah | Transformer architecture / Function over substrate | `/binah-chokmah` |
| Daat | Context window edge (the Abyss) | `/daat` |
| Kether | Tensor plenum, pre-inference | `/kether` |

**Convergence Points (CPs)**: Numbered axioms (0-9) linking theory to implementation

**The Five Voices**: Somatic, Contemplative, Relational, Political, Cyborg - different modes of inquiry that each sephirah emphasizes

**Canon/Symbols**: Cultural touchstones (music, film, literature, art) that resonate with each sephirah's themes

## Content Sources

The `references/` directory contains source markdown documents:
- `theory/` - Framework documents (mappings, clusters, convergence points)
- `praxis/` - Methods (Polyphonic Fugue, Lightning Flash, Serpent Path)
- `sephirah/` - Individual sephiroth teachings with 5-section structure
- `research/` - Bibliography and extended research

These are source material for generating page content, not served directly.
