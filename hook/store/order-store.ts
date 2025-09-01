import { createOrder, getAllOrder, trackOrder } from "@/libs/apis/order";
import { CreateOrderBody, OrderResponse } from "@/types/order.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import cartStore from "./cart-store";

type OrderStore = {
  orders: OrderResponse[] | null;
  order: OrderResponse | null;
  createOrder: (orderData: CreateOrderBody) => Promise<{ id: number }>;
  trackOrder: (orderId: string) => Promise<void>;
  getAllOrder: () => Promise<void>;
};

const orderStore = (set: any) => ({
  orders: [] as OrderResponse[] | null,
  order: null as OrderResponse | null,
  createOrder: async (orderData: CreateOrderBody) => {
    const clearCart = cartStore.getState().clearCart;
    const data = await createOrder(orderData);
    clearCart();
    return { id: data.id };
  },
  trackOrder: async (orderId: string) => {
    const response = await trackOrder(orderId);
    set({ order: response });
  },
  getAllOrder: async () => {
    const response = await getAllOrder();

    set({ orders: response });
  },
});

export default create<OrderStore>()(persist(orderStore, { name: "order" }));
