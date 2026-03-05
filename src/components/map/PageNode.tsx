import { Entity, getRadius } from "@/types/mapTypes";

export default function PageNode({ entity }: { entity: Entity }) {
  const radius = getRadius(entity);
  const diameter = radius * 2;
  return (
    <div className="relative" style={{ width: diameter, height: diameter }}>
      {/* Circle border — scales on hover */}
      <div
        className="absolute inset-0 rounded-full border-2 border-white/20 bg-[#0a0a0a] transition-transform duration-200 group-hover:scale-[1.12]"
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
          <span
            className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold text-center z-10 px-2 pt-2"
          >
            <span style={{ maxWidth: diameter * 0.7 }}>{entity.title}</span>
          </span>
        )}
      </div>
    </div>
  );
}
