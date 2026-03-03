export type MapColor = "white" | "red" | "purple";

export const MAP_COLOR_VAR: Record<MapColor, string> = {
  white: "var(--map-color-white)",
  red: "var(--map-color-red)",
  purple: "var(--map-color-purple)",
};

export type EntityType = "home" | "junction" | "page";

export type Entity = {
  id: string;
  x: number;
  y: number;
  type: EntityType;
  title?: string;
  link?: string;
  radius?: number;
  backgroundImage?: string;
  color?: string;
};

export type Connection = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  variant?: "default" | "secondary" | "footnote";
  color?: MapColor;
};

export type LabelData = {
  text: string;
  x: number;
  y: number;
  wrapWidth?: number;
  variant?: "standard" | "secondary" | "footnote" | "title" | "section";
  color?: MapColor;
};

export type MapData = {
  entities: Entity[];
  connections: Connection[];
  labels: LabelData[];
};

// --- Helpers ---

export function getRadius(entity: Entity): number {
  if (entity.radius != null) return entity.radius;
  switch (entity.type) {
    case "home":
      return 150;
    case "junction":
      return 8;
    case "page":
      return 100;
  }
}
