import { CreateOrderBody } from "@/types/order.type";
import { api } from "./axios";
import { validateOrderResponse, validateOrdersResponse } from "../schema/order.schema";
import { ZodError } from "zod";
import { OrderStatus } from "@/enum/orderStatus";

export const createOrder = async (orderData: CreateOrderBody) => {
  const { data } = await api.post("/orders", orderData);
  console.log(data);
  return validateOrderResponse(data);
};

export const trackOrder = async (orderId: string) => {
  try {
    const { data } = await api.get(`/orders?orderId=${orderId}`);
    return validateOrderResponse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
    console.log(error);
    return null;
  }
};

export const getAllOrder = async () => {
  try {
    const { data } = await api.get("/orders/all");
    console.log(data);
    return validateOrdersResponse(data.orders);
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
    return null;
  }
};

export const updateOrderStatus = async (orderId: number, status: { status: OrderStatus }) => {
  try {
    const { data } = await api.patch(`/orders/${orderId}`, status);
    console.log(data);
    return validateOrderResponse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return null;
    }
    return null;
  }
};
