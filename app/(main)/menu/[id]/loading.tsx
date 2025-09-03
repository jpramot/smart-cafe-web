export default function Loading() {
  return (
    <div className="p-6 flex justify-center w-[50%] mx-auto">
      <div className="max-w-6xl w-full space-y-6">
        <div className="text-center mb-8">
          <div className="h-8 w-1/3 bg-gray-300 rounded mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 items-stretch">
          <div className="flex flex-col justify-between shadow-lg rounded-2xl overflow-hidden p-4 animate-pulse">
            <div className="h-60 w-full bg-gray-300 rounded-lg mb-4"></div>

            <div className="space-y-2 mb-4">
              <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            </div>

            <div className="h-5 w-1/4 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
