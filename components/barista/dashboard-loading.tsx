export default function DashboardLoading() {
  return (
    <section className="px-6 py-6 space-y-6">
      {/* Top dashboard skeleton */}
      <div className="animate-pulse space-y-4">
        {/* เงาใหญ่ */}
        <div className="h-28 bg-gray-200 rounded-2xl w-full"></div>
        {/* เงาเล็ก 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-24 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-24 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>

      {/* Bottom table skeleton */}
      <div className="animate-pulse border border-gray-300 rounded-lg p-4">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="h-6 bg-gray-200 rounded w-full mb-2"></div>
        ))}
      </div>
    </section>
  );
}
