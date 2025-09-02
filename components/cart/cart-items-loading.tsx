export default function CartItemLoading() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse w-2/3 mx-auto">
      {/* Header/Title Area */}
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-6"></div>
      {/* Item Placeholder 1 */}
      <div className="flex items-start py-4 gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/12"></div>
      </div>
      <div className="h-px bg-gray-200 my-4"></div>
      {/* Item Placeholder 2 */}
      <div className="flex items-start py-4 gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/12"></div>
      </div>
      <div className="h-px bg-gray-200 my-4"></div>
      {/* Item Placeholder 3 */}
      <div className="flex items-start py-4 gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/12"></div>
      </div>
      {/* Total & Checkout Placeholder */}
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded w-1/6"></div>
        <div className="h-12 bg-green-200 rounded-lg w-1/4"></div>
      </div>
    </div>
  );
}
