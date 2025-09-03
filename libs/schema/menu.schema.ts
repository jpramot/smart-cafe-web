import z from "zod";
import { toppingSchema } from "./toppings.schema";

export const menuSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    image: z.string(),
    description: z.string(),
    category: z.string(),
  })
  .strict();

export const menusSchema = z.array(menuSchema);

export const menuWithToppingsSchema = z.object({
  menu: menuSchema,
  toppings: toppingSchema.array(),
});

export const validateMenus = (menus: unknown): z.infer<typeof menusSchema> => {
  return menusSchema.parse(menus);
};

export const validateMenu = (menu: unknown): z.infer<typeof menuSchema> => {
  return menuSchema.parse(menu);
};

export const validateMenuWithToppings = (menu: unknown): z.infer<typeof menuWithToppingsSchema> => {
  return menuWithToppingsSchema.parse(menu);
};
