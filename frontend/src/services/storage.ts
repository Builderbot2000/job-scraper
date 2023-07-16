import { Params } from "../types/params";
import { Posting } from "../types/posting";
import paramsParser from "../utils/paramsParser";
import postingsParser from "../utils/postingsParser";
import { isString } from "../utils/typeGuards";

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

const saveField = (fieldName: string, field: unknown) => {
  if (isString(field)) localStorage.setItem(fieldName, field);
  else localStorage.setItem(fieldName, JSON.stringify(field));
};

const loadField = (fieldName: string): unknown => {
  const storedValue = window.localStorage.getItem(fieldName);
  return storedValue;
};

const removeField = (fieldName: string) => {
  localStorage.removeItem(fieldName);
};

export default {
  savePostings,
  loadPostings,
  removePostings,
  saveParams,
  loadParams,
  removeParams,
  saveField,
  loadField,
  removeField,
};
