export default function PageNode({
  size = 200,
  title,
  backgroundImage,
}: {
  size?: number;
  title?: string;
  backgroundImage?: string;
}) {
  return (
    <div
      className="rounded-full border-2 border-white/20 bg-white/5 overflow-hidden flex items-center justify-center relative"
      style={{ width: size, height: size }}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {title && (
        <span
          className="text-white text-lg font-semibold text-center relative z-10 px-2"
          style={{ maxWidth: size * 0.7 }}
        >
          {title}
        </span>
      )}
    </div>
  );
}
