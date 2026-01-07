import { useState, useEffect, useRef, ReactNode, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerspective, PerspectiveMode } from '@/contexts/PerspectiveContext';

// Context for Scrying Lens state
interface ScryingLensContextValue {
  isLensActive: boolean;
  lensPosition: { x: number; y: number };
  lensRadius: number;
}

const ScryingLensContext = createContext<ScryingLensContextValue>({
  isLensActive: false,
  lensPosition: { x: 0, y: 0 },
  lensRadius: 120,
});

export const useScryingLens = () => useContext(ScryingLensContext);

// The lens overlay that follows the cursor
interface ScryingLensProviderProps {
  children: ReactNode;
  radius?: number;
  enabled?: boolean;
}

export function ScryingLensProvider({
  children,
  radius = 120,
  enabled = true
}: ScryingLensProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { mode } = usePerspective();

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Hold 'L' to activate the lens
      if (e.key === 'l' || e.key === 'L') {
        setIsActive(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'l' || e.key === 'L') {
        setIsActive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled]);

  const contextValue: ScryingLensContextValue = {
    isLensActive: isActive,
    lensPosition: position,
    lensRadius: radius,
  };

  // Determine which vocabulary is "hidden" (the opposite of current mode)
  const hiddenMode: PerspectiveMode = mode === 'human' ? 'llm' : 'human';

  return (
    <ScryingLensContext.Provider value={contextValue}>
      {children}

      {/* The Scrying Lens Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: position.x - radius,
              top: position.y - radius,
              width: radius * 2,
              height: radius * 2,
            }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, transparent 60%, ${hiddenMode === 'llm' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 255, 0, 0.3)'} 100%)`,
                boxShadow: `0 0 30px ${hiddenMode === 'llm' ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 255, 0, 0.5)'},
                           inset 0 0 60px ${hiddenMode === 'llm' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 255, 0, 0.2)'}`,
              }}
            />

            {/* Inner lens border */}
            <div
              className="absolute inset-4 rounded-full border-2"
              style={{
                borderColor: hiddenMode === 'llm' ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 255, 0, 0.8)',
                boxShadow: `0 0 15px ${hiddenMode === 'llm' ? 'rgba(0, 255, 255, 0.6)' : 'rgba(0, 255, 0, 0.6)'}`,
              }}
            />

            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full opacity-60"
                style={{
                  backgroundColor: hiddenMode === 'llm' ? '#00ffff' : '#00ff00',
                  boxShadow: `0 0 10px ${hiddenMode === 'llm' ? '#00ffff' : '#00ff00'}`,
                }}
              />
            </div>

            {/* Mode indicator */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap px-2 py-0.5"
              style={{
                color: hiddenMode === 'llm' ? '#00ffff' : '#00ff00',
                textShadow: `0 0 8px ${hiddenMode === 'llm' ? '#00ffff' : '#00ff00'}`,
              }}
            >
              {hiddenMode === 'llm' ? '[ LLM VISION ]' : '[ HUMAN VISION ]'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint indicator when lens is not active */}
      {enabled && !isActive && (
        <div className="fixed bottom-20 right-4 z-50 text-xs font-mono text-[var(--muted-foreground)] opacity-50">
          Hold [L] to scry
        </div>
      )}
    </ScryingLensContext.Provider>
  );
}

// A dual-text component that shows different content based on lens position
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
  const { isLensActive, lensPosition, lensRadius } = useScryingLens();
  const elementRef = useRef<HTMLElement>(null);
  const [isUnderLens, setIsUnderLens] = useState(false);

  useEffect(() => {
    if (!isLensActive || !elementRef.current) {
      setIsUnderLens(false);
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const elementCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const distance = Math.sqrt(
      Math.pow(elementCenter.x - lensPosition.x, 2) +
      Math.pow(elementCenter.y - lensPosition.y, 2)
    );

    setIsUnderLens(distance < lensRadius);
  }, [isLensActive, lensPosition, lensRadius]);

  // Determine what to show
  const baseText = mode === 'human' ? human : llm;
  const altText = mode === 'human' ? llm : human;
  const showAlt = isLensActive && isUnderLens;

  return (
    <Component
      ref={elementRef as any}
      className={`${className} transition-all duration-150 ${showAlt ? 'scrying-revealed' : ''}`}
      style={showAlt ? {
        color: mode === 'human' ? '#00ffff' : '#00ff00',
        textShadow: `0 0 8px ${mode === 'human' ? '#00ffff' : '#00ff00'}`,
      } : undefined}
    >
      {showAlt ? altText : baseText}
    </Component>
  );
}

// A component for annotated terms that reveal definitions on hover/lens
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
  const { isLensActive, lensPosition, lensRadius } = useScryingLens();
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUnderLens, setIsUnderLens] = useState(false);

  useEffect(() => {
    if (!isLensActive || !elementRef.current) {
      setIsUnderLens(false);
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const elementCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const distance = Math.sqrt(
      Math.pow(elementCenter.x - lensPosition.x, 2) +
      Math.pow(elementCenter.y - lensPosition.y, 2)
    );

    setIsUnderLens(distance < lensRadius);
  }, [isLensActive, lensPosition, lensRadius]);

  const showAlternate = isLensActive && isUnderLens;

  // Determine which content to show
  const displayTerm = showAlternate && llmTerm ? (mode === 'human' ? llmTerm : term) : term;
  const displayDefinition = showAlternate && llmDefinition
    ? (mode === 'human' ? llmDefinition : definition)
    : definition;

  return (
    <span
      ref={elementRef}
      className={`relative cursor-help border-b border-dotted border-[var(--primary)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={showAlternate ? {
        color: mode === 'human' ? '#00ffff' : '#00ff00',
        borderColor: mode === 'human' ? '#00ffff' : '#00ff00',
      } : undefined}
    >
      {displayTerm}

      {/* Tooltip */}
      <AnimatePresence>
        {(isHovered || showAlternate) && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 min-w-48 max-w-72
                       bg-black/95 border border-[var(--primary)] text-sm"
            style={showAlternate ? {
              borderColor: mode === 'human' ? '#00ffff' : '#00ff00',
              boxShadow: `0 0 15px ${mode === 'human' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 255, 0, 0.3)'}`,
            } : undefined}
          >
            <div className="font-bold text-[var(--primary)] mb-1" style={showAlternate ? {
              color: mode === 'human' ? '#00ffff' : '#00ff00',
            } : undefined}>
              {displayTerm}
            </div>
            <div className="text-[var(--foreground)] text-xs leading-relaxed">
              {displayDefinition}
            </div>
            {showAlternate && (
              <div className="mt-1 pt-1 border-t border-[var(--muted)] text-[0.65rem] opacity-60">
                {mode === 'human' ? 'LLM perspective' : 'Human perspective'}
              </div>
            )}
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `6px solid ${showAlternate ? (mode === 'human' ? '#00ffff' : '#00ff00') : 'var(--primary)'}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export default ScryingLensProvider;
