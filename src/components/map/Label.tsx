type Variant = "standard" | "secondary" | "footnote" | "title";

const VARIANT_CLASSES: Record<Variant, string> = {
  standard: "text-sm text-white",
  secondary: "text-xs text-gray-400",
  footnote: "text-[10px] text-gray-600",
  title: "text-lg text-white font-semibold",
};

export default function Label({
  text,
  x,
  y,
  wrapWidth,
  variant = "standard",
}: {
  text: string;
  x: number;
  y: number;
  wrapWidth?: number;
  variant?: Variant;
}) {
  return (
    <div
      className={`absolute select-none pointer-events-none ${VARIANT_CLASSES[variant]}`}
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        maxWidth: wrapWidth,
        whiteSpace: wrapWidth ? "normal" : "nowrap",
      }}
    >
      {text}
    </div>
  );
}
