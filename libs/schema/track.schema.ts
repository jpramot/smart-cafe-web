import z from "zod";

export const trackFormSchema = z
  .object({
    orderId: z.string().trim().nonempty(),
  })
  .strict();
