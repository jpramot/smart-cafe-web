import { LoginForm } from "@/types/login.type";
import { api } from "./axios";
import { validateLoginResponse } from "../schema/login.schema";
import { registerForm } from "@/types/register.type";
import { validateRegisterResponse } from "../schema/register.schema";

export const userRegister = async (registerData: registerForm) => {
  const { data } = await api.post("/auth/user/register", registerData);
  return validateRegisterResponse(data);
};

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

export const getMe = async () => {
  try {
    const { data } = await api.get("/auth/user/me");
    return validateLoginResponse(data);
  } catch (error) {
    throw error;
  }
};
