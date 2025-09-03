import z from "zod";

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      menuId: z.number(),
      topping: z.array(z.number()).default([]),
      quantity: z.number().min(1),
    })
  ),
  totalPrice: z.number(),
});

export const orderSchemaResponse = z.object({
  id: z.number(),
  username: z.string(),
  createdAt: z.string(),
  status: z.enum(["PREPARING", "READY", "COMPLETED"]),
  totalPrice: z.number(),
  items: z.array(
    z.object({
      name: z.string(),
      toppings: z.array(z.object({ name: z.string(), price: z.number() })).default([]),
      quantity: z.number().min(1),
      price: z.number(),
    })
  ),
});

export const ordersSchemaResponse = z.array(orderSchemaResponse);

export const validateOrderResponse = (order: unknown): z.infer<typeof orderSchemaResponse> => {
  return orderSchemaResponse.parse(order);
};

export const validateOrdersResponse = (orders: unknown): z.infer<typeof ordersSchemaResponse> => {
  return ordersSchemaResponse.parse(orders);
};
