import axios from "axios";

import { SERVICE_URL } from "../utils/config";
import { Posting } from "../types/posting";
import { Params } from "../types/params";
import postingsParser from "../utils/postingsParser";
import { Request } from "../types/request";
import responseParser from "../utils/responseParser";
import { instanceId } from "../main";

const baseUrl = SERVICE_URL + "/api/linkedinJobs";

const getPostingsByParams = async (
  params: Params,
  controller: AbortController
): Promise<Array<Posting>> => {
  // console.log("SEARCH");
  const requestPayload: Request = {
    requester: instanceId,
    type: "search",
    params: params,
  };
  const request = await axios.post(baseUrl, requestPayload, {
    signal: controller.signal,
  });
  if (request.data) {
    const response = responseParser.parseResponse(request.data);
    return postingsParser.parsePostings(response.postings);
  } else throw new Error("Response is empty");
};

const abortAllPostingsRequest = async () => {
  // console.log("ABORT");
  const requestPayload: Request = {
    requester: instanceId,
    type: "abort",
  };
  await axios.post(baseUrl, requestPayload);
};

export default { getPostingsByParams, abortAllPostingsRequest };
