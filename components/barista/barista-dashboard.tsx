"use client";

import { OrderResponse } from "@/types/order.type";
import DashboardCard from "./dashboard-card";

type BaristaDashBoardProps = {
  orders: OrderResponse[] | null;
};

export default function BaristaDashBoard({ orders }: BaristaDashBoardProps) {
  const filteredStatus = orders?.reduce(
    (acc, order) => {
      if (order.status === "PREPARING") {
        acc["PREPARING"] += 1;
      } else if (order.status === "READY") {
        acc["READY"] += 1;
      } else if (order.status === "COMPLETED") {
        acc["COMPLETED"] += 1;
      }
      return acc;
    },
    {
      PREPARING: 0,
      READY: 0,
      COMPLETED: 0,
    }
  );
  return (
    <section className="py-6 px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard title="Preparing" total={filteredStatus?.["PREPARING"] || 0} />
      <DashboardCard title="Ready" total={filteredStatus?.["READY"] || 0} />
      <DashboardCard title="Completed" total={filteredStatus?.["COMPLETED"] || 0} />
    </section>
  );
}
