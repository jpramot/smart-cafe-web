"use client";

import BaristaManagement from "@/components/barista/barista-management";
import BaristaDashBoard from "@/components/barista/barista-dashboard";
import orderStore from "@/hook/store/order-store";
import { useEffect } from "react";

export default function BaristaPage() {
  const getAllOrder = orderStore((state) => state.getAllOrder);
  const orders = orderStore((state) => state.orders);

  useEffect(() => {
    (async () => {
      await getAllOrder();
    })();
  }, []);
  return (
    <div className="flex flex-col">
      {/* Stats Cards */}
      <BaristaDashBoard orders={orders} />

      {/* Orders Table */}
      <BaristaManagement />
    </div>
  );
}
