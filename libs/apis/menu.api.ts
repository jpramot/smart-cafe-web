import { Menus, MenuWithToppings } from "@/types/menu.type";
import { validateMenus, validateMenuWithToppings } from "../schema/menu.schema";
import { api } from "./axios";

export const getAllMenu = async (): Promise<Menus> => {
  const { data } = await api.get("/menus");
  return validateMenus(data.menus);
};

export const getMenuById = async (id: number): Promise<MenuWithToppings | null> => {
  try {
    const { data } = await api.get(`/menus/${id}`);
    return validateMenuWithToppings(data);
  } catch (error) {
    throw error;
  }
};
