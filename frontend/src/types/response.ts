import { Posting } from "./posting";

export interface Response {
  responder: string;
  postings: Array<Posting> | null;
  error?: string;
}
