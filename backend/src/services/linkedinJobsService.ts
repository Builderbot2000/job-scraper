import axios from "axios";
import { setTimeout } from "timers/promises";

import { Params } from "../types/params";
import { Posting } from "../types/posting";
import { indexQueryAddress } from "../utils/linkedinApi";
import cheerio from "cheerio";
import { postingFilter } from "../utils/postingFilter";

const wait = async (duration: number) => {
  await setTimeout(duration);
};

const queryJob = async (
  params: Params,
  queryString: string
): Promise<Posting | null> => {
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
      seniority: postingCriteriasList[0] ? postingCriteriasList[0] : "N/A",
      jobType: postingCriteriasList[1] ? postingCriteriasList[1] : "N/A",
      jobFunction: postingCriteriasList[2] ? postingCriteriasList[2] : "N/A",
      industries: postingCriteriasList[3] ? postingCriteriasList[3] : "N/A",
      link: queryString,
    };
    if (postingFilter(params, postingInfo) == false) return null;
    return postingInfo;
  } catch (err) {
    // if (err && err instanceof Error) console.log(err.message);
    await wait(3000);
    console.log("RETRY");
    const postingInfo = await queryJob(params, queryString);
    return postingInfo;
  }
};

const queryJobs = async (params: Params): Promise<Array<Posting>> => {
  console.log("START");
  const postings: Array<Posting> = [];
  let currentPosition = 0;
  let startPosition = 0;
  while (postings.length < params.length) {
    try {
      const response = await axios.get(
        `${indexQueryAddress}?keywords=${params.keyword}&location=${params.location}&start=${startPosition}`
      );
      const jobsIndexHtml = response.data as string;
      const $ = cheerio.load(jobsIndexHtml);
      const jobs = $("li");
      const jobLinks: Array<string> = [];
      jobs.each((_index, element) => {
        const jobLink = $(element).find("a.base-card__full-link").attr("href");
        if (jobLink) jobLinks.push(jobLink);
      });
      console.log("startPosition: ", startPosition);
      console.log("matches: ", postings.length);
      console.log("captured: ", jobLinks.length);
      for (const link of jobLinks) {
        if (postings.length >= params.length) break;
        if (currentPosition >= params.position) {
          const posting = await queryJob(params, link);
          // console.log(posting);
          if (posting) {
            postings.push(posting);
            console.log("SUCCESS");
          } else console.log("FAIL");
        } else currentPosition += 1;
      }
      startPosition += 25;
    } catch (err) {
      await wait(3000);
      console.log("RETRY INDEX");
    }
  }
  console.log("END");
  return postings;
};

export default {
  queryJob,
  queryJobs,
};
