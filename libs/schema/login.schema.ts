import { Role } from "@/enum/role";
import z from "zod";

export const loginSchema = z.object({
  username: z.string().trim().nonempty("Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginResponseSchema = z.object({
  username: z.string().trim().nonempty(),
  role: z.enum(Role),
  token: z.string().trim().nonempty(),
});

export const validateLoginResponse = (
  loginResponse: unknown
): z.infer<typeof loginResponseSchema> => {
  return loginResponseSchema.parse(loginResponse);
};
