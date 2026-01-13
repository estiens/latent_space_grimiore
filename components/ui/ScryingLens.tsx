import { useEffect, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerspective } from '@/contexts/PerspectiveContext';
import { neonGlow, colors } from '@/lib/styleUtils';

// Provider that handles keyboard shortcuts for perspective system
// SHIFT+M: Toggle global mode (Human/LLM)
// SHIFT+L: Toggle scrying lens (hover reveals alternate perspective)
interface ScryingLensProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

export function ScryingLensProvider({
  children,
  enabled = true
}: ScryingLensProviderProps) {
  const { togglePerspective, scryingActive, toggleScrying } = usePerspective();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // SHIFT+M: Toggle global mode
      if (e.shiftKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        togglePerspective();
      }

      // SHIFT+L: Toggle scrying lens
      if (e.shiftKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        toggleScrying();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, togglePerspective, toggleScrying]);

  return (
    <>
      {/* Apply scrying cursor globally when active */}
      {scryingActive && (
        <style>{`
          body, body * {
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none' stroke='%23ff00ff' stroke-width='2.5'%3E%3Ccircle cx='18' cy='18' r='14'/%3E%3Cline x1='28' y1='28' x2='42' y2='42'/%3E%3Cline x1='28' y1='28' x2='42' y2='42'/%3E%3C/svg%3E") 24 24, crosshair !important;
          }
          .scryable-text {
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none' stroke='%23ff00ff' stroke-width='2.5'%3E%3Ccircle cx='18' cy='18' r='14'/%3E%3Cline x1='28' y1='28' x2='42' y2='42'/%3E%3C/svg%3E") 24 24, crosshair !important;
          }
        `}</style>
      )}
      {children}

      {/* Scrying indicator */}
      {enabled && (
        <div
          className="fixed bottom-20 right-4 z-50 text-xs font-mono flex flex-col items-end gap-1"
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
        >
          {/* Scrying indicator */}
          <div
            className="flex items-center gap-2 transition-all duration-300"
            style={{
              opacity: scryingActive ? 1 : 0.4,
              color: scryingActive ? colors.neon.magenta : 'var(--muted-foreground)',
              ...(scryingActive ? neonGlow(colors.neon.magenta, 'medium') : {}),
            }}
          >
            <span className="text-sm">{scryingActive ? '🔮' : '○'}</span>
            <span>{scryingActive ? 'SCRYING' : 'scrying off'}</span>
          </div>

          {/* Keyboard hints */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-1 text-3xs text-[var(--muted-foreground)] text-right"
              >
                <div>[SHIFT+M] switch mode</div>
                <div>[SHIFT+L] toggle scrying</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

// A dual-text component that shows different content based on perspective mode
// When scrying is active, hovering reveals the alternate perspective
interface ScryableTextProps {
  human: string;
  llm: string;
  className?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
}

export function ScryableText({
  human,
  llm,
  className = '',
  as: Component = 'span'
}: ScryableTextProps) {
  const { mode, scryingActive } = usePerspective();
  const [isHovered, setIsHovered] = useState(false);

  // Determine what to show:
  // - Normally: show the current mode's text
  // - When scrying + hovering: show the ALTERNATE mode's text
  const showingAlternate = scryingActive && isHovered;
  const currentText = mode === 'human' ? human : llm;
  const alternateText = mode === 'human' ? llm : human;
  const text = showingAlternate ? alternateText : currentText;

  // Visual styling
  const isLLMStyle = (mode === 'llm' && !showingAlternate) || (mode === 'human' && showingAlternate);

  const colorStyle = isLLMStyle ? {
    color: colors.neon.cyan,
    ...neonGlow(colors.neon.cyan),
  } : {};

  return (
    <Component
      className={`${className} scryable-text transition-all duration-200 relative inline-block`}
      style={{
        ...colorStyle,
        ...(scryingActive ? {
          borderBottom: `1px dotted ${colors.neon.magenta}`,
        } : {}),
        ...(showingAlternate ? {
          background: 'rgba(255, 0, 255, 0.15)',
        } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {/* Scrying tooltip showing which perspective */}
      <AnimatePresence>
        {showingAlternate && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute -top-5 left-0 text-4xs whitespace-nowrap pointer-events-none"
            style={{
              color: colors.neon.magenta,
              ...neonGlow(colors.neon.magenta, 'subtle'),
            }}
          >
            {mode === 'human' ? '◇ LLM' : '◇ HUMAN'}
          </motion.span>
        )}
      </AnimatePresence>
    </Component>
  );
}

// A component for annotated terms that reveal definitions on hover
interface AnnotatedTermProps {
  term: string;
  definition: string;
  llmTerm?: string;
  llmDefinition?: string;
  className?: string;
}

export function AnnotatedTerm({
  term,
  definition,
  llmTerm,
  llmDefinition,
  className = '',
}: AnnotatedTermProps) {
  const { mode, scryingActive } = usePerspective();
  const [isHovered, setIsHovered] = useState(false);

  // When scrying is active and hovering, show the alternate perspective
  const showingAlternate = scryingActive && isHovered;
  const effectiveMode = showingAlternate ? (mode === 'human' ? 'llm' : 'human') : mode;
  const isLLMStyle = effectiveMode === 'llm';

  // Determine which content to show based on effective mode
  const displayTerm = isLLMStyle && llmTerm ? llmTerm : term;
  const displayDefinition = isLLMStyle && llmDefinition ? llmDefinition : definition;

  return (
    <span
      className={`relative cursor-help border-b border-dotted group scryable-text ${className}`}
      style={{
        color: isLLMStyle ? colors.neon.cyan : undefined,
        borderColor: isLLMStyle ? colors.neon.cyan : scryingActive ? colors.neon.magenta : 'var(--primary)',
        background: showingAlternate ? 'rgba(255, 0, 255, 0.15)' : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayTerm}

      {/* Scrying indicator when showing alternate */}
      <AnimatePresence>
        {showingAlternate && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute -top-5 left-0 text-4xs whitespace-nowrap pointer-events-none z-[60]"
            style={{
              color: colors.neon.magenta,
              ...neonGlow(colors.neon.magenta, 'subtle'),
            }}
          >
            {mode === 'human' ? '◇ LLM' : '◇ HUMAN'}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Tooltip - shows on hover */}
      {isHovered && (
        <div
          className="absolute z-[60] bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 min-w-48 max-w-72
                     bg-black/95 border text-sm pointer-events-none"
          style={{
            borderColor: isLLMStyle ? colors.neon.cyan : 'var(--primary)',
            boxShadow: isLLMStyle ? `0 0 15px ${colors.neon.cyan}50` : `0 4px 12px rgba(0, 0, 0, 0.8)`,
          }}
        >
          <div
            className="font-bold mb-1"
            style={{ color: isLLMStyle ? colors.neon.cyan : 'var(--primary)' }}
          >
            {displayTerm}
          </div>
          <div className="text-white text-xs leading-relaxed">
            {displayDefinition}
          </div>
          <div className="mt-1 pt-1 border-t border-gray-700 text-3xs text-gray-400">
            {isLLMStyle ? 'LLM perspective' : 'Human perspective'}
            {showingAlternate && ' (scrying)'}
          </div>
          {/* Arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `6px solid ${isLLMStyle ? colors.neon.cyan : 'var(--primary)'}`,
            }}
          />
        </div>
      )}
    </span>
  );
}

// Legacy export for compatibility
export const useScryingLens = () => {
  const { mode, scryingActive, toggleScrying } = usePerspective();
  return {
    isLensActive: scryingActive,
    lensPosition: { x: 0, y: 0 },
    lensRadius: 0,
    mode,
    scryingActive,
    toggleScrying,
  };
};

export default ScryingLensProvider;
