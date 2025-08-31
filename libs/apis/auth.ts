import { LoginForm } from "@/types/login.type";
import { api } from "./axios";
import { validateLoginResponse } from "../schema/login.schema";

export const userLogin = async (loginData: LoginForm) => {
  const { data } = await api.post("/auth/user/login", loginData);
  return validateLoginResponse(data);
};

export const baristaLogin = async (loginData: LoginForm) => {
  try {
    const { data } = await api.post("/auth/barista/login", loginData);
    return validateLoginResponse(data);
  } catch (error) {
    throw error;
  }
};
