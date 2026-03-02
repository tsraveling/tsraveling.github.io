import { Entity, getRadius } from "@/types/mapTypes";

export default function HomeNode({ entity }: { entity: Entity }) {
  const diameter = getRadius(entity) * 2;
  return (
    <div className="relative" style={{ width: diameter, height: diameter }}>
      {/* Circle border — scales on hover */}
      <div
        className="absolute inset-0 rounded-full border-2 border-white/20 bg-gray-900 transition-transform duration-200 group-hover:scale-[1.12]"
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      />
      {/* Content — stays static */}
      <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
        {entity.backgroundImage && (
          <img
            src={entity.backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        )}
        {entity.title && (
          <span className="text-white text-6xl font-bold relative z-10" style={{ fontFamily: "Clarendon, serif" }}>
            {entity.title}
          </span>
        )}
      </div>
    </div>
  );
}
