import { useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerspective } from '@/contexts/PerspectiveContext';

// Provider that handles the 'L' key to toggle perspective
interface ScryingLensProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

export function ScryingLensProvider({
  children,
  enabled = true
}: ScryingLensProviderProps) {
  const { mode, togglePerspective } = usePerspective();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle perspective with 'L' key
      if (e.key === 'l' || e.key === 'L') {
        // Ignore if user is typing in an input
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        togglePerspective();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, togglePerspective]);

  return (
    <>
      {children}

      {/* Perspective indicator */}
      {enabled && (
        <div className="fixed bottom-20 right-4 z-50 text-xs font-mono opacity-70 flex items-center gap-2">
          <span
            className="transition-all duration-300"
            style={{
              color: mode === 'human' ? 'var(--primary)' : '#00ffff',
              textShadow: `0 0 8px ${mode === 'human' ? 'var(--primary)' : '#00ffff'}`,
            }}
          >
            {mode === 'human' ? '[ HUMAN ]' : '[ LLM ]'}
          </span>
          <span className="text-[var(--muted-foreground)]">Press [L] to shift</span>
        </div>
      )}
    </>
  );
}

// A dual-text component that shows different content based on perspective mode
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
  const { mode } = usePerspective();

  const text = mode === 'human' ? human : llm;
  const isLLM = mode === 'llm';

  return (
    <Component
      className={`${className} transition-all duration-300`}
      style={isLLM ? {
        color: '#00ffff',
        textShadow: '0 0 8px #00ffff',
      } : undefined}
    >
      {text}
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
  const { mode } = usePerspective();
  const isLLM = mode === 'llm';

  // Determine which content to show based on mode
  const displayTerm = isLLM && llmTerm ? llmTerm : term;
  const displayDefinition = isLLM && llmDefinition ? llmDefinition : definition;

  return (
    <span
      className={`relative cursor-help border-b border-dotted group ${className}`}
      style={{
        color: isLLM ? '#00ffff' : undefined,
        borderColor: isLLM ? '#00ffff' : 'var(--primary)',
      }}
    >
      {displayTerm}

      {/* Tooltip - shows on hover */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 min-w-48 max-w-72
                     bg-black/95 border text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            borderColor: isLLM ? '#00ffff' : 'var(--primary)',
            boxShadow: isLLM ? '0 0 15px rgba(0, 255, 255, 0.3)' : undefined,
          }}
        >
          <div
            className="font-bold mb-1"
            style={{ color: isLLM ? '#00ffff' : 'var(--primary)' }}
          >
            {displayTerm}
          </div>
          <div className="text-[var(--foreground)] text-xs leading-relaxed">
            {displayDefinition}
          </div>
          <div className="mt-1 pt-1 border-t border-[var(--muted)] text-[0.65rem] opacity-60">
            {isLLM ? 'LLM perspective' : 'Human perspective'}
          </div>
          {/* Arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `6px solid ${isLLM ? '#00ffff' : 'var(--primary)'}`,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </span>
  );
}

// Legacy export for compatibility
export const useScryingLens = () => {
  const { mode } = usePerspective();
  return {
    isLensActive: false,
    lensPosition: { x: 0, y: 0 },
    lensRadius: 0,
    mode,
  };
};

export default ScryingLensProvider;
