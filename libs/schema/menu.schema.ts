import z from "zod";

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

export const validateMenus = (menus: any): z.infer<typeof menusSchema> => {
  return menusSchema.parse(menus);
};

export const validateMenu = (menu: any): z.infer<typeof menuSchema> => {
  return menuSchema.parse(menu);
};
