"use client";

import { useEffect, useState } from "react";

const GLASS = "backdrop-blur-xl border [background-color:var(--glass-bg)] [border-color:var(--glass-border)]";

interface MapHudProps {
  isDark: boolean;
}

export default function MapHud({ isDark }: MapHudProps) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t") {
        setExpanded((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2"
      style={{
        opacity: 0,
        animation: "hud-slide-up 600ms cubic-bezier(0.22, 1.2, 0.36, 1) 200ms both",
      }}
    >
      <div
        className={`relative overflow-hidden transition-all duration-300 ease-out ${GLASS} ${expanded
            ? "max-w-lg max-h-32 rounded-xl px-5 py-3"
            : "max-w-9 max-h-9 rounded-[18px] cursor-pointer"
          }`}
        onClick={!expanded ? () => setExpanded(true) : undefined}
      >
        <div
          className={`flex gap-6 items-start whitespace-nowrap transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0"
            }`}
        >
          <HudColumn label="Navigate">
            <div className="flex flex-col items-center gap-0.5">
              <Key label="W" />
              <div className="flex gap-0.5">
                <Key label="A" />
                <Key label="S" />
                <Key label="D" />
              </div>
            </div>
          </HudColumn>
          <HudColumn label="Home">
            <Key label="H" />
          </HudColumn>
          <HudColumn label="Search">
            <Key label="/" />
          </HudColumn>
          <HudColumn label={isDark ? "Light Mode" : "Dark Mode"}>
            <Key label="M" />
          </HudColumn>
          <HudColumn label="Hints">
            <Key label="T" />
          </HudColumn>
        </div>

        <span
          className={`absolute inset-0 flex items-center justify-center text-[var(--text)]/40 text-sm font-semibold transition-opacity duration-200 ${expanded ? "opacity-0" : "opacity-100"
            }`}
        >
          ?
        </span>
      </div>
    </div>
  );
}

function HudColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[var(--text)]/40 text-[11px] whitespace-nowrap">{label}</span>
      {children}
    </div>
  );
}

function Key({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md [background-color:var(--glass-bg)] border [border-color:var(--glass-border)] text-[var(--text)]/60 text-[11px] font-semibold font-mono">
      {label}
    </span>
  );
}
