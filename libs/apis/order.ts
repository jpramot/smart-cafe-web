import { CreateOrderBody } from "@/types/order.type";
import { api } from "./axios";
import { validateOrderResponse } from "../schema/order.schema";
import { ZodError } from "zod";

export const createOrder = async (orderData: CreateOrderBody) => {
  const { data } = await api.post("/orders", orderData);
  console.log(data);
  return validateOrderResponse(data);
};

export const trackOrder = async (orderId: string) => {
  try {
    const { data } = await api.get(`/orders?orderId=${orderId}`);
    console.log("data", data);
    return validateOrderResponse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("zod error: ", error);
      return null;
    }
    console.log(error);
    return null;
  }
};
