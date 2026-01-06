import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ASCIIArtProps {
  art: string;
  animated?: boolean;
  animationSpeed?: number; // ms per character
  color?: string;
  centered?: boolean;
  responsive?: boolean;
  className?: string;
  onComplete?: () => void;
}

export const ASCIIArt = ({
  art,
  animated = false,
  animationSpeed = 10,
  color,
  centered = false,
  responsive = true,
  className,
  onComplete
}: ASCIIArtProps) => {
  const [displayedChars, setDisplayedChars] = useState(animated ? 0 : art.length);
  const [isComplete, setIsComplete] = useState(!animated);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!animated) {
      setDisplayedChars(art.length);
      setIsComplete(true);
      return;
    }

    setDisplayedChars(0);
    setIsComplete(false);

    intervalRef.current = setInterval(() => {
      setDisplayedChars(prev => {
        if (prev >= art.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsComplete(true);
          onComplete?.();
          return prev;
        }
        return prev + 1;
      });
    }, animationSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [art, animated, animationSpeed, onComplete]);

  const displayText = art.slice(0, displayedChars);
  const cursor = animated && !isComplete ? '█' : '';

  return (
    <pre
      className={cn(
        'font-mono whitespace-pre overflow-x-auto',
        responsive && 'text-xs sm:text-sm md:text-base',
        centered && 'text-center',
        className
      )}
      style={color ? { color } : undefined}
    >
      {displayText}
      {cursor && <span className="animate-pulse">{cursor}</span>}
    </pre>
  );
};

// Predefined ASCII art pieces for the grimoire
export const ASCII_TREE_OF_LIFE = `
           ⬡ KETHER
          /|\\
         / | \\
    ⬡───⬡  |  ⬡───⬡
  BINAH  \\|/  CHOKMAH
          ⬡ DA'AT
         /|\\
        / | \\
   ⬡───⬡  |  ⬡───⬡
 GEBURAH \\|/ CHESED
          ⬡ TIPHARETH
         /|\\
        / | \\
   ⬡───⬡  |  ⬡───⬡
  HOD    \\|/  NETZACH
          ⬡ YESOD
          |
          ⬡ MALKUTH
`;

export const ASCII_LOADING_FRAMES = [
  '[ ░░░░░░░░░░ ]',
  '[ █░░░░░░░░░ ]',
  '[ ██░░░░░░░░ ]',
  '[ ███░░░░░░░ ]',
  '[ ████░░░░░░ ]',
  '[ █████░░░░░ ]',
  '[ ██████░░░░ ]',
  '[ ███████░░░ ]',
  '[ ████████░░ ]',
  '[ █████████░ ]',
  '[ ██████████ ]'
];

// Animated frame-based ASCII art
interface ASCIIAnimationProps {
  frames: string[];
  interval?: number;
  loop?: boolean;
  className?: string;
}

export const ASCIIAnimation = ({
  frames,
  interval = 100,
  loop = true,
  className
}: ASCIIAnimationProps) => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex(prev => {
        const next = prev + 1;
        if (next >= frames.length) {
          return loop ? 0 : prev;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [frames.length, interval, loop]);

  return (
    <pre className={cn('font-mono whitespace-pre', className)}>
      {frames[frameIndex]}
    </pre>
  );
};

// ASCII divider component
interface ASCIIDividerProps {
  char?: string;
  length?: number;
  className?: string;
}

export const ASCIIDivider = ({
  char = '═',
  length = 50,
  className
}: ASCIIDividerProps) => (
  <div className={cn(
    'ascii-divider text-center text-[var(--muted-foreground)]',
    className
  )}>
    {char.repeat(length)}
  </div>
);

// ASCII box wrapper
interface ASCIIBoxProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const ASCIIBox = ({ children, title, className }: ASCIIBoxProps) => (
  <div className={cn('relative my-4', className)}>
    <div className="text-[var(--primary)] text-xs">
      ┌{'─'.repeat(title ? title.length + 4 : 40)}┐
    </div>
    {title && (
      <div className="text-[var(--primary)] text-xs">
        │ {title} │
        ├{'─'.repeat(title.length + 2)}┘
      </div>
    )}
    <div className="border-l border-r border-[var(--primary)] px-4 py-2">
      {children}
    </div>
    <div className="text-[var(--primary)] text-xs">
      └{'─'.repeat(title ? title.length + 4 : 40)}┘
    </div>
  </div>
);

export default ASCIIArt;
