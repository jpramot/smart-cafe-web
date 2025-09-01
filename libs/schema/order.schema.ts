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
  userId: z.number(),
  createdAt: z.string(),
  status: z.string(),
  totalPrice: z.number(),
  //   items: z.array(
  //     z.object({
  //       menuId: z.number(),
  //       topping: z.array(z.number()).default([]),
  //       quantity: z.number().min(1),
  //     })
  //   ),
});

export const validateOrderResponse = (order: any): z.infer<typeof orderSchemaResponse> => {
  return orderSchemaResponse.parse(order);
};
