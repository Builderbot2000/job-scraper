export enum CommuteType {
  onsite = "On-site",
  hybrid = "Hybrid",
  remote = "Remote",
}

export type CommuteTypes = Array<CommuteType>;

export interface Params {
  keyword: string;
  location: string;
  postedTime: string;
  distance: string;
  commute: string;
  company: string;
  salary: string;
  jobType: string;
  experienceLevel: string;
}
