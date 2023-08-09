import { Response } from "../types/response";
import { parseString } from "./paramsParser";
import postingsParser from "./postingsParser";
import { isObject } from "./typeGuards";

const parseResponse = (responseObject: unknown): Response => {
  if (!isObject(responseObject)) {
    throw new Error("Incorrect or missing object");
  }
  if ("responder" in responseObject && "postings" in responseObject) {
    const newResponseObject: Response = {
      responder: parseString(responseObject.responder),
      postings: postingsParser.parsePostings(responseObject.postings),
    };
    return newResponseObject;
  }
  throw new Error("Incorrect data: data fields are missing");
};

export default { parseResponse };
