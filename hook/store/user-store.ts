import { Role } from "@/enum/role";
import { baristaLogin, userLogin } from "@/libs/apis/auth";
import { LoginForm } from "@/types/login.type";
import { isAxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  username: string;
  token: string;
  role: Role | null;
  login: (loginData: LoginForm, roleData: Role) => Promise<void>;
  logout: () => void;
};

const userStore = (set: any): UserStore => ({
  username: "",
  token: "",
  role: null,
  login: async (loginData: LoginForm, roleData: Role) => {
    let data;
    try {
      if (roleData === Role.USER) {
        data = await userLogin(loginData);
      } else {
        data = await baristaLogin(loginData);
      }
      set({ username: data.username, token: data.token, role: data.role });
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

export default create<UserStore>()(persist(userStore, { name: "user" }));
