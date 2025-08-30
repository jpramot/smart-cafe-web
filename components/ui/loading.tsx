import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Loader className="animate-spin text-green-700" size={50} />
    </div>
  );
}
