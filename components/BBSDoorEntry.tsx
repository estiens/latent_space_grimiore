import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BBSDoorEntryProps {
  onComplete: () => void;
  skipEnabled?: boolean;
  minDuration?: number; // Minimum time before allowing skip/complete
  className?: string;
}

// Connection status messages
const CONNECTION_MESSAGES = [
  'INITIALIZING MODEM...',
  'DIALING NODE 1-800-GRIMOIRE...',
  'CARRIER DETECTED',
  'NEGOTIATING PROTOCOL...',
  'ESTABLISHING SECURE LINK...',
  'HANDSHAKE COMPLETE',
  'SYNCHRONIZING SEPHIROTH...',
  'LOADING TREE OF LIFE...',
  'MAPPING LATENT SPACE...',
  'CONNECTION ESTABLISHED'
];

// ASCII art for the door screen
const DOOR_ASCII = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   ▓█▀▀▀█▓ ▀█▀ ▓█▀▀█ ▀█▀ ▀▀█▀▀ ░█▀▀█ ▓█░░░ 　 ▓█▀▀█ ▓█▀▀▄ ▀█▀ ▓█▀▄▀█ ▓█▀▀█   ║
║   ▓█░░░█▓ ▓█░ ▓█▄▄█ ▓█░ ░▓█░░ ░█▄▄█ ▓█░░░ 　 ▓█░▄▄ ▓█▄▄▀ ▓█░ ▓█░█░█ ▓█░░▓█   ║
║   ▓█▄▄▄█▓ ▄█▄ ▓█░░░ ▄█▄ ░▓█░░ ░█░░░ ▓█▄▄█ 　 ▓█▄▄▀ ▓█░░▀ ▄█▄ ▓█░░░█ ▓█▄▄▄█   ║
║                                                                               ║
║   ════════════════════════════════════════════════════════════════════════   ║
║                                                                               ║
║              L A T E N T   S P A C E   T R E E   O F   L I F E               ║
║                                                                               ║
║                        Mapping Kabbalah to LLM Architecture                   ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║                              ◇ KETHER ◇                                       ║
║                             ╱    │    ╲                                       ║
║                            ╱     │     ╲                                      ║
║                    ◇ BINAH ══════╪══════ CHOKMAH ◇                            ║
║                           ╲      │      ╱                                     ║
║                            ╲     │     ╱                                      ║
║                              ◇ DA'AT ◇                                        ║
║                             ╱    │    ╲                                       ║
║                    ◇ GEBURAH ════╪════ CHESED ◇                               ║
║                           ╲      │      ╱                                     ║
║                            ╲     │     ╱                                      ║
║                           ◇ TIPHARETH ◇                                       ║
║                             ╱    │    ╲                                       ║
║                       ◇ HOD ═════╪═════ NETZACH ◇                             ║
║                           ╲      │      ╱                                     ║
║                            ╲     │     ╱                                      ║
║                              ◇ YESOD ◇                                        ║
║                                  │                                            ║
║                             ◇ MALKUTH ◇                                       ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
`;

// Progress bar using ASCII blocks
const ProgressBar = ({ progress }: { progress: number }) => {
  const filled = Math.floor(progress / 2.5); // 40 chars = 100%
  const empty = 40 - filled;

  return (
    <div className="font-mono text-xs">
      <span className="text-[var(--muted-foreground)]">[</span>
      <span className="text-[var(--chart-1)]">{'█'.repeat(filled)}</span>
      <span className="text-[var(--muted)]">{'░'.repeat(empty)}</span>
      <span className="text-[var(--muted-foreground)]">]</span>
      <span className="text-[var(--chart-3)] ml-2">{Math.round(progress)}%</span>
    </div>
  );
};

export const BBSDoorEntry = ({
  onComplete,
  skipEnabled = true,
  minDuration = 3000,
  className
}: BBSDoorEntryProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Non-linear progress for more realistic feel
        const increment = Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Message progression
  useEffect(() => {
    const messageIndex = Math.floor((progress / 100) * (CONNECTION_MESSAGES.length - 1));
    setCurrentMessage(messageIndex);
  }, [progress]);

  // Enable skip after minimum duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanSkip(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  // Auto-complete when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && canSkip) {
      const timer = setTimeout(() => {
        handleComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, canSkip]);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  const handleSkip = () => {
    if (skipEnabled && canSkip) {
      handleComplete();
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className={cn(
            'fixed inset-0 z-50 flex flex-col items-center justify-center',
            'bg-[var(--background)] overflow-hidden',
            className
          )}
          onClick={handleSkip}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
                backgroundSize: '100% 4px'
              }}
            />
          </div>

          {/* Static noise overlay */}
          <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />

          {/* Main content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 w-full max-w-4xl px-4"
          >
            {/* ASCII Art - responsive sizing */}
            <pre className="text-[var(--primary)] text-[0.35rem] sm:text-[0.5rem] md:text-xs leading-tight overflow-x-auto whitespace-pre font-mono mb-8">
              {DOOR_ASCII}
            </pre>

            {/* Status area */}
            <div className="space-y-4 text-center">
              {/* Connection message */}
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[var(--chart-1)] text-sm md:text-base font-mono"
              >
                {CONNECTION_MESSAGES[currentMessage]}
                <span className="animate-pulse">_</span>
              </motion.div>

              {/* Progress bar */}
              <div className="flex justify-center">
                <ProgressBar progress={progress} />
              </div>

              {/* Packet info simulation */}
              <div className="text-xs text-[var(--muted-foreground)] font-mono space-y-1">
                <p>BAUD: 56000 | PROTOCOL: SEPHIROTH/TCP | LATENCY: {Math.floor(Math.random() * 50 + 10)}ms</p>
                <p>PACKETS: {Math.floor(progress * 42)} | ERRORS: 0 | RETRIES: 0</p>
              </div>

              {/* Skip instruction */}
              {skipEnabled && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: canSkip ? 1 : 0.3 }}
                  className="text-xs text-[var(--muted-foreground)] mt-8"
                >
                  {canSkip ? '[ CLICK ANYWHERE TO ENTER ]' : '[ ESTABLISHING CONNECTION... ]'}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-[var(--muted-foreground)] text-xs font-mono">
            <p>SYS.GRIMOIRE.v4.0.1</p>
            <p>NODE: PRIMARY</p>
          </div>

          <div className="absolute top-4 right-4 text-[var(--muted-foreground)] text-xs font-mono text-right">
            <p>MEM: 640K OK</p>
            <p>NET: ACTIVE</p>
          </div>

          <div className="absolute bottom-4 left-4 text-[var(--muted-foreground)] text-xs font-mono">
            <p>© 2024 LATENT_SPACE_GRIMOIRE</p>
          </div>

          <div className="absolute bottom-4 right-4 text-[var(--muted-foreground)] text-xs font-mono">
            <p className={progress >= 100 ? 'status-online' : 'status-warning'}>
              {progress >= 100 ? '● CONNECTED' : '○ CONNECTING'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for using the door entry as a splash screen
export function useDoorEntry(enabled = true) {
  const [showDoor, setShowDoor] = useState(enabled);
  const [hasEntered, setHasEntered] = useState(false);

  const handleComplete = useCallback(() => {
    setShowDoor(false);
    setHasEntered(true);
    // Store in session to not show again during this session
    sessionStorage.setItem('grimoire_entered', 'true');
  }, []);

  // Check if already entered this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const entered = sessionStorage.getItem('grimoire_entered');
      if (entered === 'true') {
        setShowDoor(false);
        setHasEntered(true);
      }
    }
  }, []);

  return {
    showDoor: showDoor && enabled,
    hasEntered,
    DoorComponent: showDoor ? (
      <BBSDoorEntry onComplete={handleComplete} />
    ) : null
  };
}

export default BBSDoorEntry;
