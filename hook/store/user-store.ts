import { Role } from "@/enum/role";
import { baristaLogin, getMe, userLogin } from "@/libs/apis/auth";
import { LoginForm } from "@/types/login.type";
import { ApiResponse } from "@/types/response.type";
import { isAxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import cartStore from "./cart-store";

type UserStore = {
  username: string;
  token: string;
  role: Role | null;
  isHydrated: boolean;
  login: (loginData: LoginForm, roleData: Role) => Promise<Role>;
  getMe: () => Promise<ApiResponse<{}, {}>>;
  logout: () => void;
  clearUser: () => void;
};

const userStore = (set: any, get: any): UserStore => ({
  username: "",
  token: "",
  role: null,
  isHydrated: false,
  login: async (loginData: LoginForm, roleData: Role) => {
    let data;
    try {
      if (roleData === Role.USER) {
        data = await userLogin(loginData);
      } else {
        data = await baristaLogin(loginData);
      }
      set({ username: data.username, token: data.token, role: data.role });
      if (data.role === Role.USER) {
        console.log("data.role", data.role);
        return Role.USER;
      } else {
        return Role.BARISTA;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        throw error;
      }
      throw new Error("Something went wrong");
    }
  },
  getMe: async () => {
    try {
      const data = await getMe();
      set({ username: data.username, token: data.token, role: data.role });
      return { success: true, message: "Get me successfully" };
    } catch (error) {
      if (isAxiosError(error)) {
        get().clearUser();
        const message = error.message;
        return { success: false, message };
      }
      return { success: false, message: "Get me fail" };
    }
  },
  logout() {
    const clearCart = cartStore.getState().clearCart;
    clearCart();
    set({ username: "", token: "", role: null });
  },
  clearUser: () => {
    set({ username: "", token: "", role: null });
  },
});

export default create<UserStore>()(
  persist(userStore, {
    name: "user",
    onRehydrateStorage: () => (state) => {
      if (state) state.isHydrated = true;
    },
  })
);
