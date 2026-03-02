import { Entity, getRadius } from "@/types/mapTypes";

export default function PageNode({ entity }: { entity: Entity }) {
  const radius = getRadius(entity);
  const diameter = radius * 2;
  return (
    <div
      className="rounded-full border-2 border-white/20 bg-[#0a0a0a] overflow-hidden flex items-center justify-center relative"
      style={{ width: diameter, height: diameter }}
    >
      {entity.backgroundImage && (
        <img
          src={entity.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {entity.title && (
        <span
          className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold text-center z-10 px-2 pt-1"
        >
          <span style={{ maxWidth: diameter * 0.7 }}>{entity.title}</span>
        </span>
      )}
    </div>
  );
}
