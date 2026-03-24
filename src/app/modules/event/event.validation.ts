import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string(),
  time: z.string(),
  venue: z.string().optional(),
  isPublic: z.boolean(),
  registrationFee: z.number().min(0),
});