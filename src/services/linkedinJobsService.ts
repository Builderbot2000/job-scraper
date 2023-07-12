import axios from "axios";
import axiosRetry from "axios-retry";

import { Params } from "../types/params";
import { Posting } from "../types/posting";
import { indexQueryAddress } from "../utils/linkedinApi";
import cheerio from "cheerio";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

const queryJob = async (queryString: string): Promise<Posting | null> => {
  try {
    const response = await axios.get(queryString);
    const jobPostingHtml = response.data as string;
    const $ = cheerio.load(jobPostingHtml);
    const postingMain = $("main");
    const postingHead = postingMain.find("div.top-card-layout__entity-info");
    const title = postingHead.find("h1.top-card-layout__title").text();
    const company = postingHead.find("a.topcard__org-name-link").text().trim();
    const locationText = postingHead
      .find("span.topcard__flavor")
      .text()
      .trim()
      .split("\n")
      .at(-1);
    const location = locationText ? locationText.trim() : "N/A";
    const postedTime = postingHead
      .find("span.posted-time-ago__text")
      .text()
      .trim();
    const competition = postingHead
      .find("figcaption.num-applicants__caption")
      .text()
      .trim();
    const postingBody = postingMain.find("section.core-section-container");
    const description = postingBody
      .find("div.show-more-less-html__markup")
      .text()
      .trim();
    const postingCriteria = postingBody.find(
      "ul.description__job-criteria-list"
    );
    let postingCriteriasList = postingCriteria
      .find("span.description__job-criteria-text")
      .text()
      .split("\n");
    postingCriteriasList = postingCriteriasList.filter(
      (element) => element.trim() !== ""
    );
    postingCriteriasList = postingCriteriasList.map((element) =>
      element.trim()
    );
    const postingInfo = {
      title: title,
      company: company,
      location: location,
      postedTime: postedTime,
      competition: competition,
      description: description,
      seniority: postingCriteriasList[0],
      jobType: postingCriteriasList[1],
      jobFunction: postingCriteriasList[2],
      industries: postingCriteriasList[3],
    };
    return postingInfo;
  } catch (err) {
    // if (err && err instanceof Error) console.log(err.message);
    console.log("RETRY");
    const postingInfo = await queryJob(queryString);
    return postingInfo;
  }
};

const queryJobs = async (params: Params): Promise<Array<Posting>> => {
  const response = await axios.get(
    `${indexQueryAddress}?keywords=${params.keyword}&location=${params.location}`
  );
  const jobsIndexHtml = response.data as string;
  const $ = cheerio.load(jobsIndexHtml);
  const jobs = $("li");
  const jobLinks: Array<string> = [];
  jobs.each((_index, element) => {
    const jobLink = $(element).find("a.base-card__full-link").attr("href");
    if (jobLink) jobLinks.push(jobLink);
  });
  const postings: Array<Posting> = [];
  for (const link of jobLinks) {
    const posting = await queryJob(link);
    // console.log(posting);
    if (posting) {
      postings.push(posting);
      console.log("SUCCESS");
    } else console.log("FAIL");
  }
  return postings;
};

export default {
  queryJob,
  queryJobs,
};
