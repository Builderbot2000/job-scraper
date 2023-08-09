import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

import linkedinJobsRouter from "./routes/linkedinJobs";
import { Task } from "./types/task";

export const instanceId: string = uuidv4();

// eslint-disable-next-line prefer-const
export let task: Task = { request: null, abort: false };

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/linkedinJobs", linkedinJobsRouter);

export default app;
