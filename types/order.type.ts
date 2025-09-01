import { createOrderSchema, orderSchemaResponse } from "@/libs/schema/order.schema";
import z from "zod";

export type OrderResponse = z.infer<typeof orderSchemaResponse>;

export type CreateOrderBody = z.infer<typeof createOrderSchema>;
