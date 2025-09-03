import z from "zod";

export const authRegisterSchema = z
  .object({
    username: z.string().trim().nonempty("Username is required"),
    password: z
      .string()
      .trim()
      .nonempty("password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .trim()
      .nonempty("password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const authRegisterResponseSchema = z.object({
  message: z.string(),
});

export const validateRegisterResponse = (
  registerResponse: unknown
): z.infer<typeof authRegisterResponseSchema> => {
  return authRegisterResponseSchema.parse(registerResponse);
};
