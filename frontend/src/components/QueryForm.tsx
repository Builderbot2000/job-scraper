import { useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch, usePersistentField } from "../hooks";
import { Params } from "../types/params";
import { clearParams, saveParams } from "../reducers/paramsReducer";
import {
  clearPostings,
  initializePostingsByParams,
} from "../reducers/postingsReducer";
import { setRequests } from "../reducers/requestsReducer";
import { isObject, isNumber } from "../utils/typeGuards";
import postings from "../services/postings";

const QueryForm = () => {
  const keyword = usePersistentField("keyword");
  const location = usePersistentField("location");
  const company = usePersistentField("company");
  const include = usePersistentField("include");
  const exclude = usePersistentField("exclude");

  const dispatch = useAppDispatch();

  const runningRequests: number = useSelector((state) => {
    if (
      state &&
      isObject(state) &&
      "requests" in state &&
      state.requests &&
      isNumber(state.requests)
    ) {
      return state.requests;
    } else return 0;
  });

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newParams: Params = {
      keyword: keyword.value,
      location: location.value,
      postedTime: "Anytime",
      distance: "",
      commute: "",
      company: company.value,
      salary: "",
      jobType: "",
      experienceLevel: "",
      include: include.value === "" ? [] : include.value.split(", "),
      exclude: exclude.value === "" ? [] : exclude.value.split(", "),
      applied: [],
      strongInclude: [],
      position: 0,
      length: 10,
    };
    // postings.controller.abort();
    dispatch(saveParams(newParams));
    dispatch(initializePostingsByParams(newParams));
  };

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    keyword.clear();
    location.clear();
    company.clear();
    include.clear();
    exclude.clear();
    dispatch(clearPostings());
    dispatch(clearParams());
    // postings.controller.abort();
    dispatch(setRequests(0));
  };

  return (
    <>
      <FormLabel>
        <Typography
          variant="h4"
          noWrap
          sx={{
            ml: 3,
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          SEARCH FOR JOBS
        </Typography>
      </FormLabel>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>search term</InputLabel>
            <Input value={keyword.value} onChange={keyword.onChange} />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>location</InputLabel>
            <Input value={location.value} onChange={location.onChange} />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>company</InputLabel>
            <Input value={company.value} onChange={company.onChange} />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>must include</InputLabel>
            <Input disabled />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="include-input"
            label="include"
            variant="outlined"
            multiline
            minRows={4}
            sx={{ mt: 3 }}
            value={include.value}
            onChange={include.onChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="exclude-input"
            label="exclude"
            variant="outlined"
            multiline
            minRows={4}
            sx={{ mt: 3 }}
            value={exclude.value}
            onChange={exclude.onChange}
          />
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Box display="flex" justifyContent="left" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 7, width: 150, height: 50 }}
                size="large"
                onClick={handleSubmit}
              >
                Search
              </Button>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" justifyContent="left" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 7, width: 150, height: 50 }}
                size="large"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default QueryForm;
