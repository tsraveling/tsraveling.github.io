import { Entity, getRadius } from "@/types/mapTypes";

export default function HomeNode({ entity }: { entity: Entity }) {
  const diameter = getRadius(entity) * 2;
  return (
    <div
      className="rounded-full border-2 border-white/20 bg-gray-900 flex items-center justify-center"
      style={{ width: diameter, height: diameter }}
    >
      <span className="text-white text-6xl font-bold" style={{ fontFamily: "Clarendon, serif" }}>
        TSR
      </span>
    </div>
  );
}
