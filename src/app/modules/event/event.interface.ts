import { EventType } from "../../../generated/client/enums.js";

export interface ICreateEvent {
  title: string;
  description: string;
  date: string;
  venue: string;
  type: EventType;
  registrationFee: number;
}