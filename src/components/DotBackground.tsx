"use client";

import { DOT_SIZE } from "@/lib/constants";

interface DotBackgroundProps {
  offsetX?: number;
  offsetY?: number;
  vignette?: boolean;
}

export default function DotBackground({ offsetX = 0, offsetY = 0, vignette = false }: DotBackgroundProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
        backgroundSize: `${DOT_SIZE}px ${DOT_SIZE}px`,
        backgroundPosition: `${offsetX % DOT_SIZE}px ${offsetY % DOT_SIZE}px`,
        ...(vignette
          ? {
              maskImage:
                "radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)",
            }
          : {}),
      }}
    />
  );
}
