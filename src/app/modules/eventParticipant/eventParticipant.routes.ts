import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { EventParticipantController } from "./eventParticipant.controller.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { Role } from "../../../generated/client/enums.js";


const router = express.Router();

// Join an event (Any authenticated user can join)
router.post(
  "/:eventId/join",
  authMiddleware,
  EventParticipantController.joinEvent
);

// Approve a participant 
router.patch(
  "/:eventId/participants/:participantId/approve",
  authMiddleware,
  authorize(Role.USER, Role.ADMIN),  
  EventParticipantController.approveParticipant
);

// Reject a participant 
router.patch(
  "/:eventId/participants/:participantId/reject",
  authMiddleware,
  authorize(Role.USER, Role.ADMIN),
  EventParticipantController.rejectParticipant
);

// Ban a participant 
router.patch(
  "/:eventId/participants/:participantId/ban",
  authMiddleware,
  authorize(Role.USER, Role.ADMIN),
  EventParticipantController.banParticipant
);

export const EventParticipantRoutes = router;