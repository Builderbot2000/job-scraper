import axios from "axios";

import { SERVICE_URL } from "../utils/config";
import { Posting } from "../types/posting";
import { Params } from "../types/params";
import postingsParser from "../utils/postingsParser";

const baseUrl = SERVICE_URL + "/api/linkedinJobs";

const controller = new AbortController();

const getPostingsByParams = async (params: Params): Promise<Array<Posting>> => {
  const request = await axios.post(baseUrl, params, {
    signal: controller.signal,
  });
  return postingsParser.parsePostings(request.data);
};

export default { getPostingsByParams, controller };
