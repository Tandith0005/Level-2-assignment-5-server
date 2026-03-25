import { z } from "zod";

const uuidSchema = z.uuid("Invalid ID format");

const sendInvitationSchema = z.object({
  params: z.object({
    eventId: uuidSchema,
  }),
  body: z.object({
    invitedUserId: uuidSchema,
  }),
});

const invitationActionSchema = z.object({
  params: z.object({
    invitationId: uuidSchema,
  }),
});

export const InvitationValidation = {
  sendInvitationSchema,
  invitationActionSchema,
};