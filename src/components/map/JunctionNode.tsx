import { Entity, getRadius } from "@/types/mapTypes";

const CONNECTION_COLOR = "rgba(255,255,255,0.8)";

export default function JunctionNode({ entity }: { entity: Entity }) {
  if (entity.title) {
    return (
      <div
        className="rounded-full border-2 bg-[#0a0a0a] grid place-items-center aspect-square"
        style={{ borderColor: CONNECTION_COLOR }}
      >
        <span
          className="text-xs font-semibold whitespace-nowrap px-3 pt-1"
          style={{ color: CONNECTION_COLOR }}
        >
          {entity.title}
        </span>
      </div>
    );
  }

  const diameter = getRadius(entity) * 2;
  return (
    <div
      className="rounded-full border-2 bg-transparent"
      style={{ width: diameter, height: diameter, borderColor: entity.color ?? "gray" }}
    />
  );
}
