import express from "express";

import linkedinJobsService from "../services/linkedinJobsService";
import { Response } from "../types/response";
import { instanceId, task } from "../app";
import requestParser from "../utils/requestParser";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const linkedinJobsRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
linkedinJobsRouter.post("/", async (req, res) => {
  const request = requestParser.parseRequest(req.body);
  // console.log(request);
  if (request.type === "search") {
    if ("params" in request && typeof request.params !== "undefined") {
      if (!task.request || task.request.requester === request.requester) {
        task.request = request;
        task.abort = false;
        const result = await linkedinJobsService.queryJobs(request.params);
        const response: Response = {
          responder: instanceId,
          postings: result,
        };
        res.json(response);
      } else res.sendStatus(503);
    } else throw new Error("Params missing from request");
  }
  if (request.type === "abort") {
    if (task.request) {
      if (task.request.requester === request.requester) {
        task.abort = true;
        await sleep(100); // wait for abort to proceed
      }
    }
    res.sendStatus(200);
  }
});

export default linkedinJobsRouter;
