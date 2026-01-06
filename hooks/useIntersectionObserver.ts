import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefCallback<Element>;
  isInView: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver({
  threshold = 0.5,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<Element | null>(null);
  const frozen = useRef(false);

  const isInView = entry?.isIntersecting ?? false;

  // Freeze logic - once visible, stay visible
  useEffect(() => {
    if (freezeOnceVisible && isInView) {
      frozen.current = true;
    }
  }, [freezeOnceVisible, isInView]);

  useEffect(() => {
    // Skip if frozen
    if (frozen.current) return;

    // Skip if no node
    if (!node) return;

    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      // Fallback: assume visible
      setEntry({
        isIntersecting: true,
        intersectionRatio: 1
      } as IntersectionObserverEntry);
      return;
    }

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        if (!frozen.current) {
          setEntry(observerEntry);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, threshold, root, rootMargin]);

  // Callback ref pattern for flexibility
  const ref = useCallback((newNode: Element | null) => {
    setNode(newNode);
  }, []);

  return { ref, isInView, entry };
}

export default useIntersectionObserver;
