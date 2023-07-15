import express from "express";

import linkedinJobsService from "../services/linkedinJobsService";
import paramsParser from "../utils/paramsParser";

const linkedinJobsRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
linkedinJobsRouter.post("/", async (req, res) => {
  const result = await linkedinJobsService.queryJobs(
    paramsParser.parseParams(req.body)
  );
  res.json(result);
});

export default linkedinJobsRouter;
