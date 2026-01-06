import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface BBSLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function BBSLayout({ children, title = "DIGITAL GRIMOIRE", className }: BBSLayoutProps) {
  const [location] = useLocation();
  const [time, setTime] = useState(new Date());
  const [packetLoss, setPacketLoss] = useState("0.00%");

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate random packet loss
  useEffect(() => {
    const interval = setInterval(() => {
      const loss = Math.random() < 0.1 ? (Math.random() * 2).toFixed(2) : "0.00";
      setPacketLoss(`${loss}%`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <div className="min-h-screen flex flex-col font-mono text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] screen-flicker">
      {/* Top Status Bar */}
      <header className="border-b-2 border-[var(--primary)] bg-[var(--background)] p-2 sticky top-0 z-50 shadow-[0_0_15px_rgba(255,0,255,0.2)] neon-border">
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
            <span className="hidden lg:inline text-[var(--muted-foreground)]">{formatTime(time)}</span>
            <span className="hidden md:inline text-[var(--muted-foreground)]">│</span>
            <span className="status-online text-xs">MEM: 640K</span>
            <span className={cn(
              "text-xs",
              packetLoss === "0.00%" ? "status-online" : "status-warning"
            )}>
              PKT: {packetLoss}
            </span>
            <span className="hidden md:inline text-[var(--chart-3)]">USR: GUEST</span>
          </div>
        </div>
      </header>

      {/* ASCII Art Banner - Shows on larger screens */}
      <div className="hidden lg:block text-center text-[var(--primary)] text-xs py-1 border-b border-[var(--muted)] opacity-60">
        <pre className="inline-block">
{`═══════════════════════════════════════════════════════════════════════════════════
║  ▄▄▄█████▓ ██░ ██ ▓█████     ▄▄▄█████▓ ██▀███  ▓█████ ▓█████     ▒█████    █████▒║
║  ▓  ██▒ ▓▒▓██░ ██▒▓█   ▀     ▓  ██▒ ▓▒▓██ ▒ ██▒▓█   ▀ ▓█   ▀    ▒██▒  ██▒▓██   ▒ ║
║  ▒ ▓██░ ▒░▒██▀▀██░▒███       ▒ ▓██░ ▒░▓██ ░▄█ ▒▒███   ▒███      ▒██░  ██▒▒████ ░ ║
║  ░ ▓██▓ ░ ░▓█ ░██ ▒▓█  ▄     ░ ▓██▓ ░ ▒██▀▀█▄  ▒▓█  ▄ ▒▓█  ▄    ▒██   ██░░▓█▒  ░ ║
║    ▒██▒ ░ ░▓█▒░██▓░▒████▒      ▒██▒ ░ ░██▓ ▒██▒░▒████▒░▒████▒   ░ ████▓▒░░▒█░    ║
║    ▒ ░░    ▒ ░░▒░▒░░ ▒░ ░      ▒ ░░   ░ ▒▓ ░▒▓░░░ ▒░ ░░░ ▒░ ░   ░ ▒░▒░▒░  ▒ ░    ║
║      ░     ▒ ░▒░ ░ ░ ░  ░        ░      ░▒ ░ ▒░ ░ ░  ░ ░ ░  ░     ░ ▒ ▒░  ░      ║
║    ░       ░  ░░ ░   ░         ░        ░░   ░    ░      ░      ░ ░ ░ ▒   ░ ░    ║
╚═══════════════════════════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>

      {/* Breadcrumb / Path Display */}
      <div className="bg-[var(--card)] border-b border-[var(--muted)] px-4 py-1 text-xs text-[var(--muted-foreground)]">
        <span className="text-[var(--primary)]">C:\GRIMOIRE</span>
        <span className="text-[var(--foreground)]">{location.replace(/\//g, '\\').toUpperCase() || '\\'}</span>
        <span className="terminal-cursor"></span>
      </div>

      {/* Main Content Area */}
      <main className={cn("flex-1 container mx-auto p-4 md:p-8 relative noise-overlay", className)}>
        {/* Scanline Overlay for Content */}
        <div className="absolute inset-0 pointer-events-none interlace opacity-30 z-0"></div>

        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Bottom Command Bar */}
      <footer className="border-t-2 border-[var(--primary)] bg-[var(--background)] p-2 sticky bottom-0 z-50">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="flex gap-2 md:gap-4">
            <Link href="/">
              <span className={cn(
                "hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] px-2 py-1 transition-colors chromatic-shift",
                location === "/" && "bg-[var(--primary)] text-[var(--primary-foreground)]"
              )}>
                [F1] MAIN
              </span>
            </Link>
            <Link href="/archives">
              <span className={cn(
                "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] px-2 py-1 transition-colors chromatic-shift",
                location.startsWith("/archives") && "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
              )}>
                [F2] ARCHIVES
              </span>
            </Link>
            <Link href="/credits">
              <span className={cn(
                "hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] px-2 py-1 transition-colors chromatic-shift",
                location === "/credits" && "bg-[var(--accent)] text-[var(--accent-foreground)]"
              )}>
                [F3] CREDITS
              </span>
            </Link>
          </div>

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
