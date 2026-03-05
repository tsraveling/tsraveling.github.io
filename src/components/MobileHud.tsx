"use client";

import { GLASS } from "./MapHud";

const btnClasses = `${GLASS} rounded-md px-3 py-1.5 text-[var(--text)]/60 text-[11px] font-semibold font-mono active:scale-95 transition-transform`;

interface MobileHudProps {
  isDark: boolean;
  onHome: () => void;
  onSearch: () => void;
  onToggleTheme: () => void;
}

export default function MobileHud({ isDark, onHome, onSearch, onToggleTheme }: MobileHudProps) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-[50]"
      style={{
        opacity: 0,
        animation: "hud-slide-up 600ms cubic-bezier(0.22, 1.2, 0.36, 1) 200ms both",
      }}
    >
      <div className={`glass rounded-xl px-3 py-2 flex gap-2`}>
        <button className={btnClasses} onClick={onHome}>
          Home
        </button>
        <button className={btnClasses} onClick={onSearch}>
          Search
        </button>
        <button className={btnClasses} onClick={onToggleTheme}>
          <span className={`inline-block w-3 h-3 rounded-full translate-y-0.5 ${isDark ? "bg-white" : "bg-black"}`} />
        </button>
      </div>
    </div>
  );
}
