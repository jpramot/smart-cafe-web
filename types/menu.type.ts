import { menuSchema, menusSchema } from "@/libs/schema/menu.schema";
import z from "zod";

export type Menu = z.infer<typeof menuSchema>;

export type Menus = z.infer<typeof menusSchema>;
