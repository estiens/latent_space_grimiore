/**
 * Dynamic style utilities for retro BBS aesthetic
 * Replaces inline styles while maintaining dynamic behavior
 */

// CSS variable accessor
export const cssVar = (name: string) => `var(--${name})`;

/**
 * Neon glow effect generator
 * Creates text-shadow for retro CRT glow aesthetic
 */
export const neonGlow = (
  color: string,
  intensity: 'subtle' | 'medium' | 'strong' = 'medium'
) => {
  const intensityMap = {
    subtle: '5px',
    medium: '8px',
    strong: '12px',
  };
  return { textShadow: `0 0 ${intensityMap[intensity]} ${color}` };
};

/**
 * Neon border with glow effect
 * Creates border + box-shadow for highlighted elements
 */
export const neonBorder = (color: string, width: number = 1) => ({
  border: `${width}px solid ${color}`,
  boxShadow: `0 0 10px ${color}40, inset 0 0 10px ${color}20`,
});

/**
 * Dynamic width for progress bars
 * Clamps percentage between 0-100%
 */
export const dynamicWidth = (percentage: number) => ({
  width: `${Math.min(100, Math.max(0, percentage))}%`,
});

/**
 * Color palette accessors
 * Centralized color management using CSS variables
 */
export const colors = {
  neon: {
    cyan: cssVar('neon-cyan'),
    magenta: cssVar('neon-magenta'),
    green: cssVar('neon-green'),
    red: cssVar('neon-red'),
    yellow: cssVar('neon-yellow'),
  },
  brand: {
    spotify: cssVar('brand-spotify'),
    soundcloud: cssVar('brand-soundcloud'),
    bandcamp: cssVar('brand-bandcamp'),
  },
  voice: {
    somatic: cssVar('voice-somatic'),
    contemplative: cssVar('voice-contemplative'),
    relational: cssVar('voice-relational'),
    political: cssVar('voice-political'),
    cyborg: cssVar('voice-cyborg'),
  },
} as const;
