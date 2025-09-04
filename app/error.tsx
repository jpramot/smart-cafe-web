"use client"; // error.tsx ต้องใช้ client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // log error ไป analytics / Sentry
    console.error("Caught error:", error);
  }, [error]);

  const handleReload = () => {
    reset(); // reset error boundary
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-6">Something went wrong.</p>

        <pre className="text-xs text-gray-500 mb-6 break-words">{error.message}</pre>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Retry
          </button>
          <button
            onClick={() => {
              reset();
              setTimeout(() => router.push("/"), 100);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
