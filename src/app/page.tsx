"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MOVE_SPEED = 8;
const WORLD_SIZE = 4000;

const nodes = [
  { id: 1, x: 0, y: 0, title: "🏠 Home!!", desc: "You start here.", color: "#6366f1" },
  { id: 2, x: -600, y: -400, title: "📝 Notes", desc: "A place for thoughts.", color: "#f59e0b" },
  { id: 3, x: 500, y: -350, title: "🎨 Projects", desc: "Things I'm building.", color: "#ec4899" },
  { id: 4, x: -400, y: 500, title: "📚 Reading", desc: "Books & articles.", color: "#10b981" },
  { id: 5, x: 700, y: 400, title: "🎵 Music", desc: "What I'm listening to.", color: "#8b5cf6" },
  { id: 6, x: -800, y: 100, title: "💡 Ideas", desc: "Half-baked brilliance.", color: "#f97316" },
  { id: 7, x: 200, y: 700, title: "🗺️ Travel", desc: "Places to go.", color: "#06b6d4" },
  { id: 8, x: -200, y: -800, title: "🧪 Experiments", desc: "Wild stuff.", color: "#ef4444" },
  { id: 9, x: 900, y: -100, title: "🤝 People", desc: "Connections.", color: "#84cc16" },
  { id: 10, x: -500, y: -700, title: "📷 Photos", desc: "Memories.", color: "#a855f7" },
  { id: 11, x: 400, y: -800, title: "🔧 Tools", desc: "Utilities I love.", color: "#14b8a6" },
  { id: 12, x: -900, y: -500, title: "🎮 Games", desc: "Fun & play.", color: "#e11d48" },
];

const edges = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [1, 9], [2, 8], [2, 10],
  [3, 6], [4, 8], [5, 11],
];

export default function Page() {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const keys = keysRef.current;
    let dx = 0, dy = 0;
    if (keys.has("w") || keys.has("arrowup")) dy += MOVE_SPEED;
    if (keys.has("s") || keys.has("arrowdown")) dy -= MOVE_SPEED;
    if (keys.has("a") || keys.has("arrowleft")) dx += MOVE_SPEED;
    if (keys.has("d") || keys.has("arrowright")) dx -= MOVE_SPEED;

    if (dx || dy) {
      setCamera((prev) => {
        const half = WORLD_SIZE / 2;
        return {
          x: Math.max(-half, Math.min(half, prev.x + dx)),
          y: Math.max(-half, Math.min(half, prev.y + dy)),
        };
      });
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const navKeys = new Set(["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"]);
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (navKeys.has(k)) { e.preventDefault(); keysRef.current.add(k); }
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

  const half = WORLD_SIZE / 2;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0a] relative cursor-default">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: `${camera.x % 40}px ${camera.y % 40}px`,
        }}
      />

      {/* World */}
      <div
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}
      >
        {/* Edges */}
        <svg
          className="absolute pointer-events-none"
          style={{ left: -half, top: -half, width: WORLD_SIZE, height: WORLD_SIZE }}
        >
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x + half}
              y1={nodes[a].y + half}
              x2={nodes[b].x + half}
              y2={nodes[b].y + half}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1.5}
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 bg-white/[0.04] rounded-2xl px-6 py-5 min-w-40 backdrop-blur-xl cursor-pointer transition-[border-color,box-shadow] duration-200 border"
            style={{ left: node.x, top: node.y, borderColor: `${node.color}44` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = node.color;
              e.currentTarget.style.boxShadow = `0 0 24px ${node.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${node.color}44`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="text-lg font-semibold text-white mb-1">{node.title}</div>
            <div className="text-[13px] text-white/50">{node.desc}</div>
          </div>
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
