import { useCallback } from "react";

export type ShareChannel = "MOBILE" | "WEB";
export type ShareResult = { status: ShareChannel } | { error: unknown };

export function useShare() {
  const share = useCallback(async (url: string): Promise<ShareResult> => {
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ url });
        return { status: "MOBILE" };
      } catch (e) {
        return { error: e };
      }
    }
    return { status: "WEB" };
  }, []);

  return share;
}
