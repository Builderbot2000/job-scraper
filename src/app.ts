import express from "express";
import cors from "cors";
import linkedinJobsRouter from "./routes/linkedinJobs";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/linkedinJobs", linkedinJobsRouter);

export default app;
