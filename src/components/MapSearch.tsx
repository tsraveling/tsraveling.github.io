"use client";

import { useEffect, useRef, useState } from "react";
import { GLASS } from "./MapHud";
import { Entity } from "@/types/mapTypes";

interface MapSearchProps {
  entities: Entity[];
  onNavigate: (x: number, y: number) => void;
  onClose: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

function getDisplayTitle(entity: Entity): string {
  return entity.title || (entity.type === "home" ? "Home" : "");
}

export default function MapSearch({ entities, onNavigate, onClose, onFocus, onBlur }: MapSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchable = entities.filter((e) => e.title || e.type === "home");

  const results = query
    ? searchable
        .filter((e) => getDisplayTitle(e).toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  // Clamp selectedIndex when results change
  useEffect(() => {
    setSelectedIndex((prev) => Math.min(prev, Math.max(results.length - 1, 0)));
  }, [results.length]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0) {
        const entity = results[selectedIndex];
        onNavigate(entity.x, entity.y);
        onClose();
      }
    }
  };

  function highlightMatch(title: string, q: string) {
    if (!q) return title;
    const idx = title.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <span className="font-bold">{title.slice(idx, idx + q.length)}</span>
        {title.slice(idx + q.length)}
      </>
    );
  }

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[50] w-80">
      <div className={`${GLASS} rounded-xl overflow-hidden`}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full bg-transparent px-4 py-3 text-[var(--text)] placeholder:text-[var(--text)]/40 outline-none text-sm"
        />
        {results.length > 0 && (
          <div className="border-t [border-color:var(--glass-border)]">
            {results.map((entity, i) => (
              <div
                key={entity.id}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                  i === selectedIndex
                    ? "[background-color:var(--glass-bg)]"
                    : "hover:[background-color:var(--glass-bg)]"
                }`}
                onMouseEnter={() => setSelectedIndex(i)}
                onClick={() => {
                  onNavigate(entity.x, entity.y);
                  onClose();
                }}
              >
                {highlightMatch(getDisplayTitle(entity), query)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
