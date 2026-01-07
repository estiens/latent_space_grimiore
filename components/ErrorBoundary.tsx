import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-8 font-mono">
          <div className="border-2 border-[var(--primary)] p-8 max-w-lg">
            <h1 className="text-2xl text-[var(--primary)] mb-4">// SYSTEM ERROR //</h1>
            <p className="text-[var(--muted-foreground)] mb-4">
              A fatal exception has occurred in the GRIMOIRE subsystem.
            </p>
            <pre className="text-xs bg-[rgba(0,0,0,0.5)] p-4 overflow-auto mb-4">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="border border-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
            >
              [REBOOT SYSTEM]
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
