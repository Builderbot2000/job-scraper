import { Request } from "./request";

export interface Task {
  request: Request | null;
  abort: boolean;
}
