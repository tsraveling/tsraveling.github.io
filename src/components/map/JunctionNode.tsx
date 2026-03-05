import { Entity, getRadius } from "@/types/mapTypes";

const CONNECTION_COLOR = "rgba(255,255,255,0.8)";

export default function JunctionNode({ entity }: { entity: Entity }) {
  if (entity.title) {
    return (
      <div className="relative grid place-items-center aspect-square">
        {/* Circle border — scales on hover */}
        <div
          className="absolute inset-0 rounded-full border-2 bg-[#0a0a0a] transition-transform duration-200 group-hover:scale-[1.12]"
          style={{ borderColor: CONNECTION_COLOR, transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        />
        {/* Content — stays static */}
        <span
          className="text-xs font-semibold whitespace-nowrap px-3 pt-2 relative"
          style={{ color: CONNECTION_COLOR }}
        >
          {entity.title}
        </span>
      </div>
    );
  }

  const diameter = getRadius(entity) * 2;
  return (
    <div className="relative" style={{ width: diameter, height: diameter }}>
      <div
        className="absolute inset-0 rounded-full border-2 bg-transparent transition-transform duration-200 group-hover:scale-[1.12]"
        style={{ borderColor: entity.color ?? "gray", transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      />
    </div>
  );
}
