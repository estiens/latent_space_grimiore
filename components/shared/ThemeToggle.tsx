import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 border-2 font-mono text-sm transition-all duration-300",
        theme === 'dark'
          ? "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] hover:shadow-[0_0_10px_var(--primary)]"
          : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] hover:shadow-[0_0_10px_var(--primary)]",
        className
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <span className="text-base">☀️</span>
          <span className="font-bold">LIGHT</span>
        </>
      ) : (
        <>
          <span className="text-base">🌙</span>
          <span className="font-bold">DARK</span>
        </>
      )}
    </button>
  );
}
