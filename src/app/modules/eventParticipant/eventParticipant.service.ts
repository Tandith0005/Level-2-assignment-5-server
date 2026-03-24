import status from "http-status";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/AppError.js";
import { EventType, ParticipantStatus } from "../../../generated/client/enums.js";


const joinEvent = async (userId: string, eventId: string) => {
  // 1. Get event
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new AppError("Event not found", status.NOT_FOUND);
  }

  // 2. Prevent self join
  if (event.creatorId === userId) {
    throw new AppError("You cannot join your own event", status.BAD_REQUEST);
  }

  // 3. Check existing participant
  const existing = await prisma.eventParticipant.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });

  if (existing) {
    throw new AppError("Already joined/requested", status.BAD_REQUEST);
  }

  let stat: ParticipantStatus = ParticipantStatus.PENDING;
  let isPaid = false;

  // LOGIC BASED ON TYPE + FEE
  if (event.type === EventType.PUBLIC && event.registrationFee === 0) {
    stat = ParticipantStatus.APPROVED;
  }

  if (event.registrationFee > 0) {
    // payment required (we'll integrate later)
    isPaid = false;
  }

  const participant = await prisma.eventParticipant.create({
    data: {
      userId,
      eventId,
      status: stat,
      isPaid,
    },
  });

  return participant;
};

const approveParticipant = async (
  ownerId: string,
  eventId: string,
  participantId: string
) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.creatorId !== ownerId) {
    throw new AppError("Not authorized", status.FORBIDDEN);
  }

  return prisma.eventParticipant.update({
    where: { id: participantId },
    data: {
      status: ParticipantStatus.APPROVED,
    },
  });
};

const rejectParticipant = async (
  ownerId: string,
  eventId: string,
  participantId: string
) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.creatorId !== ownerId) {
    throw new AppError("Not authorized", status.FORBIDDEN);
  }

  return prisma.eventParticipant.update({
    where: { id: participantId },
    data: {
      status: ParticipantStatus.REJECTED,
    },
  });
};

const banParticipant = async (
  ownerId: string,
  eventId: string,
  participantId: string
) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.creatorId !== ownerId) {
    throw new AppError("Not authorized", status.FORBIDDEN);
  }

  return prisma.eventParticipant.update({
    where: { id: participantId },
    data: {
      status: ParticipantStatus.BANNED,
    },
  });
};

export const EventParticipantService = {
  joinEvent,
  approveParticipant,
  rejectParticipant,
  banParticipant,
};