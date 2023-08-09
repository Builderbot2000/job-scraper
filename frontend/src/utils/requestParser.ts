import { Request, RequestType } from "../types/request";
import { parseString } from "./paramsParser";
import { isObject, isString } from "./typeGuards";

const parseRequestType = (typeObject: unknown): RequestType => {
  if (!typeObject) {
    throw new Error("Type property missing");
  }
  if (!isString(typeObject)) {
    throw new Error("Type property is not string");
  }
  if (typeObject !== "search" && typeObject !== "abort") {
    throw new Error("Type undefined");
  }
  return typeObject;
};

const parseRequest = (requestObject: unknown): Request => {
  if (!isObject(requestObject)) {
    throw new Error("Incorrect or missing object");
  }
  if ("requester" in requestObject && "type" in requestObject) {
    const newRequestObject: Request = {
      requester: parseString(requestObject.requester),
      type: parseRequestType(requestObject.type),
    };
    return newRequestObject;
  }
  throw new Error("Incorrect data: data fields are missing");
};

export default { parseRequest };
