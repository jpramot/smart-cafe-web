import { api } from "./axios";

export const createOrder = async () => {
  const { data } = await api.post("/orders");
  return data;
};
