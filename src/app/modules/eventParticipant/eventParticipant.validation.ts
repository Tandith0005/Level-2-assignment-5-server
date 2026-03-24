import { z } from "zod";

const joinEventSchema = z.object({
  params: z.object({
    eventId: z.uuid("Invalid event ID format"),
  }),
});

const participantActionSchema = z.object({
  params: z.object({
    eventId: z.uuid("Invalid event ID format"),
    participantId: z.uuid("Invalid participant ID format"),
  }),
});

export const EventParticipantValidation = {
  joinEventSchema,
  participantActionSchema,   // used for approve/reject/ban
};