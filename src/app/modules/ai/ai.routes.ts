import express from "express";
import { chatWithAI } from "./ai.controller.js";

const router = express.Router();


router.post("/chat", chatWithAI);


export const AIRoutes = router;