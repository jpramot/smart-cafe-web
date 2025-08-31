import { toppingSchema } from "@/libs/schema/toppings.schema";
import z from "zod";

export type Topping = z.infer<typeof toppingSchema>;
