import { Menus } from "@/types/menu.type";
import { validateMenus } from "../schema/menu.schema";
import { api } from "./axios";

export const getAllMenu = async (): Promise<Menus> => {
  try {
    const { data } = await api.get("/menus");
    return validateMenus(data.menus);
  } catch (error) {
    throw error;
  }
};
