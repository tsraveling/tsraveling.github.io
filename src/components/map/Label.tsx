import type { LabelData } from "@/types/mapTypes";

const VARIANT_CLASSES: Record<NonNullable<LabelData["variant"]>, string> = {
  standard: "text-sm text-white",
  secondary: "text-xs text-gray-400",
  footnote: "text-[10px] text-gray-600",
  title: "text-lg text-white font-semibold",
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
      }}
    >
      {label.text}
    </div>
  );
}
