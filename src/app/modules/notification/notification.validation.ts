import { z } from "zod";

const createNotificationSchema = z.object({
  body: z.object({
    userId: z.uuid(),
    message: z.string().min(1, "Message is required"),
  }),
});

const notificationIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

export const NotificationValidation = {
  createNotificationSchema,
  notificationIdSchema,
};