import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import postingsParser from "../../utils/postingsParser";
import storage from "../../services/storage";
import { isNumber, isObject } from "../../utils/typeGuards";
import { Posting } from "../../types/posting";
import PostingInfoBox from "./PostingInfoBox";
import { useAppDispatch } from "../../hooks";
import { addPostingsByParams } from "../../reducers/postingsReducer";
import { Params } from "../../types/params";
import paramsParser from "../../utils/paramsParser";

const PostingsViewer = () => {
  let storedPosition = storage.loadField("currentPosition");
  if (storedPosition && isNumber(Number(storedPosition)))
    storedPosition = Number(storedPosition);
  else storedPosition = 0;
  const [currentPosition, setCurrentPosition] = useState(storedPosition);

  const dispatch = useAppDispatch();

  const params: Params | null = useSelector((state) => {
    const storedParams = storage.loadParams();
    if (state && isObject(state) && "params" in state && state.params) {
      return paramsParser.parseParams(state.params);
    } else if (storedParams) return storedParams;
    else return null;
  });

  const postings: Array<Posting> | [] = useSelector((state) => {
    if (state && isObject(state) && "postings" in state && state.postings) {
      return postingsParser.parsePostings(state.postings);
    } else return [];
  });

  const runningRequests: number = useSelector((state) => {
    if (
      state &&
      isObject(state) &&
      "requests" in state &&
      Array.isArray(state.requests)
    ) {
      return state.requests.length;
    } else return 0;
  });

  const posting: Posting = postings[currentPosition];
  const total: number = postings.length;

  useEffect(() => {
    if (
      total >= 10 &&
      currentPosition >= total - 6 &&
      params &&
      runningRequests == 0
    ) {
      console.log("Adding new postings...");
      dispatch(addPostingsByParams(params, postings));
    }
  }, [dispatch, currentPosition, params, postings, runningRequests, total]);

  const handlePrev = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newPosition = currentPosition - 1;
    if (newPosition >= 0) {
      setCurrentPosition(newPosition);
      storage.saveField("currentPosition", newPosition);
    }
  };

  const handleNext = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newPosition = currentPosition + 1;
    if (newPosition < total) {
      setCurrentPosition(newPosition);
      storage.saveField("currentPosition", newPosition);
    }
  };

  if (!posting)
    return (
      <Box
        sx={{
          border: 0,
          borderRadius: 3,
          height: 1,
          width: 0.8,
          boxShadow: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            wordWrap: "break-word",
          }}
        >
          {runningRequests == 0 ? "N/A" : "Loading..."}
        </Typography>
      </Box>
    );

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          height: 1,
          width: 0.8,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid item sx={{ mt: 3, mb: 2, ml: 3, height: 60 }}>
              <Typography
                justifyContent="center"
                alignContent="center"
                variant="h6"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  wordWrap: "break-word",
                }}
              >
                {posting.title}
              </Typography>
            </Grid>
            <Grid item sx={{ width: 1, height: 220 }}>
              <Grid container>
                <Grid item xs={12} sx={{ width: 0.8 }}>
                  <Grid
                    container
                    alignContent="center"
                    justifyContent="space-evenly"
                  >
                    {" "}
                    <Grid item xs={6}>
                      <PostingInfoBox
                        title="Company"
                        content={posting.company}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <PostingInfoBox
                        title="Seniority"
                        content={posting.seniority}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ width: 0.8 }}>
                  <Grid
                    container
                    alignContent="center"
                    justifyContent="space-evenly"
                  >
                    {" "}
                    <Grid item xs={6}>
                      <PostingInfoBox
                        title="Location"
                        content={posting.location}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <PostingInfoBox
                        title="Industries"
                        content={posting.industries}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ width: 0.8 }}>
                  <Grid
                    container
                    alignContent="center"
                    justifyContent="space-evenly"
                  >
                    {" "}
                    <Grid item xs={6}>
                      <PostingInfoBox
                        title="Competition"
                        content={posting.competition}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <PostingInfoBox
                        title="Job Type"
                        content={posting.jobType}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ width: 0.8 }}>
                  <Grid
                    container
                    alignContent="center"
                    justifyContent="space-evenly"
                  >
                    {" "}
                    <Grid item xs={6}>
                      <PostingInfoBox
                        title="Posted"
                        content={posting.postedTime}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <PostingInfoBox title="Commute" content={null} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, width: 150, height: 50 }}
                size="large"
                href={posting.link}
                target="_blank"
              >
                Apply
              </Button>
            </Grid>
            <Grid
              item
              alignContent="center"
              justifyContent="space-evenly"
              sx={{ width: 500, height: 50 }}
            >
              <Grid
                container
                spacing={1}
                alignContent="center"
                justifyContent="space-evenly"
              >
                <Grid
                  item
                  xs={4}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button variant="text" onClick={handlePrev}>
                    <KeyboardArrowLeftIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    justifyContent="center"
                    alignContent="center"
                    variant="h6"
                    sx={{
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {currentPosition + 1} / {total}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button variant="text" onClick={handleNext}>
                    <KeyboardArrowRightIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default PostingsViewer;
