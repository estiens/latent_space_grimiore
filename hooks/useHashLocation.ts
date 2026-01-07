import { useSyncExternalStore, useCallback } from 'react';

const currentHashLocation = () => {
  const hash = window.location.hash;
  return hash ? hash.slice(1) : '/';
};

const subscribeToHash = (callback: () => void) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};

export function useHashLocation(): [string, (to: string) => void] {
  const location = useSyncExternalStore(
    subscribeToHash,
    currentHashLocation,
    () => '/' // SSR fallback
  );

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return [location, navigate];
}
