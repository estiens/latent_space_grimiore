import { useEffect, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerspective } from '@/contexts/PerspectiveContext';

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
  const { mode, togglePerspective, scryingActive, toggleScrying } = usePerspective();
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
          .scryable-text {
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff00ff' stroke-width='2'%3E%3Ccircle cx='10' cy='10' r='7'/%3E%3Cline x1='15' y1='15' x2='21' y2='21'/%3E%3C/svg%3E") 12 12, crosshair !important;
          }
        `}</style>
      )}
      {children}

      {/* Perspective & Scrying indicator */}
      {enabled && (
        <div
          className="fixed bottom-20 right-4 z-50 text-xs font-mono flex flex-col items-end gap-1"
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
        >
          {/* Mode indicator */}
          <div className="flex items-center gap-2 opacity-70">
            <span
              className="transition-all duration-300"
              style={{
                color: mode === 'human' ? 'var(--primary)' : '#00ffff',
                textShadow: `0 0 8px ${mode === 'human' ? 'var(--primary)' : '#00ffff'}`,
              }}
            >
              {mode === 'human' ? '[ HUMAN ]' : '[ LLM ]'}
            </span>
          </div>

          {/* Scrying indicator */}
          <div
            className="flex items-center gap-2 transition-all duration-300"
            style={{
              opacity: scryingActive ? 1 : 0.4,
              color: scryingActive ? '#ff00ff' : 'var(--muted-foreground)',
              textShadow: scryingActive ? '0 0 10px #ff00ff' : 'none',
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
                className="mt-1 text-[0.65rem] text-[var(--muted-foreground)] text-right"
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

  return (
    <Component
      className={`${className} scryable-text transition-all duration-200 relative inline`}
      style={{
        ...(isLLMStyle ? {
          color: '#00ffff',
          textShadow: '0 0 8px #00ffff',
        } : {}),
        ...(scryingActive ? {
          borderBottom: '1px dotted',
          borderColor: scryingActive ? '#ff00ff' : 'transparent',
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
            className="absolute -top-5 left-0 text-[0.6rem] whitespace-nowrap pointer-events-none"
            style={{
              color: '#ff00ff',
              textShadow: '0 0 5px #ff00ff',
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
        color: isLLMStyle ? '#00ffff' : undefined,
        borderColor: isLLMStyle ? '#00ffff' : scryingActive ? '#ff00ff' : 'var(--primary)',
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
            className="absolute -top-5 left-0 text-[0.6rem] whitespace-nowrap pointer-events-none z-[60]"
            style={{
              color: '#ff00ff',
              textShadow: '0 0 5px #ff00ff',
            }}
          >
            {mode === 'human' ? '◇ LLM' : '◇ HUMAN'}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Tooltip - shows on hover */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 min-w-48 max-w-72
                     bg-black/95 border text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            borderColor: isLLMStyle ? '#00ffff' : 'var(--primary)',
            boxShadow: isLLMStyle ? '0 0 15px rgba(0, 255, 255, 0.3)' : undefined,
          }}
        >
          <div
            className="font-bold mb-1"
            style={{ color: isLLMStyle ? '#00ffff' : 'var(--primary)' }}
          >
            {displayTerm}
          </div>
          <div className="text-[var(--foreground)] text-xs leading-relaxed">
            {displayDefinition}
          </div>
          <div className="mt-1 pt-1 border-t border-[var(--muted)] text-[0.65rem] opacity-60">
            {isLLMStyle ? 'LLM perspective' : 'Human perspective'}
            {showingAlternate && ' (scrying)'}
          </div>
          {/* Arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `6px solid ${isLLMStyle ? '#00ffff' : 'var(--primary)'}`,
            }}
          />
        </motion.div>
      </AnimatePresence>
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
