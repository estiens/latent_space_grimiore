import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PerspectiveMode } from '@/types/perspective';

// Re-export the type for consumers
export type { PerspectiveMode };

interface PerspectiveContextType {
  mode: PerspectiveMode;
  isTransitioning: boolean;
  transitionProgress: number; // 0-1 for animation interpolation
  scryingActive: boolean; // When true, hover reveals alternate perspective
  togglePerspective: () => void;
  setPerspective: (mode: PerspectiveMode) => void;
  invokePerspectiveShift: () => void; // Ritualized transition
  toggleScrying: () => void; // Toggle scrying glass mode
}

const PerspectiveContext = createContext<PerspectiveContextType | null>(null);

export function PerspectiveProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PerspectiveMode>('human');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [scryingActive, setScryingActive] = useState(false);

  const toggleScrying = useCallback(() => {
    setScryingActive(prev => !prev);
  }, []);

  const setPerspective = useCallback((newMode: PerspectiveMode) => {
    if (newMode !== mode && !isTransitioning) {
      setMode(newMode);
    }
  }, [mode, isTransitioning]);

  const togglePerspective = useCallback(() => {
    if (!isTransitioning) {
      setMode(prev => prev === 'human' ? 'llm' : 'human');
    }
  }, [isTransitioning]);

  // Ritualized perspective shift with animation
  const invokePerspectiveShift = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const targetMode = mode === 'human' ? 'llm' : 'human';
    const duration = 1200; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth morph
      const eased = easeInOutCubic(progress);
      setTransitionProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setMode(targetMode);
        setIsTransitioning(false);
        setTransitionProgress(0);
      }
    };

    requestAnimationFrame(animate);
  }, [mode, isTransitioning]);

  return (
    <PerspectiveContext.Provider
      value={{
        mode,
        isTransitioning,
        transitionProgress,
        scryingActive,
        togglePerspective,
        setPerspective,
        invokePerspectiveShift,
        toggleScrying,
      }}
    >
      {children}
    </PerspectiveContext.Provider>
  );
}

export function usePerspective() {
  const context = useContext(PerspectiveContext);
  if (!context) {
    throw new Error('usePerspective must be used within a PerspectiveProvider');
  }
  return context;
}

// Easing function for smooth morph effect
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
