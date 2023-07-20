import { Params } from "../types/params";
import { Posting } from "../types/posting";

export const postingFilter = (params: Params, posting: Posting): boolean => {
  if (!params || !posting) return false;
  let pass = true;
  if (
    params.seniority !== "" &&
    posting.seniority !== "Not Applicable" &&
    posting.seniority !== params.seniority
  )
    pass = false;
  if (params.applied.includes(posting.company)) pass = false;
  for (const excludedString of params.exclude) {
    if (posting.description.includes(excludedString)) pass = false;
  }
  for (const includedString of params.include) {
    if (posting.description.includes(includedString)) pass = true;
  }
  return pass;
};
