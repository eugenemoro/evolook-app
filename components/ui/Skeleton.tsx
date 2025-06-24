export default function Skeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-80 bg-neutral-200 animate-pulse rounded-2xl"
        />
      ))}
    </div>
  );
}
