import { useCallback, useEffect, useRef, useState } from "react";

const MOVE_SPEED = 8;

export function usePageNav(worldSize: number) {
  const half = worldSize / 2;

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [transitioning, setTransitioning] = useState(false);
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const navigateTo = useCallback((x: number, y: number) => {
    setTransitioning(true);
    setCamera({ x: -x, y: -y });
    setTimeout(() => setTransitioning(false), 500);
  }, []);

  const tick = useCallback(() => {
    const keys = keysRef.current;
    let dx = 0,
      dy = 0;
    if (keys.has("w") || keys.has("arrowup")) dy += MOVE_SPEED;
    if (keys.has("s") || keys.has("arrowdown")) dy -= MOVE_SPEED;
    if (keys.has("a") || keys.has("arrowleft")) dx += MOVE_SPEED;
    if (keys.has("d") || keys.has("arrowright")) dx -= MOVE_SPEED;

    if (dx || dy) {
      setCamera((prev) => ({
        x: Math.max(-half, Math.min(half, prev.x + dx)),
        y: Math.max(-half, Math.min(half, prev.y + dy)),
      }));
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [half]);

  useEffect(() => {
    const navKeys = new Set([
      "w", "a", "s", "d",
      "arrowup", "arrowdown", "arrowleft", "arrowright",
    ]);
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (navKeys.has(k)) {
        e.preventDefault();
        keysRef.current.add(k);
      }
    };
    const onUp = (e: KeyboardEvent) => keysRef.current.delete(e.key.toLowerCase());

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCamera((prev) => ({
        x: Math.max(-half, Math.min(half, prev.x - e.deltaX)),
        y: Math.max(-half, Math.min(half, prev.y - e.deltaY)),
      }));
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1 || !touchRef.current) return;
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - touchRef.current.x;
      const dy = t.clientY - touchRef.current.y;
      touchRef.current = { x: t.clientX, y: t.clientY };
      setCamera((prev) => ({
        x: Math.max(-half, Math.min(half, prev.x + dx)),
        y: Math.max(-half, Math.min(half, prev.y + dy)),
      }));
    };
    const onTouchEnd = () => {
      touchRef.current = null;
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return { camera, transitioning, navigateTo };
}
