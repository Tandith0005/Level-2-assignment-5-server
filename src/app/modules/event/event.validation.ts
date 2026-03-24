import { z } from "zod";
import { EventType } from "../../../generated/client/enums.js";

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must be a valid ISO string (e.g., 2026-03-30T00:00:00Z)",
    }),
    venue: z.string().optional(),
    type: z.enum(EventType), 
    registrationFee: z.number().min(0, "Fee cannot be negative"),
  }),
});

export const EventValidation = {
  createEventSchema,
};