"use client";

import DotBackground from "@/components/DotBackground";
import MapHud from "@/components/MapHud";
import MapSearch from "@/components/MapSearch";
import MobileHud from "@/components/MobileHud";
import HomeNode from "@/components/map/HomeNode";
import JunctionNode from "@/components/map/JunctionNode";
import Label from "@/components/map/Label";
import NodeConnection from "@/components/map/NodeConnection";
import PageNode from "@/components/map/PageNode";
import { useInputActive } from "@/hooks/useInputActive";
import { useMapNav } from "@/hooks/useMapNav";
import { PARALLAX } from "@/lib/constants";
import { parseExcalidraw } from "@/lib/parseExcalidraw";
import { getRadius } from "@/types/mapTypes";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import excalidrawFile from "../generated/map.excalidraw.json";

const WORLD_SIZE = 4000;

export default function Page() {
  const { inputActive, register, unregister } = useInputActive();
  const { camera, zoom, transitioning, navigateTo } = useMapNav(WORLD_SIZE, inputActive);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);

  const data = parseExcalidraw(excalidrawFile);
  const half = WORLD_SIZE / 2;

  const homeEntity = data.entities.find((e) => e.type === "home");

  const goHome = useCallback(() => {
    if (homeEntity) navigateTo(homeEntity.x, homeEntity.y);
  }, [homeEntity, navigateTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (inputActive) return;
      const k = e.key.toLowerCase();
      if (k === "m") {
        setTheme(isDark ? "light" : "dark");
      } else if (k === "h") {
        goHome();
      } else if (e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDark, setTheme, goHome, inputActive]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-background relative cursor-default">
      <DotBackground offsetX={camera.x * PARALLAX} offsetY={camera.y * PARALLAX} vignette />

      {/* World */}
      <div
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px) scale(${zoom})`,
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
            const isExternal = entity.link!.startsWith("http");
            return (
              <a
                key={entity.id}
                href={entity.link}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="absolute block cursor-pointer group"
                style={{
                  left: entity.x,
                  top: entity.y,
                  transform: "translate(-50%, -50%)",
                  width: radius * 2,
                  height: radius * 2,
                }}
              >
                <div className="transition-[filter] duration-200 group-hover:drop-shadow-[0_0_16px_rgba(0,0,0,0.7)] dark:group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.3)]">
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

      {searchOpen && (
        <MapSearch
          entities={data.entities}
          onNavigate={(x, y) => {
            navigateTo(x, y);
            setSearchOpen(false);
          }}
          onClose={() => setSearchOpen(false)}
          onFocus={register}
          onBlur={unregister}
        />
      )}

      {isMobile ? (
        <MobileHud
          isDark={isDark}
          onHome={goHome}
          onSearch={() => setSearchOpen(true)}
          onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
        />
      ) : (
        <MapHud isDark={isDark} inputActive={inputActive} onHome={goHome} onSearch={() => setSearchOpen(true)} onToggleTheme={() => setTheme(isDark ? "light" : "dark")} />
      )}
    </div>
  );
}
