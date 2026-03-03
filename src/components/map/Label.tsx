import type { LabelData } from "@/types/mapTypes";
import { MAP_COLOR_VAR } from "@/types/mapTypes";

const VARIANT_CLASSES: Record<NonNullable<LabelData["variant"]>, string> = {
  standard: "text-sm",
  secondary: "text-xs opacity-60",
  footnote: "text-[10px] opacity-40",
  title: "text-5xl font-semibold",
  section: "text-6xl font-semibold",
};

export default function Label({ label }: { label: LabelData }) {
  const variant = label.variant ?? "standard";
  return (
    <div
      className={`absolute select-none pointer-events-none ${VARIANT_CLASSES[variant]}`}
      style={{
        left: label.x,
        top: label.y,
        transform: "translate(-50%, -50%)",
        width: label.wrapWidth ?? undefined,
        whiteSpace: label.wrapWidth ? "normal" : "nowrap",
        color: MAP_COLOR_VAR[label.color ?? "white"],
      }}
    >
      {label.text}
    </div>
  );
}
