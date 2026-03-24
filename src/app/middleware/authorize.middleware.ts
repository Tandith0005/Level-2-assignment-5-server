import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import status from "http-status";
import { Role } from "../../generated/client/enums.js";

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError("Unauthorized: No user found", status.UNAUTHORIZED);
      }

      if (!allowedRoles.includes(user.role)) {
        throw new AppError("Forbidden: You don't have permission", status.FORBIDDEN);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};