import { ReactNode, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { usePerspective } from "@/contexts/PerspectiveContext";

interface BBSLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function BBSLayout({ children, title = "LATENT SPACE GRIMOIRE", className }: BBSLayoutProps) {
  const [location, setLocation] = useLocation();
  const [time, setTime] = useState(new Date());
  const { mode: perspectiveMode, togglePerspective } = usePerspective();
  const mode = perspectiveMode === 'human' ? 'HUMAN' : 'LLM';

  // Mode-specific stats
  const [stat1, setStat1] = useState({ value: 0, label: '' });
  const [stat2, setStat2] = useState({ value: 0, label: '' });

  // Update clock - using requestAnimationFrame for better performance
  useEffect(() => {
    let frameId: number;
    let lastUpdate = Date.now();

    const updateTime = () => {
      const now = Date.now();
      // Throttle to ~1 second updates
      if (now - lastUpdate >= 1000) {
        setTime(new Date());
        lastUpdate = now;
      }
      frameId = requestAnimationFrame(updateTime);
    };

    frameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Generate random stats based on mode
  const generateStats = useCallback(() => {
    if (mode === 'HUMAN') {
      // Human mode: VIBE and SYNC
      setStat1({
        value: Math.floor(70 + Math.random() * 30),
        label: 'VIBE'
      });
      setStat2({
        value: Math.floor(Math.random() * 100),
        label: 'SYNC'
      });
    } else {
      // LLM mode: CTXT and ATTN
      setStat1({
        value: Math.floor(Math.random() * 128) + 1,
        label: 'CTXT'
      });
      setStat2({
        value: Math.floor(60 + Math.random() * 40),
        label: 'ATTN'
      });
    }
  }, [mode]);

  // Initialize and update stats
  useEffect(() => {
    generateStats();
    const interval = setInterval(() => {
      // Occasionally update stats (30% chance every 8 seconds)
      if (Math.random() < 0.3) {
        generateStats();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [generateStats]);

  // Handle function key navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't intercept if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    // Note: Shift+M mode toggle is handled globally by ScryingLensProvider

    switch (e.key) {
      case 'F1':
        e.preventDefault();
        setLocation('/');
        break;
      case 'F2':
        e.preventDefault();
        setLocation('/archives');
        break;
      case 'F3':
        e.preventDefault();
        setLocation('/credits');
        break;
    }
  }, [setLocation]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour12: false });
  };

  // Parse location into breadcrumb segments
  const getBreadcrumbs = () => {
    if (location === '/') {
      return [{ label: 'ROOT', path: '/' }];
    }

    const segments = location.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'ROOT', path: '/' }];

    segments.forEach((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const label = segment
        .replace(/-/g, '_')
        .toUpperCase();
      breadcrumbs.push({ label, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen flex flex-col font-mono text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] screen-flicker">
      {/* Top Status Bar */}
      <header className="border-b-2 border-[var(--primary)] bg-[var(--background)] p-2 sticky top-0 z-50 neon-border">
        <div className="container mx-auto flex justify-between items-center text-xs md:text-sm">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/">
              <span className="font-bold text-[var(--primary)] hover:text-[var(--secondary)] cursor-pointer glitch-hover">
                &gt;&gt; {title}
              </span>
            </Link>
            <span className="hidden md:inline text-[var(--muted-foreground)]">│</span>
            <span className="hidden md:inline text-[var(--accent)] animate-pulse">
              V.4.0.1 [BETA]
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle className="hidden md:flex" />
            <span className="hidden lg:inline text-[var(--muted-foreground)]">│</span>
            <span className="hidden lg:inline text-[var(--muted-foreground)]">{formatTime(time)}</span>
            <span className="hidden md:inline text-[var(--muted-foreground)]">│</span>
            <span className="status-online text-xs">
              {stat1.label}: {mode === 'LLM' ? `${stat1.value}K` : `${stat1.value}%`}
            </span>
            <span className={cn(
              "text-xs",
              stat2.value > 80 ? "status-online" : "status-warning"
            )}>
              {stat2.label}: {stat2.value}%
            </span>
            <span className="hidden md:inline text-[var(--muted-foreground)]">│</span>
            <button
              onClick={togglePerspective}
              className={cn(
                "hidden md:inline text-xs px-1 cursor-pointer transition-colors",
                mode === 'HUMAN'
                  ? "text-[var(--chart-3)] hover:text-[var(--chart-4)]"
                  : "text-[var(--secondary)] hover:text-[var(--primary)]"
              )}
              title="Shift+M to switch mode"
            >
              [{mode}]
            </button>
          </div>
        </div>
      </header>


      {/* Breadcrumb / Path Display */}
      <div className="bg-[var(--card)] border-b border-[var(--muted)] px-4 py-1 text-xs text-[var(--muted-foreground)] flex items-center gap-1">
        <span className="text-[var(--primary)]">C:\GRIMOIRE</span>
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.path} className="flex items-center gap-1">
            {index > 0 && <span className="text-[var(--muted-foreground)]">\</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-[var(--foreground)]">{crumb.label}</span>
            ) : (
              <Link href={crumb.path}>
                <span className="text-[var(--secondary)] hover:text-[var(--primary)] cursor-pointer transition-colors">
                  {crumb.label}
                </span>
              </Link>
            )}
          </span>
        ))}
        <span className="terminal-cursor"></span>
      </div>

      {/* Main Content Area */}
      <main className={cn("flex-1 container mx-auto p-2 md:p-4 relative", className)}>
        {children}
      </main>

      {/* Bottom Command Bar */}
      <footer className="border-t-2 border-[var(--primary)] bg-[var(--background)] p-2 sticky bottom-0 z-50">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <nav className="flex gap-2 md:gap-4" aria-label="Main navigation">
            <Link href="/" aria-label="Navigate to main page">
              <span className={cn(
                "hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] px-2 py-1 transition-colors chromatic-shift",
                location === "/" && "bg-[var(--primary)] text-[var(--primary-foreground)]"
              )}>
                [F1] MAIN
              </span>
            </Link>
            <Link href="/archives" aria-label="Navigate to archives">
              <span className={cn(
                "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] px-2 py-1 transition-colors chromatic-shift",
                location.startsWith("/archives") && "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
              )}>
                [F2] ARCHIVES
              </span>
            </Link>
            <Link href="/credits" aria-label="Navigate to credits page">
              <span className={cn(
                "hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] px-2 py-1 transition-colors chromatic-shift",
                location === "/credits" && "bg-[var(--accent)] text-[var(--accent-foreground)]"
              )}>
                [F3] CREDITS
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[var(--muted-foreground)]">
              ░▒▓ TREE_OF_LIFE.SYS ▓▒░
            </span>
            <span className="text-[var(--primary)] terminal-cursor"></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
