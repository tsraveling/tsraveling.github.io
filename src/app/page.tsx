"use client";

import HomeNode from "@/components/map/HomeNode";
import JunctionNode from "@/components/map/JunctionNode";
import Label from "@/components/map/Label";
import NodeConnection from "@/components/map/NodeConnection";
import PageNode from "@/components/map/PageNode";
import { getRadius } from "@/types/mapTypes";
import { parseExcalidraw } from "@/lib/parseExcalidraw";
import { usePageNav } from "@/hooks/usePageNav";
import excalidrawFile from "../generated/map.excalidraw.json";

const WORLD_SIZE = 4000;

export default function Page() {
  const { camera, transitioning, navigateTo } = usePageNav(WORLD_SIZE);

  const data = parseExcalidraw(excalidrawFile);
  const half = WORLD_SIZE / 2;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0a] relative cursor-default">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: `${camera.x % 40}px ${camera.y % 40}px`,
          maskImage: "radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)",
        }}
      />

      {/* World */}
      <div
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px)`,
          transition: transitioning ? "transform 500ms cubic-bezier(0.22, 1.2, 0.36, 1)" : "none",
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
            {data.connections.map((conn, i) => (
              <NodeConnection
                key={i}
                ax={conn.ax + half}
                ay={conn.ay + half}
                bx={conn.bx + half}
                by={conn.by + half}
                variant={conn.variant ?? "default"}
                color={conn.color}
                onNavigate={(x, y) => navigateTo(x - half, y - half)}
              />
            ))}
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
          <Label key={i} label={label} />
        ))}
      </div>

      {/* HUD */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 items-center bg-white/[0.06] backdrop-blur-xl rounded-xl px-5 py-2.5 border border-white/[0.08]" style={{ opacity: 0, animation: "hud-slide-up 600ms cubic-bezier(0.22, 1.2, 0.36, 1) 200ms both" }}>
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
