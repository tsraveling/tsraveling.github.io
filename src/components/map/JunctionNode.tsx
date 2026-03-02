import { Entity, getRadius } from "@/types/mapTypes";

export default function JunctionNode({ entity }: { entity: Entity }) {
  const diameter = getRadius(entity) * 2;
  return (
    <div
      className="rounded-full border-2 bg-transparent"
      style={{ width: diameter, height: diameter, borderColor: entity.color ?? "gray" }}
    />
  );
}
