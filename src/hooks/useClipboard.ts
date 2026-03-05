import { useCallback, useRef } from "react";

const RESET_MS = 3000;

export function useClipboard() {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const clip = useCallback((text: string): Promise<void> => {
    clearTimeout(timerRef.current);
    navigator.clipboard.writeText(text);
    return new Promise((resolve) => {
      timerRef.current = setTimeout(resolve, RESET_MS);
    });
  }, []);

  return clip;
}
