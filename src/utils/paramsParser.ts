import { Params } from "../types/params";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error("Incorrect or missing string");
  }
  return string.replace(" ", "%20");
};

const isObject = (object: unknown): object is object => {
  return typeof object === "object" || object instanceof Object;
};

const parseParams = (requestObject: unknown): Params => {
  if (!isObject(requestObject)) {
    throw new Error("Incorrect or missing object");
  }
  if (
    "keyword" in requestObject &&
    "location" in requestObject &&
    "postedTime" in requestObject &&
    "distance" in requestObject &&
    "commute" in requestObject &&
    "company" in requestObject &&
    "salary" in requestObject &&
    "jobType" in requestObject &&
    "experienceLevel" in requestObject
  ) {
    const newParamsObject: Params = {
      keyword: parseString(requestObject.keyword),
      location: requestObject.location
        ? parseString(requestObject.location)
        : "",
      postedTime: requestObject.postedTime
        ? parseString(requestObject.postedTime)
        : "",
      distance: requestObject.distance
        ? parseString(requestObject.distance)
        : "",
      commute: requestObject.commute ? parseString(requestObject.commute) : "",
      company: requestObject.company ? parseString(requestObject.company) : "",
      salary: requestObject.salary ? parseString(requestObject.salary) : "",
      jobType: requestObject.jobType ? parseString(requestObject.jobType) : "",
      experienceLevel: requestObject.experienceLevel
        ? parseString(requestObject.experienceLevel)
        : "",
    };
    return newParamsObject;
  }
  throw new Error("Incorrect data: data fields are missing");
};

export default {
  parseParams,
};
