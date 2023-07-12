import { Params } from "../types/params";
import { Posting } from "../types/posting";

export const postingFilter = (params: Params, posting: Posting): boolean => {
  if (!params || !posting) return false;
  if (params.applied.includes(posting.company)) return false;
  for (const includedString of params.include) {
    if (!posting.description.includes(includedString)) return false;
  }
  for (const excludedString of params.exclude) {
    if (posting.description.includes(excludedString)) return false;
  }
  return true;
};
