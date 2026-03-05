import { useCallback } from "react";

const COMPOSE_URL = "https://bsky.app/intent/compose";

function isMobile() {
  return navigator.share && /Mobi|Android/i.test(navigator.userAgent);
}

export function useBluesky() {
  const shareBs = useCallback(async (text: string) => {
    if (isMobile()) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled the share sheet — not an error
      }
    } else {
      const url = `${COMPOSE_URL}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);

  return { shareBs };
}
