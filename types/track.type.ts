import { trackFormSchema } from "@/libs/schema/track.schema";
import z from "zod";

export type TrackForm = z.infer<typeof trackFormSchema>;
