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
      {/* Orbiting arc segments */}
      <svg
        className="absolute pointer-events-none text-black dark:text-white"
        style={{
          width: diameter + 16,
          height: diameter + 16,
          top: -8,
          left: -8,
        }}
        viewBox="-50 -50 100 100"
      >
        {/* Arc 1: 90° sweep, 20s, normal */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="20s"
            repeatCount="indefinite"
          />
          <path
            d="M 48 0 A 48 48 0 0 1 0 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.2"
          />
        </g>
        {/* Arc 2: 60° sweep, 30s, reverse */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360"
            to="0"
            dur="30s"
            repeatCount="indefinite"
          />
          <path
            d="M 48 0 A 48 48 0 0 1 24 41.569"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.15"
          />
        </g>
        {/* Arc 3: 45° sweep, 25s, normal */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="25s"
            repeatCount="indefinite"
          />
          <path
            d="M 48 0 A 48 48 0 0 1 33.941 33.941"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.1"
          />
        </g>
      </svg>
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
