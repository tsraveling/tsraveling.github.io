import { Entity, getRadius } from "@/types/mapTypes";

export default function HomeNode({ entity }: { entity: Entity }) {
  const diameter = getRadius(entity) * 2;
  return (
    <div
      className="rounded-full border-2 border-white/20 bg-gray-900 flex items-center justify-center relative overflow-hidden"
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
        <span className="text-white text-6xl font-bold relative z-10" style={{ fontFamily: "Clarendon, serif" }}>
          {entity.title}
        </span>
      )}
    </div>
  );
}
