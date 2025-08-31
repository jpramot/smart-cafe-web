import { loginSchema } from "@/libs/schema/login.schema";
import z from "zod";

export type LoginForm = z.infer<typeof loginSchema>;
