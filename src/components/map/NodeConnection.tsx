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
  aRadius,
  bx,
  by,
  bRadius,
  variant = "default",
  onNavigate,
}: {
  ax: number;
  ay: number;
  aRadius: number;
  bx: number;
  by: number;
  bRadius: number;
  variant?: Variant;
  onNavigate?: (x: number, y: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;

  const x1 = ax + ux * aRadius;
  const y1 = ay + uy * aRadius;
  const x2 = bx - ux * bRadius;
  const y2 = by - uy * bRadius;

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
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={style.stroke}
        strokeWidth={hovered ? style.strokeWidth + 1 : style.strokeWidth}
        style={{
          filter: hovered ? "drop-shadow(0 0 4px rgba(255,255,255,0.3))" : "none",
          transition: "stroke-width 150ms, filter 150ms",
        }}
      />
      {/* Invisible hitbox */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
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
