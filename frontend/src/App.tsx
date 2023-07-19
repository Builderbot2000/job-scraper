import { Box, Grid, Typography } from "@mui/material";

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import QueryForm from "./components/QueryForm";
import PostingsViewer from "./components/PostingViewer/PostingsViewer";
import { initializePostingsFromLocalStorage } from "./reducers/postingsReducer";
import { useAppDispatch } from "./hooks";
import RequestIndicator from "./components/RequestIndicator";

const App = () => {
  const dispatch = useAppDispatch();
  dispatch(initializePostingsFromLocalStorage());

  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      <Grid item xs={12} sx={{ height: 0.15 }}>
        <ResponsiveAppBar />
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ height: 0.8, p: 4 }}>
          <Grid item xs={6}>
            <QueryForm />
            <Box sx={{ mt: 4 }}>
              <RequestIndicator />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <PostingsViewer />
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ height: 0.05 }} justifyContent="center">
        <Typography
          sx={{
            ml: 3,
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "grey",
            textDecoration: "none",
          }}
        >
          v1.0
        </Typography>
      </Grid>
    </Grid>
  );
};

export default App;
