export default function JunctionNode({ color = "gray" }: { color?: string }) {
  return (
    <div
      className="w-4 h-4 rounded-full border-2 bg-transparent"
      style={{ borderColor: color }}
    />
  );
}
