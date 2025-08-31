export default function LayoutLoading() {
  return (
    <div className="flex h-16 items-center justify-between px-6 animate-pulse">
      <div className="h-6 w-40 rounded bg-gray-300" /> {/* Skeleton Title */}
      <div className="h-8 w-20 rounded bg-gray-300" /> {/* Skeleton Button */}
    </div>
  );
}
