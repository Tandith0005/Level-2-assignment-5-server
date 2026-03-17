import { Router } from "express";

const router = Router();

router.use('/', (req, res) => {
    res.send('Hello World!')
})


export const IndexRoutes = router;