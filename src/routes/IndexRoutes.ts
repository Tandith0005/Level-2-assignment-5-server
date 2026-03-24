import { Request, Response, Router } from "express";
import { EventRoutes } from "../app/modules/event/event.routes.js";

const router = Router();

router.use('/test', (req:Request, res: Response) => {
    res.json({ message: 'Hello World! Planora API v1' });
});


router.use("/events", EventRoutes);


export const IndexRoutes = router;