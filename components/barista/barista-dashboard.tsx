"use client";

import { OrderResponse } from "@/types/order.type";
import { Card } from "primereact/card";

type BaristaDashBoardProps = {
  orders: OrderResponse[] | null;
};

export default function BaristaDashBoard({ orders }: BaristaDashBoardProps) {
  return (
    <section className="py-6 px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title={<h1 className="text-xl font-semibold">Preparing</h1>}
        className="border border-gray-200 rounded-md shadow-sm p-4 min-h-full"
      >
        <p className="text-2xl font-bold text-yellow-600 my-3">
          {orders?.filter((o) => o.status === "PREPARING").length || 0}
        </p>
        <p className="text-sm text-gray-500">Orders in progress</p>
      </Card>

      <Card
        title={<h1 className="text-xl font-semibold">Ready</h1>}
        className="border border-gray-200 rounded-md shadow-sm p-4"
      >
        <p className="text-2xl font-bold text-green-600 my-3">
          {orders?.filter((o) => o.status === "READY").length || 0}
        </p>
        <p className="text-sm text-gray-500">Ready for pickup</p>
      </Card>

      <Card
        title={<h1 className="text-xl font-semibold">Complete</h1>}
        className="border border-gray-200 rounded-md shadow-sm p-4"
      >
        <p className="text-2xl font-bold text-gray-600 my-3">
          {orders?.filter((o) => o.status === "COMPLETED").length || 0}
        </p>
        <p className="text-sm text-gray-500">Orders completed today</p>
      </Card>
    </section>
  );
}
