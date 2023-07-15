import { Params } from "../types/params";
import { Posting } from "../types/posting";
import paramsParser from "../utils/paramsParser";
import postingsParser from "../utils/postingsParser";

const POSTINGS_KEY = "postings";
const PARAMS_KEY = "params";

const savePostings = (postings: Array<Posting>) => {
  localStorage.setItem(POSTINGS_KEY, JSON.stringify(postings));
};

const loadPostings = (): Array<Posting> | null => {
  const postingsJson: string | null = JSON.parse(
    window.localStorage.getItem(POSTINGS_KEY) as string
  ) as string | null;
  if (!postingsJson) return null;
  return postingsParser.parsePostings(postingsJson);
};

const removePostings = () => {
  localStorage.removeItem(POSTINGS_KEY);
};

const saveParams = (params: Params) => {
  localStorage.setItem(PARAMS_KEY, JSON.stringify(params));
};

const loadParams = (): Params | null => {
  const paramsJson: string | null = JSON.parse(
    window.localStorage.getItem(PARAMS_KEY) as string
  ) as string | null;
  if (!paramsJson) return null;
  return paramsParser.parseParams(paramsJson);
};

const removeParams = () => {
  localStorage.removeItem(PARAMS_KEY);
};

export default {
  savePostings,
  loadPostings,
  removePostings,
  saveParams,
  loadParams,
  removeParams,
};
