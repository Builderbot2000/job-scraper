import { useSelector } from "react-redux";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import postingsParser from "../utils/postingsParser";
import { useState } from "react";
import storage from "../services/storage";
import { isNumber, isObject } from "../utils/typeGuards";
import { Posting } from "../types/posting";

const ResultsViewer = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const storedPosition = storage.loadField("currentPosition");
  if (storedPosition && isNumber(storedPosition))
    setCurrentPosition(storedPosition);

  const posting: Posting | null = useSelector((state) => {
    if (state && isObject(state) && "postings" in state) {
      console.log("Postings: ", state.postings);
      return postingsParser.parsePostings(state.postings)[currentPosition];
    } else return null;
  });

  console.log("Current Posting: ", posting);

  if (!posting) return <Card>Posting not found</Card>;

  return (
    <>
      <Card
        sx={{
          border: 0,
          borderRadius: 3,
          height: 1,
          width: 0.8,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={1}>
            <Typography>{posting.title}</Typography>
            <Grid item xs={6}>
              {posting.company}
            </Grid>
            <Grid item xs={6}>
              {posting.seniority}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ResultsViewer;
