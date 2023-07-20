import { Params } from "../types/params";
import { isNumber, isObject, isString } from "./typeGuards";

export const parseString = (string: unknown): string => {
  if (!string) return "";
  if (!isString(string)) throw new Error("Incorrect string");
  return string;
};

const parseStringArray = (stringArray: unknown): Array<string> => {
  if (!stringArray) return [];
  if (!(stringArray instanceof Array)) {
    throw new Error("Incorrect string array");
  }
  const outputArray: Array<string> = [];
  for (const stringElement of stringArray) {
    if (!stringElement || !isString(stringElement)) {
      throw new Error("Incorrect or missing string array element");
    }
    outputArray.push(stringElement);
  }
  return outputArray;
};

const parseNumber = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error("Incorrect or missing number");
  }
  return number;
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
    "seniority" in requestObject &&
    "salary" in requestObject &&
    "jobType" in requestObject &&
    "experienceLevel" in requestObject &&
    "include" in requestObject &&
    "exclude" in requestObject &&
    "applied" in requestObject &&
    "strongInclude" in requestObject &&
    "position" in requestObject &&
    "length" in requestObject
  ) {
    const newParamsObject: Params = {
      keyword: parseString(requestObject.keyword),
      location: parseString(requestObject.location),
      postedTime: parseString(requestObject.postedTime),
      distance: parseString(requestObject.distance),
      commute: parseString(requestObject.commute),
      company: parseString(requestObject.company),
      seniority: parseString(requestObject.seniority),
      salary: parseString(requestObject.salary),
      jobType: parseString(requestObject.jobType),
      experienceLevel: parseString(requestObject.experienceLevel),
      include: parseStringArray(requestObject.include),
      exclude: parseStringArray(requestObject.exclude),
      applied: parseStringArray(requestObject.applied),
      strongInclude: parseStringArray(requestObject.strongInclude),
      position: requestObject.position
        ? parseNumber(requestObject.position)
        : 0,
      length: requestObject.length ? parseNumber(requestObject.length) : 10,
    };
    return newParamsObject;
  }
  throw new Error("Incorrect data: data fields are missing");
};

export default {
  parseParams,
};
