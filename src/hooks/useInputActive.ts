import { useCallback, useRef, useSyncExternalStore } from "react";

/**
 * Tracks whether any text input is currently active (focused).
 * Components call `register()` on focus and `unregister()` on blur.
 * Consumers read `inputActive` to suppress global keyboard shortcuts.
 */
export function useInputActive() {
  const countRef = useRef(0);
  const listenersRef = useRef(new Set<() => void>());

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const getSnapshot = useCallback(() => countRef.current > 0, []);

  const inputActive = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const register = useCallback(() => {
    countRef.current++;
    listenersRef.current.forEach((cb) => cb());
  }, []);

  const unregister = useCallback(() => {
    countRef.current = Math.max(0, countRef.current - 1);
    listenersRef.current.forEach((cb) => cb());
  }, []);

  return { inputActive, register, unregister };
}
