import { createOrder, getAllOrder, trackOrder, updateOrderStatus } from "@/libs/apis/order";
import { CreateOrderBody, OrderResponse } from "@/types/order.type";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import cartStore from "./cart-store";
import { OrderStatus } from "@/enum/orderStatus";

type OrderStore = {
  orders: OrderResponse[] | null;
  order: OrderResponse | null;
  createOrder: (orderData: CreateOrderBody) => Promise<{ id: number }>;
  trackOrder: (orderId: string) => Promise<OrderResponse | null>;
  getAllOrder: () => Promise<void>;
  markAsReady: (id: number) => Promise<void>;
};

const orderStore: StateCreator<OrderStore> = (set) => ({
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
    return response;
  },
  getAllOrder: async () => {
    try {
      const response = await getAllOrder();
      set({ orders: response });
    } catch (error) {
      set({ orders: null });
      throw error;
    }
  },
  markAsReady: async (id: number) => {
    try {
      const body = { status: OrderStatus.READY };
      await updateOrderStatus(id, body);
      set((state: OrderStore) => {
        return {
          orders: state.orders?.map((order: OrderResponse) => {
            if (order.id === id) {
              return { ...order, status: OrderStatus.READY };
            }
            return order;
          }),
        };
      });
    } catch (error) {
      throw error;
    }
  },
});

export default create<OrderStore>()(persist(orderStore, { name: "order" }));
