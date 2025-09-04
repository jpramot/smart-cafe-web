"use client";

import BaristaManagement from "@/components/barista/barista-management";
import BaristaDashBoard from "@/components/barista/barista-dashboard";
import orderStore from "@/hook/store/order-store";
import { useEffect, useTransition } from "react";
import DashboardLoading from "@/components/barista/dashboard-loading";
import userStore from "@/hook/store/user-store";
import toast from "react-hot-toast";

export default function BaristaPage() {
  const getAllOrder = orderStore((state) => state.getAllOrder);
  const isHydrated = userStore((state) => state.isHydrated);
  const orders = orderStore((state) => state.orders);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchOrders = () => {
      startTransition(async () => {
        try {
          await getAllOrder();
        } catch (error) {
          console.error(error);
          toast.error("Please try again");
        }
      });
    };
    fetchOrders();

    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [getAllOrder]);

  if (isPending || !isHydrated) {
    return <DashboardLoading />;
  }

  return (
    <div className="flex flex-col">
      {/* Stats Cards */}
      <BaristaDashBoard orders={orders} />

      {/* Orders Table */}
      <BaristaManagement orders={orders} />
    </div>
  );
}
