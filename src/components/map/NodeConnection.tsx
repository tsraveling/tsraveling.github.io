"use client";

import { useState, useCallback, useRef } from "react";

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
  // "a" means pulse travels toward A, "b" toward B
  const [pulseDirection, setPulseDirection] = useState<"a" | "b" | null>(null);
  const svgRef = useRef<SVGGElement>(null);

  const style = VARIANT_STYLES[variant];

  const lineLen = Math.hypot(bx - ax, by - ay);
  const deadZone = lineLen * 0.05;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGLineElement>) => {
      const svg = e.currentTarget.ownerSVGElement;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());

      const distToA = Math.hypot(svgPt.x - ax, svgPt.y - ay);
      const distToB = Math.hypot(svgPt.x - bx, svgPt.y - by);

      const diff = Math.abs(distToA - distToB);
      if (diff < deadZone) return; // dead zone — keep current direction

      // Near B → navigate to A → pulse travels B→A (toward A)
      const dir = distToB < distToA ? "a" : "b";
      setPulseDirection(dir);
    },
    [ax, ay, bx, by, deadZone]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGLineElement>) => {
      if (!onNavigate) return;
      const svg = e.currentTarget.ownerSVGElement;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());

      const distToA = Math.hypot(svgPt.x - ax, svgPt.y - ay);
      const distToB = Math.hypot(svgPt.x - bx, svgPt.y - by);

      if (distToA > distToB) {
        onNavigate(ax, ay);
      } else {
        onNavigate(bx, by);
      }
    },
    [ax, ay, bx, by, onNavigate]
  );

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setPulseDirection(null);
  }, []);

  // Pulse: start from the opposite end, travel toward the nav target
  const pulseFromX = pulseDirection === "a" ? bx : ax;
  const pulseFromY = pulseDirection === "a" ? by : ay;
  const pulseToX = pulseDirection === "a" ? ax : bx;
  const pulseToY = pulseDirection === "a" ? ay : by;

  return (
    <g ref={svgRef}>
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

      {/* Pulse dot */}
      {hovered && pulseDirection && (
        <circle
          key={pulseDirection}
          r={3}
          fill="white"
          opacity={0.9}
          style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))" }}
        >
          <animate
            attributeName="cx"
            from={String(pulseFromX)}
            to={String(pulseToX)}
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from={String(pulseFromY)}
            to={String(pulseToY)}
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0.9;0"
            keyTimes="0;0.1;0.8;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Invisible hitbox */}
      <line
        x1={ax}
        y1={ay}
        x2={bx}
        y2={by}
        stroke="transparent"
        strokeWidth={12}
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
    </g>
  );
}
