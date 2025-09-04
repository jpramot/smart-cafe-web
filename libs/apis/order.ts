import { CreateOrderBody } from "@/types/order.type";
import { api } from "./axios";
import { validateOrderResponse, validateOrdersResponse } from "../schema/order.schema";
import { OrderStatus } from "@/enum/orderStatus";
import { isAxiosError } from "axios";

export const createOrder = async (orderData: CreateOrderBody) => {
  const { data } = await api.post("/orders", orderData);
  return validateOrderResponse(data);
};

export const trackOrder = async (orderId: string) => {
  try {
    const { data } = await api.get(`/orders?orderId=${orderId}`);
    return validateOrderResponse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
    throw error;
  }
};

export const getAllOrder = async () => {
  const { data } = await api.get("/orders/all");
  return validateOrdersResponse(data.orders);
};

export const updateOrderStatus = async (orderId: number, status: { status: OrderStatus }) => {
  const { data } = await api.patch(`/orders/${orderId}`, status);
  return validateOrderResponse(data);
};
