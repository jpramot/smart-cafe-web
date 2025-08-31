import z from "zod";

export const loginSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// export const validateLogin = (login: any): z.infer<typeof loginSchema> => {
//   return loginSchema.parse(login);
// };
