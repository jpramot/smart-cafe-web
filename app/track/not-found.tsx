import { Card } from "primereact/card";
import Link from "next/link";
import CustomLinkButton from "@/components/ui/custom-link-button";

export default function OrderNotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <Card className="text-center shadow-lg max-w-md w-full p-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Order Not Found</h1>
        <p className="text-gray-600 mb-6">
          The order you are looking for does not exist or has been removed.
        </p>
        <div className="flex justify-center">
          <CustomLinkButton
            label="Go to Home"
            href="/"
            className="font-semibold text-lg text-green-700"
          />
        </div>
      </Card>
    </div>
  );
}
