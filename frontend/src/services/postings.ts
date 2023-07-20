import axios from "axios";

import { SERVICE_URL } from "../utils/config";
import { Posting } from "../types/posting";
import { Params } from "../types/params";
import postingsParser from "../utils/postingsParser";

const baseUrl = SERVICE_URL + "/api/linkedinJobs";

const getPostingsByParams = async (
  params: Params,
  controller: AbortController
): Promise<Array<Posting>> => {
  console.log("current signal: ", controller.signal);
  const request = await axios.post(baseUrl, params, {
    signal: controller.signal,
  });
  return postingsParser.parsePostings(request.data);
};

export default { getPostingsByParams };
