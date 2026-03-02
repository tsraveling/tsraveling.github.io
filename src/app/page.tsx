"use client";

import HomeNode from "@/components/map/HomeNode";
import JunctionNode from "@/components/map/JunctionNode";
import Label from "@/components/map/Label";
import NodeConnection from "@/components/map/NodeConnection";
import PageNode from "@/components/map/PageNode";
import { MapData, entityById, getRadius } from "@/types/mapTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import mapData from "../../public/map.json";

const MOVE_SPEED = 8;
const WORLD_SIZE = 4000;

export default function Page() {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [transitioning, setTransitioning] = useState(false);
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);

  const data = mapData as MapData;
  const lookup = entityById(data.entities);
  const half = WORLD_SIZE / 2;

  // SECTION: Navigation

  const navigateTo = useCallback((x: number, y: number) => {
    setTransitioning(true);
    setCamera({ x: -x, y: -y });
    setTimeout(() => setTransitioning(false), 400);
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

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // SECTION: Render

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0a] relative cursor-default">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: `${camera.x % 40}px ${camera.y % 40}px`,
        }}
      />

      {/* World */}
      <div
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px)`,
          transition: transitioning ? "transform 400ms ease-out" : "none",
        }}
      >
        {/* Connections SVG layer */}
        <svg
          className="absolute"
          style={{
            left: -half,
            top: -half,
            width: WORLD_SIZE,
            height: WORLD_SIZE,
            pointerEvents: "none",
          }}
        >
          <g style={{ pointerEvents: "auto" }}>
            {data.connections.map((conn) => {
              const ea = lookup.get(conn.a);
              const eb = lookup.get(conn.b);
              if (!ea || !eb) return null;
              return (
                <NodeConnection
                  key={`${conn.a}-${conn.b}`}
                  ax={ea.x + half}
                  ay={ea.y + half}
                  aRadius={getRadius(ea)}
                  bx={eb.x + half}
                  by={eb.y + half}
                  bRadius={getRadius(eb)}
                  variant={conn.variant ?? "default"}
                  onNavigate={(x, y) => navigateTo(x - half, y - half)}
                />
              );
            })}
          </g>
        </svg>

        {/* Entity nodes */}
        {data.entities.map((entity) => {
          const radius = getRadius(entity);
          const isInteractive = !!entity.link;

          const nodeContent =
            entity.type === "home" ? <HomeNode entity={entity} /> :
            entity.type === "junction" ? <JunctionNode entity={entity} /> :
            entity.type === "page" ? <PageNode entity={entity} /> : null;

          if (isInteractive) {
            return (
              <a
                key={entity.id}
                href={entity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute block cursor-pointer group"
                style={{
                  left: entity.x,
                  top: entity.y,
                  transform: "translate(-50%, -50%)",
                  width: radius * 2,
                  height: radius * 2,
                }}
              >
                <div className="transition-[filter] duration-200 group-hover:[filter:drop-shadow(0_0_16px_rgba(255,255,255,0.3))]">
                  {nodeContent}
                </div>
              </a>
            );
          }

          return (
            <div
              key={entity.id}
              className="absolute"
              style={{
                left: entity.x,
                top: entity.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {nodeContent}
            </div>
          );
        })}

        {/* Labels */}
        {data.labels.map((label, i) => (
          <Label
            key={i}
            text={label.text}
            x={label.x}
            y={label.y}
            wrapWidth={label.wrapWidth}
            variant={label.variant}
          />
        ))}
      </div>

      {/* HUD */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 items-center bg-white/[0.06] backdrop-blur-xl rounded-xl px-5 py-2.5 border border-white/[0.08]">
        <span className="text-white/40 text-[13px]">Navigate</span>
        <div className="flex flex-col items-center gap-0.5">
          <Key label="W" />
          <div className="flex gap-0.5">
            <Key label="A" />
            <Key label="S" />
            <Key label="D" />
          </div>
        </div>
        <span className="text-white/25 text-xs">
          ({Math.round(-camera.x)}, {Math.round(-camera.y)})
        </span>
      </div>
    </div>
  );
}

function Key({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/[0.08] border border-white/[0.12] text-white/60 text-[11px] font-semibold font-mono">
      {label}
    </span>
  );
}
