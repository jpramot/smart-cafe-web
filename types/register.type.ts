import { authRegisterSchema } from "@/libs/schema/register.schema";
import z from "zod";

export type registerForm = z.infer<typeof authRegisterSchema>;
