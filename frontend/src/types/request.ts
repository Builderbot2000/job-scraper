import { Params } from "./params";

export type RequestType = "search" | "abort";

export interface Request {
  requester: string;
  type: RequestType;
  params?: Params;
}
