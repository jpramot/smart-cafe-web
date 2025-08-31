import { Role } from "@/enum/role";
import { baristaLogin, userLogin } from "@/libs/apis/auth";
import { LoginForm } from "@/types/login.type";
import { isAxiosError } from "axios";
import { da } from "zod/locales";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  username: string;
  token: string;
  role: Role | null;
  isHydrated: boolean;
  login: (loginData: LoginForm, roleData: Role) => Promise<Role>;
  logout: () => void;
};

const userStore = (set: any): UserStore => ({
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
  logout() {
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
