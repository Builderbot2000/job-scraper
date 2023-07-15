import { Posting } from "../types/posting";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isObject = (object: unknown): object is object => {
  return typeof object === "object" || object instanceof Object;
};

const parseString = (string: unknown): string => {
  if (!string) return "";
  if (!isString(string)) {
    throw new Error("Incorrect string");
  }
  return string.replace(" ", "%20");
};

const parsePostings = (responseArray: unknown): Array<Posting> => {
  if (!responseArray || !Array.isArray(responseArray))
    throw new Error("Incorrect or missing array");
  const parsedPostingsArray: Array<Posting> = [];
  for (const responseObject of responseArray) {
    if (!responseObject || !isObject(responseObject))
      throw new Error("Incorrect or missing array element");
    if (
      "title" in responseObject &&
      "company" in responseObject &&
      "location" in responseObject &&
      "postedTime" in responseObject &&
      "competition" in responseObject &&
      "description" in responseObject &&
      "seniority" in responseObject &&
      "jobType" in responseObject &&
      "jobFunction" in responseObject &&
      "industries" in responseObject
    ) {
      const parsedPostingObject: Posting = {
        title: parseString(responseObject.title),
        company: parseString(responseObject.company),
        location: parseString(responseObject.location),
        postedTime: parseString(responseObject.postedTime),
        competition: parseString(responseObject.competition),
        description: parseString(responseObject.description),
        seniority: parseString(responseObject.seniority),
        jobType: parseString(responseObject.jobType),
        jobFunction: parseString(responseObject.jobFunction),
        industries: parseString(responseObject.industries),
      };
      parsedPostingsArray.push(parsedPostingObject);
    } else throw new Error("Incorrect data: data fields are missing");
  }
  return parsedPostingsArray;
};

export default { parsePostings };
