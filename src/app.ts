import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { IndexRoutes } from './app/routes/IndexRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// all module routes
app.use('/api/v1', IndexRoutes)

export default app;