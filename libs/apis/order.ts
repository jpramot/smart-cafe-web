import { CreateOrderBody } from "@/types/order.type";
import { api } from "./axios";
import { validateOrderResponse } from "../schema/order.schema";

export const createOrder = async (orderData: CreateOrderBody) => {
  const { data } = await api.post("/orders", orderData);
  console.log(data.order);
  return validateOrderResponse(data.order);
};
