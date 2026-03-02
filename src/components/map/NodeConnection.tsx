"use client";

import { useState, useCallback } from "react";

type Variant = "default" | "secondary" | "footnote";

const VARIANT_STYLES: Record<Variant, { stroke: string; strokeWidth: number }> = {
  default: { stroke: "rgba(255,255,255,0.8)", strokeWidth: 2 },
  secondary: { stroke: "rgba(156,163,175,0.8)", strokeWidth: 1.5 },
  footnote: { stroke: "rgba(55,65,81,0.8)", strokeWidth: 1 },
};

export default function NodeConnection({
  ax,
  ay,
  bx,
  by,
  variant = "default",
  onNavigate,
}: {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  variant?: Variant;
  onNavigate?: (x: number, y: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const style = VARIANT_STYLES[variant];

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGLineElement>) => {
      if (!onNavigate) return;
      const svg = e.currentTarget.ownerSVGElement;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      const clickX = svgPt.x;
      const clickY = svgPt.y;

      const distToA = Math.hypot(clickX - ax, clickY - ay);
      const distToB = Math.hypot(clickX - bx, clickY - by);

      if (distToA > distToB) {
        onNavigate(ax, ay);
      } else {
        onNavigate(bx, by);
      }
    },
    [ax, ay, bx, by, onNavigate]
  );

  return (
    <g>
      {/* Visible line */}
      <line
        x1={ax}
        y1={ay}
        x2={bx}
        y2={by}
        stroke={style.stroke}
        strokeWidth={hovered ? style.strokeWidth + 1 : style.strokeWidth}
        style={{
          filter: hovered ? "drop-shadow(0 0 4px rgba(255,255,255,0.3))" : "none",
          transition: "stroke-width 150ms, filter 150ms",
        }}
      />
      {/* Invisible hitbox */}
      <line
        x1={ax}
        y1={ay}
        x2={bx}
        y2={by}
        stroke="transparent"
        strokeWidth={12}
        className="cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      />
    </g>
  );
}
