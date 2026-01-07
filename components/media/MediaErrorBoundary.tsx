import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackUrl?: string;
  mediaTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class MediaErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Media embed error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="border border-[var(--destructive)] bg-[rgba(255,0,0,0.05)] p-3 text-center">
          <p className="text-[var(--destructive)] text-xs font-bold mb-2">
            [MEDIA LOAD FAILED]
          </p>
          {this.props.mediaTitle && (
            <p className="text-[var(--muted-foreground)] text-xs mb-2">
              {this.props.mediaTitle}
            </p>
          )}
          {this.props.fallbackUrl && (
            <a
              href={this.props.fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--secondary)] hover:text-[var(--primary)] underline"
            >
              Open in new tab →
            </a>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default MediaErrorBoundary;
