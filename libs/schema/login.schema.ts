import z from "zod";

export const loginSchema = z.object({
  username: z.string().trim().nonempty(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginResponseSchema = z.object({
  username: z.string().trim().nonempty(),
  role: z.enum(["USER", "BARISTA"]),
  token: z.string().trim().nonempty(),
});

// export const validateLogin = (login: any): z.infer<typeof loginSchema> => {
//   return loginSchema.parse(login);
// };

export const validateLoginResponse = (loginResponse: any): z.infer<typeof loginResponseSchema> => {
  return loginResponseSchema.parse(loginResponse);
};
