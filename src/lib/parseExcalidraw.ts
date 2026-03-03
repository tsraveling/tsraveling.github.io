import type { Entity, EntityType, Connection, LabelData, MapData, MapColor } from "@/types/mapTypes";

type ExcalidrawElement = {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth?: number;
  strokeColor?: string;
  fontSize?: number;
  text?: string;
  containerId?: string | null;
  boundElements?: { id: string; type: string }[] | null;
  link?: string | null;
  customData?: Record<string, unknown> | null;
  points?: number[][];
  isDeleted?: boolean;
};

type ExcalidrawFile = {
  elements: ExcalidrawElement[];
};

function entityTypeFromStrokeWidth(sw: number): EntityType {
  if (sw >= 3) return "home";
  if (sw >= 2) return "page";
  return "junction";
}

const HEX_TO_MAP_COLOR: Record<string, MapColor> = {
  "#e03131": "red",
  "#6741d9": "purple",
};

function mapColorFromHex(hex: string | undefined): MapColor {
  if (hex && HEX_TO_MAP_COLOR[hex]) return HEX_TO_MAP_COLOR[hex];
  return "white";
}

function connectionVariant(sw: number): "default" | "secondary" | "footnote" {
  if (sw >= 2) return "default";
  if (sw >= 1.5) return "secondary";
  return "footnote";
}

export function parseExcalidraw(file: ExcalidrawFile): MapData {
  const elements = file.elements.filter((el) => !el.isDeleted);

  const textById = new Map<string, ExcalidrawElement>();
  for (const el of elements) {
    if (el.type === "text") textById.set(el.id, el);
  }

  const entities: Entity[] = [];
  const connections: Connection[] = [];
  const labels: LabelData[] = [];

  for (const el of elements) {
    if (el.type === "ellipse") {
      const cx = el.x + el.width / 2;
      const cy = el.y + el.height / 2;
      const radius = el.width / 2;
      const type = entityTypeFromStrokeWidth(el.strokeWidth ?? 1);

      let title: string | undefined;
      const bound = el.boundElements ?? [];
      for (const ref of bound) {
        const txt = textById.get(ref.id);
        if (txt?.text) {
          title = txt.text;
          break;
        }
      }

      const custom = el.customData ?? {};
      const bgImage = custom.backgroundImage as string | undefined;
      const color = custom.color as string | undefined;

      entities.push({
        id: el.id,
        x: cx,
        y: cy,
        type,
        radius,
        ...(title ? { title } : undefined),
        ...(el.link ? { link: el.link } : undefined),
        ...(bgImage ? { backgroundImage: bgImage } : undefined),
        ...(color ? { color } : undefined),
      });
    } else if (el.type === "line" || el.type === "arrow") {
      const pts = el.points ?? [];
      if (pts.length < 2) continue;
      const first = pts[0];
      const last = pts[pts.length - 1];
      const connColor = mapColorFromHex(el.strokeColor);
      connections.push({
        ax: el.x + first[0],
        ay: el.y + first[1],
        bx: el.x + last[0],
        by: el.y + last[1],
        variant: connectionVariant(el.strokeWidth ?? 2),
        ...(connColor !== "white" ? { color: connColor } : undefined),
      });
    } else if (el.type === "text" && !el.containerId) {
      const fontSize = el.fontSize ?? 16;
      const variant = fontSize >= 36 ? "section" as const
        : fontSize >= 28 ? "title" as const
        : fontSize >= 14 ? "standard" as const
        : fontSize >= 10 ? "secondary" as const
        : "footnote" as const;
      const labelColor = mapColorFromHex(el.strokeColor);
      labels.push({
        text: el.text ?? "",
        x: el.x + el.width / 2,
        y: el.y + el.height / 2,
        wrapWidth: el.width,
        variant,
        ...(labelColor !== "white" ? { color: labelColor } : undefined),
      });
    }
  }

  return { entities, connections, labels };
}
