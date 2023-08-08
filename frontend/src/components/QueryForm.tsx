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
import storage from "../services/storage";
import { clearAllRequests } from "../reducers/requestsReducer";

const QueryForm = () => {
  const keyword = usePersistentField("keyword");
  const location = usePersistentField("location");
  const company = usePersistentField("company");
  const seniority = usePersistentField("seniority");
  const include = usePersistentField("include");
  const exclude = usePersistentField("exclude");

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(clearAllRequests());
    dispatch(clearParams());
    dispatch(clearPostings());
    storage.removeField("currentPosition");
    if (keyword.value === "") return;
    const newParams: Params = {
      keyword: keyword.value,
      location: location.value,
      postedTime: "Anytime",
      distance: "",
      commute: "",
      company: company.value,
      seniority: seniority.value,
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
    dispatch(saveParams(newParams));
    dispatch(initializePostingsByParams(newParams));
  };

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    keyword.clear();
    location.clear();
    company.clear();
    seniority.clear();
    include.clear();
    exclude.clear();
    dispatch(clearAllRequests());
    dispatch(clearPostings());
    dispatch(clearParams());
    storage.removeField("currentPosition");
  };

  return (
    <Box sx={{ width: 1, border: 0 }}>
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
      <Grid container direction="column" sx={{ mt: 3 }}>
        <Grid item container direction="row">
          <Grid item xs={6}>
            <FormControl sx={{ m: 1 }}>
              <InputLabel>search term</InputLabel>
              <Input
                id="search-term-input"
                value={keyword.value}
                onChange={keyword.onChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ m: 1 }}>
              <InputLabel>location</InputLabel>
              <Input
                id="location-input"
                value={location.value}
                onChange={location.onChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={6}>
            <FormControl sx={{ m: 1 }}>
              <InputLabel>company</InputLabel>
              <Input
                id="company-input"
                value={company.value}
                onChange={company.onChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ border: 0 }}>
            <FormControl sx={{ m: 1 }}>
              <InputLabel>seniority</InputLabel>
              <Input
                id="seniority-input"
                value={seniority.value}
                onChange={seniority.onChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container direction="row" sx={{ border: 0 }}>
          <Grid item xs={6} sx={{ border: 0 }}>
            <TextField
              id="include-input"
              label="include"
              variant="outlined"
              multiline
              minRows={4}
              sx={{ mt: 3, mx: 1, border: 0 }}
              value={include.value}
              onChange={include.onChange}
            />
          </Grid>
          <Grid item xs={6} sx={{ border: 0 }}>
            <TextField
              id="exclude-input"
              label="exclude"
              variant="outlined"
              multiline
              minRows={4}
              sx={{ mt: 3, mx: 1, border: 0 }}
              value={exclude.value}
              onChange={exclude.onChange}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          sx={{ justifyContent: { xs: "space-evenly", md: "flex-start" } }}
        >
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
    </Box>
  );
};

export default QueryForm;
