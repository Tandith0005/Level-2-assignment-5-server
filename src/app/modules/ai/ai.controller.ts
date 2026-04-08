import status from "http-status";
import { Request, Response } from "express"; 
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { askAI } from "./ai.service.js";

export const chatWithAI = catchAsync(async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ success: false, message: "Message is required" });
    return;
  }

  const reply = await askAI(message);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    data: reply,
  });
});
